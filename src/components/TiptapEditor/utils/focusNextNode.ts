import { Selection, TextSelection } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";

/**
 * Moves the focus to the next node in the editor
 * @param editor - The editor instance
 * @returns boolean indicating if the focus was moved
 */
export function focusNextNode(editor: Editor) {
  const { state, view } = editor;
  const { doc, selection } = state;

  const nextSel = Selection.findFrom(selection.$to, 1, true);
  if (nextSel) {
    view.dispatch(state.tr.setSelection(nextSel).scrollIntoView());
    return true;
  }

  const paragraphType = state.schema.nodes["paragraph"];
  if (!paragraphType) {
    console.warn("No paragraph node type found in schema.");
    return false;
  }

  const end = doc.content.size;
  const para = paragraphType.create();
  let tr = state.tr.insert(end, para);

  // Place the selection inside the new paragraph
  const $inside = tr.doc.resolve(end + 1);
  tr = tr.setSelection(TextSelection.near($inside)).scrollIntoView();
  view.dispatch(tr);
  return true;
}
