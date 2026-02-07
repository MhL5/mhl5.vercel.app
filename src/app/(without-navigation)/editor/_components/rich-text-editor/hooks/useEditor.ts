import { useCurrentEditor as useCoreCurrentEditor } from "@tiptap/react";

export function useCurrentEditor() {
  const { editor } = useCoreCurrentEditor();
  if (!editor)
    throw new Error(
      "useCurrentEditor must be called within EditorContext provider",
    );
  return { editor };
}
