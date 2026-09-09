"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { renderMarkdown } from "./MarkdownView";
import {
  boldPrice,
  canRenderAsP,
  classifyBlock,
  parseTable,
  partitionStreamedBlocks,
  splitBlocks,
  stripMarkdownMarkers,
} from "./inline-format";
import type { BlockKind } from "./inline-format";

// House palette (Camellia): navy #16384C ink, border #E8E5DF, cream
// #F8F7F3 surface. Port maps every source color to these tokens and
// rescales the 17px source body to the house 15px base, ratios kept.

export interface AnswerBlocksProps {
  content: string;
  className?: string;
  /**
   * While true, only COMPLETE markdown blocks go through the normal
   * pipeline; the in-progress tail renders as styled plain text so unclosed
   * `##`/`|`/`-`/`**` never leak as raw symbols. False = legacy block flow.
   */
  streaming?: boolean;
}

export function AnswerBlocks({ content, className, streaming = false }: AnswerBlocksProps) {
  const { stable, pending } = streaming
    ? partitionStreamedBlocks(content)
    : { stable: splitBlocks(content), pending: null };
  return (
    <div
      className={cn("rag-answer text-[15px] leading-[26px]", className)}
      aria-live={streaming ? "polite" : undefined}
    >
      {stable.map((block, i) => {
        const kind = classifyBlock(block);
        return <BlockSwitch key={i} block={block} kind={kind} />;
      })}
      {/* In-progress tail: plain text only — no pipeline can emit a
          half-built <table>/<h*> from unclosed markup, and marker stripping
          keeps raw #/|/- glyphs out of the visible copy. Body-scale font so
          the tail never flashes larger than the fixed bubble frame. */}
      {pending !== null && (
        <div className="rag-answer__pending my-2 max-w-[65ch] whitespace-pre-wrap text-[15px] leading-[26px] text-[#16384C]">
          {stripMarkdownMarkers(pending)}
        </div>
      )}
    </div>
  );
}

const BlockSwitch = memo(function BlockSwitch({
  block,
  kind,
}: {
  block: string;
  kind: BlockKind;
}) {
  switch (kind) {
    case "table": return <TableBlock block={block} />;
    case "heading": return <HeadingBlock block={block} />;
    case "divider": return <DividerBlock />;
    case "callout": return <CalloutBlock block={block} />;
    case "list": return <ListBlock block={block} />;
    case "code": return <CodeBlock block={block} />;
    default: return <ParagraphBlock block={block} />;
  }
});

// Heading cap: answer headings sit at most ~1.15x the body scale so a
// model-emitted `##` never blows up the bubble. Size is one clamp, not a
// per-level ramp.
const HEADING_CLASS = "rag-answer__heading mt-3.5 mb-2 max-w-[65ch] text-[17px] font-semibold leading-[1.35] text-[#16384C]";

function HeadingBlock({ block }: { block: string }) {
  // Models emit a `##` heading and the following paragraph WITHOUT a blank
  // line, so splitBlocks hands them over as ONE block. Only the heading LINE
  // takes heading style; later lines fall back to the body-scale paragraph
  // renderer, or a long answer inherits bold navy heading typography.
  const lines = block.split("\n");
  const headingLine = lines[0] ?? "";
  const bodyLines = lines.slice(1).filter((l) => l.trim().length > 0);
  const text = headingLine.replace(/^\s*#{1,6}\s+/, "");
  return (
    <>
      <div className={HEADING_CLASS} dangerouslySetInnerHTML={{ __html: inlineHtml(text) }} />
      {bodyLines.map((line, i) => (
        <ParagraphBlock key={i} block={line} />
      ))}
    </>
  );
}

function DividerBlock() {
  // Thematic break (`---`) as a real block element OUTSIDE any <p>: a hairline
  // in the muted border token. Markdown's <hr> would otherwise nest under
  // ParagraphBlock's <p> and fail validateDOMNesting during hydration.
  return (
    <div
      className="rag-answer__divider my-3 border-t border-[#E8E5DF]"
      role="separator"
      aria-orientation="horizontal"
    />
  );
}

function CodeBlock({ block }: { block: string }) {
  // Fenced code renders VERBATIM outside the markdown pipeline: inlineHtml
  // would treat source as prose (boldPrice mangling amounts, spans wrapping
  // glyphs) and a <pre> emitted inside ParagraphBlock's <p> breaks nesting.
  // Fence marker lines are stripped; the inner source is shown as-is.
  const lines = block.trim().split("\n");
  const source = lines.slice(1, -1).join("\n").replace(/^\n+/, "").replace(/\n+$/, "");
  return (
    <pre className="rag-answer__code my-2.5 overflow-x-auto rounded-lg border border-[#E8E5DF] bg-[#F8F7F3] p-3 font-mono text-[13px] leading-[1.5] text-[#16384C]">
      <code className="whitespace-pre">{source}</code>
    </pre>
  );
}

function TableBlock({ block }: { block: string }) {
  const parsed = parseTable(block);
  if (!parsed) {
    // Parse failed for a block the classifier already marked as table-shaped
    // (e.g. a malformed in-flight SSE run). Defer the raw content in a neutral
    // non-<p> container so no markdown path can emit <table> inside <p>.
    return (
      <div className="my-2.5 whitespace-pre-wrap text-[14px] text-[#16384C]">{block}</div>
    );
  }
  const { header, rows } = parsed;
  const useCards = header.length > 3 || rows.length === 0;
  return (
    <div className="my-2.5 max-w-full overflow-x-auto">
      {useCards ? <DefinitionCards header={header} rows={rows} /> : (
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr>
              {header.map((h) => (
                <th
                  key={h}
                  className="border-b-2 border-[#E8E5DF] px-3 py-2 text-left text-[13px] font-semibold text-[#16384C]"
                  dangerouslySetInnerHTML={{ __html: inlineHtml(h) }}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="bg-white">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-b border-[#E8E5DF] px-3 py-2 text-[14px] text-[#16384C]"
                    dangerouslySetInnerHTML={{ __html: inlineHtml(cell) }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function DefinitionCards({ header, rows }: { header: string[]; rows: string[][] }) {
  if (rows.length === 0) {
    return <div className="text-[13px] text-[#16384C]/60">{header.join(", ")}</div>;
  }
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((row, ri) => (
        <div key={ri} className="border-b border-[#E8E5DF] py-2">
          {row.map((cell, ci) => {
            const label = header[ci] ?? "col-" + (ci + 1);
            const isNumeric = /[0-9.,]+/.test(cell);
            return (
              <div key={ci} className="flex items-center justify-between gap-2 py-1">
                <span className="text-[12px] text-[#16384C]/60">{label}</span>
                <span
                  className={cn(
                    "tabular-nums text-[#16384C]",
                    isNumeric ? "text-[15px] font-semibold" : "text-[13px]",
                  )}
                  dangerouslySetInnerHTML={{ __html: inlineHtml(cell) }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ListBlock({ block }: { block: string }) {
  const items = block.split("\n").map((l) => l.replace(/^\s*(?:[-*]|\d+\.)\s+/, "")).filter(Boolean);
  return (
    <ul className="my-2 list-none p-0">
      {items.map((item, i) => (
        <li key={i} className="my-2.5 flex items-start gap-2.5">
          <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#16384C]" />
          <span
            className="text-[15px] leading-[26px] text-[#16384C]"
            dangerouslySetInnerHTML={{ __html: inlineHtml(item) }}
          />
        </li>
      ))}
    </ul>
  );
}

function CalloutBlock({ block }: { block: string }) {
  // Disclosure copy (short Vietnamese risk labels emitted by the model)
  // renders as a plain paragraph on the normal surface — no yellow/amber
  // callout box, no icon. The keyword text keeps the disclosure semantics,
  // the wrapper carries none.
  return <ParagraphBlock block={block} />;
}

const PARA_CLASS = "my-2 max-w-[65ch] text-[15px] leading-[26px] text-[#16384C]";

function ParagraphBlock({ block }: { block: string }) {
  // Last line of defense: if residual markdown could still expand into a
  // block-level element (<ul>/<ol>/<table>/<pre>/<h*>/<hr>), swap the semantic
  // <p> for a neutral <div> instead of risking invalid nesting.
  if (!canRenderAsP(block)) return <div className={PARA_CLASS} dangerouslySetInnerHTML={{ __html: inlineHtml(block) }} />;
  return <p className={PARA_CLASS} dangerouslySetInnerHTML={{ __html: inlineHtml(block) }} />;
}

// remark-html always wraps output in a single <p>; trim first because
// processSync appends a trailing newline before the wrapper check.
const OUTER_P_RE = /^<p>([\s\S]*)<\/p>$/;

const INK = "#16384C";

/**
 * Inline markdown → HTML string. Single pass through renderMarkdown() (raw
 * HTML + unsafe URLs already neutralized in MarkdownView); boldPrice runs
 * first so VND amounts keep their navy <strong>. remark-html always wraps
 * in a <p>, which is stripped, then string transforms preserve source
 * semantics (hr→none, heading cap).
 */
function inlineHtml(text: string): string {
  const raw = renderMarkdown(boldPrice(text)).trim();
  const unwrapped = OUTER_P_RE.test(raw) ? raw.replace(OUTER_P_RE, "$1") : raw;
  return unwrapped
    // A thematic break leaking into inline render must not emit <hr> —
    // <p><hr></p> violates validateDOMNesting. Collapse to nothing.
    .replace(/<hr\s*\/?>/g, "")
    // Heading cap: a markdown heading span (mid-paragraph via setext/ATX
    // reflow) must not render oversized text inside the bubble.
    .replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, `<span class="rag-answer__heading" style="font-weight:600;color:${INK}">$2</span>`)
    .replace(/<strong>/g, `<strong style="color:${INK};font-variant-numeric:tabular-nums">`);
}
