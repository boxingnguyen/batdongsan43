# The Legend Da Nang Content Integration

**Date:** 2026-06-16  
**Status:** Design  
**Approach:** Adapt thelegendcity.com content into existing Ethereal Estate design system

---

## Overview

Integrate comprehensive content from https://thelegendcity.com/ into the The Legend Da Nang property detail page using the existing `EtherealPropertyDetail` component and static data structure.

---

## Content Extraction & Mapping

Extract the following sections from thelegendcity.com and map them to the existing property detail rendering:

| Section              | Source                             | Target                                                 | Format                           |
| -------------------- | ---------------------------------- | ------------------------------------------------------ | -------------------------------- |
| Hero/Title           | thelegendcity.com                  | projects.ts title field                                | String                           |
| Description          | thelegendcity.com overview         | projects.ts description field                          | String (full text)               |
| Hero Image           | thelegendcity.com hero             | projects.ts image field                                | URL string                       |
| Gallery Images       | thelegendcity.com gallery          | Extend projects.ts or EtherealPropertyDetail component | Array of URLs                    |
| Features & Amenities | thelegendcity.com features section | Extend data structure or component sections            | Structured data (features array) |
| Location Details     | thelegendcity.com location info    | projects.ts location field                             | String                           |

---

## Data Structure

Update The Legend Da Nang entry in `/frontend/src/data/projects.ts`:

```typescript
{
  id: "the-legend-danang",
  slug: "the-legend-danang",
  title: "The Legend Da Nang",
  location: "Location from thelegendcity.com",
  description: "Full detailed description extracted from thelegendcity.com",
  image: "Hero image URL from thelegendcity.com",
  imageAlt: "Descriptive alt text",
  status: "Coming Soon",
  // New optional fields (if EtherealPropertyDetail supports):
  gallery?: string[],        // Additional property images
  details?: string[],        // Features/amenities as bullet points
}
```

---

## Component Usage

- **Existing Component:** `EtherealPropertyDetail` (from `/frontend/src/components/property/ethereal-property-detail.tsx`)
  -- **Route:** `/projects/the-legend-danang` (rendered via `/frontend/src/app/properties/[slug]/page.tsx`)
- **Component Behavior:** Renders property data with the Ethereal Estate design system aesthetic

If the component doesn't support additional fields (gallery, details), we'll either:

1. Extend the component minimally to support these fields
2. Render them within the existing description field

---

## Implementation Steps

1. **Extract Content:** Fetch and parse thelegendcity.com content manually
2. **Update Data:** Add extracted content to Azure Bay entry in projects.ts
3. **Verify Component:** Check if EtherealPropertyDetail needs updates to render new fields
4. **Test:** Navigate to `/projects/the-legend-danang` and verify layout/content renders correctly
5. **Commit:** Save changes with clear messaging

---

## Success Criteria

- [ ] The Legend Da Nang page displays extracted content from thelegendcity.com
- [ ] Content is adapted to Ethereal Estate design system (not a direct copy of thelegendcity.com style)
- [ ] All key sections visible: title, description, location, images, features
- [ ] Static content (no external dependencies on thelegendcity.com)
- [ ] Page renders correctly at `/projects/the-legend-danang`

---

## Scope

- **In scope:** Extracting and integrating content from thelegendcity.com into The Legend Da Nang detail page
- **Out of scope:** Redesigning the Ethereal Estate component system, creating new property pages, refactoring the projects.ts structure for other properties
