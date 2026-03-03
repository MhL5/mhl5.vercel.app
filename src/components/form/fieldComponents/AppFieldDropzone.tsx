import { useAppField } from "@/components/form/appForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropZone } from "@/components/upload-deprecated/DropZone";
import { formatBytes } from "@/components/upload-deprecated/utils";
import { useFileUpload } from "@/components/upload/hooks/useFileUpload";
import { RefreshCcw, Wrench, X } from "lucide-react";

type UploadFileParams = {
  signal: AbortSignal;
  file: File;
  onprogress: NonNullable<XMLHttpRequest["upload"]["onprogress"]>;
};

async function uploadFile({ file, signal, onprogress }: UploadFileParams) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await new Promise<Response>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      onprogress.call(xhr, event);
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

  return (await response.json()) as { file: { url: string }; message: string };
}

/**
 * i like this field to accept a uploader fn
 * i want the fetcher logic to not be a part of this component, we might use axios ky xhr ..........
 *
 * we need to somehow sync the state of this component with the form, value and onChange(create delete update)
 * it should also reset on form reset ...
 */
export function AppFieldDropzone() {
  const { fieldControlProps } = useAppField();
  const { files, handleAdd, handleRemove, handleRetry } = useFileUpload({
    onUploadComplete: (res) => {
      console.dir(res, { depth: Infinity });
    },
    uploadFile,
  });

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
              <span>{remainingTime.toFixed(0)} sec remaining</span>
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
