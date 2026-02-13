import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";
import TableOfContents from "@tiptap/extension-table-of-contents";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import { Gapcursor } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";

import { ResizableNode } from "../nodes/ResizableNode";
import "./Youtube.css";

export const TIPTAP_EXTENSIONS = [
  StarterKit,
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
  Image.configure({
    inline: false,
    allowBase64: false,
    resize: {
      enabled: true,
      directions: ["top-right", "bottom-right", "bottom-left", "top-left"],
      minWidth: 100,
      minHeight: 100,
      alwaysPreserveAspectRatio: false,
    },
  }),
  Youtube.configure({
    inline: false,
  }),
  TableOfContents.configure({
    anchorTypes: ["heading"],
  }),
];
