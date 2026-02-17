import { useCurrentEditor as useCoreCurrentEditor } from "@tiptap/react";

/**
 * Custom hook that guarantees a non-null Editor instance from Tiptap.
 * This is useful because we always want to get an Editor, not `Editor | null`.
 */
export function useCurrentEditor() {
  const { editor } = useCoreCurrentEditor();
  if (!editor)
    throw new Error(
      "useCurrentEditor must be called within EditorContext provider",
    );
  return { editor };
}
