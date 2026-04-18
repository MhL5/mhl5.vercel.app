import { DotSeparator } from "@/components/ui/dot-separator";
import { FieldError } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/registry/utils/formatters/formatters";
import {
  type ComponentProps,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

type Error = Array<{ message: string }>;

type FileType = "image" | "video" | "audio" | "pdf";

const defaultMessages = {
  loadingPreview: "Loading preview...",
  failedToLoadImage: "Failed to load image",
  failedToLoadVideo: "Failed to load video",
  failedToLoadAudio: "Failed to load audio",
  failedToLoadPdf: "Failed to load PDF",
  unsupportedFileType: "Unsupported file type",
  unknownType: "Unknown type",
  videoNotSupported: "Your browser does not support the video tag.",
  audioNotSupported: "Your browser does not support the audio tag.",
  previewNotSupportedFor: "Preview not supported for",
};

type FilePreviewProps = {
  file: File;
  className?: string;
  onError?: (error: Error) => void;
  messages?: typeof defaultMessages;
};

function FilePreview({
  file,
  className = "",
  onError,
  messages: customMessages,
}: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileType, setFileType] = useState<FileType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const messages = { ...defaultMessages, ...customMessages };

  function handleError(fileType: string) {
    let message = `Failed to load ${fileType}`;
    if (fileType === "image") message = messages.failedToLoadImage;
    if (fileType === "video") message = messages.failedToLoadVideo;
    if (fileType === "audio") message = messages.failedToLoadAudio;
    if (fileType === "pdf") message = messages.failedToLoadPdf;

    const error = [{ message }];
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
        <Skeleton aria-label={messages.loadingPreview} className="size-full" />
      </FilePreviewContainer>
    );

  if (error)
    return (
      <FilePreviewContainer className={className}>
        <FieldError errors={error} />
      </FilePreviewContainer>
    );

  if (fileType === "image")
    return (
      <FilePreviewContainer className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={file.name}
          className="size-full object-contain"
          onError={() => handleError("image")}
        />
      </FilePreviewContainer>
    );

  if (fileType === "video")
    return (
      <FilePreviewContainer className={className}>
        <video
          src={previewUrl}
          controls
          className="size-full rounded-lg"
          onError={() => handleError("video")}
        >
          {messages.videoNotSupported}
        </video>
      </FilePreviewContainer>
    );

  if (fileType === "audio")
    return (
      <FilePreviewContainer className={className}>
        <audio
          src={previewUrl}
          controls
          className="w-full"
          onError={() => handleError("audio")}
        >
          {messages.audioNotSupported}
        </audio>
      </FilePreviewContainer>
    );

  if (fileType === "pdf")
    return (
      <FilePreviewContainer className={className}>
        <iframe
          src={`${previewUrl}#toolbar=0`}
          title={file.name}
          className="size-full"
          onError={() => handleError("pdf")}
        />
      </FilePreviewContainer>
    );

  // Unsupported file type
  return (
    <FilePreviewContainer
      className={`${className} grid place-content-center gap-1 overflow-hidden text-center`}
    >
      <p className="text-sm font-medium text-foreground">
        {messages.previewNotSupportedFor} {file.name}
      </p>
      <p className="text-xs text-muted-foreground">
        {formatBytes(file.size)} <DotSeparator />{" "}
        {file.type || messages.unknownType}
      </p>
    </FilePreviewContainer>
  );
}

function FilePreviewContainer({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-50 w-full items-center justify-center rounded-lg border bg-card p-3 text-card-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { FilePreview };
