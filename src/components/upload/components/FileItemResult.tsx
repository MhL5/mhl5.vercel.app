import { Button } from "@/components/ui/button";
import { FileItemIcon } from "@/components/upload/components/FileIcon";
import type { FileItem } from "@/components/upload/hooks/useFileUpload";
import { formatBytes } from "@/components/upload/utils";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export type FileItemResultProps = {
  fileItem: FileItem;

  onDelete?: () => void;

  disabled?: boolean;
  className?: string;
  messages?: {
    delete: string;
  };
};

export function FileItemResult({
  onDelete,
  disabled,
  className,
  fileItem,
  messages = {
    delete: "delete",
  },
}: FileItemResultProps) {
  return (
    <div
      data-slot="FileItemResult"
      className={cn(
        "flex items-center gap-3 overflow-hidden rounded-md border p-3",
        className,
      )}
    >
      <div className="[&_svg:size-5] flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:text-foreground">
        <FileItemIcon
          fileName={fileItem.file.name}
          fileType={fileItem.file.type}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-sm font-medium">{fileItem.file.name}</p>
        {fileItem.file.size && (
          <p className="text-xs text-muted-foreground">
            {formatBytes(fileItem.file.size)}
          </p>
        )}
      </div>

      {onDelete && (
        <Button
          size="icon-xs"
          type="button"
          variant="destructive"
          title={messages?.delete}
          className="ms-auto"
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
