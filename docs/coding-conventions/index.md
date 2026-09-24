# Coding conventions

Apply every rule below to code you write or review.

Done means every rule checked against every file you touched, each finding named by the rule it breaks. When a rule doesn't settle the case in front of you, ask rather than inventing a convention.

## Components

Build UI by composing the primitives in `@/components/ui` and the design tokens in `globals.css`; reach for the shadcn/ui MCP before writing a primitive from scratch.

Localize logic by ownership. When logic is specific to an isolated concern, it MUST live with that concern—in its component, hook, or utility. Parent components MUST NOT contain or duplicate logic that is owned by a child UI piece. Extract logic to the smallest appropriate owner and keep it there unless it is genuinely shared.

## Co-location

Code lives at the narrowest scope that has a consumer. A second consumer **promotes** it.

| Consumers          | Home                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| One module         | Beside the code that uses it, in the same file while it stays small          |
| One route          | `_components/`, `_utils/`, `_constants/`, `_context/` beside that `page.tsx` |
| Two or more routes | `@/components`, `@/utils`, `@/constants`, `@/hooks`                          |
| shadcn primitive   | `@/components/ui`                                                            |

Underscore folders are Next.js private folders and never become routes, so route-local code is safe beside its `page.tsx`.

A module that outgrows one file gets its own folder and repeats this structure inside it: `components/`, `hooks/`, `utils/`, `constants/`.

## Naming and exports

Names scale with scope. Short in a narrow scope, explicit as the distance from the consumer grows.

Export in a single named block at the bottom of the file, types included:

```tsx
export { CopyButton, type CopyButtonProps };
```

Pass an options object to any function with multiple or non-obvious parameters.

```tsx
useLocalStorage({ key, defaultValue }); // not useLocalStorage("key", "")
```

Prefer inference over annotation, and `type` over `interface`.

## Data fetching

for data fetching read [`data-fetching.md`](data-fetching.md)
