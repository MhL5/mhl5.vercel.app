export const editorEnMessages = {
  // Undo/Redo
  undo: "Undo",
  redo: "Redo",

  // Text Formatting
  underline: "Underline",
  bold: "Bold",
  italic: "Italic",
  strikethrough: "Strikethrough",
  inlineCode: "Inline code",

  // Headings
  heading: "Heading",
  heading1: "Heading 1",
  heading2: "Heading 2",
  heading3: "Heading 3",
  heading4: "Heading 4",
  heading5: "Heading 5",
  heading6: "Heading 6",
  headingAriaLabel: (title: string, shortcut: string | null) =>
    `${title}${shortcut ? ` (${shortcut})` : ""}`,

  // Lists
  bulletList: "Bullet list",
  orderedList: "Ordered list",

  // Block Elements
  blockquote: "Blockquote",
  codeBlock: "Code block",
  paragraph: "Paragraph",
  horizontalRule: "Horizontal rule",
  hardBreak: "Hard break",

  // Links
  insertLink: "Insert link",
  url: "URL",
  enterLink: "Enter link",
  apply: "Apply",
  openInNewWindow: "Open in new window",
  removeLink: "Remove link",
  linkUrlError: "Must be a valid URL or hash (e.g. #section-id)",

  // Text Alignment
  alignText: "Align text",
  leftAlign: "Left align",
  centerAlign: "Center align",
  rightAlign: "Right align",
  justifyAlign: "Justify align",
  left: "Left",
  center: "Center",
  right: "Right",
  justify: "Justify",
  unset: "Unset",
  currentTextAlignment: (alignment: string | null) =>
    `Current text alignment: ${alignment || "unset"}`,

  // Tables
  insertTable: "Insert table",
  insertColumnBefore: "Insert column before",
  insertColumnAfter: "Insert column after",
  deleteColumn: "Delete column",
  addRowTop: "Add row top",
  addRowBottom: "Add row bottom",
  deleteRow: "Delete row",
  deleteTable: "Delete table",
  rows: "Rows",
  columns: "Columns",

  // Assets
  image: "Image",
  audio: "Audio",
  video: "Video",
  insertMedia: (mediaType: string) =>
    `insert an ${mediaType} into the document`,
  cancel: "Cancel",
  insert: "Insert",
  alt: "Alt",
  imageAlt: "Image Alt",
  upload: "Upload",
  urlTab: "URL",
  preview: "Preview",
  urlPlaceholder: "https://example.com/image.jpg",
  invalidMediaUrl: (mediaType: string) =>
    `Invalid ${mediaType} URL or ${mediaType} failed to load`,
  retry: "Retry",
  resetAndExitPreview: "Reset and Exit preview",
  addImageVideoAudio: "Add image, video, or audio",

  // YouTube
  addYoutubeVideo: "Add YouTube video",
  insertYoutubeVideo: "Insert a YouTube Video",
  youtubeDescription:
    "Paste the full YouTube URL to embed a video into your document.",
  youtubeUrl: "YouTube URL",
  youtubeUrlPlaceholder: "https://www.youtube.com/watch?v=...",
  addVideo: "Add Video",

  // Table of Contents
  insertTableOfContents: "Insert table of contents",
  noHeadingsInDocument: "No headings in document",
};
