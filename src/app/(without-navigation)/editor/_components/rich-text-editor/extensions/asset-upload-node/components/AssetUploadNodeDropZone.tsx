import DropZone, { type DropZoneProps } from "@/components/upload/DropZone";
import { useUploadFile } from "@/components/upload/api/uploadFile";
import { FileItem } from "@/components/upload/components/FileItem";
import { cn } from "@/lib/utils";

export function AssetUploadNodeDropZone({
  accept,
  onUploadSuccess,
  isInvalid,
}: {
  accept: DropZoneProps["accept"];
  onUploadSuccess: (url: string) => void;
  isInvalid: boolean;
}) {
  const { uploadState, handleUpload, handleRemove, handleRetry } =
    useUploadFile({ onSuccess: onUploadSuccess });

  const showFileItem =
    uploadState.file &&
    (uploadState.progressPercentage < 100 || Boolean(uploadState.error));

  if (showFileItem && uploadState.file)
    return (
      <FileItem
        className={cn(
          "w-full rounded-sm",
          isInvalid && "border-destructive text-destructive",
        )}
        file={uploadState.file}
        error={uploadState.error}
        uploadSpeed={uploadState.uploadSpeed}
        progress={uploadState.progressPercentage}
        onRemove={handleRemove}
        onRetry={handleRetry}
        disabled={false}
      />
    );
  return (
    <DropZone
      className={cn(
        "w-full rounded-sm",
        isInvalid && "border-destructive text-destructive",
      )}
      accept={accept}
      multiple={false}
      disabled={false}
      onFileSelect={(file) => handleUpload(file)}
    />
  );
}
