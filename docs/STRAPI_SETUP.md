# Strapi Content Types — Step-by-Step (Admin UI)

Use this if you prefer the Content-Type Builder over copying JSON schemas.

## A. Property (`property`)

1. **Content-Type Builder** → **Create new collection type** → Display name: `Property` → API ID: `property`.
2. Add fields:

| Field name | Type | Settings |
|------------|------|----------|
| `title` | Text (Short) | Required |
| `slug` | UID | Attached field: `title`, Required |
| `description` | Rich text (Blocks) | — |
| `price` | Number (Decimal) | Required |
| `status` | Enumeration | Values: `for-sale`, `for-rent`, `sold`; Default: `for-sale` |
| `property_type` | Enumeration | Values: `house`, `apartment`, `condo`, `land`; Required |
| `bedrooms` | Integer | Min: 0 |
| `bathrooms` | Integer | Min: 0 |
| `area_sqft` | Integer | Min: 0 |
| `featured_image` | Media (Single) | Images only |
| `gallery` | Media (Multiple) | Images only |
| `address` | Text (Short) | — |
| `city` | Text (Short) | — |
| `coordinates` | JSON | Example: `{ "lat": 37.77, "lng": -122.42 }` |
| `agent` | Relation | Property **has one** Agent (Many-to-one) |

3. Save and restart Strapi if prompted.

## B. Agent (`agent`)

| Field name | Type | Settings |
|------------|------|----------|
| `name` | Text (Short) | Required |
| `role` | Text (Short) | — |
| `email` | Email | Required |
| `phone` | Text (Short) | — |
| `avatar` | Media (Single) | Images only |
| `properties` | Relation | Agent **has many** Properties (inverse of `agent`) |

## Permissions & token

1. **Settings → Users & Permissions → Roles → Public**
   - Property: `find`, `findOne`
   - Agent: `find`, `findOne`
2. **Settings → API Tokens** → Create **Read-only** token → copy to `STRAPI_API_TOKEN` in Next.js.

## Sample `coordinates` JSON

```json
{ "lat": 37.7749, "lng": -122.4194 }
```

## REST verification

```bash
curl "http://localhost:1337/api/properties?populate=*" \
  -H "Authorization: Bearer YOUR_TOKEN"
```
