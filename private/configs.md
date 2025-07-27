# Configs

## Typescript

```json
  "pretty": true,
  "noFallthroughCasesInSwitch": true,
  "forceConsistentCasingInFileNames": true,
  "allowUnusedLabels": false,
  "allowUnreachableCode": false,
  "noUnusedLocals": true,
  "verbatimModuleSyntax": true, // Enforced 'type-only' imports
  "paths": {
    "@/*": ["./src/*"],
    "~/*": ["./*"]
  }
```

## Next js

```ts
const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 10,
    },
  },
};
```

## Package.json useful scripts

```json
"typecheck": "tsc --noEmit",
"prettier": "prettier --write ."
```

## prettier.rc

```json
{
  "plugins": [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  "tailwindFunctions": ["cva"],
  "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  "tailwindStylesheet": "./src/styles/globals.css",
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

## eslint

```ts
 {
  rules: {
    "no-console":"warn"
  }
 }
```

## css

```css
/* 352px/16rem */
--breakpoint-3xs: 16rem;
/* 388px/24.25rem */
--breakpoint-2xs: 24.25rem;
/* 448px/28rem */
--breakpoint-xs: 28rem;

--font-space-grotesk:
  var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--font-figtree:
  var(--font-figtree), ui-sans-serif, system-ui, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

/* 8px/0.5rem */
--radius-sm: calc(var(--radius) - 4px);
/* 10px/0.625rem */
--radius-md: calc(var(--radius) - 2px);
/* 12px/0.75rem */
--radius-lg: var(--radius);
/* 16px/1rem */
--radius-xl: calc(var(--radius) + 4px);
/* 20px/1.25rem */
--radius-2xl: calc(var(--radius) + 8px);
/* 24px/1.5rem */
--radius-3xl: calc(var(--radius) + 12px);
/* 28px/1.75rem */
--radius-4xl: calc(var(--radius) + 16px);
/* 32px/2rem */
--radius-5xl: calc(var(--radius) + 20px);
/* 36px/2.25rem */
--radius-6xl: calc(var(--radius) + 24px);
/* 40px/2.5rem */
--radius-7xl: calc(var(--radius) + 28px);

*:not(body, html) {
  scrollbar-width: thin;
  scrollbar-color: var(--muted-foreground) transparent;
}

.no-visible-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
