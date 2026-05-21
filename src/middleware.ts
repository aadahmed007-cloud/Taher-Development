import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Protect admin dashboard routes
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Block seed endpoint in production
  if (request.nextUrl.pathname.startsWith('/api/seed') && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'هذه الخدمة غير متاحة في الإنتاج' }, { status: 403 });
  }

  // Protect admin API routes (POST/PUT/DELETE on projects, upload, GET on contact/leads)
  const protectedApiPaths = ['/api/upload', '/api/seed'];
  if (protectedApiPaths.some(p => request.nextUrl.pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/seed', '/api/upload'],
};
