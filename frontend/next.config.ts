import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: { ignoreBuildErrors: true },
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vivaz.piensalab.com",
        port: "8056",
      },
      {
        protocol: "https",
        hostname: "admin.platosvivaz.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8055",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8056",
      },
      {
        protocol: "http",
        hostname: "directus",
        port: "8055",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' data: blob: ${directusUrl} https://www.googletagmanager.com`,
              "font-src 'self' data:",
              `frame-ancestors 'self' ${directusUrl}`,
              "frame-src 'self' https://challenges.cloudflare.com",
              `connect-src 'self' ${directusUrl} https://www.google-analytics.com https://analytics.google.com https://challenges.cloudflare.com`,
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
