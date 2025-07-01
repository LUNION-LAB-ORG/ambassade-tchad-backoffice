import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/config';

export default async function middleware(request: NextRequest) {


  // Etape 1: Utilisez la requête entrante (example)
  const defaultLocale = request.headers.get('dashcode-locale') || 'en';

  // Etape 2: Appel du middleware de next-intl (example)
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale
  });
  const response = handleI18nRouting(request);

  // Etape 3: Alterez la réponse (example)
  response.headers.set('dashcode-locale', defaultLocale);


  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/(ar|en)/:path*'
  ]
};