import { Button } from "@/components/ui/button";
import { FileItemIcon } from "@/components/upload/components/FileItemIcon";
import type { FileItem } from "@/components/upload/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export type FileItemResultProps = (
  | {
      url: string;
    }
  | {
      fileItem: FileItem;
      onCancel: () => void;
    }
) & {
  onDelete?: () => void;

  disabled?: boolean;
  className?: string;
  messages?: {
    delete: string;
  };
};

export function FileItemResult(props: FileItemResultProps) {
  const {
    onDelete,
    disabled,
    className,
    messages = {
      delete: "delete",
    },
  } = props;

  function parseUrl(url: string) {
    // Extract the pathname part of the URL
    const pathname = new URL(url).pathname;

    // Split the pathname into parts
    const parts = pathname.split("/");

    // Get the last part which is the file name with extension
    const fileNameWithExtension = parts[parts.length - 1];

    // Split the file name and extension
    const [name, type] = fileNameWithExtension.split(".");

    return {
      name: name || url,
      type,
    };
  }

  const { name, type = "" } =
    "fileItem" in props ? props.fileItem.file : parseUrl(props.url);

  return (
    <div
      data-disabled={disabled}
      data-slot="FileItemResult"
      className={cn(
        "flex items-center gap-3 overflow-hidden rounded-md border p-3 data-[disabled=true]:opacity-50",
        className,
      )}
    >
      <div className="[&_svg:size-5] flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:text-foreground">
        <FileItemIcon fileName={name} fileType={type} />
      </div>

      <div className="mb-auto overflow-hidden">
        <p title={name} className="truncate text-sm font-medium">
          {name}
        </p>
        {type && <span className="text-xs text-muted-foreground">{type}</span>}
      </div>

      {onDelete && (
        <Button
          size="icon-xs"
          type="button"
          variant="destructive"
          title={messages?.delete}
          className="ms-auto mb-auto"
          onClick={() => {
            onDelete?.();
            if ("fileItem" in props) props.onCancel();
          }}
          disabled={disabled}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
