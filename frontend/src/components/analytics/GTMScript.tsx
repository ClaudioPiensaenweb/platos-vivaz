/**
 * GTM + Google Consent Mode v2
 *
 * Order of operations (critical for GDPR compliance):
 *  1. Inline script: initialise dataLayer + set consent DEFAULTS (all denied)
 *     and immediately restore saved preferences from localStorage so returning
 *     visitors never send a hit with wrong consent state.
 *  2. GTM script (afterInteractive): loads async after hydration. GTM reads
 *     the consent state already set above and fires tags accordingly.
 *
 * When the user changes preferences in <CookieBanner />, it calls
 * window.gtag('consent', 'update', {...}) which GTM picks up in real time.
 */

import Script from "next/script";

const GTM_ID = "GTM-MGJMPCW";

// Inline script: runs during HTML parse, before any React hydration.
// Must be a plain string — no template literals with backticks inside.
const CONSENT_INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var _vc = JSON.parse(localStorage.getItem('vivaz-cookie-consent') || 'null');
  if (_vc && _vc.version === '1') {
    gtag('consent', 'update', {
      analytics_storage: _vc.analytics ? 'granted' : 'denied',
      ad_storage: _vc.marketing ? 'granted' : 'denied',
      ad_user_data: _vc.marketing ? 'granted' : 'denied',
      ad_personalization: _vc.marketing ? 'granted' : 'denied'
    });
  }
} catch(e) {}
`;

const GTM_LOADER = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function GTMScript() {
  return (
    <>
      {/* 1. Consent Mode v2 defaults — inline, runs before everything */}
      <script dangerouslySetInnerHTML={{ __html: CONSENT_INIT }} />

      {/* 2. GTM loader — async, after hydration */}
      <Script id="gtm-loader" strategy="afterInteractive">
        {GTM_LOADER}
      </Script>
    </>
  );
}

/** GTM noscript fallback — paste as first child of <body> */
export function GTMNoScript() {
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="GTM"
      />
    </noscript>
  );
}
