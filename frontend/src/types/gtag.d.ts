// Global type declarations for GTM / Consent Mode v2 / Cloudflare Turnstile

interface TurnstileInstance {
  render(element: HTMLElement, options: Record<string, unknown>): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
  getResponse(widgetId: string): string | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    turnstile?: TurnstileInstance;
  }
}

export {};
