# Task 3-a: Security & Infrastructure Fixes

## Summary
Applied 10 critical security and infrastructure fixes to the Taher Development Next.js project.

## Changes Made

### 1. Created middleware.ts (`/src/middleware.ts`)
- Route protection for `/admin/dashboard` - redirects unauthenticated users to login
- Blocks `/api/seed` endpoint in production environment
- Protects `/api/upload` and `/api/seed` API routes requiring authentication
- Uses `next-auth/jwt` getToken for edge-compatible auth checking

### 2. Fixed next.config.ts
- Removed `ignoreBuildErrors: true` (typescript block) - was hiding build errors
- Changed X-Frame-Options from `DENY` to `SAMEORIGIN` - allows embedding in same-origin frames
- Added `Strict-Transport-Security` header with 2-year max-age, includeSubDomains, preload
- Added `Content-Security-Policy` header with proper src directives for scripts, styles, images, fonts, connections, and frames

### 3. Fixed auth-guard.ts
- Added `requireAdmin()` function that checks both authentication AND admin role
- Returns 403 for non-admin authenticated users
- Removed unused `NextRequest` import

### 4. Fixed db.ts
- Changed logging from always `['query']` to conditional:
  - Development: `['query', 'error', 'warn']`
  - Production: `['error']` only (no query logging overhead)

### 5. Fixed Caddyfile
- Removed SSRF-vulnerable `@transform_port_query` block that allowed arbitrary port proxying
- Added HTTPS domain config for `taher-development.com` and `www.taher-development.com`
- Kept `:81` as development fallback

### 6. Fixed seed route (`/api/seed/route.ts`)
- Added production environment check (returns 403 in production)
- Removed `credentials` field from API response (was exposing admin password)
- Admin password now reads from `ADMIN_SEED_PASSWORD` env var with fallback
- Error details only shown in development mode
- Fixed typo: بحيرات صناعية (was صنائية)

### 7. Fixed contact route (`/api/contact/route.ts`)
- Replaced dynamic imports with static imports for `getServerSession` and `authOptions`
- Added input length validation: name (100), phone (20), email (200), message (5000)
- Added pagination support for GET: `page`, `limit` params with `pagination` metadata

### 8. Fixed projects route (`/api/projects/route.ts`)
- Added `safeJsonParse` helper that returns fallback instead of throwing on malformed JSON
- Added `ALLOWED_STATUSES` array with valid project status values
- Added status validation in POST - rejects invalid status values
- Added status validation in GET filter - ignores invalid status filters

### 9. Fixed projects/[id] route (`/api/projects/[id]/route.ts`)
- Added `safeJsonParse` helper for all JSON.parse calls
- Added `ALLOWED_STATUSES` validation in PUT
- Added `deleteProjectFiles()` function that cleans up local files on project deletion
- Deletes images and floor plan images from `/uploads/` directory when project is deleted

### 10. Fixed upload route (`/api/upload/route.ts`)
- Added `MAX_FILES_COUNT = 10` limit with validation
- Added `ALLOWED_EXTENSIONS` whitelist (`.jpg`, `.jpeg`, `.png`, `.webp`) with validation
- Extension check is defense-in-depth alongside MIME type check
- Safe extension handling in filename generation

## Lint Status
All source files pass ESLint cleanly (only pre-existing error in uploaded ZIP extraction directory).
