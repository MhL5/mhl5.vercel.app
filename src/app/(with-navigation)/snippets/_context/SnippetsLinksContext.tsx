"use client";

import {
  type SnippetsLinks,
  getSnippetsLinks,
} from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import { type PropsWithChildren, createContext, use } from "react";

const SnippetsLinksContext = createContext<SnippetsLinks | null>(null);

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
