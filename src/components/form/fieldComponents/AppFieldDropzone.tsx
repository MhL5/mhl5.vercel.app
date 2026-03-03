import { useAppField } from "@/components/form/appForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropZone } from "@/components/upload/DropZone";
import { formatBytes } from "@/components/upload/utils";
import { tryCatch } from "@/registry/utils/tryCatch/tryCatch";
import { RefreshCcw, Wrench, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type UploadFileParams = {
  signal: AbortSignal;
  file: File;
  onUploadProgress: (options: {
    progressPercentage: number;
    uploadSpeed: number;
    timeLeftInSeconds: number;
  }) => void;
};

async function uploadFile({
  file,
  signal,
  onUploadProgress,
}: UploadFileParams) {
  const formData = new FormData();
  formData.append("file", file);

  return await new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const startTime = Date.now();

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      const progress = event.loaded / event.total;

      const progressPercentage = progress * 100;

      const elapsedMs = Date.now() - startTime;
      const elapsedSec = elapsedMs / 1_000;
      const uploadSpeed = elapsedSec > 0 ? event.loaded / elapsedSec : 0;

      const uploadedBytes = progress * event.total;
      const timeLeftInSeconds = (event.total - uploadedBytes) / uploadSpeed;

      onUploadProgress({
        progressPercentage,
        uploadSpeed,
        timeLeftInSeconds,
      });
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300)
        return resolve(new Response(xhr.responseText, { status: xhr.status }));
      reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
    };

    xhr.onerror = () => reject(new Error("Upload failed"));

    xhr.onabort = () => reject(new DOMException("Aborted", "AbortError"));

    signal.addEventListener("abort", () => xhr.abort());

    xhr.open("POST", "http://localhost:4000/upload");
    xhr.send(formData);
  });
}

type FileItem = {
  id: string;
  file: File;

  progressPercentage: number;
  uploadSpeed: number;
  timeLeftInSeconds: number;

  error: string | null;
  abortController: AbortController | null;
};

function useHandleUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);

  function handleAdd(file: File[]) {
    if (!file || file.length === 0) return;

    const newFiles: FileItem[] = Array.from(file).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,

      progressPercentage: 0,
      uploadSpeed: 0,
      timeLeftInSeconds: 0,

      error: null,
      abortController: null,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleUpload(newFiles);
  }

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

        const formData = new FormData();
        formData.append("files", fileWithProgress.file);

        // upload the file and upload the file state on upload progress
        const [error] = await tryCatch(
          uploadFile({
            file: fileWithProgress.file,
            signal: abortController.signal,
            onUploadProgress: ({
              progressPercentage,
              uploadSpeed,
              timeLeftInSeconds,
            }) =>
              setFiles((prevFiles) =>
                prevFiles.map((file) =>
                  file.id === fileWithProgress.id
                    ? {
                        ...file,
                        progressPercentage,
                        uploadSpeed,
                        timeLeftInSeconds,
                      }
                    : file,
                ),
              ),
          }),
        );

        if (!error)
          return toast.success(
            `${fileWithProgress.file.name} uploaded successfully.`,
          );

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
      uploadSpeed: 0,

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

/**
 * i like this field to accept a uploader fn
 * i want the fetcher logic to not be a part of this component, we might use axios ky xhr ..........
 *
 * we need to somehow sync the state of this component with the form, value and onChange(create delete update)
 */
export function AppFieldDropzone() {
  const { fieldControlProps } = useAppField();
  const { files, handleAdd, handleRemove, handleRetry } = useHandleUpload();

  return (
    <>
      <DropZone
        accept="image/*"
        disabled={false}
        multiple
        onFilesSelect={(file) => {
          handleAdd(file);
        }}
        inputId={fieldControlProps.id}
        isInvalid={fieldControlProps["aria-invalid"]}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, i) => (
            <FileItem
              remainingTime={file.timeLeftInSeconds}
              key={`${file.id}-${i}`}
              file={file.file}
              uploadSpeed={file.uploadSpeed}
              fileName={file.file.name}
              fileSize={file.file.size}
              progress={file.progressPercentage}
              fileError={file.error || ""}
              fileId={file.id}
              onRemove={handleRemove}
              disabled={false}
              onRetry={handleRetry}
            />
          ))}
        </div>
      )}
    </>
  );
}

type FileItemProps = {
  file: File;
  fileName: string;
  fileSize: number;
  progress: number;
  fileError?: string;
  fileId: string;
  uploadSpeed: number;
  remainingTime: number;

  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  disabled: boolean;
};

export default function FileItem({
  fileName,
  fileError,
  fileSize,
  fileId,
  progress,
  remainingTime,
  onRemove,
  onRetry,
  disabled,
}: FileItemProps) {
  if (fileError) {
    return (
      <div
        role="alert"
        className="flex items-center justify-between gap-2 rounded-lg border border-destructive p-3"
      >
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <p className="flex flex-wrap items-center gap-1 text-xs text-destructive">
            <span>{"uploadFailed"} </span>
            <span className="truncate">{fileName}</span>
          </p>
          <p className="truncate text-xs leading-4 text-destructive/70">
            {fileError}
          </p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              className="-me-2 size-8"
              onClick={() => onRetry(fileId)}
              disabled={disabled}
            >
              <span className="sr-only">{"FileItem.retryFile"}</span>
              <RefreshCcw className="size-4" aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{"FileItem.retryFile"}</TooltipContent>
        </Tooltip>
      </div>
    );
  }

  if (progress !== 100)
    return (
      <div className="space-y-2 rounded-lg border p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <p className="flex items-center gap-1 text-xs">
              <span>{"FileItem.uploading"} </span>
              <span className="truncate">{fileName}</span>
            </p>
            <p className="truncate text-xs leading-4 text-muted-foreground">
              <span>{`${progress}% • `}</span>
              <span>{remainingTime}</span>
            </p>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="-me-2 size-8"
                onClick={() => onRemove(fileId)}
                disabled={disabled}
              >
                <span className="sr-only">{"FileItem.cancelUpload"}</span>
                <X className="size-4" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{"FileItem.cancelUpload"}</TooltipContent>
          </Tooltip>
        </div>

        <Progress value={progress} max={100} />
      </div>
    );

  return (
    <div className="flex items-center gap-3 overflow-hidden rounded-lg border p-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Wrench className="size-5 text-foreground" />
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-[13px] font-medium">{fileName}</p>
        <p className="text-xs text-muted-foreground">{formatBytes(fileSize)}</p>
      </div>
    </div>
  );
}
