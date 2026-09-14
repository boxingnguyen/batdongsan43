import { describe, it, expect } from "vitest";
import {
  websiteProjectRoutes,
  lookupWebsiteProjectRoute,
  websiteHrefForProjectKey,
} from "../registry";

describe("websiteProjectRoutes", () => {
  it("maps_camellia_backend_key_to_internal_route", () => {
    const route = lookupWebsiteProjectRoute("camellia");
    expect(route).not.toBeNull();
    expect(route!.href).toBe("/projects/camellia");
    expect(route!.external).toBe(false);
    expect(route!.chatbotProjectKey).toBe("camellia");
  });

  it("maps_soleil_backend_key_to_external_route", () => {
    const route = lookupWebsiteProjectRoute("soleil");
    expect(route).not.toBeNull();
    expect(route!.href).toBe("https://thesoleil.vn");
    expect(route!.external).toBe(true);
    expect(route!.chatbotProjectKey).toBe("soleil");
  });

  it("does_not_assume_slug_equals_project_key", () => {
    // The Soleil project has backend key "soleil" but a legacy slug
    // "wyndham-soleil-danang" — they must NOT be equal.
    const soleilRoute = lookupWebsiteProjectRoute("soleil");
    expect(soleilRoute).not.toBeNull();
    expect(soleilRoute!.chatbotProjectKey).toBe("soleil");
    expect(soleilRoute!.slug).toBe("wyndham-soleil-danang");
    expect(soleilRoute!.chatbotProjectKey).not.toBe(soleilRoute!.slug);
  });

  it("unknown_backend_key_has_no_invented_href", () => {
    // An unknown key must return null — never an invented slug-based URL.
    expect(lookupWebsiteProjectRoute("nonexistent-key")).toBeNull();
    expect(websiteHrefForProjectKey("nonexistent-key")).toBeNull();
    expect(websiteHrefForProjectKey("camellia")).toBe("/projects/camellia");
    expect(websiteHrefForProjectKey("soleil")).toBe("https://thesoleil.vn");
  });

  it("every_route_has_required_fields", () => {
    // Sanity: no route entry is missing its core fields.
    for (const route of websiteProjectRoutes) {
      expect(route.chatbotProjectKey).toBeTruthy();
      expect(route.href).toBeTruthy();
      expect(typeof route.external).toBe("boolean");
    }
  });
});
