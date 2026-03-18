"use client";

import {
  type UseFileUploadOptions,
  useFileUpload,
} from "@/components/upload/hooks/useFileUpload";
import type { ReactNode } from "react";

type UploaderProps<T> = {
  children: (props: ReturnType<typeof useFileUpload<T>>) => ReactNode;
} & UseFileUploadOptions<T>;

/**
 * A render-prop component wrapper around `useFileUpload` that provides
 * file upload state and actions to its children.
 *
 * ⚠️ **Important: Generic inference limitation**
 * TypeScript cannot reliably infer the extra fields (`T`) for completed
 * file items when using this component, especially when those fields are
 * only present in `defaultValue` or `uploadHandler`.
 *
 * As a result, additional properties (e.g. `m`, `size`, etc.) may cause
 * type errors unless you explicitly provide the generic.
 *
 * ✅ **Recommended usage (explicit generic):**
 *
 * ```tsx
 * <Uploader<{ m: string }>
 *   defaultValue={[{ id: "1", url: "", m: "1" }]}
 *   onChange={() => {}}
 *   uploadHandler={async () => {
 *     return { url: "example", m: "1" };
 *   }}
 * >
 *   {({ files }) => (
 *     <div>{files.length}</div>
 *   )}
 * </Uploader>
 * ```
 *
 * ❌ **Without generic (may fail):**
 *
 * ```tsx
 * <Uploader
 *   defaultValue={[{ id: "1", url: "", m: "1" }]} // ❌ 'm' not recognized
 *   uploadHandler={async () => ({ url: "x", m: "1" })}
 * >
 *   {() => null}
 * </Uploader>
 * ```
 *
 * 💡 **Why?**
 * Because `T` is used across multiple props (including function parameters),
 * TypeScript cannot consistently infer it and often falls back to `{}`.
 *
 * 👉 Always pass a generic when adding custom fields to completed file items.
 */
export function Uploader<T>({ children, ...props }: UploaderProps<T>) {
  const fileUpload = useFileUpload<T>(props);
  return children(fileUpload);
}
