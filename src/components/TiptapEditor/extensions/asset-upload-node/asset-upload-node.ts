import { Node, ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";

import AssetUploadNode from "./components/AssetUploadNode";

export type MediaType = "image" | "video" | "audio";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    assetUploadNode: {
      insertAssetUploadNode: (attrs?: { mediaType?: MediaType }) => ReturnType;
    };
  }
}

export const assetUploadNode = Node.create({
  name: "assetUploadNode",

  group: "block",

  draggable: true,

  selectable: true,

  atom: true,

  addOptions() {
    return {
      type: "image",
      accept: "image/*",
      limit: 1,
      maxSize: 0,
      upload: undefined,
      onError: undefined,
      onSuccess: undefined,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      mediaType: {
        default: "image" as MediaType,
        parseHTML: (el) =>
          (el.getAttribute("data-media-type") as MediaType) || "image",
        renderHTML: (attrs) => ({
          "data-media-type": attrs["mediaType"] ?? "image",
        }),
      },
      accept: {
        default: this.options.accept,
      },
      limit: {
        default: this.options.limit,
      },
      maxSize: {
        default: this.options.maxSize,
      },
    };
  },

  parseHTML() {
    return [];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ "data-type": "asset-upload-node" }, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AssetUploadNode);
  },

  addCommands() {
    return {
      insertAssetUploadNode:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { mediaType: attrs?.mediaType ?? "image" },
          }),
    };
  },

  /**
   * Adds Enter key handler to trigger the upload component when it's selected.
   */
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { selection } = editor.state;
        const { nodeAfter } = selection.$from;

        if (
          nodeAfter &&
          nodeAfter.type.name === "assetUploadNode" &&
          editor.isActive("assetUploadNode")
        ) {
          const nodeEl = editor.view.nodeDOM(selection.$from.pos);
          if (nodeEl && nodeEl instanceof HTMLElement) {
            // Since NodeViewWrapper is wrapped with a div, we need to click the first child
            const firstChild = nodeEl.firstChild;
            if (firstChild && firstChild instanceof HTMLElement) {
              firstChild.click();
              return true;
            }
          }
        }
        return false;
      },
    };
  },
});
