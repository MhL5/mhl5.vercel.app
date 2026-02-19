import type { editorEnMessages } from "./en";

export const editorFaMessages = {
  // Undo/Redo
  undo: "بازگردانی",
  redo: "بازانجام",

  // Text Formatting
  underline: "زیرخط",
  bold: "ضخیم",
  italic: "کج",
  strikethrough: "خط‌خورده",
  inlineCode: "کد درون‌خطی",

  // Headings
  heading: "عنوان",
  heading1: "عنوان ۱",
  heading2: "عنوان ۲",
  heading3: "عنوان ۳",
  heading4: "عنوان ۴",
  heading5: "عنوان ۵",
  heading6: "عنوان ۶",
  headingAriaLabel: (title: string, shortcut: string | null) =>
    `${title}${shortcut ? ` (${shortcut})` : ""}`,

  // Lists
  bulletList: "فهرست نقطه‌ای",
  orderedList: "فهرست شماره‌دار",

  // Block Elements
  blockquote: "نقل‌قول",
  codeBlock: "بلوک کد",
  paragraph: "پاراگراف",
  horizontalRule: "خط افقی",
  hardBreak: "شکست سخت",

  // Links
  insertLink: "درج پیوند",
  url: "نشانی اینترنتی",
  enterLink: "پیوند را وارد کنید",
  apply: "اعمال",
  openInNewWindow: "باز کردن در پنجره جدید",
  removeLink: "حذف پیوند",
  linkUrlError:
    "باید یک نشانی اینترنتی معتبر یا هش معتبر باشد (مثال: #section-id)",

  // Text Alignment
  alignText: "تراز متن",
  leftAlign: "تراز چپ",
  centerAlign: "تراز وسط",
  rightAlign: "تراز راست",
  justifyAlign: "تراز کامل",
  left: "چپ",
  center: "وسط",
  right: "راست",
  justify: "کامل",
  unset: "حذف تراز",
  currentTextAlignment: (alignment: string | null) =>
    `تراز فعلی متن: ${alignment || "پیش فرض"}`,

  // Tables
  insertTable: "درج جدول",
  insertColumnBefore: "درج ستون قبل",
  insertColumnAfter: "درج ستون بعد",
  deleteColumn: "حذف ستون",
  addRowTop: "افزودن ردیف بالا",
  addRowBottom: "افزودن ردیف پایین",
  deleteRow: "حذف ردیف",
  deleteTable: "حذف جدول",
  rows: "ردیف‌ها",
  columns: "ستون‌ها",

  // Assets
  image: "تصویر",
  audio: "صدا",
  video: "ویدیو",
  insertMedia: (mediaType: string) => `درج یک ${mediaType} در سند`,
  cancel: "لغو",
  insert: "درج",
  alt: "متن جایگزین",
  imageAlt: "متن جایگزین تصویر",
  upload: "آپلود",
  urlTab: "نشانی اینترنتی",
  preview: "پیش‌نمایش",
  urlPlaceholder: "https://example.com/image.jpg",
  invalidMediaUrl: (mediaType: string) =>
    `نشانی اینترنتی ${mediaType} نامعتبر است یا بارگذاری ${mediaType} با خطا مواجه شد`,
  retry: "تلاش مجدد",
  resetAndExitPreview: "بازنشانی و خروج از پیش‌نمایش",
  addImageVideoAudio: "افزودن تصویر، ویدیو یا صدا",
  FileItem: {
    error: {
      errorTitle: "آپلود ناموفق بود",
      errorMessage: "در آپلود فایل مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      retryLabel: "تلاش مجدد",
      removeLabel: "حذف",
    },
    progress: {
      title: "در حال آپلود…",
      secondsRemaining: "ثانیه مانده",
      minutesRemaining: "دقیقه مانده",
      hoursRemaining: "ساعت مانده",
      cancelUpload: "لغو آپلود",
    },
    result: {
      delete: "حذف",
    },
  },

  // YouTube
  addYoutubeVideo: "افزودن ویدیو یوتیوب",
  insertYoutubeVideo: "درج یک ویدیو یوتیوب",
  youtubeDescription:
    "نشانی کامل یوتیوب را برای جاسازی ویدیو در سند خود وارد کنید.",
  youtubeUrl: "نشانی یوتیوب",
  youtubeUrlPlaceholder: "https://www.youtube.com/watch?v=...",
  addVideo: "افزودن ویدیو",

  // Table of Contents
  insertTableOfContents: "درج فهرست مطالب",
  noHeadingsInDocument: "هیچ عنوانی در سند وجود ندارد",
} satisfies typeof editorEnMessages;
