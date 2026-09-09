import { FileText } from "lucide-react";
import type { Source } from "@/lib/chat/contracts";

export interface SourcesListProps {
  sources: Source[];
  /** Cap the number of sources shown (default: all). */
  max?: number;
}

/**
 * Lists the cited source documents of the answer: document title, clause,
 * effective date and kind per entry.
 */
export function SourcesList({ sources, max }: SourcesListProps) {
  if (!sources.length) return null;
  const visible = max ? sources.slice(0, max) : sources;
  const hiddenCount = max ? Math.max(0, sources.length - max) : 0;

  return (
    <div>
      <ul className="space-y-2">
        {visible.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <FileText className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-[#16384C]" />
            <div className="min-w-0">
              <span
                className="block truncate text-[13px] font-semibold text-[#16384C]"
                title={source.title}
              >
                {source.title}
              </span>
              {(source.section || source.kind) && (
                <div className="text-xs text-[#16384C]/60">
                  {source.section ? `${source.section} · ` : ""}
                  {source.kind}
                </div>
              )}
              {source.effective_from && (
                <div className="mt-0.5">
                  <span className="inline-block rounded-md border border-[#E8E5DF] bg-[#F8F7F3] px-1.5 text-[11px] leading-[18px] text-[#16384C]/70">
                    Hiệu lực: {source.effective_from}
                  </span>
                </div>
              )}
            </div>
          </li>
          ))}
      </ul>
      {hiddenCount > 0 && (
        <div className="mt-1 text-xs text-[#16384C]/60">+ {hiddenCount} nguồn khác</div>
      )}
    </div>
  );
}
