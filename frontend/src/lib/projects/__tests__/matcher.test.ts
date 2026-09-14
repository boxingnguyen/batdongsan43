import { describe, it, expect } from "vitest";
import { normalizeProjectText, matchProject } from "../matcher";
import type { ActiveProject } from "../contracts";

/**
 * Active project catalogue fixture — only `camellia` and `soleil` are real
 * backend keys (per GA-02 P2-02/P2-03). The matcher is catalogue-driven, so
 * aliases derive from display_name and short_name.
 */
const activeProjects: ActiveProject[] = [
  {
    project_key: "camellia",
    display_name: "The Camellia Sơn Trà",
    short_name: "camellia",
  },
  {
    project_key: "soleil",
    display_name: "The Soleil Đà Nẵng",
    short_name: "soleil",
  },
];

describe("normalizeProjectText", () => {
  it("normalizes_vietnamese_diacritics", () => {
    // All Vietnamese diacritics should be stripped.
    expect(normalizeProjectText("Sơn Trà")).toBe("son tra");
    expect(normalizeProjectText("Đà Nẵng")).toBe("da nang");
    expect(normalizeProjectText("Phú Mỹ Hưng")).toBe("phu my hung");
  });

  it("normalizes_vietnamese_d_character", () => {
    // The standalone đ/Đ (not a combining diacritic) maps to plain d.
    expect(normalizeProjectText("đ")).toBe("d");
    expect(normalizeProjectText("Đ")).toBe("d");
    expect(normalizeProjectText("đèn")).toBe("den");
  });

  it("collapses_case_and_whitespace", () => {
    expect(normalizeProjectText("  CAMELLIA  ")).toBe("camellia");
    expect(normalizeProjectText("Camellia\nSơn\nTrà")).toBe("camellia son tra");
    expect(normalizeProjectText("a   b\tc")).toBe("a b c");
  });

  it("handles_empty_and_whitespace_only_input", () => {
    expect(normalizeProjectText("")).toBe("");
    expect(normalizeProjectText("   ")).toBe("");
  });
});

describe("matchProject", () => {
  it("matches_camellia_alias", () => {
    expect(matchProject("Tôi muốn hỏi về Camellia", activeProjects)).toBe("camellia");
    expect(matchProject("camellia", activeProjects)).toBe("camellia");
    expect(matchProject("The Camellia Sơn Trà", activeProjects)).toBe("camellia");
  });

  it("matches_soleil_alias", () => {
    expect(matchProject("Wyndham Soleil Đà Nẵng", activeProjects)).toBe("soleil");
    expect(matchProject("soleil", activeProjects)).toBe("soleil");
    expect(matchProject("the soleil đà nẵng", activeProjects)).toBe("soleil");
  });

  it("longest_alias_wins", () => {
    // "the camellia" (longer) vs "camellia" (shorter) — both "camellia".
    expect(matchProject("the camellia", activeProjects)).toBe("camellia");
    expect(matchProject("the camellia son tra", activeProjects)).toBe("camellia");
    expect(matchProject("the soleil da nang", activeProjects)).toBe("soleil");
  });

  it("returns_null_for_unknown_project", () => {
    expect(matchProject("toa nha thanh xuan", activeProjects)).toBeNull();
    expect(matchProject("du an moi", activeProjects)).toBeNull();
    expect(matchProject("hello world", activeProjects)).toBeNull();
  });

  it("does_not_guess_partial_unrelated_text", () => {
    // Must not fuzzy-match unrelated text that merely shares a few characters.
    expect(matchProject("sô", activeProjects)).toBeNull(); // too short, not a real alias
    expect(matchProject("đe", activeProjects)).toBeNull();
    expect(matchProject("abc", activeProjects)).toBeNull();
  });

  it("returns_null_for_empty_or_whitespace_input", () => {
    expect(matchProject("", activeProjects)).toBeNull();
    expect(matchProject("   ", activeProjects)).toBeNull();
    expect(matchProject("\t\n", activeProjects)).toBeNull();
  });

  // Token-boundary tests (P1-03): prevent substring-style matching.

  it("does_not_match_soleilx", () => {
    // "soleilx" is a single token — must NOT match "soleil" via substring.
    expect(matchProject("soleilx", activeProjects)).toBeNull();
  });

  it("does_not_match_camellia2", () => {
    // "camellia2" is a single token — must NOT match "camellia" via substring.
    expect(matchProject("camellia2", activeProjects)).toBeNull();
  });

  it("does_not_match_legendary", () => {
    // "legendary" is not in the catalogue — must NOT match the-legend-danang
    // (which is not even a real backend key; only camellia and soleil are).
    expect(matchProject("legendary", activeProjects)).toBeNull();
  });

  it("matches_project_name_inside_normal_sentence", () => {
    // "camellia" embedded in a sentence must still match via token-boundary.
    expect(matchProject("tôi muốn hỏi về dự án camellia", activeProjects)).toBe("camellia");
    expect(matchProject("xin chào về dự án soleil", activeProjects)).toBe("soleil");
  });

  it("matches_across_separate_tokens", () => {
    // Multiple tokens in input — alias tokens must match consecutively.
    expect(matchProject("xin chao camellia", activeProjects)).toBe("camellia");
    expect(matchProject("toi can ve soleil", activeProjects)).toBe("soleil");
  });

  it("does_not_match_when_tokens_are_reordered", () => {
    // "tra son" is not "son tra" — token order matters.
    expect(matchProject("tra son", activeProjects)).toBeNull();
  });
});
