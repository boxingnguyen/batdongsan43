import type {
  Agent,
  Property,
  PropertyFilters,
  StrapiListResponse,
  StrapiResponse,
} from "@/types/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ??
  "http://localhost:1337";

const API_TOKEN = process.env.STRAPI_API_TOKEN;

type FetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

class StrapiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: string
  ) {
    super(message);
    this.name = "StrapiError";
  }
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }
  return headers;
}

/**
 * Core Strapi REST fetch wrapper (server-side).
 * Always uses populate=* unless overridden.
 */
export async function strapiFetch<T>(
  path: string,
  searchParams?: Record<string, string | number | undefined>,
  options: FetchOptions = { revalidate: 60 }
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path.startsWith("/") ? path : `/${path}`}`);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const init: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
    headers: buildHeaders(),
    cache: options.revalidate === false ? "no-store" : undefined,
  };

  if (options.revalidate !== false) {
    init.next = {
      revalidate: options.revalidate ?? 60,
      tags: options.tags,
    };
  }

  const res = await fetch(url.toString(), init);

  if (!res.ok) {
    const body = await res.text();
    throw new StrapiError(
      `Strapi request failed: ${res.status} ${res.statusText}`,
      res.status,
      body
    );
  }

  return res.json() as Promise<T>;
}

function buildPropertyFilters(filters: PropertyFilters): Record<string, string> {
  const params: Record<string, string> = {
    "populate": "*",
    "sort[0]": "createdAt:desc",
  };

  if (filters.search?.trim()) {
    params["filters[$or][0][title][$containsi]"] = filters.search.trim();
    params["filters[$or][1][city][$containsi]"] = filters.search.trim();
    params["filters[$or][2][address][$containsi]"] = filters.search.trim();
  }

  if (filters.property_type) {
    params["filters[property_type][$eq]"] = filters.property_type;
  }

  if (filters.status) {
    params["filters[status][$eq]"] = filters.status;
  }

  if (filters.maxPrice && filters.maxPrice > 0) {
    params["filters[price][$lte]"] = String(filters.maxPrice);
  }

  if (filters.city?.trim()) {
    params["filters[city][$containsi]"] = filters.city.trim();
  }

  return params;
}

export async function getProperties(
  filters: PropertyFilters = {},
  options?: FetchOptions
): Promise<Property[]> {
  const params = buildPropertyFilters(filters);
  const json = await strapiFetch<StrapiListResponse<Property>>(
    "/properties",
    params,
    options
  );
  return json.data ?? [];
}

export async function getFeaturedProperties(
  limit = 6,
  options?: FetchOptions
): Promise<Property[]> {
  const json = await strapiFetch<StrapiListResponse<Property>>(
    "/properties",
    {
      populate: "*",
      "filters[status][$ne]": "sold",
      "pagination[pageSize]": String(limit),
      "sort[0]": "createdAt:desc",
    },
    options
  );
  return json.data ?? [];
}

export async function getPropertyBySlug(
  slug: string,
  options?: FetchOptions
): Promise<Property | null> {
  const json = await strapiFetch<StrapiListResponse<Property>>(
    "/properties",
    {
      populate: "*",
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": "1",
    },
    options
  );
  return json.data?.[0] ?? null;
}

export async function getAgents(options?: FetchOptions): Promise<Agent[]> {
  const json = await strapiFetch<StrapiListResponse<Agent>>(
    "/agents",
    { populate: "*" },
    options
  );
  return json.data ?? [];
}

export async function getAgentById(
  id: number,
  options?: FetchOptions
): Promise<Agent | null> {
  try {
    const json = await strapiFetch<StrapiResponse<Agent>>(
      `/agents/${id}`,
      { populate: "*" },
      options
    );
    return json.data ?? null;
  } catch {
    return null;
  }
}

export { STRAPI_URL, StrapiError };
