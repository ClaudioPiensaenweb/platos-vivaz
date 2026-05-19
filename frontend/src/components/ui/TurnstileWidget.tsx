"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Script from "next/script";

export interface TurnstileRef {
  reset: () => void;
}

interface Props {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const TurnstileWidget = forwardRef<TurnstileRef, Props>(
  ({ siteKey, onVerify, onExpire }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    function renderWidget() {
      if (
        containerRef.current &&
        window.turnstile &&
        widgetIdRef.current === null
      ) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerify(token),
          "expired-callback": () => {
            widgetIdRef.current = null;
            onExpire?.();
          },
          "error-callback": () => {
            widgetIdRef.current = null;
            onExpire?.();
          },
          theme: "light",
          size: "normal",
        });
      }
    }

    // Render if script was already loaded before this mount (SPA navigation)
    useEffect(() => {
      renderWidget();
      return () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        onExpire?.();
      },
    }));

    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          onLoad={renderWidget}
        />
        <div ref={containerRef} />
      </>
    );
  }
);

TurnstileWidget.displayName = "TurnstileWidget";
export default TurnstileWidget;
