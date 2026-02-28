import { Node } from "@tiptap/core";

export type InsertVideoOptions = {
  src: string;
  poster?: string | null;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "auto" | "metadata" | "none" | null;
  playsInline?: boolean;
  width?: string | number | null;
  height?: string | number | null;
  HTMLAttributes?: Record<string, unknown>;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      insertVideo: (options: InsertVideoOptions) => ReturnType;
    };
  }
}

export const videoNode = Node.create({
  name: "video",

  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      inline: false,
      controls: true,
      autoplay: false,
      loop: false,
      muted: false,
      preload: "metadata",
      playsInline: true,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) =>
          attributes.src ? { src: attributes.src } : {},
      },
      controls: {
        default: true,
        parseHTML: (element) => element.hasAttribute("controls"),
        renderHTML: (attributes) =>
          attributes.controls ? { controls: "" } : {},
      },
      autoplay: {
        default: false,
        parseHTML: (element) => element.hasAttribute("autoplay"),
        renderHTML: (attributes) =>
          attributes.autoplay ? { autoplay: "" } : {},
      },
      loop: {
        default: false,
        parseHTML: (element) => element.hasAttribute("loop"),
        renderHTML: (attributes) => (attributes.loop ? { loop: "" } : {}),
      },
      muted: {
        default: false,
        parseHTML: (element) => element.hasAttribute("muted"),
        renderHTML: (attributes) => (attributes.muted ? { muted: "" } : {}),
      },
      preload: {
        default: "metadata",
        parseHTML: (element) => element.getAttribute("preload") ?? "metadata",
        renderHTML: (attributes) => ({ preload: attributes.preload }),
      },
      playsInline: {
        default: true,
        parseHTML: (element) => element.hasAttribute("playsinline"),
        renderHTML: (attributes) =>
          attributes.playsInline ? { playsinline: "" } : {},
      },
      poster: {
        default: null,
        parseHTML: (element) => element.getAttribute("poster"),
        renderHTML: (attributes) =>
          attributes.poster ? { poster: attributes.poster } : {},
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) =>
          attributes.width ? { width: attributes.width } : {},
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) =>
          attributes.height ? { height: attributes.height } : {},
      },
    };
  },

  addCommands() {
    return {
      insertVideo:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
        getAttrs: (node) => {
          if (typeof node === "string") return false;
          const el = node as HTMLVideoElement;
          return {
            src: el.getAttribute("src"),
            controls: el.hasAttribute("controls"),
            autoplay: el.hasAttribute("autoplay"),
            loop: el.hasAttribute("loop"),
            muted: el.hasAttribute("muted"),
            preload: el.getAttribute("preload") ?? "metadata",
            playsInline: el.hasAttribute("playsinline"),
            poster: el.getAttribute("poster"),
            width: el.getAttribute("width"),
            height: el.getAttribute("height"),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const attrs = { ...this.options.HTMLAttributes, ...HTMLAttributes };
    // Only include width/height if present (number or string)
    if (attrs.width != null) attrs.width = String(attrs.width);
    if (attrs.height != null) attrs.height = String(attrs.height);
    return ["video", attrs];
  },
});
