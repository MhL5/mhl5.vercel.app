"use client";

import { type ReactNode, createContext, use } from "react";
import type { editorEnMessages } from "../messages/en";

export type EditorMessagesContextType = {
  messages: typeof editorEnMessages;
};

const EditorMessagesContext = createContext<EditorMessagesContextType | null>(
  null,
);

type EditorMessagesProviderProps = {
  children: ReactNode;
  messages: EditorMessagesContextType["messages"];
};

export function EditorMessagesProvider({
  children,
  messages,
}: EditorMessagesProviderProps) {
  return (
    <EditorMessagesContext value={{ messages }}>
      {children}
    </EditorMessagesContext>
  );
}

export function useEditorMessages() {
  const context = use(EditorMessagesContext);
  if (!context)
    throw new Error(
      "useEditorMessages must be used within a EditorMessagesContextProvider",
    );
  return context;
}
