// ============================================
// Server-side Auth Guard Utility
// Protects API routes and server components
// ============================================

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns the authenticated admin session or null.
 * Use in Server Components and API routes.
 */
export async function getAuthSession() {
  return await getServerSession(authOptions);
}

/**
 * Middleware-style guard for API routes.
 * Returns the session if authenticated, or a 401 JSON response if not.
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      session: null,
      error: NextResponse.json(
        { error: "غير مصرح بالوصول. يرجى تسجيل الدخول أولاً." },
        { status: 401 }
      ),
    };
  }

  return { session, error: null };
}
