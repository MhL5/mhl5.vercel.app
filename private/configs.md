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
