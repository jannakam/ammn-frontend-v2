import { NextResponse } from 'next/server';
import { getUser } from './actions/token';

const privateRoutes = ['/dashboard'];
const publicRoutes = ['/'];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isPrivateRoute = privateRoutes.includes(path) || path.startsWith('/dashboard');
  const user = await getUser();

  // Redirect to `/` home page if a page is private!
  if (isPrivateRoute && !user) return NextResponse.redirect(new URL('/', req.nextUrl));

//   if (isPublicRoute && user) return NextResponse.redirect(new URL('/', req.nextUrl));

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};