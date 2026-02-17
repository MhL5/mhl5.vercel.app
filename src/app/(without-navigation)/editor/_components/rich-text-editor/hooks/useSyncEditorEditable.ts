import { Editor } from "@tiptap/react";
import { useEffect, useEffectEvent } from "react";

type UseSyncEditorEditableOptions = {
  editor: Editor | null;
  editable: boolean;
};

/**
 * Changing the `editable` prop passed to useEditor after the initial render does not update the editor's editable state.
 * To dynamically toggle the editor between read-only and editable, you must explicitly call editor.setEditable
 * after initialization whenever the `editable` value changes.
 *
 * @see https://github.com/ueberdosis/tiptap/issues/111
 */
function useSyncEditorEditable({
  editor,
  editable,
}: UseSyncEditorEditableOptions) {
  const toggleEditableEvent = useEffectEvent(
    (editable: boolean) => editor && editor.setEditable(editable),
  );

  useEffect(() => {
    toggleEditableEvent(editable);
  }, [editable]);
}

export { useSyncEditorEditable };
