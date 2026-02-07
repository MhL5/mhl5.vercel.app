import { type Editor } from "@tiptap/react";
import { type ReactNode, createContext, use } from "react";

type TiptapEditorContextType = {
  editor: Editor;
};

export const TiptapEditorContext =
  createContext<TiptapEditorContextType | null>(null);

type TiptapEditorContextProviderProps = {
  editor: TiptapEditorContextType["editor"];
  children: ReactNode;
};

export function TiptapEditorContextProvider({
  children,
  editor,
}: TiptapEditorContextProviderProps) {
  return (
    <TiptapEditorContext value={{ editor }}>{children}</TiptapEditorContext>
  );
}

export function useTiptapEditorContext() {
  const context = use(TiptapEditorContext);
  if (!context)
    throw new Error(
      "useTiptapEditorContext must be used within a TiptapEditorContextProvider",
    );
  return context;
}
