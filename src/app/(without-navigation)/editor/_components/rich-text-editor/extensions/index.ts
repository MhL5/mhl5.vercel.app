import LinkExtension from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import { Gapcursor } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";

import { ResizableNode } from "../nodes/ResizableNode";
import { imgExtension } from "./img/imgExtension";

export const TIPTAP_EXTENSIONS = [
  StarterKit,
  imgExtension,
  TextStyleKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Typography,
  LinkExtension.configure({
    openOnClick: false,
    enableClickSelection: true,
    protocols: ["ftp", "mailto"],
    defaultProtocol: "https",
    HTMLAttributes: {
      // Change rel to different value
      // Allow search engines to follow links(remove nofollow)
      rel: "noopener noreferrer",
    },
  }),
  Gapcursor,
  TableKit.configure({
    table: {
      renderWrapper: true,
    },
  }),
  ResizableNode,
];
