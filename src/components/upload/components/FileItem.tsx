import { Button } from "@/components/ui/button";
import { DotSeparator } from "@/components/ui/dot-separator";
import { FieldError } from "@/components/ui/field";
import { FileIcon } from "@/components/upload/components/FileItemIcon";
import type {
  FileItemComplete as FileItemCompleteType,
  FileItemError as FileItemErrorType,
  FileItem as FileItemType,
  FileItemUploading as FileItemUploadingType,
} from "@/components/upload/hooks/useFileUpload";
import { isImage } from "@/components/upload/utils";
import { cn } from "@/lib/utils";
import Img from "@/registry/new-york/Img/Img";
import {
  formatBytes,
  formatSeconds,
} from "@/registry/utils/formatters/formatters";
import { RefreshCcw, Trash2, TriangleAlertIcon, X } from "lucide-react";
import { type ComponentProps, Fragment, type ReactNode } from "react";

/**
 * FileItem UI:
 *  - FileItemContainer: flex container
 *  - FileItemIcon: renders icon for different variants
 *  - FileItemContent: a grid container
 *  - FileItemTitle: a p styled as title
 *  - FileItemDescription: a p for descriptions
 *  - FileItemFieldError: for rendering errors
 *
 *
 * FileItem components: useful for single uploads especially when dropZone is remove when upload starts
 *  - FileItemError
 *  - FileItemUploading
 *  - FileItemComplete
 *
 * FileItem wrapper: simple wrappers for removing boiler plate
 *  - FileItemCompact
 *  - FileItemLg
 */

type FileItemContainerProps = {
  "data-disabled": boolean;
  "data-error": boolean;
  variant?: "compact" | "lg";
} & ComponentProps<"div">;

function FileItemContainer({
  variant = "compact",
  className,
  ...props
}: FileItemContainerProps) {
  return (
    <div
      data-slot="FileItem"
      className={cn(
        "@container relative isolate flex justify-between gap-3 overflow-hidden rounded-md border p-2 data-[disabled=true]:opacity-50 data-[error=true]:border-destructive/10 data-[error=true]:bg-destructive/5 data-[error=true]:text-destructive",
        variant === "lg" && "grid min-h-45 place-content-center justify-center",
        variant === "compact" && "",
        className,
      )}
      {...props}
    />
  );
}

type FileItemIConProps = (
  | {
      status: "error";
    }
  | {
      status: "uploading";
      progressPercentage: number;
    }
  | {
      status: "completed";
      url: string;
      type: string;
    }
) & {
  variant?: "lg" | "compact";
} & ComponentProps<"div">;

function FileItemIcon(props: FileItemIConProps) {
  const { status, variant = "compact", className, ...rest } = props;

  // remove "progressPercentage" from rest if status is "uploading"
  if (status === "uploading")
    delete (rest as { progressPercentage?: number }).progressPercentage;

  return (
    <div
      className={cn(
        "[&_svg:size-5] relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground [&_svg]:text-foreground",
        status === "error" && "bg-destructive/20 [&_svg]:text-destructive",
        status === "uploading" && "text-foreground",
        variant === "lg" && "mx-auto rounded-full",
        variant === "compact" && "",
        className,
      )}
      {...rest}
    >
      {status === "error" && <TriangleAlertIcon />}
      {status === "completed" && (
        <>
          {isImage(props.url) ? (
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
      {status === "uploading" && (
        <span className="font-mono text-base font-semibold">
          {props.progressPercentage.toFixed(0)}
          <span className="text-xs">%</span>
        </span>
      )}
    </div>
  );
}

function FileItemContent({
  className,
  variant = "compact",
  ...props
}: ComponentProps<"div"> & { variant?: "lg" | "compact" }) {
  return (
    <div
      className={cn(
        "grid basis-full overflow-hidden",
        variant === "lg" && "gap-1.5 text-center",
        variant === "compact" && "",
        className,
      )}
      {...props}
    />
  );
}

function FileItemTitle({
  className,
  variant = "compact",
  ...props
}: ComponentProps<"p"> & { variant?: "lg" | "compact" }) {
  return (
    <p
      className={cn(
        "mb-auto truncate text-sm font-medium",
        variant === "compact" && "",
        variant === "lg" && "mx-auto w-full max-w-[44ch]",
        className,
      )}
      {...props}
    />
  );
}

function FileItemDescription({
  className,
  variant = "compact",
  ...props
}: ComponentProps<"p"> & { variant?: "lg" | "compact" }) {
  return (
    <p
      className={cn(
        "mt-auto flex gap-2 truncate text-xs text-muted-foreground",
        variant === "lg" && "mx-auto",
        variant === "compact" && "",
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
  return <FieldError className={cn("mt-auto text-xs", className)} {...props} />;
}

function FileItemActions({
  className,
  variant = "compact",
  ...props
}: ComponentProps<"div"> & { variant?: "compact" | "lg" }) {
  return (
    <div
      className={cn(
        "flex gap-2",
        variant === "lg" && "absolute end-2 top-2",
        variant === "compact" && "",
        className,
      )}
      {...props}
    />
  );
}

// FileItem components
// ---------------------------------------------------------------------

type FileItemErrorProps = FileItemErrorType & {
  disabled?: boolean;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  variant?: "compact" | "lg";
};

function FileItemError({
  error,
  file,
  id,
  disabled = false,
  onCancel,
  onRetry,
  variant = "compact",
  status,
}: FileItemErrorProps) {
  // the field error will render a list of errors but we don't have enough space here, we wanna render a single p
  const errorsString = error.map(({ message }) => message).join(", ");

  return (
    <FileItemContainer
      data-error={true}
      data-disabled={disabled}
      variant={variant}
    >
      <FileItemIcon status={status} variant={variant} />

      <FileItemContent variant={variant}>
        <FileItemTitle variant={variant}>{file.name}</FileItemTitle>
        <FileItemFieldError
          className={cn(
            "",
            variant === "lg" &&
              "mx-auto line-clamp-2 w-full max-w-[34ch] gap-1.5 text-center",
            variant === "compact" && "truncate",
          )}
          title={errorsString}
          errors={[
            {
              message: errorsString,
            },
          ]}
        />
      </FileItemContent>

      <FileItemActions variant={variant}>
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
    </FileItemContainer>
  );
}

type FileItemUploadingProps = Omit<FileItemUploadingType, "abortController"> & {
  onCancel: (id: string) => void;
  disabled?: boolean;
  variant?: "lg" | "compact";
  className?: string;
};

function FileItemUploading({
  file,
  id,
  progressInfo,
  status,
  onCancel,
  disabled = false,
  variant = "compact",
  className,
}: FileItemUploadingProps) {
  const descriptionData = [
    {
      key: "FileItemUploading-descriptionData-uploadedBytes",
      className: "",
      value: `${formatBytes(progressInfo.uploadedBytes)}/${formatBytes(file.size)}`,
    },
    {
      key: "FileItemUploading-descriptionData-bytesPerSecond",
      className: variant === "lg" ? "" : "@max-sm:hidden",
      value: `${formatBytes(progressInfo.bytesPerSecond)}/S`,
    },
    {
      key: "FileItemUploading-descriptionData-timeLeftInSeconds",
      className: "",
      value: formatSeconds(progressInfo.timeLeftInSeconds),
    },
  ];

  return (
    <FileItemContainer
      data-disabled={disabled}
      variant={variant}
      className={className}
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
        status={status}
        variant={variant}
        className="z-10"
      />

      <FileItemContent variant={variant} className="z-10">
        <FileItemTitle variant={variant}>{file.name}</FileItemTitle>
        <FileItemDescription
          className={cn(
            "flex items-center gap-1",
            variant === "lg" && "mx-auto",
            variant === "compact" && "",
          )}
        >
          {descriptionData.map(({ className, key, value }) => (
            <Fragment key={key}>
              <span className={className}>{value}</span>
              <DotSeparator className={`last:hidden ${className}`} />
            </Fragment>
          ))}
        </FileItemDescription>
      </FileItemContent>

      <FileItemActions variant={variant} className="z-10">
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
    </FileItemContainer>
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
} & (
  | { variant?: "compact"; children?: never }
  | { variant: "lg"; children: ReactNode }
);

function FileItemComplete(props: FileItemCompleteProps) {
  const {
    url,
    disabled = false,
    onDelete,
    className,
    variant = "compact",
    messages = {
      delete: "delete",
      openInNewWindow: "Open in new window",
    },
  } = props;
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
    <FileItemContainer
      data-error={false}
      data-disabled={disabled}
      className={className}
      variant={variant}
    >
      {variant === "compact" && (
        <>
          <FileItemIcon
            type={type}
            url={url}
            status="completed"
            variant={variant}
          />

          <FileItemContent variant={variant}>
            <FileItemTitle variant={variant}>{name}</FileItemTitle>
            <FileItemDescription variant={variant}>{type}</FileItemDescription>
          </FileItemContent>
        </>
      )}
      {props.variant === "lg" && props.children}

      {onDelete && (
        <FileItemActions variant={variant}>
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
        </FileItemActions>
      )}
    </FileItemContainer>
  );
}

type FileItemLgProps<T> = {
  onDelete: () => void;
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
  file: FileItemType<T>;
  renderOnComplete: (file: FileItemCompleteType<T>) => ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FileItemLg<T extends Record<any, any>>(props: FileItemLgProps<T>) {
  const { onCancel, onDelete, onRetry, file } = props;
  const variant = "lg";

  if (file?.status === "uploading")
    return (
      <FileItemUploading variant={variant} onCancel={onCancel} {...file} />
    );

  if (file?.status === "error")
    return (
      <FileItemError
        variant={variant}
        onRetry={onRetry}
        onCancel={onCancel}
        {...file}
      />
    );

  return (
    <FileItemComplete variant={variant} onDelete={onDelete} {...file}>
      {props.renderOnComplete(file)}
    </FileItemComplete>
  );
}

type FileItemCompactProps<T> = {
  onDelete: () => void;
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
  file: FileItemType<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FileItemCompact<T extends Record<any, any>>(
  props: FileItemCompactProps<T>,
) {
  const { onCancel, onDelete, onRetry, file } = props;
  const variant = "compact";

  if (file?.status === "uploading")
    return (
      <FileItemUploading variant={variant} onCancel={onCancel} {...file} />
    );

  if (file?.status === "error")
    return (
      <FileItemError
        variant={variant}
        onRetry={onRetry}
        onCancel={onCancel}
        {...file}
      />
    );

  return <FileItemComplete variant={variant} onDelete={onDelete} {...file} />;
}

export {
  FileItemCompact,
  FileItemLg,
  FileItemComplete,
  FileItemError,
  FileItemUploading,
};
