import Audio from "@tiptap/extension-audio";
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
import { VideoNode } from "../nodes/VideoNode";
import "./Youtube.css";
import { uploadNode } from "./image-upload-node/uploadNode";

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
      resizable: true,
      renderWrapper: true,
    },
  }),
  ResizableNode,
  Audio.configure({
    inline: false,
    controls: true,
    addPasteHandler: true,
  }),
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
  VideoNode.configure({
    HTMLAttributes: {
      class: "rounded-md max-w-full h-auto",
      style: "max-width: 100%; height: auto;",
    },
  }),
  TableOfContents.configure({
    anchorTypes: ["heading"],
  }),
  uploadNode,
];
