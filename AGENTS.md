# ASHVORTH & CO. — developer notes

Luxury real estate marketing site. React + TypeScript + Tailwind CSS + React Router,
with Lucide icons. No server-side runtime is required: listings come from a typed
in-repo data model.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d
```

The Vite dev server serves the app on <http://localhost:3000> directly from the
cloned source (bind-mounted), so edits hot-reload. `node_modules` lives in a named
Docker volume and is installed from the committed `package-lock.json` on container
startup.

Useful commands:

```bash
docker compose -f docker-compose.base44.yml ps
docker compose -f docker-compose.base44.yml logs -f web
docker compose -f docker-compose.base44.yml exec web npx tsc --noEmit   # typecheck
```

## Sandbox (Base44 preview) overrides

These only activate when `BASE44_PREVIEW_MODE === '1'`; with the flag unset the
original Vite behaviour is preserved.

- `vite.config.ts` switches HMR to `wss` on port `443` (the preview proxy's public
  port) and adds the sandbox host wildcard to `server.allowedHosts`.
- `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` and `BASE44_SANDBOX_HOST_DOMAIN` are
  passed through bare in Compose — never hardcode resolved `BASE44_*` values.

Note: `server.allowedHosts` validates the proxied **Host** header, while Next/Vite
dev-asset requests are gated by **Origin**; the origin here is
`https://3000-$BASE44_PUBLIC_HOST_SUFFIX`, which is what `BASE44_PUBLIC_HOST_SUFFIX`
is passed in for.

## Environment variables

All optional — the app runs fully without any of them.

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | HTTPS endpoint receiving `POST` JSON for the contact, property-enquiry and newsletter forms. |

Without `VITE_CONTACT_ENDPOINT` the forms still validate and show loading/error
states, but they report that delivery is not connected — they never fake a success.
Secrets are delivered by the platform to `/run/base44/app.env` and wired in as the
last `env_file` entry in `docker-compose.base44.yml`.

## Data model

- `src/types.ts` — `Property`, `Agent`, `Testimonial`, `Service`, `PropertyFilters`.
- `src/data/properties.ts` — sample listings + helpers (`getPropertyBySlug`,
  `getSimilarProperties`, derived `locations`/`propertyTypes`).
- `src/data/images.ts` — every photograph URL in one place.

Add a listing by appending one `Property` object to the `properties` array; the
listing grid, filters and details route pick it up automatically (the details route
is `/properties/:slug`).

## Supabase (optional)

The site is deliberately backend-agnostic. To move listings, favourites and form
submissions to Supabase:

1. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables
   (never commit them; the anon key is the only key that belongs in client code).
2. Create a `properties` table mirroring the `Property` type and seed it from
   `src/data/properties.ts`.
3. Replace the array export in `src/data/properties.ts` with a query, keeping the
   same shape so components need no changes.
4. Point `VITE_CONTACT_ENDPOINT` at a Supabase Edge Function to receive form posts.

## Verification

- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` → `200`.
- The served HTML must include `/@vite/client` and `/src/main.tsx` (proves the dev
  server is serving source, not a production bundle).
- `docker compose ... exec web npx tsc --noEmit` → no errors.
