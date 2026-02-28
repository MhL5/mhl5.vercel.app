"use client";

import {
  PopoverOnHover,
  PopoverOnHoverContent,
  PopoverOnHoverTrigger,
} from "@/components/PopoverOnHover";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";

import { EditorButton } from "../../../components/EditorButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { useEditorMessages } from "../../../i18n/EditorMessagesContext";
import { ASSET_UPLOAD_NODE_OPTIONS } from "../constants";

export function InsertAssetUploadPopover() {
  const { messages } = useEditorMessages();
  const { editor } = useCurrentEditor();
  const labelMap = {
    image: messages.image,
    audio: messages.audio,
    video: messages.video,
  };

  return (
    <PopoverOnHover>
      <PopoverOnHoverTrigger asChild>
        <EditorButton
          aria-label={messages.addImageVideoAudio}
          tooltipContent={null}
          isActive={false}
          type="button"
        >
          <Paperclip />
        </EditorButton>
      </PopoverOnHoverTrigger>
      <PopoverOnHoverContent align="end" className="grid w-fit gap-0.5 p-1">
        {ASSET_UPLOAD_NODE_OPTIONS.map(({ mediaType, icon: Icon }) => (
          <Button
            key={mediaType}
            variant="ghost"
            onClick={() => editor.commands.insertAssetUploadNode({ mediaType })}
            className="w-full justify-start gap-2"
          >
            <Icon className="size-4" />
            {labelMap[mediaType]}
          </Button>
        ))}
      </PopoverOnHoverContent>
    </PopoverOnHover>
  );
}
