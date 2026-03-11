import { Button } from "@/components/ui/button";
import { FileItemIcon } from "@/components/upload/components/FileItemIcon";
import { cn } from "@/lib/utils";
import { Eye, Trash2 } from "lucide-react";

export type FileItemResultProps = {
  url: string;
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
  url,
  messages = {
    delete: "delete",
  },
}: FileItemResultProps) {
  const { name, type = "" } = parseUrl(url);

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

  return (
    <div
      data-disabled={disabled}
      data-slot="FileItemResult"
      className={cn(
        "flex items-center gap-2 overflow-hidden rounded-md border p-3 data-[disabled=true]:opacity-50",
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
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          {type && (
            <span className="text-xs text-muted-foreground">{type}</span>
          )}
        </div>
      </div>

      <Button
        size="icon-xs"
        type="button"
        variant="secondary"
        title={messages?.delete}
        className="ms-auto mb-auto"
        disabled={disabled}
        asChild
      >
        <a
          href={url}
          target="_blank"
          title="Open in new window"
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
    </div>
  );
}
