import type { ReactNode } from "react";
import { formatVND, type FactEvidence } from "@/lib/chat/contracts";

/** policy_key -> Vietnamese display label (ground truth: payment_methods.json / business_rules.json). */
const POLICY_LABELS: Record<string, string> = {
  htls: "Hỗ trợ lãi suất (HTLS)",
  chuan: "Thanh toán chuẩn",
  som95: "Thanh toán sớm 95%",
  // Canonical repo spelling is "thanhthoi"; the underscored legacy variant
  // is mapped too because old ingested facts still carry it.
  thanhthoi: "Thanh toán thảnh thơi",
  thanh_thoi: "Thanh toán thảnh thơi",
  giong_nhau: "Áp dụng chung",
};

/** field key -> Vietnamese display label. */
const FIELD_LABELS: Record<string, string> = {
  interest_rate_pct: "Lãi suất ưu đãi",
  term_months: "Thời hạn (tháng)",
  deposit_pct: "Vốn tự túc (%)",
  price_vnd: "Giá",
  loan_amount_vnd: "Số tiền vay",
  required_down_payment_vnd: "Thanh toán ban đầu",
  monthly_principal_vnd: "Trả gốc/tháng",
  monthly_interest_estimate_vnd: "Lãi dự kiến/tháng",
};

/** Unit token map for `unit:<project>/<tokens>` subject keys. Slugs are
 * ASCII-folded by the ingest pipeline; map folded forms to display text. */
const SUBJECT_TOKENS: Record<string, string> = {
  "1p1": "1PN+1",
  "2pn": "2PN",
  "3pn": "3PN",
  studio: "Studio",
  "mat-duong": "mặt đường",
  "noi-khu": "nội khu",
  goc: "góc",
  duplex: "Duplex",
  penthouse: "Penthouse",
};

type FieldUnit = "pct" | "months" | "vnd" | "plain";

function fieldUnit(key: string): FieldUnit {
  if (key.endsWith("_pct") || key.endsWith("_percent")) return "pct";
  if (key.endsWith("_months")) return "months";
  if (key.endsWith("_vnd")) return "vnd";
  return "plain";
}

const viNumberFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 2,
});

/** "interest_rate_pct" -> "Interest Rate Pct"; snake_case title-case fallback. */
function humanizeFieldKey(key: string): string {
  return key
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** "htls" -> "Htls"; arbitrary policy keys title-case as fallback. */
function humanizePolicyKey(key: string): string {
  return key
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function policyLabel(key: string): string {
  return POLICY_LABELS[key.toLowerCase()] ?? humanizePolicyKey(key);
}

function fieldLabel(key: string): string {
  return FIELD_LABELS[key.toLowerCase()] ?? humanizeFieldKey(key);
}

/**
 * Maps "unit:<project>/<slug>" subjects to their display label, e.g.
 * "unit:camellia/2pn-mat-duong" to the road-facing 2PN unit name.
 * Non-"unit:" subjects pass through unchanged.
 */
function humanizeSubject(subject: string): string {
  if (!subject.startsWith("unit:")) return subject;
  const tokens = subject.slice("unit:".length).split("/");
  const unitPart = tokens[tokens.length - 1] ?? "";
  // Greedy longest-match tokenization: multi-word slugs ("mat-duong",
  // "noi-khu") must match as a whole, so at every position try the longest
  // hyphen-joined run first and fall back to the single token. Per-token
  // splitting alone would defeat the map ("mat" / "duong" match nothing).
  const parts = unitPart.split("-").filter(Boolean);
  const mapped: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    let matched: string | undefined;
    let span = 0;
    for (let len = parts.length - i; len >= 1; len--) {
      const joined = parts.slice(i, i + len).join("-").toLowerCase();
      if (SUBJECT_TOKENS[joined]) {
        matched = SUBJECT_TOKENS[joined];
        span = len;
        break;
      }
    }
    if (matched) {
      mapped.push(matched);
      i += span - 1;
    } else {
      mapped.push(parts[i]);
    }
  }
  return `Căn ${mapped.join(" ")}`;
}

/**
 * Unit-aware value formatting. Percent fields must never receive a currency
 * suffix — an OCR'd customer screenshot once showed the interest rate
 * rendered with the dong sign, the headline defect. Only *_vnd keys route
 * through formatVND.
 */
function formatFactFieldValue(key: string, value: string): string {
  const unit = fieldUnit(key);
  switch (unit) {
    case "pct": {
      const num = Number(value);
      return `${viNumberFormatter.format(num)}%`;
    }
    case "months":
      return `${value} tháng`;
    case "vnd":
      return value;
    default:
      return value;
  }
}

/**
 * Collapse duplicate fact rows: backend evidence repeats the same
 * (subject, policy_key, field) across answer legs. Keeps the FIRST fe_id per
 * merged row (stable for React keys) and merges field maps (later values win
 * only when the earlier value was null).
 */
function dedupeFacts<T extends { fe_id: string; subject: string; policy_key?: string; fields: Record<string, unknown> }>(
  facts: T[],
): T[] {
  const seen = new Map<string, T>();
  const order: string[] = [];
  for (const fact of facts) {
    const key = `${fact.subject}::${fact.policy_key ?? ""}`;
    const existing = seen.get(key);
    if (!existing) {
      seen.set(key, { ...fact, fields: { ...fact.fields } });
      order.push(key);
      continue;
    }
    const merged: Record<string, unknown> = { ...existing.fields };
    for (const [field, value] of Object.entries(fact.fields ?? {})) {
      if (merged[field] === null || merged[field] === undefined) merged[field] = value;
    }
    seen.set(key, { ...existing, fields: merged });
  }
  return order.map((key) => seen.get(key)!);
}

export interface FactsTableProps {
  facts: FactEvidence[];
  /** When true, VND-money-shaped values are formatted via formatVND. */
  formatMoney?: boolean;
  /**
   * "table" (default): 3-column table — used in the assistant bubble.
   * "cards": compact stacked cards — used in the narrow evidence rail.
   */
  variant?: "table" | "cards";
}

/** Legal facts with citations, tabular-nums aligned. */
export function FactsTable({ facts, formatMoney = true, variant = "table" }: FactsTableProps) {
  // The evidence backend repeats the same (subject, policy) row across
  // answer legs; customers must see one merged row, not duplicates.
  const visibleFacts = dedupeFacts(facts);
  if (!visibleFacts.length) return null;

  if (variant === "cards") {
    return (
      <div className="flex flex-col gap-2">
        {visibleFacts.map((fact) => (
          <div
            key={fact.fe_id}
            className="rounded-lg border border-[#E8E5DF] bg-[#F8F7F3] p-2.5"
          >
            <div className="block text-[12.5px] font-semibold text-[#16384C]">
              {humanizeSubject(fact.subject)}
            </div>
            {fact.policy_key && (
              <code className="rounded bg-[#F0EADF] px-[5px] text-[11.5px] text-[#16384C]">
                {policyLabel(fact.policy_key)}
              </code>
            )}
            <div className="mt-1">
              {Object.entries(fact.fields ?? {}).map(([key, value]) => (
                <div key={key} className="flex flex-wrap gap-1.5 text-[12px] leading-[18px]">
                  <span className="flex-shrink-0 text-[#16384C]/60">{fieldLabel(key)}:</span>
                  <span className="break-words tabular-nums text-[#16384C]">
                    {formatField(key, value, formatMoney)}
                  </span>
                </div>
              ))}
            </div>
            {fact.note && (
              <div className="mt-0.5 block text-[11.5px] text-[#16384C]/60">
                {normalizeFactValue(fact.note)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <th className="border-b-2 border-[#E8E5DF] px-3 py-2 text-left font-semibold text-[#16384C]">
              Sự kiện / tình huống
            </th>
            <th className="border-b-2 border-[#E8E5DF] px-3 py-2 text-left font-semibold text-[#16384C]">
              Điều khoản liên quan
            </th>
            <th className="border-b-2 border-[#E8E5DF] px-3 py-2 text-left font-semibold text-[#16384C]">
              Chi tiết
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleFacts.map((fact) => {
            const entries = Object.entries(fact.fields ?? {});
            const note = normalizeFactValue(fact.note);
            return (
              <tr key={fact.fe_id}>
                <td className="border-b border-[#E8E5DF] px-3 py-2 align-top font-semibold text-[#16384C]">
                  {humanizeSubject(fact.subject)}
                </td>
                <td className="border-b border-[#E8E5DF] px-3 py-2 align-top text-[#16384C]">
                  {fact.policy_key ? policyLabel(fact.policy_key) : <span className="text-[#16384C]/40">—</span>}
                </td>
                <td className="border-b border-[#E8E5DF] px-3 py-2 align-top">
                  {!entries.length && !note ? (
                    <span className="text-[#16384C]/40">—</span>
                  ) : (
                    <div>
                      {entries.map(([key, value]) => (
                        <div key={key} className="flex flex-wrap gap-2 text-[13px] leading-[20px]">
                          <span className="flex-shrink-0 text-[#16384C]/60">{fieldLabel(key)}:</span>
                          <span
                            className={`break-words tabular-nums text-[#16384C] ${value !== null ? "font-medium" : ""}`}
                          >
                            {formatField(key, value, formatMoney)}
                          </span>
                        </div>
                      ))}
                      {note && (
                        <div className="mt-0.5 block text-xs text-[#16384C]/60">{note}</div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Format field value with unit awareness: *_pct / *_months keys never route
 * through formatVND — a percent once rendered with a bare dong figure
 * appended, the headline customer-visible garbage. Only money-shaped numeric
 * values on non-unit keys use formatVND.
 */
function formatField(key: string, value: unknown, formatMoney: boolean): string | ReactNode {
  const normalized = normalizeFactValue(value);
  if (normalized === null) return <span className="text-[#16384C]/40">—</span>;
  // Unit-suffixed keys own their formatting regardless of payload type.
  if (typeof value === "number" || /^\d+(\.\d+)?$/.test(normalized)) {
    const unitAware = formatFactFieldValue(key, normalized);
    if (unitAware !== normalized) return unitAware;
  }
  if (typeof value === "number") {
    return formatMoney ? formatVND(value) : normalized;
  }
  // Numeric-looking string (from backend JSON) -> treat as price when key hints money.
  if (formatMoney && /(giá|tiền|phí|thuế|giá_trị)/i.test(key) && /^\d+(\.\d+)?$/.test(normalized)) {
    return formatVND(Number(normalized));
  }
  return normalized;
}

/**
 * Max characters for a normalized fact cell — guards the evidence rail and
 * table cells from pathological payloads (deep objects, huge arrays).
 */
export const FACT_VALUE_MAX_LENGTH = 200;

/**
 * Normalize any fact payload into a display scalar before it reaches React;
 * raw JSON.stringify blobs must not hit the evidence table.
 */
export function normalizeFactValue(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  let text: string;
  if (typeof value === "string") {
    text = value;
  } else if (typeof value === "number") {
    text = String(value);
  } else {
    try {
      text = JSON.stringify(value);
    } catch {
      // Cyclic or otherwise unserializable payload — degrade to String().
      text = String(value);
    }
  }
  return truncateFactValue(text);
}

/** Pure length cap shared by normalizeFactValue. */
export function truncateFactValue(text: string): string {
  const trimmed = text.trim();
  return trimmed.length <= FACT_VALUE_MAX_LENGTH
    ? trimmed
    : `${trimmed.slice(0, FACT_VALUE_MAX_LENGTH)}…`;
}
