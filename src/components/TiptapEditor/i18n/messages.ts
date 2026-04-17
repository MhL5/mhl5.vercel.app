const editorEnMessages = {
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
  FileItem: {
    error: {
      errorTitle: "Upload failed",
      errorMessage:
        "Something went wrong while uploading your file. Please try again.",
      retryLabel: "Retry",
      removeLabel: "Remove",
    },
    progress: {
      title: "Uploading…",
      secondsRemaining: "seconds remaining",
      minutesRemaining: "minutes remaining",
      hoursRemaining: "hours remaining",
      cancelUpload: "Cancel upload",
    },
    result: {
      delete: "delete",
    },
  },

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

const editorFaMessages = {
  // Undo/Redo
  undo: "واگرد",
  redo: "بازانجام",

  // Text Formatting
  underline: "زیرخط‌دار",
  bold: "پررنگ",
  italic: "مورب",
  strikethrough: "خط‌خورده",
  inlineCode: "کد درون‌متنی",

  // Headings
  heading: "تیتر",
  heading1: "تیتر ۱",
  heading2: "تیتر ۲",
  heading3: "تیتر ۳",
  heading4: "تیتر ۴",
  heading5: "تیتر ۵",
  heading6: "تیتر ۶",
  headingAriaLabel: (title: string, shortcut: string | null) =>
    `${title}${shortcut ? ` (${shortcut})` : ""}`,

  // Lists
  bulletList: "فهرست نشانه‌ای",
  orderedList: "فهرست شماره‌ای",

  // Block Elements
  blockquote: "بلوک نقل‌قول",
  codeBlock: "بلوک کد",
  paragraph: "پاراگراف",
  horizontalRule: "خط جداکننده",
  hardBreak: "شکست خط",

  // Links
  insertLink: "افزودن پیوند",
  url: "نشانی اینترنتی",
  enterLink: "نشانی پیوند را وارد کنید",
  apply: "اعمال",
  openInNewWindow: "باز کردن در پنجره جدید",
  removeLink: "حذف پیوند",
  linkUrlError: "نشانی اینترنتی یا هش باید معتبر باشد (مثال: ‎#section-id)",

  // Text Alignment
  alignText: "چینش متن",
  leftAlign: "چپ‌چین",
  centerAlign: "وسط‌چین",
  rightAlign: "راست‌چین",
  justifyAlign: "تمام‌چین",
  left: "چپ",
  center: "وسط",
  right: "راست",
  justify: "تمام‌چین",
  unset: "بدون چینش",
  currentTextAlignment: (alignment: string | null) =>
    `چینش فعلی متن: ${alignment || "بدون چینش"}`,

  // Tables
  insertTable: "افزودن جدول",
  insertColumnBefore: "افزودن ستون قبل",
  insertColumnAfter: "افزودن ستون بعد",
  deleteColumn: "حذف ستون",
  addRowTop: "افزودن ردیف در بالا",
  addRowBottom: "افزودن ردیف در پایین",
  deleteRow: "حذف ردیف",
  deleteTable: "حذف جدول",
  rows: "ردیف‌ها",
  columns: "ستون‌ها",

  // Assets
  image: "تصویر",
  audio: "صدا",
  video: "ویدیو",
  insertMedia: (mediaType: string) => `افزودن ${mediaType} به سند`,
  cancel: "انصراف",
  insert: "افزودن",
  alt: "متن جایگزین",
  imageAlt: "متن جایگزین تصویر",
  upload: "بارگذاری",
  urlTab: "نشانی اینترنتی",
  preview: "پیش‌نمایش",
  urlPlaceholder: "https://example.com/image.jpg",
  invalidMediaUrl: (mediaType: string) =>
    `نشانی اینترنتی ${mediaType} نامعتبر است یا بارگذاری آن با خطا روبه‌رو شد`,
  retry: "تلاش دوباره",
  resetAndExitPreview: "بازنشانی و خروج از پیش‌نمایش",
  addImageVideoAudio: "افزودن تصویر، ویدیو یا صدا",
  FileItem: {
    error: {
      errorTitle: "بارگذاری ناموفق",
      errorMessage: "در بارگذاری فایل مشکلی رخ داد. لطفاً دوباره امتحان کنید.",
      retryLabel: "تلاش دوباره",
      removeLabel: "حذف",
    },
    progress: {
      title: "در حال بارگذاری…",
      secondsRemaining: "ثانیه باقی‌مانده",
      minutesRemaining: "دقیقه باقی‌مانده",
      hoursRemaining: "ساعت باقی‌مانده",
      cancelUpload: "لغو بارگذاری",
    },
    result: {
      delete: "حذف",
    },
  },

  // YouTube
  addYoutubeVideo: "افزودن ویدیوی یوتیوب",
  insertYoutubeVideo: "افزودن ویدیوی یوتیوب به سند",
  youtubeDescription:
    "نشانی کامل ویدیوی یوتیوب را وارد کنید تا در سند درج شود.",
  youtubeUrl: "نشانی یوتیوب",
  youtubeUrlPlaceholder: "https://www.youtube.com/watch?v=...",
  addVideo: "افزودن ویدیو",

  // Table of Contents
  insertTableOfContents: "افزودن فهرست مطالب",
  noHeadingsInDocument: "عنوانی در سند یافت نشد",
};
const editorArMessages = {
  // Undo/Redo
  undo: "تراجع",
  redo: "إعادة",

  // Text Formatting
  underline: "تسطير",
  bold: "عريض",
  italic: "مائل",
  strikethrough: "مشطوب",
  inlineCode: "كود ضمن السطر",

  // Headings
  heading: "عنوان",
  heading1: "عنوان 1",
  heading2: "عنوان 2",
  heading3: "عنوان 3",
  heading4: "عنوان 4",
  heading5: "عنوان 5",
  heading6: "عنوان 6",
  headingAriaLabel: (title: string, shortcut: string | null) =>
    `${title}${shortcut ? ` (${shortcut})` : ""}`,

  // Lists
  bulletList: "قائمة نقطية",
  orderedList: "قائمة مرقّمة",

  // Block Elements
  blockquote: "اقتباس",
  codeBlock: "كتلة كود",
  paragraph: "فقرة",
  horizontalRule: "خط فاصل",
  hardBreak: "فصل سطر",

  // Links
  insertLink: "إدراج رابط",
  url: "الرابط",
  enterLink: "أدخل الرابط",
  apply: "تطبيق",
  openInNewWindow: "فتح في نافذة جديدة",
  removeLink: "إزالة الرابط",
  linkUrlError:
    "يجب أن يكون رابطًا صالحًا أو معرفًا صالحًا (مثال: ‎#section-id)",

  // Text Alignment
  alignText: "محاذاة النص",
  leftAlign: "محاذاة لليسار",
  centerAlign: "محاذاة للوسط",
  rightAlign: "محاذاة لليمين",
  justifyAlign: "محاذاة كاملة",
  left: "يسار",
  center: "وسط",
  right: "يمين",
  justify: "مضبوط",
  unset: "بدون محاذاة",
  currentTextAlignment: (alignment: string | null) =>
    `محاذاة النص الحالية: ${alignment || "بدون"}`,

  // Tables
  insertTable: "إدراج جدول",
  insertColumnBefore: "إدراج عمود قبل",
  insertColumnAfter: "إدراج عمود بعد",
  deleteColumn: "حذف عمود",
  addRowTop: "إضافة صف أعلى",
  addRowBottom: "إضافة صف أسفل",
  deleteRow: "حذف صف",
  deleteTable: "حذف الجدول",
  rows: "الصفوف",
  columns: "الأعمدة",

  // Assets
  image: "صورة",
  audio: "صوت",
  video: "فيديو",
  insertMedia: (mediaType: string) => `إدراج ${mediaType} في المستند`,
  cancel: "إلغاء",
  insert: "إدراج",
  alt: "نص بديل",
  imageAlt: "نص بديل للصورة",
  upload: "رفع",
  urlTab: "الرابط",
  preview: "معاينة",
  urlPlaceholder: "https://example.com/image.jpg",
  invalidMediaUrl: (mediaType: string) =>
    `رابط ${mediaType} غير صالح أو فشل تحميله`,
  retry: "إعادة المحاولة",
  resetAndExitPreview: "إعادة الضبط والخروج من المعاينة",
  addImageVideoAudio: "إضافة صورة أو فيديو أو صوت",
  FileItem: {
    error: {
      errorTitle: "فشل الرفع",
      errorMessage: "حدث خطأ أثناء رفع الملف. يرجى إعادة المحاولة.",
      retryLabel: "إعادة المحاولة",
      removeLabel: "حذف",
    },
    progress: {
      title: "جاري الرفع…",
      secondsRemaining: "ثوانٍ متبقية",
      minutesRemaining: "دقائق متبقية",
      hoursRemaining: "ساعات متبقية",
      cancelUpload: "إلغاء الرفع",
    },
    result: {
      delete: "حذف",
    },
  },

  // YouTube
  addYoutubeVideo: "إضافة فيديو من يوتيوب",
  insertYoutubeVideo: "إدراج فيديو يوتيوب في المستند",
  youtubeDescription:
    "الصق رابط فيديو يوتيوب الكامل لإدراج الفيديو في المستند.",
  youtubeUrl: "رابط يوتيوب",
  youtubeUrlPlaceholder: "https://www.youtube.com/watch?v=...",
  addVideo: "إضافة فيديو",

  // Table of Contents
  insertTableOfContents: "إدراج جدول المحتويات",
  noHeadingsInDocument: "لا توجد عناوين في المستند",
};

export const editorMessages: Record<
  "en" | "ar" | "fa",
  typeof editorEnMessages
> = {
  en: editorEnMessages,
  fa: editorFaMessages,
  ar: editorArMessages,
};
