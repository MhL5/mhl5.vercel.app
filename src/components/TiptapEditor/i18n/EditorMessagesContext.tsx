"use client";

import type { editorMessages } from "@/components/TiptapEditor/i18n/messages";
import { type ReactNode, createContext, use } from "react";

type EditorMessagesContextType = {
  messages: (typeof editorMessages)["en"];
};

const EditorMessagesContext = createContext<EditorMessagesContextType | null>(
  null,
);

type EditorMessagesProviderProps = {
  children: ReactNode;
  messages: EditorMessagesContextType["messages"];
};

function EditorMessagesProvider({
  children,
  messages,
}: EditorMessagesProviderProps) {
  return (
    <EditorMessagesContext value={{ messages }}>
      {children}
    </EditorMessagesContext>
  );
}

function useEditorMessages() {
  const context = use(EditorMessagesContext);
  if (!context)
    throw new Error(
      "useEditorMessages must be used within a EditorMessagesContextProvider",
    );
  return context;
}

export {
  useEditorMessages,
  EditorMessagesProvider,
  type EditorMessagesContextType,
};
