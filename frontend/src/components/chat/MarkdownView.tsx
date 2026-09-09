"use client";

import { useMemo } from "react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { cn } from "@/lib/utils";

/**
 * Markdown renderer for chat content (Chat RAG port).
 * Security contract: remark-html v15/16 dropped the `sanitize` option
 * (silently ignored) and passes raw HTML through — backend markdown with an
 * injected `<img onerror>` would execute. This pipeline therefore neutralizes
 * raw HTML and unsafe URLs before serialization (see `neutralizeUnsafe`),
 * matching the mediaPolicy trust model: allowlisted URLs only, no HTML exec.
 * GFM tables never go through this pipeline: classifyBlock /
 * splitTableBoundaries route every table to a dedicated TableBlock.
 */

interface MdNode {
  type: string;
  value?: string;
  url?: string;
  alt?: string;
  children?: MdNode[];
}

/** Allows only http(s), mailto, root-relative and anchor URLs. */
const SAFE_URL_RE = /^(https?:\/\/|mailto:|\/|#)/i;

function sanitizeNode(node: MdNode): void {
  const kids = node.children;
  if (!kids) return;
  for (let i = 0; i < kids.length; i++) {
    const child = kids[i];
    if (child.type === "html") {
      // Raw HTML from markdown renders as escaped text, not markup.
      kids[i] = { type: "text", value: child.value ?? "" };
    } else if (child.type === "link" && typeof child.url === "string" && !SAFE_URL_RE.test(child.url.trim())) {
      // Unsafe link (javascript:, data:…) → unwrap: keep children, drop the
      // link itself. The replacement node at i is not yet sanitized — rewind
      // so the loop re-processes it.
      kids.splice(i, 1, ...(child.children ?? [{ type: "text", value: child.url }]));
      i -= 1;
    } else if (child.type === "image" && typeof child.url === "string" && !SAFE_URL_RE.test(child.url.trim())) {
      // Unsafe image → alt text only (safe images go through mediaPolicy).
      kids[i] = { type: "text", value: child.alt ?? "" };
      continue;
    } else {
      sanitizeNode(child);
    }
  }
}

/** Remark plugin: neutralizes raw HTML and unsafe URLs in the tree. */
function neutralizeUnsafe() {
  return (tree: MdNode) => sanitizeNode(tree);
}

/**
 * Module-level shared processor, built once instead of per render.
 * This is the ONLY render path for chat markdown: AnswerBlocks and every
 * other caller must go through `renderMarkdown()` / `<MarkdownView>`.
 */
const markdownProcessor = remark().use(neutralizeUnsafe).use(remarkHtml);

export function renderMarkdown(content: string): string {
  return markdownProcessor.processSync(content).toString();
}

export function MarkdownView({ content, className }: { content: string; className?: string }) {
  const html = useMemo(() => renderMarkdown(content), [content]);
  return <div className={cn("chat-md", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
