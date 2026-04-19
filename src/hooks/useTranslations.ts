// useTranslations.ts
import { toast } from "sonner";

const translations = {
  components: {
    upload: {
      FilePreview: {
        loadingPreview: "Loading preview...",
        failedToLoadImage: "Failed to load image",
        failedToLoadVideo: "Failed to load video",
        failedToLoadAudio: "Failed to load audio",
        failedToLoadPdf: "Failed to load PDF",
        unsupportedFileType: "Unsupported file type",
        unknownType: "Unknown type",
        videoNotSupported: "Your browser does not support the video tag.",
        audioNotSupported: "Your browser does not support the audio tag.",
        previewNotSupportedFor: "Preview not supported for",
      },
    },
  },
};

/**
 * A minimal `useTranslations` compatibility hook.
 *
 * This hook provides a lightweight translation API that mimics the public API
 * of `next-intl`, allowing you to call:
 *
 *   const t = useTranslations("Namespace");
 *   t("someKey");
 *
 * It reads translations from a simple local object and returns a function `t`
 * that resolves a translation key inside the selected namespace.
 *
 * The main goal of this hook is to make future migration to `next-intl` easier:
 * components can already use the same `useTranslations("ns")` pattern, and
 * later only the underlying implementation needs to be swapped out.
 *
 * - Supports namespaced translation lookup
 * - Warns when translations are missing
 * - Returns a fallback string for missing keys
 * - Can optionally support interpolation if desired
 *
 * This is intentionally simple so existing components don’t need to change
 * once you switch to a real i18n solution like `next-intl`.
 */
/**
 * Lightweight compatibility hook that mimics `next-intl`'s `useTranslations`.
 *
 * Accepts a dotted namespace path (e.g. "components.upload.FilePreview")
 * and returns a translation function `t(key)` that resolves values from
 * the translations object.
 *
 * This exists to keep the same developer API as `next-intl` so that
 * migrating later only requires replacing this implementation.
 */
function useTranslations(namespace: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const namespaceObject = namespace.split(".").reduce((obj: any, key) => {
    return obj?.[key];
  }, translations);

  return function t(key: string, params?: Record<string, string>) {
    let value = namespaceObject?.[key];

    if (!value) {
      toast.warning(`Missing translation: ${namespace}.${key}`);
      return `${namespace}.${key}`;
    }

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, v);
      });
    }

    return value;
  };
}

export { useTranslations };
