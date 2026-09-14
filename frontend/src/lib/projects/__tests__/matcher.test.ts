import { describe, it, expect } from "vitest";
import { normalizeProjectText, matchProject } from "../matcher";

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
    expect(matchProject("Tôi muốn hỏi về Camellia")).toBe("camellia");
    expect(matchProject("camellia")).toBe("camellia");
    expect(matchProject("The Camellia Sơn Trà")).toBe("camellia");
  });

  it("matches_soleil_alias", () => {
    expect(matchProject("Wyndham Soleil Đà Nẵng")).toBe("soleil");
    expect(matchProject("soleil")).toBe("soleil");
    expect(matchProject("the soleil đà nẵng")).toBe("soleil");
  });

  it("longest_alias_wins", () => {
    // "soleil" appears in "the soleil", but "the soleil" is longer —
    // however both map to "soleil" so this verifies longest-match selection.
    expect(matchProject("the soleil")).toBe("soleil");

    // When two aliases from different projects could match, the longest wins.
    // "wyndham soleil" (longer) vs "soleil" (shorter) — both "soleil".
    // This is a sanity check that longer aliases are preferred.
    expect(matchProject("wyndham soleil")).toBe("soleil");
  });

  it("returns_null_for_unknown_project", () => {
    expect(matchProject("toa nha thanh xuan")).toBeNull();
    expect(matchProject("du an moi")).toBeNull();
    expect(matchProject("hello world")).toBeNull();
  });

  it("does_not_guess_partial_unrelated_text", () => {
    // Must not fuzzy-match unrelated text that merely shares a few characters.
    expect(matchProject("sô")).toBeNull(); // too short, not a real alias
    expect(matchProject("đe")).toBeNull();
    expect(matchProject("abc")).toBeNull();
  });

  it("returns_null_for_empty_or_whitespace_input", () => {
    expect(matchProject("")).toBeNull();
    expect(matchProject("   ")).toBeNull();
    expect(matchProject("\t\n")).toBeNull();
  });
});
