/**
 * Assistant-side project matcher.
 *
 * Maps free-text user input (e.g. a chat message) to a known project key.
 * Rules (see GA-02 ticket):
 *   - exact/explicit alias match only;
 *   - if aliases overlap, longest meaningful alias wins;
 *   - no fuzzy Levenshtein guessing;
 *   - no LLM;
 *   - unknown input returns null;
 *   - result is only a UX hint.
 */

/** Vietnamese diacritic + casing normalization for project matching. */
export function normalizeProjectText(input: string): string {
  if (input === null || input === undefined) {
    return "";
  }
  // 1. trim; 2. lowercase; 3. map Vietnamese đ/Đ to d;
  let s = input.trim().toLowerCase().replace(/[đ]/g, "d");

  // 4. Unicode-normalize and remove combining marks (strip all Vietnamese
  //    diacritics so "sơn trà" -> "son tra").
  s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 5. collapse repeated whitespace; collapse to single spaces.
  s = s.replace(/\s+/g, " ").trim();

  // 6. leave punctuation handling deterministic — strip non-word/non-space
  //    chars except hyphens (so "camellia" stays intact, "sơn-trà" -> "son-tra").
  s = s.replace(/[^\p{L}\p{N} \-]/gu, "");

  return s;
}

/**
 * A single alias entry for a project.
 * @property normalized - pre-normalized alias text
 * @property key - the backend project_key this alias resolves to
 * @property weight - used to break ties; longest-meaningful-alias wins.
 *                    In practice the sort in `matchProject` already ensures
 *                    longest match wins, but weight lets explicit aliases
 *                    take priority over short generic terms.
 */
interface ProjectAlias {
  normalized: string;
  key: string;
  weight: number;
}

/**
 * All known project aliases, pre-normalized. Each alias maps to a backend
 * `project_key`. To resolve conflicts where one input could match multiple
 * projects, `matchProject` sorts by normalized length descending (longest
 * alias wins) and by weight as a tiebreaker.
 */
const PROJECT_ALIASES: ProjectAlias[] = [
  // Camellia — "The Camellia Sơn Trà"
  { normalized: normalizeProjectText("camellia"), key: "camellia", weight: 100 },
  { normalized: normalizeProjectText("the camellia"), key: "camellia", weight: 90 },
  { normalized: normalizeProjectText("camellia sơn trà"), key: "camellia", weight: 80 },
  { normalized: normalizeProjectText("the camellia sơn trà"), key: "camellia", weight: 70 },
  { normalized: normalizeProjectText("the camellia son tra"), key: "camellia", weight: 70 },

  // Soleil / Wyndham Soleil — "The Soleil Đà Nẵng"
  { normalized: normalizeProjectText("soleil"), key: "soleil", weight: 100 },
  { normalized: normalizeProjectText("the soleil"), key: "soleil", weight: 90 },
  { normalized: normalizeProjectText("wyndham soleil"), key: "soleil", weight: 80 },
  { normalized: normalizeProjectText("wyndham soleil đà nẵng"), key: "soleil", weight: 70 },
  { normalized: normalizeProjectText("the soleil đà nẵng"), key: "soleil", weight: 70 },

  // S-Light Tower
  { normalized: normalizeProjectText("s-light tower"), key: "s-light-tower", weight: 100 },
  { normalized: normalizeProjectText("s light tower"), key: "s-light-tower", weight: 90 },

  // Sun Symphony Residence 5
  { normalized: normalizeProjectText("sun symphony"), key: "symphony5", weight: 100 },
  { normalized: normalizeProjectText("sun symphony 5"), key: "symphony5", weight: 90 },
  { normalized: normalizeProjectText("symphony 5"), key: "symphony5", weight: 90 },

  // The Legend Đà Nẵng
  { normalized: normalizeProjectText("the legend"), key: "the-legend-danang", weight: 100 },
  { normalized: normalizeProjectText("legend"), key: "the-legend-danang", weight: 60 },

  // Sun FourS Tower
  { normalized: normalizeProjectText("sun fours tower"), key: "sun-fours-tower", weight: 100 },
  { normalized: normalizeProjectText("fourss tower"), key: "sun-fours-tower", weight: 90 },
  { normalized: normalizeProjectText("sun fourS"), key: "sun-fours-tower", weight: 90 },
];

/**
 * Match user text to a known project key.
 *
 * Algorithm:
 *  1. Normalize the input text.
 *  2. Find all aliases whose normalized text is a substring of the normalized
 *     input (exact or embedded match — e.g. "tôi muốn hỏi về camellia" matches
 *     because "camellia" is a substring).
 *  3. Among matches, pick the longest alias (by normalized string length).
 *     Ties broken by weight (higher first).
 *  4. Return the project_key, or `null` if no alias matched.
 *
 * No fuzzy Levenshtein distance. No LLM. Result is a UX hint only.
 */
export function matchProject(input: string): string | null {
  const normalizedInput = normalizeProjectText(input);

  if (normalizedInput === "") {
    return null;
  }

  const matches: { alias: ProjectAlias; startIndex: number }[] = [];

  for (const alias of PROJECT_ALIASES) {
    const idx = normalizedInput.indexOf(alias.normalized);
    if (idx !== -1) {
      matches.push({ alias, startIndex: idx });
    }
  }

  if (matches.length === 0) {
    return null;
  }

  // Sort by: longest alias first, then highest weight, then earliest position.
  matches.sort((a, b) => {
    const lenDiff = b.alias.normalized.length - a.alias.normalized.length;
    if (lenDiff !== 0) return lenDiff;
    const weightDiff = b.alias.weight - a.alias.weight;
    if (weightDiff !== 0) return weightDiff;
    return a.startIndex - b.startIndex;
  });

  return matches[0].alias.key;
}
