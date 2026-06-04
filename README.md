# Real Estate Platform

Luxury real-estate site: **Next.js 15 (App Router)** + **Strapi 5** headless CMS. Design direction: deep slates, clean whites, emerald accents, generous whitespace (aligned with Google Stitch “Real Estate Analytics Platform” luxury aesthetic).

## Prerequisites

- Node.js 20+
- npm or pnpm
- Strapi 5 (`npx create-strapi-app@latest strapi-backend`)

## Quick start

### 1. Strapi backend

```bash
cd strapi-backend
npx create-strapi-app@latest . --quickstart   # or use existing folder with schemas below
```

Copy collection schemas from `strapi-backend/src/api/` (see [Strapi setup](#strapi-setup)).

1. **Settings → API Tokens** → Create token (Read-only for frontend).
2. **Settings → Users & Permissions → Roles → Public** → Enable `find` / `findOne` on `property` and `agent`.
3. Seed sample properties and agents in the admin panel.

### 2. Next.js frontend

```bash
cd frontend
cp .env.example .env.local
# Edit NEXT_PUBLIC_STRAPI_URL and STRAPI_API_TOKEN
npm install
npx shadcn@latest init -y   # if you extend components via CLI
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | Strapi base URL (e.g. `http://localhost:1337`) |
| `STRAPI_API_TOKEN` | Server-side API token (never expose as `NEXT_PUBLIC_`) |

---

## Strapi setup

### Collection: Property

Admin path: **Content-Type Builder → Create collection type → `property`**

Or copy `strapi-backend/src/api/property/content-types/property/schema.json`.

### Collection: Agent

Copy `strapi-backend/src/api/agent/content-types/agent/schema.json`.

### Relations

- Property **agent** → Many-to-one → Agent  
- Agent **properties** → One-to-many → Property (inverse)

### REST examples

```
GET /api/properties?populate=*
GET /api/properties?filters[slug][$eq]=oak-residence&populate=*
GET /api/properties?filters[status][$eq]=for-sale&filters[price][$lte]=500000&populate=*
```

---

## Frontend structure

```
frontend/src/
├── app/                    # App Router pages
├── components/             # UI + layout + property widgets
├── lib/strapi.ts           # Fetch wrapper + query helpers
└── types/strapi.ts         # TypeScript models
```

---

## Design tokens (Tailwind)

Defined in `frontend/src/app/globals.css` via CSS variables:

- **Background**: slate-950 / white sections  
- **Accent**: emerald-500 (primary CTAs), amber-400 (highlights)  
- **Typography**: Geist Sans (Next.js default) + tight tracking on headings  

---

## Deployment notes

- **Strapi**: Railway, Render, or VPS; use S3/Cloudinary for media.  
- **Next.js**: Vercel; set env vars; use `revalidate` on fetches for ISR (optional).  

---

## License

MIT
# nhadanang
