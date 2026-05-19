import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/contact/WhatsAppFAB";
import CookieBanner from "@/components/legal/CookieBanner";
import GTMScript, { GTMNoScript } from "@/components/analytics/GTMScript";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/providers/PageTransition";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/json-ld";
import { getBrandData } from "@/lib/directus";
import { sharedOpenGraph } from "@/lib/metadata";
import "../globals.css";

const quablo = localFont({
  src: [
    { path: "../../../public/fonts/Quablo-Thin.otf", weight: "100", style: "normal" },
    { path: "../../../public/fonts/Quablo-Light.otf", weight: "300", style: "normal" },
    { path: "../../../public/fonts/Quablo-Regular.otf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/Quablo-Medium.otf", weight: "500", style: "normal" },
    { path: "../../../public/fonts/Quablo-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../../public/fonts/Quablo-Bold.otf", weight: "700", style: "normal" },
    { path: "../../../public/fonts/Quablo-RegularItalic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-quablo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

  // localePrefix: "as-needed" — default locale (es) has no URL prefix
  const canonical = locale === "es" ? siteUrl : `${siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    robots: siteUrl.includes("platosvivaz.com") && !siteUrl.includes("piensalab")
      ? { index: true, follow: true }
      : { index: false, follow: false },
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: {
      canonical,
      languages: {
        es: siteUrl,
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`,
        de: `${siteUrl}/de`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      ...sharedOpenGraph,
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en" | "fr" | "de")) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  // Fetch brand data for WhatsApp number (fallback to known number if unavailable)
  let whatsappNumber = "+34606172746";
  try {
    const brand = await getBrandData();
    if (brand?.phone_export) {
      whatsappNumber = brand.phone_export;
    } else if (brand?.whatsapp) {
      whatsappNumber = brand.whatsapp;
    }
  } catch {
    // Use fallback number
  }

  return (
    <html lang={locale}>
      <body className={`${quablo.variable} ${manrope.variable} antialiased`}>
        <GTMNoScript />
        <GTMScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd()) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <Navbar />
            <main style={{ viewTransitionName: "page-content" }}>
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <WhatsAppFAB number={whatsappNumber} />
            <CookieBanner />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
