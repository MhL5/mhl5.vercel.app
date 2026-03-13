"use client";

import {
  type UseFileUploadOptions,
  useFileUpload,
} from "@/components/upload/hooks/useFileUpload";
import type { ReactNode } from "react";

type UploaderProps<T extends Record<string, unknown>> = {
  children: (props: ReturnType<typeof useFileUpload<T>>) => ReactNode;
} & UseFileUploadOptions<T>;

export function Uploader<T extends Record<string, unknown>>({
  children,
  ...props
}: UploaderProps<T>) {
  const fileUpload = useFileUpload<T>(props);
  return children(fileUpload);
}
