import Image from "@tiptap/extension-image";
import { ReplaceStep } from "@tiptap/pm/transform";

export const imgExtension = Image.extend({
  name: "imgExtension",
  inline: false,
  allowBase64: false, // ⚠️ Prevent base64 bloat
  resize: {
    enabled: true,
    directions: ["top-right", "bottom-right", "bottom-left", "top-left"],
    minWidth: 100,
    minHeight: 100,
    alwaysPreserveAspectRatio: true,
  },

  onTransaction({ transaction }) {
    transaction.steps.forEach((step) => {
      if (step instanceof ReplaceStep && step.slice.size === 0) {
        const deleted = transaction.before.content.cut(step.from, step.to);

        deleted.forEach((node) => {
          if (node.type.name === "imgExtension")
            console.log("\x1b[35m" + "imgExtension onTransaction" + "\x1b[0m");
        });
      }
    });
  },
});
