/**
 * Assistant-side project matcher.
 *
 * Maps free-text user input (e.g. a chat message) to a known project key.
 * Rules (see GA-02 ticket):
 *   - exact/explicit alias match only (token-boundary, not substring);
 *   - if aliases overlap, longest meaningful alias wins;
 *   - no fuzzy Levenshtein guessing;
 *   - no LLM;
 *   - unknown input returns null;
 *   - result is only a UX hint.
 */
import type { ActiveProject } from "./contracts";

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

/** Normalize input into tokens split on whitespace AND punctuation. */
function tokenize(input: string): string[] {
  return normalizeProjectText(input)
    .split(/[\s\-]+/)
    .filter((t) => t.length > 0);
}

/**
 * A single alias entry for a project.
 * @property tokens - pre-normalized alias tokens
 * @property key - the backend project_key this alias resolves to
 * @property weight - used to break ties; longest-meaningful-alias wins.
 *                    In practice the sort in `matchProject` already ensures
 *                    longest match wins, but weight lets explicit aliases
 *                    take priority over short generic terms.
 */
interface ProjectAlias {
  tokens: string[];
  key: string;
  weight: number;
}

/**
 * Build the alias table from the active-project catalogue.
 *
 * Only `camellia` and `soleil` are real backend keys (per GA-02 P2-02/P2-03).
 * The alias vocabulary comes from each project's display_name and short_name,
 * tokenized and normalized.
 */
function buildAliasTable(activeProjects: ActiveProject[]): ProjectAlias[] {
  const table: ProjectAlias[] = [];

  for (const project of activeProjects) {
    const key = project.project_key;
    if (!key) continue;

    const aliases: { text: string; weight: number }[] = [];

    // Primary alias: the project key itself (highest weight).
    aliases.push({ text: key, weight: 100 });

    // display_name provides the full human-readable alias.
    if (typeof project.display_name === "string" && project.display_name.trim()) {
      aliases.push({ text: project.display_name, weight: 90 });
    }

    // short_name is a shorter variant.
    if (typeof project.short_name === "string" && project.short_name.trim()) {
      aliases.push({ text: project.short_name, weight: 85 });
    }

    // name is a fallback alias variant.
    if (typeof project.name === "string" && project.name.trim()) {
      aliases.push({ text: project.name, weight: 80 });
    }

    for (const alias of aliases) {
      const tokens = tokenize(alias.text);
      if (tokens.length > 0) {
        table.push({ tokens, key, weight: alias.weight });
      }
    }
  }

  return table;
}

/**
 * Check if the alias tokens appear as a consecutive subsequence in the input
 * tokens — a token-boundary match, not a substring match.
 *
 * Returns the starting index of the match, or -1 if not found.
 */
function findTokenMatch(
  inputTokens: string[],
  aliasTokens: string[],
): number {
  if (aliasTokens.length === 0) return -1;
  if (inputTokens.length < aliasTokens.length) return -1;

  for (let i = 0; i <= inputTokens.length - aliasTokens.length; i++) {
    let matched = true;
    for (let j = 0; j < aliasTokens.length; j++) {
      if (inputTokens[i + j] !== aliasTokens[j]) {
        matched = false;
        break;
      }
    }
    if (matched) return i;
  }
  return -1;
}

/**
 * Match user text to a known project key.
 *
 * Algorithm:
 *  1. Normalize and tokenize the input.
 *  2. Build alias table from activeProjects (display_name, short_name, name,
 *     project_key).
 *  3. Find all aliases whose tokens match as a consecutive subsequence in the
 *     input tokens (token-boundary, prevents "soleilx" matching "soleil").
 *  4. Among matches, pick the longest alias (by token count).
 *     Ties broken by weight (higher first), then earliest position.
 *  5. Return the project_key, or `null` if no alias matched.
 *
 * No fuzzy Levenshtein distance. No LLM. Result is a UX hint only.
 */
export function matchProject(
  input: string,
  activeProjects: ActiveProject[],
): string | null {
  const inputTokens = tokenize(input);

  if (inputTokens.length === 0) {
    return null;
  }

  const aliases = buildAliasTable(activeProjects);

  const matches: { alias: ProjectAlias; startIndex: number }[] = [];

  for (const alias of aliases) {
    const idx = findTokenMatch(inputTokens, alias.tokens);
    if (idx !== -1) {
      matches.push({ alias, startIndex: idx });
    }
  }

  if (matches.length === 0) {
    return null;
  }

  // Sort by: longest alias first, then highest weight, then earliest position.
  matches.sort((a, b) => {
    const lenDiff = b.alias.tokens.length - a.alias.tokens.length;
    if (lenDiff !== 0) return lenDiff;
    const weightDiff = b.alias.weight - a.alias.weight;
    if (weightDiff !== 0) return weightDiff;
    return a.startIndex - b.startIndex;
  });

  return matches[0].alias.key;
}
