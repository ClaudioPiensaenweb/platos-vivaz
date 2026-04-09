# Coding Conventions

**Analysis Date:** 2026-02-25

## Naming Patterns

**Files:**
- React components: PascalCase with `.tsx` extension - `ProductShowcase.tsx`, `ContactForm.tsx`, `Button.tsx`
- API routes: lowercase with `route.ts` - `src/app/api/contact/route.ts`
- Pages: lowercase with `page.tsx` - `[locale]/page.tsx`, `productos/[slug]/page.tsx`
- Utilities/libraries: camelCase with `.ts` extension - `directus.ts`, `types.ts`, `routing.ts`
- Layout files: `layout.tsx`
- Special Next.js files: `middleware.ts`, `sitemap.ts`, `robots.ts`, `not-found.tsx`

**Functions:**
- Regular functions and handlers: camelCase - `handleChange()`, `handleSubmit()`, `getProducts()`
- React components: PascalCase - `ProductShowcase`, `ContactForm`, `Button`
- Async functions: camelCase - `getProductBySlug()`, `getBlogPosts()`, `generateMetadata()`
- Type guard/helper functions: camelCase - `assetUrl()`, `productJsonLd()`

**Variables:**
- Constants: camelCase (not SCREAMING_SNAKE_CASE) - `imageSrc`, `inputClasses`, `menuItems`, `baseStyles`
- State variables: camelCase - `formData`, `status`, `isVisible`
- Boolean variables: camelCase prefixed with `is` or `has` - `isNatura`, `isVisible`, `featured`, `once`
- URL/object parameters: camelCase - `filterParams`, `searchOptions`

**Types:**
- Interfaces: PascalCase - `ButtonProps`, `ProductShowcaseProps`, `InViewProps`
- Type definitions: PascalCase - `Product`, `Discipline`, `BlogPost`, `CrmLead`
- Enums: PascalCase (if used)
- Generic type parameters: Single capital letter or descriptive - `T`, `P`

## Code Style

**Formatting:**
- Indentation: 2 spaces (standard for Next.js/React ecosystem)
- Line length: No hard limit, but keep lines readable (typically under 100 chars when practical)
- Semicolons: Used throughout (not optional)
- Trailing commas: Used in multi-line structures
- Quotes: Double quotes for JSX strings and HTML attributes, single quotes in code when needed

**Linting:**
- Tool: ESLint 9 with Next.js config
- Config file: `eslint.config.mjs` (flat config format, not .eslintrc)
- Rules applied:
  - `eslint-config-next/core-web-vitals` - Core Web Vitals best practices
  - `eslint-config-next/typescript` - TypeScript support
- Global ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
- No Prettier integration detected; formatting relies on editor configuration

**TypeScript Strictness:**
- `strict: true` enabled in `tsconfig.json`
- `noEmit: true` - Type checking only, no transpilation
- `jsx: react-jsx` - React 19 JSX transform
- Path alias: `@/*` maps to `./src/*`

## Import Organization

**Order:**
1. External dependencies (`react`, `next/*`, third-party libraries)
2. Internal utilities and libraries (`@/lib/*`, `@/lib/types`, `@/lib/directus`)
3. Components (`@/components/*`)
4. Provider/client wrappers (`@/components/providers/*`)
5. i18n navigation (`@/i18n/navigation`)
6. Type imports (mixed with above, prefixed with `type`)

**Pattern:**
```typescript
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/directus";
import type { Product } from "@/lib/types";
import Button from "@/components/ui/Button";
import ProductDetail from "@/components/product/ProductDetail";
```

**Path Aliases:**
- `@/*` → `./src/*` - Use for all internal imports, never relative paths
- Always use absolute path aliases, even for adjacent files
- Keep imports clean and organized

## Error Handling

**Patterns:**
- Silent catches with fallbacks in production code - `catch { return null; }` or return fallback value
- `console.error()` for unexpected errors with context - `console.error("Contact form error:", error)`
- `console.warn()` for degraded functionality - `console.warn("DIRECTUS_ADMIN_TOKEN not set, logging lead locally")`
- `notFound()` from Next.js for missing resources - used in dynamic routes when item not found
- Try-catch blocks around async operations (Directus API calls, JSON parsing)
- Validation before operations (email regex, required fields check)

**API Route Pattern:**
```typescript
try {
  // Operation
  const body = await request.json();
  if (!name || !email) {
    return NextResponse.json({ error: "..." }, { status: 400 });
  }
  // Success response
  return NextResponse.json({ success: true });
} catch (error) {
  console.error("Contact form error:", error);
  return NextResponse.json({ success: true, fallback: true });
}
```

**Component Pattern:**
```typescript
try {
  const product = await getProductBySlug(slug);
  if (!product) notFound();
} catch {
  notFound();
}
```

## Logging

**Framework:** No dedicated logger; uses `console` directly

**Patterns:**
- `console.log()` - Lead data for debugging when token missing: `console.log("New lead:", data)`
- `console.warn()` - Degraded conditions: `console.warn("DIRECTUS_ADMIN_TOKEN not set...")`
- `console.error()` - Unexpected errors: `console.error("Contact form error:", error)`
- No logging in client components (unless for debugging)
- Context is included with every log message

**When to Log:**
- In API routes when handling failures or fallbacks
- When environment configuration is missing
- When a feature gracefully degrades

## Comments

**When to Comment:**
- Complex business logic or non-obvious decisions
- Sections that handle multiple concerns (see Navbar.tsx with mobile/desktop layout comments)
- Geographic/conditional routing logic with explanation
- API endpoint behavior with fallback strategy

**JSDoc/TSDoc:**
- Not consistently used; minimal documentation comments
- TypeScript interfaces serve as documentation
- Props interfaces act as inline function documentation

**Example from codebase:**
```typescript
// Geo-routing: detect country from Vercel/Cloudflare headers or Accept-Language
const country =
  request.headers.get("x-vercel-ip-country") ||
  request.headers.get("cf-ipcountry") ||
  "";
```

## Function Design

**Size:**
- Keep components and functions compact and focused
- Page components stay lightweight by delegating to specialized components
- API handlers contain validation, error handling, and single responsibility

**Parameters:**
- Use object destructuring for multiple parameters - `{ variant, delay, className }`
- Use TypeScript interfaces to define parameter shapes
- Async functions accept optional parameters object: `getProducts(options?: { range?, featured?, limit? })`

**Return Values:**
- Async API functions return typed data: `Product[]`, `Product | null`
- Components return JSX or JSX.Element
- Handlers return NextResponse or void
- Use Promise types explicitly in async functions

**Example:**
```typescript
export async function getProducts(options?: {
  range?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}): Promise<Product[]> {
  // Implementation
}
```

## Module Design

**Exports:**
- Default export: Used for components and page files
- Named exports: Used for utility functions, types, and constants
- Export at end of file or inline with declaration

**Pattern:**
```typescript
// Utility module - named exports
export function assetUrl(uuid: string | null, params?: {...}): string { }
export async function getProducts(options?: {...}): Promise<Product[]> { }

// Component module - default export
export default function Button({ ... }: ButtonProps) { }

// Type module - named exports
export interface Product { }
export interface ProductTranslation { }
```

**Barrel Files:**
- Used implicitly through path structure (e.g., importing from `@/components/ui/` imports the component file)
- No explicit `index.ts` barrel files detected

## Component Structure

**Server vs Client:**
- Server components by default (Next.js 16)
- Use `"use client"` directive at top of file for interactive components - `ContactForm.tsx`, `NavbarClient.tsx`, `InView.tsx`
- Pass data from server to client components via props
- Keep server components for data fetching and heavy business logic

**Props Pattern:**
```typescript
interface ComponentProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

export default function Component({ variant = "primary", ...}: ComponentProps) { }
```

**Inline Styles:**
- All styling via Tailwind CSS classes
- Inline `style` prop only for dynamic animations or view transitions
- Complex conditional classes use `clsx` or template literals

## CSS and Styling

**Framework:** Tailwind CSS v4 with `@tailwindcss/postcss`

**Pattern:**
- CSS variables defined in `globals.css` under `:root`
- Variables mapped to Tailwind via `@theme inline`
- Colors: `bg-primary`, `text-accent`, `border-cream`
- Animation utilities: `animate-fade-in-up`, `animate-slide-in-left`
- Custom delay utilities: `delay-100` through `delay-600`
- Font family utilities: `font-heading`, `font-body`

**View Transitions:**
- Named transitions for page morphing: `view-transition-name: "page-content"`
- Product image morphing: `view-transition-name: "product-hero"`
- Duration and easing in CSS: `0.35s cubic-bezier(0.25, 0.1, 0.25, 1)`

## Type Safety

**Practices:**
- All props use TypeScript interfaces
- Async functions typed with return types
- State typed explicitly when needed: `useState<"idle" | "sending" | "success" | "error">("idle")`
- Directus SDK data cast with `as unknown as Type[]` pattern (type safety boundary)
- Use `Promise<T>` for async function returns
- Optional fields marked with `?` - `id?: number`, `translations?: ProductTranslation[]`

## Formatting Tools

**ESLint:**
- Run: `npm run lint`
- Uses flat config format (eslint.config.mjs)
- Extends Next.js core and TypeScript configs

**No Prettier:**
- Project uses ESLint only for linting
- Formatting conventions are manual/editor-based
- IDE should be configured for consistent indentation and line endings

---

*Convention analysis: 2026-02-25*
