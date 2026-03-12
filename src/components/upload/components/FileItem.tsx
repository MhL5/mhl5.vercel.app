import { Button } from "@/components/ui/button";
import { DotSeparator } from "@/components/ui/dot-separator";
import { FieldError } from "@/components/ui/field";
import { FileIcon } from "@/components/upload/components/FileItemIcon";
import type {
  FileItemError as FileItemErrorType,
  FileItemUploading as FileItemUploadingType,
} from "@/components/upload/hooks/useFileUpload";
import { isImage } from "@/components/upload/utils";
import { cn } from "@/lib/utils";
import Img from "@/registry/new-york/Img/Img";
import {
  formatBytes,
  formatSeconds,
} from "@/registry/utils/formatters/formatters";
import { Eye, RefreshCcw, Trash2, TriangleAlertIcon, X } from "lucide-react";
import { type ComponentProps, Fragment } from "react";

type FileItemProps = {
  "data-disabled": boolean;
  "data-error": boolean;
} & ComponentProps<"div">;

function FileItem({ className, ...props }: FileItemProps) {
  return (
    <div
      data-slot="FileItem"
      className={cn(
        "@container flex justify-between gap-3 rounded-md border p-2 data-[disabled=true]:opacity-50 data-[error=true]:bg-destructive/5 data-[error=true]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

type FileItemIConProps = (
  | {
      variant: "error";
    }
  | {
      variant: "uploading";
      progressPercentage: number;
    }
  | {
      variant: "completed";
      url: string;
      type: string;
    }
) &
  ComponentProps<"div">;

function FileItemIcon(props: FileItemIConProps) {
  const { variant, className, ...rest } = props;

  return (
    <div
      className={cn(
        "[&_svg:size-5] relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground [&_svg]:text-foreground",
        variant === "error" && "bg-destructive/20 [&_svg]:text-destructive",
        variant === "completed" && "",
        variant === "uploading" && "text-foreground",
        className,
      )}
      {...rest}
    >
      {variant === "error" && <TriangleAlertIcon />}
      {variant === "completed" && (
        <>
          {!isImage(props.url) ? (
            <Img
              src={props.url}
              alt=""
              fill
              sizes="200px"
              className="size-full object-cover"
            />
          ) : (
            <FileIcon fileType={props.type} fileName="" />
          )}
        </>
      )}
      {variant === "uploading" && (
        <span className="font-mono text-base font-semibold">
          {props.progressPercentage.toFixed(0)}
          <span className="text-xs">%</span>
        </span>
      )}
    </div>
  );
}

function FileItemContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("grid basis-full overflow-hidden", className)}
      {...props}
    />
  );
}

function FileItemTitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("mb-auto truncate text-sm font-medium", className)}
      {...props}
    />
  );
}
function FileItemDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-auto truncate text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
function FileItemFieldError({
  className,
  ...props
}: ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      className={cn("mt-auto truncate text-xs", className)}
      {...props}
    />
  );
}

function FileItemActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex gap-2", className)} {...props} />;
}

function FileItemError({
  error,
  file,
  id,
  disabled = false,
  onCancel,
  onRetry,
}: FileItemErrorType & {
  disabled?: boolean;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
}) {
  return (
    <FileItem data-error={true} data-disabled={disabled}>
      <FileItemIcon variant="error" />

      <FileItemContent>
        <FileItemTitle>{file.name}</FileItemTitle>
        <FileItemFieldError errors={error} />
      </FileItemContent>

      <FileItemActions>
        <Button
          size="icon-xs"
          variant="secondary"
          type="button"
          onClick={() => onRetry(id)}
          disabled={disabled}
          title="try again"
        >
          <RefreshCcw aria-hidden="true" />
        </Button>
        <Button
          size="icon-xs"
          type="button"
          variant="destructive"
          title="cancel"
          onClick={() => onCancel(id)}
          disabled={disabled}
        >
          <X aria-hidden="true" />
        </Button>
      </FileItemActions>
    </FileItem>
  );
}

function FileItemUploading({
  file,
  id,
  progressInfo,
  status,
  onCancel,
  disabled = false,
}: Omit<FileItemUploadingType, "abortController"> & {
  onCancel: (id: string) => void;
  disabled?: boolean;
}) {
  const descriptionData = [
    {
      key: "FileItemUploading-descriptionData-uploadedBytes",
      className: "",
      value: `${formatBytes(progressInfo.uploadedBytes)}/${formatBytes(file.size)}`,
    },
    {
      key: "FileItemUploading-descriptionData-bytesPerSecond",
      className: "@max-sm:hidden",
      value: `${formatBytes(progressInfo.bytesPerSecond)}/S`,
    },
    {
      key: "FileItemUploading-descriptionData-timeLeftInSeconds",
      className: "",
      value: formatSeconds(progressInfo.timeLeftInSeconds),
    },
  ];

  return (
    <FileItem
      data-disabled={disabled}
      className="relative isolate overflow-hidden"
      data-error={false}
    >
      <progress value={progressInfo.progressPercentage} className="sr-only" />
      <div
        aria-hidden
        style={{
          width: `${progressInfo.progressPercentage}%`,
        }}
        className="absolute top-1/2 left-0 z-0 h-full w-full -translate-x-0 -translate-y-1/2 bg-primary/5 transition-all duration-300 ease-out"
      />

      <FileItemIcon
        progressPercentage={progressInfo.progressPercentage}
        variant={status}
        className="z-10"
      />

      <FileItemContent className="z-10">
        <FileItemTitle>{file.name}</FileItemTitle>
        <FileItemDescription className="flex items-center gap-1">
          {descriptionData.map(({ className, key, value }) => (
            <Fragment key={key}>
              <span className={className}>{value}</span>
              <DotSeparator className={`last:hidden ${className}`} />
            </Fragment>
          ))}
        </FileItemDescription>
      </FileItemContent>

      <FileItemActions className="z-10">
        <Button
          size="icon-xs"
          type="button"
          variant="destructive"
          title="cancel upload"
          onClick={() => onCancel(id)}
          disabled={disabled}
        >
          <X aria-hidden="true" />
        </Button>
      </FileItemActions>
    </FileItem>
  );
}

type FileItemCompleteProps = {
  url: string;
  onDelete?: () => void;
  disabled?: boolean;
  className?: string;
  messages?: {
    delete: string;
    openInNewWindow: string;
  };
};

function FileItemComplete({
  url,
  disabled = false,
  onDelete,
  className,
  messages = {
    delete: "delete",
    openInNewWindow: "Open in new window",
  },
}: FileItemCompleteProps) {
  const { name, type = "" } = parseUrl(url);

  function parseUrl(url: string) {
    // Split the pathname into parts
    const parts = url.split("/");

    // Get the last part which is the file name with extension
    const fileNameWithExtension = parts[parts.length - 1];

    // Split the file name and extension
    const [name, type] = fileNameWithExtension.split(".");

    return {
      name: name || url,
      type,
    };
  }

  return (
    <FileItem data-error={false} data-disabled={disabled} className={className}>
      <FileItemIcon type={type} url={url} variant="completed" />

      <FileItemContent>
        <FileItemTitle>{name}</FileItemTitle>
        <FileItemDescription>{type}</FileItemDescription>
      </FileItemContent>

      <FileItemActions>
        <Button
          size="icon-xs"
          type="button"
          variant="secondary"
          className="ms-auto mb-auto"
          disabled={disabled}
          asChild
        >
          <a
            href={url}
            target="_blank"
            title={messages?.openInNewWindow}
            className="text-xs text-muted-foreground underline underline-offset-3"
          >
            <Eye />
          </a>
        </Button>
        {onDelete && (
          <Button
            size="icon-xs"
            type="button"
            variant="destructive"
            title={messages?.delete}
            className="mb-auto"
            onClick={() => onDelete?.()}
            disabled={disabled}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </Button>
        )}
      </FileItemActions>
    </FileItem>
  );
}

export { FileItemComplete, FileItemError, FileItemUploading };
