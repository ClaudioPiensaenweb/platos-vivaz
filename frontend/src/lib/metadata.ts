const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://platosvivaz.com";

export const sharedOpenGraph = {
  siteName: "VIVAZ Clay Targets",
  type: "website" as const,
  images: [
    {
      url: `${SITE_URL}/img/og-vivaz.jpg`,
      width: 1200,
      height: 630,
      alt: "VIVAZ Clay Targets — Ecological Clay Target Manufacturers Since 1967",
    },
  ],
};
