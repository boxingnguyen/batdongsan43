import { blocksToPlainText } from "@/lib/utils";
import type { StrapiBlock } from "@/types/strapi";

interface PropertyDescriptionProps {
  blocks?: StrapiBlock[] | null;
}

export function PropertyDescription({ blocks }: PropertyDescriptionProps) {
  const text = blocksToPlainText(blocks);

  if (!text) {
    return (
      <p className="text-slate-500 italic">No description provided.</p>
    );
  }

  return (
    <div className="prose prose-slate max-w-none">
      {text.split("\n").map((paragraph, i) =>
        paragraph.trim() ? (
          <p key={i} className="mb-4 leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ) : null
      )}
    </div>
  );
}
