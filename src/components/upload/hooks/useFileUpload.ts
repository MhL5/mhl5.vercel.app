import { useOnUnMount } from "@/hooks/useOnUnMount";
import { isAbortedError } from "@/utils/error/isAbortedError";
import { useEffect, useEffectEvent, useState } from "react";
import { toast } from "sonner";

type FileItemBase = {
  id: string;
};

type FileItemUploading = FileItemBase & {
  status: "uploading";
  file: File;
  abortController: AbortController;
  progressInfo: {
    progressPercentage: number;
    uploadedBytes: number;
    bytesPerSecond: number;
    timeLeftInSeconds: number;
    startTime: number;
  };
};

type FileItemError = FileItemBase & {
  status: "error";
  file: File;
  error: { message: string }[];
};

type FileItemComplete<AdditionalInfo> = FileItemBase & {
  status: "completed";
  url: string;
} & AdditionalInfo;

export type FileItem<T> =
  | FileItemUploading
  | FileItemError
  | FileItemComplete<T>;

type UseFileUpload2Options<T> = {
  defaultValue: Omit<FileItemComplete<T>, "status">[];
  onChange: (files: FileItem<T>[]) => void;
  uploadHandler: (options: {
    file: File;
    signal: AbortController["signal"];
    onprogress: NonNullable<XMLHttpRequest["upload"]["onprogress"]>;
  }) => Promise<Omit<FileItemComplete<T>, "status" | "id">>;
};

export function useFileUpload<T>({
  defaultValue = [],
  onChange,
  uploadHandler,
}: UseFileUpload2Options<T>) {
  const [files, setFiles] = useState<FileItem<T>[]>(
    defaultValue.map((fileItem) => ({ ...fileItem, status: "completed" })),
  );

  /**
   * internal function, Handles the parallel file uploads process
   */
  async function _handleUpload(filesToUpload: FileItemUploading[]) {
    if (filesToUpload.length === 0) return;

    const uploadPromises = filesToUpload.map((fileItemUploading) =>
      uploadHandler({
        file: fileItemUploading.file,
        signal: fileItemUploading.abortController.signal,
        onprogress: (event) => {
          if (!event.lengthComputable) return;

          const progress = event.loaded / event.total;
          const progressPercentage = progress * 100;

          const elapsedMs =
            Date.now() - fileItemUploading.progressInfo.startTime;
          const elapsedSec = elapsedMs / 1_000;
          const bytesPerSecond = elapsedSec > 0 ? event.loaded / elapsedSec : 0;

          const uploadedBytes = progress * event.total;
          const remainingBytes = Math.max(event.total - uploadedBytes, 0);
          const timeLeftInSeconds =
            bytesPerSecond > 0 ? remainingBytes / bytesPerSecond : 0;

          setFiles((prevFiles) =>
            prevFiles.map((fileItem) =>
              fileItem.id === fileItemUploading.id
                ? {
                    ...fileItem,
                    progressInfo: {
                      startTime: fileItemUploading.progressInfo.startTime,
                      progressPercentage,
                      timeLeftInSeconds,
                      uploadedBytes,
                      bytesPerSecond,
                    },
                  }
                : fileItem,
            ),
          );
        },
      })
        .then((res) => {
          setFiles((prevFiles) =>
            prevFiles.map((fileItem) =>
              fileItem.id === fileItemUploading.id
                ? { ...fileItem, ...res, status: "completed" }
                : fileItem,
            ),
          );
          toast.success(
            `${fileItemUploading.file.name} uploaded successfully.`,
          );
        })
        .catch((error) => {
          // If the error is due to a file upload being aborted by our own logic, stop processing the error
          if (isAbortedError(error)) return;

          const errorMessage =
            error?.message ||
            "Something went wrong during upload! please try again or contact customer support.";

          setFiles((prevFiles) =>
            prevFiles.map((fileItem) =>
              fileItem.id === fileItemUploading.id
                ? ({
                    ...fileItemUploading,
                    status: "error",
                    error: [{ message: errorMessage }],
                  } satisfies FileItemError)
                : fileItem,
            ),
          );
          toast.error(`${fileItemUploading.file.name}: ${errorMessage}`);
        }),
    ) satisfies Promise<unknown>[];

    // parallel uploads
    await Promise.allSettled(uploadPromises);
  }

  /**
   * Adds new files and triggers the upload process.
   */
  function handleAdd(file: File[]) {
    if (!file || file.length === 0) return;

    const newFiles: FileItemUploading[] = Array.from(file).map(
      (file) =>
        ({
          id: crypto.randomUUID(),
          file,
          abortController: new AbortController(),
          status: "uploading",
          progressInfo: {
            progressPercentage: 0,
            uploadedBytes: 0,
            bytesPerSecond: 0,
            timeLeftInSeconds: 0,
            startTime: Date.now(),
          },
        }) satisfies FileItemUploading,
    );

    // add new files
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    _handleUpload(newFiles);
  }

  /**
   * Retries the upload for the file with that matches id param.
   */
  function handleRetry(id: FileItemBase["id"]) {
    const fileItem = files.find((fileItem) => fileItem.id === id);
    if (!fileItem) return void toast.error("File not found");

    // Abort any existing upload for this file
    if (fileItem.status === "uploading") fileItem.abortController.abort();

    const retryFileItem: FileItemUploading = {
      ...fileItem,
      status: "uploading",
      progressInfo: {
        timeLeftInSeconds: 0,
        progressPercentage: 0,
        uploadedBytes: 0,
        bytesPerSecond: 0,
        startTime: Date.now(),
      },
      abortController: new AbortController(),
    };

    // update files
    setFiles((prevFiles) =>
      prevFiles.map((fileItem) =>
        fileItem.id === id ? { ...fileItem, ...retryFileItem } : fileItem,
      ),
    );
    _handleUpload([retryFileItem]);
  }

  /**
   * Removes the file and aborts the upload
   */
  function handleRemove(id: FileItemBase["id"]) {
    const fileItem = files.find((fileItem) => fileItem.id === id);
    if (!fileItem) return void toast.error("File not found");

    if (fileItem.status === "uploading") fileItem.abortController.abort();

    setFiles((prevFiles) => prevFiles.filter((fileItem) => fileItem.id !== id));
  }

  /**
   * Aborts all file
   *
   *  if a fileItem includes "abortController" it will be aborted
   */
  function abortAll() {
    files.forEach(
      (fileItem) =>
        "abortController" in fileItem && fileItem.abortController.abort(),
    );
  }

  /**
   * Aborts and removes all the files
   */
  function handleAbortAll() {
    abortAll();
    setFiles([]);
  }

  // Abort all upload requests when the component unmounts
  useOnUnMount(() => abortAll());

  const onChangeEvent = useEffectEvent((files: FileItem<T>[]) =>
    onChange(files),
  );
  useEffect(() => {
    onChangeEvent(files);
  }, [files]);

  return {
    files,
    handleAbortAll,
    handleRemove,
    handleAdd,
    handleRetry,
  };
}
