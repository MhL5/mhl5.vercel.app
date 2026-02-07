const SHORTCUTS = {
  // Essentials
  copy: { mac: "⌘C", win: "Ctrl+C" },
  cut: { mac: "⌘X", win: "Ctrl+X" },
  paste: { mac: "⌘V", win: "Ctrl+V" },
  pasteWithoutFormatting: { mac: "⌘⇧V", win: "Ctrl+Shift+V" },
  undo: { mac: "⌘Z", win: "Ctrl+Z" },
  redo: { mac: "⌘⇧Z", win: "Ctrl+Shift+Z" },
  lineBreak: { mac: "Shift+Enter", win: "Shift+Enter" },

  // Text formatting
  bold: { mac: "⌘B", win: "Ctrl+B" },
  italic: { mac: "⌘I", win: "Ctrl+I" },
  underline: { mac: "⌘U", win: "Ctrl+U" },
  strikethrough: { mac: "⌘⇧S", win: "Ctrl+Shift+S" },
  highlight: { mac: "⌘⇧H", win: "Ctrl+Shift+H" },
  code: { mac: "⌘E", win: "Ctrl+E" },

  // Paragraph formatting
  normalText: { mac: "⌘⌥0", win: "Ctrl+Alt+0" },
  heading1: { mac: "⌘⌥1", win: "Ctrl+Alt+1" },
  heading2: { mac: "⌘⌥2", win: "Ctrl+Alt+2" },
  heading3: { mac: "⌘⌥3", win: "Ctrl+Alt+3" },
  heading4: { mac: "⌘⌥4", win: "Ctrl+Alt+4" },
  heading5: { mac: "⌘⌥5", win: "Ctrl+Alt+5" },
  heading6: { mac: "⌘⌥6", win: "Ctrl+Alt+6" },
  orderedList: { mac: "⌘⇧7", win: "Ctrl+Shift+7" },
  bulletList: { mac: "⌘⇧8", win: "Ctrl+Shift+8" },
  taskList: { mac: "⌘⇧9", win: "Ctrl+Shift+9" },
  blockquote: { mac: "⌘⇧B", win: "Ctrl+Shift+B" },
  leftAlign: { mac: "⌘⇧L", win: "Ctrl+Shift+L" },
  centerAlign: { mac: "⌘⇧E", win: "Ctrl+Shift+E" },
  rightAlign: { mac: "⌘⇧R", win: "Ctrl+Shift+R" },
  justify: { mac: "⌘⇧J", win: "Ctrl+Shift+J" },
  codeBlock: { mac: "⌘⌥C", win: "Ctrl+Alt+C" },
  subscript: { mac: "⌘,", win: "Ctrl+," },
  superscript: { mac: "⌘.", win: "Ctrl+." },

  // Text selection
  selectAll: { mac: "⌘A", win: "Ctrl+A" },
} as const;

function isMacOS() {
  if (typeof window === "undefined") return false;

  const nav = navigator as Navigator & {
    userAgentData?: { platform: string };
  };

  return (
    nav.userAgentData?.platform === "macOS" ||
    navigator.platform.includes("Mac") ||
    navigator.userAgent.includes("Mac")
  );
}

export function getShortcut(key: keyof typeof SHORTCUTS) {
  const shortcut = isMacOS() ? SHORTCUTS?.[key]?.mac : SHORTCUTS?.[key]?.win;
  return shortcut || "";
}
