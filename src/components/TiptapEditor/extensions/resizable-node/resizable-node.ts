import { Node as NodeExtension, ResizableNodeView } from "@tiptap/react";

import "./resizable-node.css";

export const resizableNode = NodeExtension.create({
  name: "resizableNode",
  group: "block",
  content: "block+",
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      width: {
        default: "auto",
      },
      height: {
        default: "auto",
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-resizer]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        "data-resizer": "",
        style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height}; border: 1px solid var(--border); box-sizing: border-box;`,
      },
      0,
    ];
  },

  addNodeView() {
    return (props) => {
      const width = props.node.attrs.width;
      const height = props.node.attrs.height;

      const el = document.createElement("div");
      el.dataset.resizer = "";
      const content = document.createElement("div");
      content.innerText = `Width: ${width}, Height: ${height}`;

      el.appendChild(content);

      el.style.width = width;
      el.style.height = height;

      const resizable = new ResizableNodeView({
        element: el,
        getPos: props.getPos,
        node: props.node,
        editor: props.editor,
        onCommit: (newWidth, newHeight) => {
          const pos = props.getPos();
          if (pos === undefined) return;

          this.editor
            .chain()
            .setNodeSelection(pos)
            .updateAttributes(this.name, {
              width: newWidth,
              height: newHeight,
            })
            .run();
        },
        onResize: (newWidth, newHeight) => {
          content.innerText = `Width: ${newWidth}, Height: ${newHeight}`;
        },
        onUpdate: () => false,
      });

      return resizable;
    };
  },
});
