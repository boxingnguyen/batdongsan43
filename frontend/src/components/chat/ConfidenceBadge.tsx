import type { Confidence } from "@/lib/chat/contracts";

export const CONFIDENCE_STYLE: Record<Confidence, { color: string; bg: string; label: string; tone: string }> = {
  HIGH: {
    color: "#16A34A",
    bg: "#EAF7EF",
    label: "Độ tin cậy cao",
    tone: "emerald",
  },
  MEDIUM: {
    color: "#D97706",
    bg: "#FDF3E3",
    label: "Độ tin cậy trung bình",
    tone: "amber",
  },
  LOW: {
    color: "#DC2626",
    bg: "#FDECEC",
    label: "Độ tin cậy thấp",
    tone: "red",
  },
};

export interface ConfidenceBadgeProps {
  confidence: Confidence;
  /** Show a text label instead of just the color. */
  showLabel?: boolean;
}

/** Badge color follows the tier; the label is user-facing Vietnamese copy by design. */
export function ConfidenceBadge({ confidence, showLabel = true }: ConfidenceBadgeProps) {
  const style = CONFIDENCE_STYLE[confidence] ?? CONFIDENCE_STYLE.MEDIUM;
  return (
    <span
      data-testid="confidence-badge"
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-5"
      style={{ color: style.color, backgroundColor: style.bg, borderColor: `${style.color}33` }}
    >
      {showLabel ? style.label : confidence}
    </span>
  );
}
