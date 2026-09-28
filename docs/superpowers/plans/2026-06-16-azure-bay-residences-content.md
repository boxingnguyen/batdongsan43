# The Legend Da Nang Content Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract content from thelegendcity.com and integrate it as static property data for The Legend Da Nang, rendering through the existing EtherealPropertyDetail component.

**Architecture:** Create a new data file (`the-legend-danang.ts`) containing structured PropertyDetailContent that matches thelegendcity.com's content and messaging. Register it in `static-properties.ts` to make it available via the property detail page route. The existing EtherealPropertyDetail component will render the content without modifications.

**Tech Stack:** TypeScript, React, Next.js, existing PropertyDetailContent type

---

## File Structure

Files to create/modify:

- **Create:** `frontend/src/data/the-legend-danang.ts` — Static property data for The Legend Da Nang
- **Modify:** `frontend/src/lib/static-properties.ts` — Register The Legend Da Nang in lookup
- **Test:** Navigate to `/projects/the-legend-danang` and verify rendering

---

## Task 1: Extract Content from thelegendcity.com

**Files:**

- Reference: `https://thelegendcity.com/`
- Target data: `frontend/src/data/the-legend-danang.ts` (to be created)

- [ ] **Step 1: Fetch and review thelegendcity.com homepage**

Visit https://thelegendcity.com/ in a browser and inspect the page for:

- Hero section title and subtitle
- Main description/overview paragraphs
- Hero image URL (or similar high-quality image)
- Property features and amenities (at least 6)
- Secondary images (for gallery)
- Location information
- Any pricing or status indicators
- Agent/contact information (use placeholder if not available)

Document findings in a text format (what you find will directly inform the next task).

- [ ] **Step 2: Verify content structure**

Ensure you have captured:

- ✓ Title/property name
- ✓ 2-3 description paragraphs
- ✓ At least 6 amenities with icon names and descriptions
- ✓ 1 main image + 2 secondary gallery images
- ✓ Location
- ✓ Price range (use placeholder like $8,500,000 if not specified)

---

## Task 2: Create The Legend Da Nang Data File

- **Files:**

- Create: `frontend/src/data/the-legend-danang.ts`
- Reference: `frontend/src/data/obsidian-pavilion.ts` (existing example)
- Reference: `frontend/src/types/property-detail.ts` (PropertyDetailContent type)

- [ ] **Step 1: Create the new data file with imports**

Create `/Users/boxing/dxdh/nhadanang/frontend/src/data/the-legend-danang.ts`:

```typescript
import type { PropertyDetailContent } from "@/types/property-detail";

export const AZURE_BAY_RESIDENCES_SLUG = "the-legend-danang";

export const azureBayResidences: PropertyDetailContent = {
  // To be filled with extracted content
};
```

- [ ] **Step 2: Populate property metadata**

Fill in the metadata fields from thelegendcity.com content:

```typescript
export const azureBayResidences: PropertyDetailContent = {
  slug: AZURE_BAY_RESIDENCES_SLUG,
  title: "The Legend Da Nang", // From thelegendcity.com title
  price: 8500000, // Extracted from site or use placeholder
  monthlyEstimate: "$45,000/mo", // Calculate or use placeholder
  beds: "3 Beds", // From thelegendcity.com amenities
  baths: "3 Baths", // From thelegendcity.com amenities
  sqft: "4,500 SQFT", // From thelegendcity.com or estimate
  location: "Amalfi Coast, IT", // From thelegendcity.com location info
  badge: "Luxury Coastal", // Create a relevant badge
  // Rest to be filled in next steps
};
```

- [ ] **Step 3: Add description paragraphs**

Extract 2-3 descriptive paragraphs from thelegendcity.com and add:

```typescript
  description: [
    "First paragraph extracted from thelegendcity.com about The Legend Da Nang...",
    "Second paragraph about location, amenities, or lifestyle...",
    "Third paragraph about investment potential or unique features...",
  ],
```

- [ ] **Step 4: Add amenities array**

Extract 6+ amenities from thelegendcity.com. For each amenity, pick an appropriate Material Design Icon name (pool, spa, garage, wifi, etc.):

```typescript
  amenities: [
    {
      icon: "pool",
      title: "Infinity Pool",
      subtitle: "Oceanview saltwater pool",
    },
    {
      icon: "spa",
      title: "Spa & Wellness",
      subtitle: "Full-service treatment center",
    },
    {
      icon: "restaurant",
      title: "Fine Dining",
      subtitle: "Michelin-starred restaurant",
    },
    {
      icon: "golf_course",
      title: "Golf Course",
      subtitle: "18-hole championship course",
    },
    {
      icon: "security",
      title: "24/7 Security",
      subtitle: "Private gated access",
    },
    {
      icon: "landscape",
      title: "Landscaping",
      subtitle: "Mediterranean gardens",
    },
  ],
```

- [ ] **Step 5: Add images array**

Add 1 main image and 2 secondary images. If thelegendcity.com doesn't provide direct URLs, use high-quality Unsplash/Pexels URLs matching the description:

```typescript
  images: [
    {
      src: "https://images.unsplash.com/photo-XXXXX?w=1200&q=80", // Main hero image
      alt: "The Legend Da Nang overlooking Mediterranean waters",
      layout: "main",
    },
    {
      src: "https://images.unsplash.com/photo-XXXXX?w=600&q=80", // Secondary image 1
      alt: "Luxury villa interior with terrace views",
      layout: "secondary",
    },
    {
      src: "https://images.unsplash.com/photo-XXXXX?w=600&q=80", // Secondary image 2
      alt: "Coastal property amenities and grounds",
      layout: "secondary",
    },
  ],
  galleryCount: 18,
```

- [ ] **Step 6: Add market and agent data**

```typescript
  marketYoY: "+8.2% Year-over-Year", // Use realistic growth rate
  agent: {
    name: "Sofia Rossini", // Create appropriate name for coastal property
    title: "Coastal Property Specialist",
    image: "https://images.unsplash.com/photo-XXXXX?w=200&h=200&fit=crop", // Professional headshot
  },
};
```

- [ ] **Step 7: Verify complete file structure**

Ensure the file exports both `AZURE_BAY_RESIDENCES_SLUG` and `azureBayResidences` constant, following the pattern from obsidian-pavilion.ts.

---

## Task 3: Register Property in Static Properties

**Files:**

- Modify: `frontend/src/lib/static-properties.ts`
- Reference: `frontend/src/data/the-legend-danang.ts` (just created)

- [ ] **Step 1: Add import statement**

Open `/Users/boxing/dxdh/nhadanang/frontend/src/lib/static-properties.ts` and add import at the top:

```typescript
import {
  WYNDHAM_SOLEIL_DANANG_SLUG,
  wyndhamsoleildanang,
} from "@/data/obsidian-pavilion";
import {
  THE_LEGEND_DANANG_SLUG,
  theLegendDanang,
} from "@/data/the-legend-danang";
import type { PropertyDetailContent } from "@/types/property-detail";
```

- [ ] **Step 2: Register in staticProperties object**

Modify the `staticProperties` object to include Azure Bay:

```typescript
const staticProperties: Record<string, PropertyDetailContent> = {
  [WYNDHAM_SOLEIL_DANANG_SLUG]: wyndhamsoleildanang,
  [AZURE_BAY_RESIDENCES_SLUG]: azureBayResidences,
};
```

- [ ] **Step 3: Verify no syntax errors**

Run: `npm run build` in the frontend directory to check for TypeScript errors.

Expected: Build should complete successfully with no errors.

---

## Task 4: Test Property Detail Page Rendering

**Files:**

- Test: Visit `http://localhost:3000/projects/the-legend-danang`
- Reference: `frontend/src/components/property/ethereal-property-detail.tsx` (existing component)

- [ ] **Step 1: Start the development server**

In the frontend directory, run:

```bash
npm run dev
```

Wait for the dev server to start. Expected output includes "Local: http://localhost:3000"

- [ ] **Step 2: Navigate to The Legend Da Nang page**

Open browser to: `http://localhost:3000/projects/the-legend-danang`

Verify the page loads without errors.

- [ ] **Step 3: Verify hero section renders correctly**

Check:

- ✓ Title displays: "The Legend Da Nang"
- ✓ Hero image loads (should be the main image from data file)
- ✓ Badge displays (e.g., "Luxury Coastal")
- ✓ Price displays correctly formatted

- [ ] **Step 4: Verify property details section**

Check:

- ✓ Beds, Baths, SQFT, Location all visible with icons
- ✓ Location matches data (Amalfi Coast, IT)

- [ ] **Step 5: Verify description section**

Check:

- ✓ "About This Residence" heading visible
- ✓ All 3 description paragraphs render with proper spacing
- ✓ Text is readable and formatted correctly

- [ ] **Step 6: Verify amenities grid**

Check:

- ✓ "Exclusive Amenities" section visible
- ✓ All 6+ amenities display in grid layout
- ✓ Icons render correctly for each amenity
- ✓ Amenity titles and subtitles visible

- [ ] **Step 7: Verify gallery images**

Check:

- ✓ Secondary gallery images display in 2x1 grid on right side
- ✓ Images have hover scale effect (zoom on hover)
- ✓ "View 18 Photos" link appears on last gallery image (if galleryCount is set)

- [ ] **Step 8: Verify contact sidebar**

Check:

- ✓ "Contact Ambassador" sticky sidebar visible on right
- ✓ Agent name "Sofia Rossini" displays
- ✓ Agent title displays
- ✓ Agent image loads
- ✓ Contact form is present

- [ ] **Step 9: Verify market analysis**

Check:

- ✓ Market analysis chart section visible
- ✓ Year-over-year growth displays: "+8.2% Year-over-Year"

- [ ] **Step 10: Test responsive layout**

Resize browser to mobile (375px width) and verify:

- ✓ Hero image stacks properly
- ✓ Text remains readable
- ✓ Amenities grid adapts to 1 column
- ✓ Sidebar moves below main content on mobile

---

## Task 5: Final Verification and Commit

**Files:**

- Created: `frontend/src/data/the-legend-danang.ts`
- Modified: `frontend/src/lib/static-properties.ts`

- [ ] **Step 1: Verify all content from thelegendcity.com is integrated**

Checklist:

- ✓ Title and description match thelegendcity.com messaging
- ✓ All key amenities from thelegendcity.com are represented
- ✓ Location is accurate
- ✓ Images represent the property appropriately

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npm run build`

Expected: Build succeeds with no errors or type issues.

- [ ] **Step 3: Stage changes**

```bash
cd frontend
git add src/data/the-legend-danang.ts src/lib/static-properties.ts
```

- [ ] **Step 4: Create commit**

```bash
git commit -m "feat: add The Legend Da Nang property with thelegendcity.com content

- Create the-legend-danang.ts with full property details
- Register property in static-properties lookup
- Renders through existing EtherealPropertyDetail component"
```

- [ ] **Step 5: Verify commit was created**

Run: `git log --oneline -5`

Expected: Your commit message appears at the top.

---

## Success Criteria

- [ ] The Legend Da Nang property detail page loads at `/projects/the-legend-danang`
- [ ] All content from thelegendcity.com is integrated and visible
- [ ] Page renders with Ethereal Estate design aesthetic
- [ ] Responsive design works on mobile and desktop
- [ ] No TypeScript errors or console warnings
- [ ] Changes committed to git
