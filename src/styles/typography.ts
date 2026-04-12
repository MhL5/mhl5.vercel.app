import { cn } from "@/lib/utils";

const typography = cn(
  // Base
  "prose prose-custom selection:bg-primary! selection:text-primary-foreground! first:mt-0",
  // Code
  "prose-code:w-fit prose-code:rounded-sm prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:tracking-wide prose-code:text-secondary-foreground prose-code:before:content-none prose-code:after:content-none",
  // Pre
  "prose-pre:has-[code]:[direction:ltr] prose-pre:[&_code]:rounded-none prose-pre:[&_code]:bg-transparent prose-pre:[&_code]:p-0 prose-pre:[&_code]:tracking-normal",
  // Table
  "prose-table:first:mt-0 prose-table:first:mb-0 prose-th:border prose-th:p-2 prose-td:border prose-td:first:p-2 prose-table:[&_p]:m-0 prose-table:[&_p]:p-0",

  /**
   * Assets
   */
  // Img
  "prose-img:mx-auto prose-img:my-3 prose-img:rounded-sm",
  // Audio
  "[&_audio]:mx-auto [&_audio]:my-3 [&_audio]:w-full [&_audio]:rounded-sm",
  // Video
  "[&_video]:mx-auto [&_video]:my-3 [&_video]:w-full [&_video]:rounded-sm",
  // Iframe
  "[&_iframe]:mx-auto [&_iframe]:my-3 [&_iframe]:w-full [&_iframe]:rounded-sm",
);

const snippetsTypography = cn(
  typography,
  "prose-pre:bg-transparent prose-pre:p-0",
);

const tiptapTypography = cn(
  typography,
  "[&_.tableWrapper]:my-6 [&_.tableWrapper]:overflow-x-auto [&_.tableWrapper]:overflow-y-hidden [&_.tableWrapper]:rounded-sm [&_.tableWrapper]:border [&_.tableWrapper]:border-border [&_.tableWrapper]:[direction:ltr]",

  /**
   * Assets
   */
  // [data-youtube-video]
  "[&_[data-youtube-video]]:mx-auto [&_[data-youtube-video]]:my-3 [&_[data-youtube-video]]:w-full [&_[data-youtube-video]]:rounded-sm [&_[data-youtube-video]]:bg-muted",
);

export { snippetsTypography, tiptapTypography };
