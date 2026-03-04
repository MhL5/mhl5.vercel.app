import { tryCatch } from "@/registry/utils/tryCatch/tryCatch";
import { useState } from "react";
import { toast } from "sonner";

export type FileItem = {
  id: string;
  file: File;

  progressPercentage: number;
  uploadSpeedInSeconds: number;
  timeLeftInSeconds: number;
  startTime: number | null;

  error: string | null;
  abortController: AbortController | null;
};

export type UseFileUploadOptions<T> = {
  onUploadComplete: (result: T) => void;
  uploadHandler: (options: {
    file: FileItem["file"];
    signal: AbortController["signal"];
    onprogress: NonNullable<XMLHttpRequest["upload"]["onprogress"]>;
  }) => Promise<T>;
};

export function useFileUpload<T>({
  onUploadComplete,
  uploadHandler,
}: UseFileUploadOptions<T>) {
  const [files, setFiles] = useState<FileItem[]>([]);

  async function handleUpload(filesToUpload?: FileItem[]) {
    const filesToProcess = filesToUpload || files;
    if (filesToProcess.length === 0) return;

    const uploadPromises = filesToProcess
      .filter((file) => !file.error)
      .map(async (fileWithProgress) => {
        // Create AbortController for this specific upload
        const abortController = new AbortController();

        // Update the file with the abort controller
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileWithProgress.id
              ? { ...file, abortController }
              : file,
          ),
        );

        // upload the file and upload the file state on upload progress
        const [error, response] = await tryCatch<T>(
          uploadHandler({
            file: fileWithProgress.file,
            signal: abortController.signal,
            onprogress: (event) =>
              setFiles((prevFiles) =>
                prevFiles.map((file) => {
                  if (file.id !== fileWithProgress.id) return file;

                  if (!event.lengthComputable) return file;

                  const progress = event.loaded / event.total;
                  const startTime = file.startTime || Date.now();

                  const progressPercentage = progress * 100;

                  const elapsedMs = Date.now() - startTime;
                  const elapsedSec = elapsedMs / 1_000;
                  const uploadSpeedInSeconds =
                    elapsedSec > 0 ? event.loaded / elapsedSec : 0;

                  const uploadedBytes = progress * event.total;
                  const timeLeftInSeconds =
                    (event.total - uploadedBytes) / uploadSpeedInSeconds;

                  return {
                    ...file,
                    progressPercentage,
                    uploadSpeedInSeconds,
                    timeLeftInSeconds,
                    startTime,
                  } satisfies FileItem;
                }),
              ),
          }),
        );

        if (!error) {
          onUploadComplete(response);
          return toast.success(
            `${fileWithProgress.file.name} uploaded successfully.`,
          );
        }

        // Check if the error is due to request cancellation
        const isAborted =
          error.name === "AbortError" ||
          (error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === "ERR_CANCELED");

        // If aborted, we don't show an error toast as it was intentionally cancelled
        if (isAborted) return;

        setFiles((prevFiles) =>
          prevFiles.map((fileItem) => {
            if (fileItem.id !== fileWithProgress.id) return fileItem;

            fileItem.abortController?.abort();
            return {
              ...fileItem,
              error: `${error?.message || "unknown error!"}`,
            };
          }),
        );
        toast.error(
          `${fileWithProgress.file.name} upload failed! ${error?.message || "unknown error!"}`,
        );
      });

    const [error] = await tryCatch(Promise.all(uploadPromises));
    if (error)
      toast.error(
        `Upload failed! ${error instanceof Error ? error.message : "unknown error!"}`,
      );
  }

  function handleAdd(file: File[]) {
    if (!file || file.length === 0) return;

    const newFiles: FileItem[] = Array.from(file).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,

      progressPercentage: 0,
      uploadSpeedInSeconds: 0,
      timeLeftInSeconds: 0,
      startTime: Date.now(),

      error: null,
      abortController: null,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleUpload(newFiles);
  }

  function handleRemove(id: FileItem["id"]) {
    const fileToRemove = files.find((file) => file.id === id);
    // Abort the ongoing upload request if it exists
    if (fileToRemove?.abortController) fileToRemove.abortController.abort();
    setFiles(files.filter((file) => file.id !== id));
  }

  function handleRetry(id: FileItem["id"]) {
    const file = files.find((file) => file.id === id);
    if (!file) return toast.error("File not found");

    // Abort any existing upload for this file
    if (file.abortController) file.abortController.abort();

    const fileToRetry: FileItem = {
      ...file,

      timeLeftInSeconds: 0,
      progressPercentage: 0,
      uploadSpeedInSeconds: 0,
      startTime: Date.now(),

      error: null,
      abortController: null, // Will be set when upload starts
    };

    setFiles(
      files.map((file) =>
        file.id === id
          ? {
              ...file,
              ...fileToRetry,
            }
          : file,
      ),
    );
    handleUpload([fileToRetry]);
  }

  function handleAbortAll() {
    files.forEach(({ abortController }) =>
      abortController ? abortController.abort() : null,
    );
    setFiles([]);
  }

  return {
    files,
    handleAdd,
    handleRemove,
    handleRetry,
    handleAbortAll,
  };
}
