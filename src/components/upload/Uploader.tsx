"use client";

import {
  type UseFileUploadOptions,
  useFileUpload,
} from "@/components/upload/hooks/useFileUpload";
import type { ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UploaderProps<T extends Record<any, any>> = {
  children: (props: ReturnType<typeof useFileUpload<T>>) => ReactNode;
} & UseFileUploadOptions<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Uploader<T extends Record<any, any>>({
  children,
  ...props
}: UploaderProps<T>) {
  const fileUpload = useFileUpload<T>(props);
  return children(fileUpload);
}
