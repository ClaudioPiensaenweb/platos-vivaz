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
  async redirects() {
    return [
      // ── Infraestructura ───────────────────────────────────────────────────
      // www → non-www (belt-and-suspenders — Traefik también lo gestiona)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.platosvivaz.com" }],
        destination: "https://platosvivaz.com/:path*",
        permanent: true,
      },

      // ── WordPress legacy — contenido legítimo con posibles backlinks ──────
      // Blog: /estas-seguro-... → /noticias
      {
        source: "/estas-seguro-de-que-ese-plato-de-tiro-es-ecologico",
        destination: "/noticias",
        permanent: true,
      },
      {
        source: "/estas-seguro-de-que-ese-plato-de-tiro-es-ecologico/",
        destination: "/noticias/",
        permanent: true,
      },
      // Blog EN: /en/are-you-sure-... → /en/noticias
      {
        source: "/en/are-you-sure-the-targets-you-are-shooting-are-environmentally-friendly",
        destination: "/en/noticias",
        permanent: true,
      },
      {
        source: "/en/are-you-sure-the-targets-you-are-shooting-are-environmentally-friendly/",
        destination: "/en/noticias/",
        permanent: true,
      },
      // /news/ → /noticias/ (antiguo slug inglés del blog)
      { source: "/news", destination: "/noticias", permanent: true },
      { source: "/news/", destination: "/noticias/", permanent: true },
      { source: "/news/:slug*", destination: "/noticias/:slug*", permanent: true },
      // Formulario DE de muestra gratuita → contacto
      {
        source: "/de/kostenloses-muster",
        destination: "/de/contacto",
        permanent: true,
      },
      {
        source: "/de/kostenloses-muster/",
        destination: "/de/contacto/",
        permanent: true,
      },

      // ── WordPress media / admin — archivos con extensión (el matcher del ──
      // ── middleware excluye paths con puntos, así que los gestionamos aquí) ─
      // Catálogos PDF → /productos
      { source: "/wp-content/:path*", destination: "/productos", permanent: true },
      // WordPress admin/login → home (disuasorio, ya devuelven 404 si no hay WP)
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-login.php/", destination: "/", permanent: true },
    ];
  },

  async rewrites() {
    // beforeFiles runs before Next.js filesystem checks — needed because
    // /sitemap.xml is a reserved internal path that would otherwise 404
    return {
      beforeFiles: [
        { source: "/sitemap.xml", destination: "/api/sitemap" },
      ],
      afterFiles: [],
      fallback: [],
    };
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
