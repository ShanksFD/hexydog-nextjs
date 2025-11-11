import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en", "fr", "ar", "de", "es", "it", "tr", "ru"];
let defaultLocale = "en";

function getLocale(request) {
  // First check if language is stored in cookies
  const cookieLang = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLang && locales.includes(cookieLang)) {
    return cookieLang;
  }

  // Fall back to browser language preference
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Don't run middleware on static files, API routes, or _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  
  // Get the preferred locale
  const locale = getLocale(request);
  
  // Set the locale in a cookie if not already set
  if (!request.cookies.get("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: "/",
    });
  }
  
  // Set a header so we can access the locale in Server Components
  response.headers.set("x-locale", locale);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
