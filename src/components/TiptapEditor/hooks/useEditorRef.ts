import type { TiptapEditor } from "@/components/TiptapEditor/TiptapEditor";
import { type ComponentRef, useRef } from "react";

function useEditorRef() {
  return useRef<ComponentRef<typeof TiptapEditor>>(null);
}

export { useEditorRef };
