import { Button } from "@/components/ui/button";
import { DotSeparator } from "@/components/ui/dot-separator";
import { FieldError } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/registry/utils/formatters/formatters";
import { Trash2Icon } from "lucide-react";
import {
  type ComponentProps,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

type Error = Array<{ message: string }>;

type FileType = "image" | "video" | "audio" | "pdf";

type FilePreviewProps = (
  | {
      file: File;
    }
  | {
      file: string;
      fileType: FileType;
    }
) & {
  className?: string;
  onRemove: () => void;
  disabled?: boolean;
  onError?: (error: Error) => void;
};

function FilePreview(props: FilePreviewProps) {
  if ("fileType" in props) return <FilePreviewUrl {...props} />;

  return <FilePreviewFile {...props} />;
}

function FilePreviewUrl({
  file,
  fileType,
  className,
  disabled,
  onRemove,
  onError,
}: Extract<FilePreviewProps, { file: string }>) {
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations("components.upload.FilePreview");

  function handleError(type: string) {
    const err = [{ message: t("failedToLoad", { fileType: type }) }];
    setError(err);
    onError?.(err);
  }

  if (error)
    return (
      <FilePreviewContainer className={className}>
        <FieldError errors={error} />
      </FilePreviewContainer>
    );

  return (
    <RenderPreview
      src={file}
      fileType={fileType}
      className={className}
      disabled={disabled}
      onRemove={onRemove}
      onError={handleError}
    />
  );
}

type RenderPreviewProps = {
  src: string;
  fileType: FileType | null;
  fileName?: string;
  className?: string;
  disabled?: boolean;
  fileSize?: number;
  onRemove: () => void;
  onError: (type: string) => void;
};

function RenderPreview({
  src,
  fileType,
  fileName,
  className,
  disabled,
  fileSize,
  onRemove,
  onError,
}: RenderPreviewProps) {
  const t = useTranslations("components.upload.FilePreview");

  if (fileType === "image")
    return (
      <FilePreviewContainer className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={fileName ?? ""}
          className="size-full object-contain"
          onError={() => onError("image")}
        />
        <FilePreviewRemoveButton onClick={onRemove} disabled={disabled} />
      </FilePreviewContainer>
    );

  if (fileType === "video")
    return (
      <FilePreviewContainer className={className}>
        <video
          src={src}
          controls
          className="size-full rounded-lg"
          onError={() => onError("video")}
        >
          {t("htmlElementNotSupported", { element: "Video" })}
        </video>
        <FilePreviewRemoveButton onClick={onRemove} disabled={disabled} />
      </FilePreviewContainer>
    );

  if (fileType === "audio")
    return (
      <FilePreviewContainer className={className}>
        <audio
          src={src}
          controls
          className="w-full"
          onError={() => onError("audio")}
        >
          {t("htmlElementNotSupported", { element: "Audio" })}
        </audio>
        <FilePreviewRemoveButton onClick={onRemove} disabled={disabled} />
      </FilePreviewContainer>
    );

  if (fileType === "pdf")
    return (
      <FilePreviewContainer className={className}>
        <iframe
          src={`${src}#toolbar=0`}
          title={fileName}
          className="size-full"
          onError={() => onError("pdf")}
        />
        <FilePreviewRemoveButton onClick={onRemove} disabled={disabled} />
      </FilePreviewContainer>
    );

  return (
    <FilePreviewContainer
      className={`${className} grid place-content-center gap-1 overflow-hidden text-center`}
    >
      <p className="text-sm font-medium text-foreground">
        {t("previewNotSupportedFor")} {fileName || "Unknown!"}
      </p>
      <p className="text-xs text-muted-foreground">
        {!!fileSize && (
          <>
            {formatBytes(fileSize)} <DotSeparator />
          </>
        )}
        {fileType || t("unknownType")}
      </p>
      <FilePreviewRemoveButton onClick={onRemove} disabled={disabled} />
    </FilePreviewContainer>
  );
}

function FilePreviewFile({
  onRemove,
  disabled,
  file,
  className = "",
  onError,
}: Extract<FilePreviewProps, { file: File }>) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileType, setFileType] = useState<FileType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const t = useTranslations("components.upload.FilePreview");

  function handleError(fileType: string) {
    const error = [{ message: t("failedToLoad", { fileType }) }];
    setError(error);
    onError?.(error);
  }

  const onFileChangeEffectEvent = useEffectEvent(() => {
    if (file.type.startsWith("image/")) return setFileType("image");
    if (file.type.startsWith("video/")) return setFileType("video");
    if (file.type.startsWith("audio/")) return setFileType("audio");
    if (file.type === "application/pdf") return setFileType("pdf");
    return setFileType(null);
  });

  const onPreviewUrlChangeEffectEvent = useEffectEvent((url: string) =>
    setPreviewUrl(url),
  );

  useEffect(() => {
    if (!file) return;

    onFileChangeEffectEvent();

    const url = URL.createObjectURL(file);
    onPreviewUrlChangeEffectEvent(url);

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!previewUrl)
    return (
      <FilePreviewContainer className="p-0">
        <Skeleton aria-label={t("loadingPreview")} className="size-full" />
      </FilePreviewContainer>
    );

  if (error)
    return (
      <FilePreviewContainer className={className}>
        <FieldError errors={error} />
      </FilePreviewContainer>
    );

  return (
    <RenderPreview
      src={previewUrl}
      fileType={fileType}
      fileSize={file.size}
      fileName={file.name}
      className={className}
      disabled={disabled}
      onRemove={onRemove}
      onError={handleError}
    />
  );
}

function FilePreviewContainer({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative isolate flex h-50 w-full items-center justify-center rounded-lg border bg-card p-3 text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

function FilePreviewRemoveButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const t = useTranslations("components.upload.FilePreview");

  return (
    <Button
      variant="destructive"
      title={t("remove")}
      className={cn("absolute inset-e-3 top-3", className)}
      {...props}
    >
      <Trash2Icon />
    </Button>
  );
}

export { FilePreview };
