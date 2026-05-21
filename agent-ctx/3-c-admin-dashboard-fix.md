# Task 3-c - Admin Dashboard Fix Agent

## Task
Apply 5 admin dashboard fixes to the Taher Development Next.js project.

## Completed Work

### 1. Auth Guard Enhancement
- Added `requireAdmin()` to `/src/lib/auth-guard.ts` for use in admin-only API routes

### 2. Layout Fix (`/src/app/admin/dashboard/layout.tsx`)
- Added "عرض الموقع" (View Site) link with ExternalLink icon, opens `/` in new tab
- Added unread messages count badge next to "الرسائل الواردة" nav item
- Badge fetches from `/api/contact` every 30 seconds using inline effect pattern (lint-safe)

### 3. Dashboard Projects Page Fix (`/src/app/admin/dashboard/page.tsx`)
- Added 4 stats cards at top: total, available, under construction, sold out
- Fixed search to be case-insensitive (`toLowerCase()`)
- Added amenities text input field (comma-separated)
- Added `isSubmitting` state with Loader2 spinner and disabled button
- Updated `DashboardProject` interface with `amenities: string[]`
- Amenities parsed on submit by splitting on commas

### 4. Messages Page Fix (`/src/app/admin/dashboard/messages/page.tsx`)
- Real API for markAsRead: PATCH `/api/contact/[id]`
- Delete button with confirmation in detail modal
- Search bar filtering by name, email, phone, message
- Filter tabs: الكل / غير مقروء / مقروء with counts
- Notification system for success/error

### 5. API: Contact [id] Route (`/src/app/api/contact/[id]/route.ts`)
- PATCH: marks lead as read/unread (protected by requireAdmin)
- DELETE: deletes lead from DB (protected by requireAdmin)

### 6. Settings Page Fix (`/src/app/admin/dashboard/settings/page.tsx`)
- Real API save: PUT `/api/users`
- Client-side validation: confirm password match, 8 char minimum
- Inline validation hints
- Notification system with auto-dismiss

### 7. API: Users Route (`/src/app/api/users/route.ts`)
- PUT: updates name, email, password (with bcrypt validation)
- Duplicate email check, 8 char password minimum
- Protected by requireAdmin

### 8. Loading & Error Pages
- `/src/app/admin/dashboard/loading.tsx`: skeleton loading
- `/src/app/admin/dashboard/error.tsx`: error boundary with retry

## Lint Status
All lint checks pass (only pre-existing error in extracted ZIP directory).
