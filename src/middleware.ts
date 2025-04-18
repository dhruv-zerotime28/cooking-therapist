import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from './lib/tokens';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;

  if (!token) return redirectToLogin(req);

  const payload = await verifyToken(token);

  if (!payload) {
    const response = redirectToLogin(req);
    response.cookies.delete('admin_token');
    return response;
  }

  const reqHeaders = new Headers(req.headers);
  reqHeaders.set('adminId', payload.id);

  return NextResponse.next({ request: { headers: reqHeaders } });
}

const redirectToLogin = (req: NextRequest) => {
  return NextResponse.redirect(new URL('/admin/signIn', req.url));
};

export const config = {
  matcher: [
    '/api/admin/dashboard/:path*',
    '/api/admin/auth/logOut',
    '/admin/dashboard/:path*',
  ],
};
