# Coding conventions

Apply every rule below to code you write or review.

Done means every rule checked against every file you touched, each finding named by the rule it breaks. When a rule doesn't settle the case in front of you, ask rather than inventing a convention.

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

## Components

Build UI by composing the primitives in `@/components/ui` and the design tokens in `globals.css`; reach for the shadcn/ui MCP before writing a primitive from scratch.

Logic that belongs to one isolated piece of the UI moves into that piece's own component and stays there.

Route forms through a form library.

## Comments

Comments carry the _why_. Document every exported utility with a JSDoc block carrying an `@example`; `@/utils/absoluteUrl.ts` is the pattern.

## Data fetching

Fetch in a server component when the data doesn't change after render:

```tsx
const [error, data] = await tryCatch(getBlogs());
```

Client-side fetching goes through TanStack Query, one module per endpoint, always passing the `signal`. Before writing any query or mutation module, open [`data-fetching.md`](data-fetching.md) and copy the template it holds.
