import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Spam/hack URL detection — returns 410 Gone before i18n routing.
 *
 * The old WordPress site suffered a spam injection attack. Google indexed
 * hundreds of foreign URLs under platosvivaz.com. All legitimate routes in
 * this Next.js app are lowercase; the spam slugs always contain uppercase
 * letters or end with a 5-6 digit numeric hash ID.
 *
 * Note: WP paths with file extensions (.pdf, .php) are excluded from this
 * matcher (.*\\..*) — they are handled by redirects() in next.config.ts.
 */
const SPAM_PATTERNS: RegExp[] = [
  /[A-Z]/,              // Uppercase in path — all legit routes are lowercase
  /\/\d{5,}\/?$/,       // Trailing 5+ digit numeric ID (e.g. /331367, /362713)
  /^\/wp-/,             // WordPress paths without extension (wp-admin, wp-login…)
];

function isSpamUrl(pathname: string): boolean {
  return SPAM_PATTERNS.some((re) => re.test(pathname));
}

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Early exit — 410 Gone for spam/hacked URLs from old WordPress site
  if (isSpamUrl(path)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const response = intlMiddleware(request);

  // Geo-routing: detect country from Vercel/Cloudflare headers or Accept-Language
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  const market = country.toUpperCase() === "ES" ? "national" : "export";
  response.headers.set("x-vivaz-market", market);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
