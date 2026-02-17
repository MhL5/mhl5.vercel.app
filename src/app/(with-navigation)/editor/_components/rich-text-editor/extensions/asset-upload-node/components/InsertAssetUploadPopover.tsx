"use client";

import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

import {
  EditorPopover,
  EditorPopoverContent,
  EditorPopoverTrigger,
} from "../../../components/EditorPopover";
import { ToolbarButton } from "../../../components/ToolbarButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { ASSET_UPLOAD_NODE_OPTIONS } from "../constants";

export function InsertAssetUploadPopover() {
  const { editor } = useCurrentEditor();

  return (
    <EditorPopover>
      <EditorPopoverTrigger asChild>
        <ToolbarButton
          aria-label="Add image, video, or audio"
          tooltipContent={null}
          isActive={false}
          type="button"
        >
          <Paperclip />
        </ToolbarButton>
      </EditorPopoverTrigger>
      <EditorPopoverContent align="end" className="grid w-fit gap-0.5 p-1">
        {ASSET_UPLOAD_NODE_OPTIONS.map(({ mediaType, icon: Icon, label }) => (
          <Button
            key={mediaType}
            variant="ghost"
            onClick={() => editor.commands.insertAssetUploadNode({ mediaType })}
            className="w-full justify-start gap-2"
          >
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </EditorPopoverContent>
    </EditorPopover>
  );
}
