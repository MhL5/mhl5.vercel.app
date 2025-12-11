"use client";

import { createContext, type PropsWithChildren, use } from "react";
import { getSnippetsLinks } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";

type SnippetsLinksContextType = Awaited<ReturnType<typeof getSnippetsLinks>>;

const SnippetsLinksContext = createContext<SnippetsLinksContextType | null>(
  null,
);

type SnippetsLinksProviderProps = PropsWithChildren<{
  linksPromise: ReturnType<typeof getSnippetsLinks>;
}>;

function SnippetsLinksProvider({
  children,
  linksPromise,
}: SnippetsLinksProviderProps) {
  const links = use(linksPromise);

  return (
    <SnippetsLinksContext.Provider value={links}>
      {children}
    </SnippetsLinksContext.Provider>
  );
}

function useSnippetsLinks() {
  const context = use(SnippetsLinksContext);
  if (!context)
    throw new Error(
      "useSnippetsLinks must be used within a SnippetsLinksProvider",
    );
  return context;
}

export { SnippetsLinksProvider, useSnippetsLinks };
