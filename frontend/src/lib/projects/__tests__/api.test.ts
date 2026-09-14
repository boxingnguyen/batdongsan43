import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchActiveProjects,
  isProjectLike,
  clearProjectsCache,
  PROJECTS_FETCH_TIMEOUT_MS,
  PROJECTS_CACHE_TTL_MS,
} from "../api";
import type { ActiveProject } from "../contracts";

/**
 * 6 test cases covering: envelope parsing, isProjectLike validation,
 * caching behavior, graceful degradation, optional field validation.
 */

// Named type for the mocked fetch function — avoids ReturnType<typeof vi.fn>.
type MockFetch = ReturnType<typeof vi.fn>;

// Helper to build a valid ActiveProject.
function makeProject(override: Partial<ActiveProject> = {}): ActiveProject {
  return {
    project_key: "camellia",
    display_name: "The Camellia Sơn Trà",
    ...override,
  };
}

// Helper to mock fetch.
function mockFetchResponse(body: unknown, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

// Mock fetch that hangs until the abort signal fires, simulating a timeout.
function mockHangingFetch() {
  return (url: unknown, options?: RequestInit) => {
    const { promise, reject } = Promise.withResolvers<Response>();
    const signal = options?.signal;
    if (signal?.aborted) {
      reject(new DOMException("aborted", "AbortError"));
      return promise;
    }
    signal?.addEventListener(
      "abort",
      () => {
        reject(new DOMException("aborted", "AbortError"));
      },
      { once: true },
    );
    return promise;
  };
}

describe("isProjectLike", () => {
  it("isProjectLike_accepts_valid_project_with_required_fields_only", () => {
    expect(isProjectLike({ project_key: "camellia", display_name: "Camellia" })).toBe(true);
    expect(
      isProjectLike({ project_key: "soleil", display_name: "Soleil", is_hot: true }),
    ).toBe(true);
  });

  it("isProjectLike_rejects_invalid_project_missing_required_fields", () => {
    expect(isProjectLike({})).toBe(false);
    expect(isProjectLike({ project_key: "camellia" })).toBe(false);
    expect(isProjectLike({ display_name: "Camellia" })).toBe(false);
    expect(isProjectLike(null)).toBe(false);
    expect(isProjectLike(undefined)).toBe(false);
    expect(isProjectLike("string")).toBe(false);
  });

  it("isProjectLike_validates_optional_fields_with_wrong_types", () => {
    // name as number — invalid
    expect(isProjectLike({ project_key: "c", display_name: "C", name: 42 })).toBe(false);
    // short_name as boolean — invalid
    expect(isProjectLike({ project_key: "c", display_name: "C", short_name: true })).toBe(false);
    // location as number — invalid
    expect(isProjectLike({ project_key: "c", display_name: "C", location: 123 })).toBe(false);
    // lat as string — invalid
    expect(isProjectLike({ project_key: "c", display_name: "C", lat: "1.0" })).toBe(false);
    // lng as string — invalid
    expect(isProjectLike({ project_key: "c", display_name: "C", lng: "2.0" })).toBe(false);
    // is_hot as string — invalid
    expect(isProjectLike({ project_key: "c", display_name: "C", is_hot: "yes" })).toBe(false);
  });

  it("isProjectLike_accepts_optional_fields_as_null", () => {
    expect(
      isProjectLike({
        project_key: "c",
        display_name: "C",
        name: null,
        short_name: null,
        location: null,
        lat: null,
        lng: null,
        is_hot: null,
      }),
    ).toBe(true);
  });

  it("isProjectLike_tolerates_optional_fields_as_correct_types", () => {
    expect(
      isProjectLike({
        project_key: "c",
        display_name: "C",
        name: "Name",
        short_name: "SN",
        location: "Đà Nẵng",
        lat: 16.26,
        lng: 108.25,
        is_hot: true,
      }),
    ).toBe(true);
  });

  it("isProjectLike_accepts_unknown_extra_fields", () => {
    expect(
      isProjectLike({
        project_key: "c",
        display_name: "C",
        extra_field: "ignored",
        another: 42,
      }),
    ).toBe(true);
  });
});

describe("fetchActiveProjects", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    clearProjectsCache();
    global.fetch = vi.fn() as unknown as typeof global.fetch;
    vi.useFakeTimers();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.useRealTimers();
  });

  it("parses_projects_envelope_and_returns_valid_projects", async () => {
    const mockProjects = [
      makeProject({ project_key: "camellia", display_name: "Camellia" }),
      makeProject({ project_key: "soleil", display_name: "Soleil" }),
    ];

    (global.fetch as MockFetch).mockReturnValue(
      mockFetchResponse({ projects: mockProjects }),
    );

    const result = await fetchActiveProjects();
    expect(result).toHaveLength(2);
    expect(result[0]!.project_key).toBe("camellia");
    expect(result[1]!.project_key).toBe("soleil");
  });

  it("returns_empty_on_envelope_without_projects_field", async () => {
    (global.fetch as MockFetch).mockReturnValue(
      mockFetchResponse({ something: "else" }),
    );

    const result = await fetchActiveProjects();
    expect(result).toEqual([]);
  });

  it("filters_out_invalid_project_entries", async () => {
    const response = {
      projects: [
        makeProject({ project_key: "camellia", display_name: "Camellia" }),
        { invalid: true }, // no project_key/display_name
        { project_key: "bad", display_name: 42 }, // wrong type
      ],
    };

    (global.fetch as MockFetch).mockReturnValue(
      mockFetchResponse(response),
    );

    const result = await fetchActiveProjects();
    expect(result).toHaveLength(1);
    expect(result[0]!.project_key).toBe("camellia");
  });

  it("returns_empty_on_non_2xx_response", async () => {
    (global.fetch as MockFetch).mockReturnValue(
      mockFetchResponse({ projects: [] }, 500),
    );

    const result = await fetchActiveProjects();
    expect(result).toEqual([]);
  });

  it("returns_cached_results_within_ttl", async () => {
    const mockProjects = [makeProject({ project_key: "camellia", display_name: "Camellia" })];

    (global.fetch as MockFetch).mockReturnValue(
      mockFetchResponse({ projects: mockProjects }),
    );

    // First call — fetches from network.
    const first = await fetchActiveProjects();
    expect(first).toHaveLength(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Second call within TTL — should use cache, no new fetch.
    const second = await fetchActiveProjects();
    expect(second).toHaveLength(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("re_fetches_after_cache_expires", async () => {
    const mockProjects = [makeProject({ project_key: "camellia", display_name: "Camellia" })];

    (global.fetch as MockFetch).mockReturnValue(
      mockFetchResponse({ projects: mockProjects }),
    );

    // First call — fetches from network.
    await fetchActiveProjects();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Advance past cache TTL.
    vi.advanceTimersByTime(PROJECTS_CACHE_TTL_MS + 1);

    // Second call after expiry — should re-fetch.
    await fetchActiveProjects();
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("returns_empty_on_timeout_without_inventing_projects", async () => {
    // Mock fetch that hangs until abort fires.
    (global.fetch as MockFetch).mockImplementation(mockHangingFetch());

    const resultPromise = fetchActiveProjects();

    // Advance past the fetch timeout to trigger the abort.
    vi.advanceTimersByTime(PROJECTS_FETCH_TIMEOUT_MS + 1);

    const result = await resultPromise;
    expect(result).toEqual([]);
  });

  it("returns_empty_on_non_json_response", async () => {
    (global.fetch as MockFetch).mockReturnValue(
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.reject(new SyntaxError("Unexpected token")),
      }),
    );

    const result = await fetchActiveProjects();
    expect(result).toEqual([]);
  });

  it("respects_caller_abort_signal", async () => {
    const abortController = new AbortController();

    (global.fetch as MockFetch).mockReturnValue(
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ projects: [] }),
      }),
    );

    // Abort before calling.
    abortController.abort();

    const result = await fetchActiveProjects(abortController.signal);
    expect(result).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns_cache_without_refetch_within_ttl", async () => {
    // Fresh cache is served at entry (top-level guard), so the network is never
    // contacted again while the TTL window holds. Distinct from stale-while-error
    // (unreachable while fresh): this is cache-hit behavior.
    const mockProjects = [makeProject({ project_key: "camellia", display_name: "Camellia" })];
    (global.fetch as MockFetch).mockReturnValue(mockFetchResponse({ projects: mockProjects }));
    await fetchActiveProjects();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const result = await fetchActiveProjects();
    expect(result).toHaveLength(1);
    expect(result[0]!.project_key).toBe("camellia");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("returns_empty_after_expiry_when_fetch_non_2xx", async () => {
    const cached = [makeProject({ project_key: "camellia", display_name: "Camellia" })];
    (global.fetch as MockFetch).mockReturnValue(mockFetchResponse({ projects: cached }));
    await fetchActiveProjects();
    vi.advanceTimersByTime(PROJECTS_CACHE_TTL_MS + 1);
    (global.fetch as MockFetch).mockReturnValue(mockFetchResponse({ projects: [] }, 500));
    const result = await fetchActiveProjects();
    expect(result).toEqual([]);
  });

  it("returns_empty_after_expiry_when_network_error", async () => {
    const cached = [makeProject({ project_key: "soleil", display_name: "Soleil" })];
    (global.fetch as MockFetch).mockReturnValue(mockFetchResponse({ projects: cached }));
    await fetchActiveProjects();
    vi.advanceTimersByTime(PROJECTS_CACHE_TTL_MS + 1);
    const failing = Promise.reject(new Error("ECONNREFUSED"));
    (global.fetch as MockFetch).mockReturnValue(failing);
    const result = await fetchActiveProjects();
    expect(result).toEqual([]);
    void failing.catch(() => {});
  });

  it("returns_empty_after_expiry_when_invalid_json", async () => {
    const cached = [makeProject({ project_key: "soleil", display_name: "Soleil" })];
    (global.fetch as MockFetch).mockReturnValue(mockFetchResponse({ projects: cached }));
    await fetchActiveProjects();
    vi.advanceTimersByTime(PROJECTS_CACHE_TTL_MS + 1);
    (global.fetch as MockFetch).mockReturnValue(
      Promise.resolve({ ok: true, status: 200, json: () => Promise.reject(new SyntaxError("Unexpected token")) }),
    );
    const result = await fetchActiveProjects();
    expect(result).toEqual([]);
  });

  it("returns_empty_when_no_cache_and_fetch_fails", async () => {
    // Mock fetch that hangs until abort fires.
    (global.fetch as MockFetch).mockImplementation(mockHangingFetch());

    // Advance past the fetch timeout to trigger the abort.
    const resultPromise = fetchActiveProjects();
    vi.advanceTimersByTime(PROJECTS_FETCH_TIMEOUT_MS + 1);
    const result = await resultPromise;
    expect(result).toEqual([]);
  });
});
