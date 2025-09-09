import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

export const publicRoutes = ["/"];

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pathWithoutLocale =
    pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  // ✅ Utilisation de getToken (Edge-compatible)
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (process.env.NODE_ENV === "production") {
    console.log(`Page dans le middleware : "${pathWithoutLocale}"`);
    console.log(`Utilisateur connecté : ${token?.email ?? "non"}`);
  }

  if (pathWithoutLocale.startsWith("/api/auth")) {
    return NextResponse.next(); // ✅ pas de return vide
  }

  const isPublicPage = publicRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/")
  );

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  if (!token) {
    let callbackUrl = pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    const loginUrl = new URL(`/?callbackUrl=${encodedCallbackUrl}`, req.url);

    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|_vercel).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
