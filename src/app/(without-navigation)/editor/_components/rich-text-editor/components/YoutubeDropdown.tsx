"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Youtube } from "lucide-react";
import { useCallback, useState } from "react";

import { useCurrentEditor } from "../hooks/useEditor";
import { ToolbarButton } from "./ToolbarButton";

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 360;
const MIN_WIDTH = 320;
const MAX_WIDTH = 1024;
const MIN_HEIGHT = 180;
const MAX_HEIGHT = 720;

export default function YoutubeDropdown() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState(String(DEFAULT_WIDTH));
  const [height, setHeight] = useState(String(DEFAULT_HEIGHT));

  const resetForm = useCallback(() => {
    setUrl("");
    setWidth(String(DEFAULT_WIDTH));
    setHeight(String(DEFAULT_HEIGHT));
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        resetForm();
      }
    },
    [resetForm],
  );

  const addVideo = useCallback(() => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    const parsedWidth = Math.max(
      MIN_WIDTH,
      Math.min(MAX_WIDTH, parseInt(width, 10) || DEFAULT_WIDTH),
    );
    const parsedHeight = Math.max(
      MIN_HEIGHT,
      Math.min(MAX_HEIGHT, parseInt(height, 10) || DEFAULT_HEIGHT),
    );

    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: trimmedUrl,
        width: parsedWidth,
        height: parsedHeight,
      })
      .run();

    setOpen(false);
    resetForm();
  }, [editor, url, width, height, resetForm]);

  const isUrlValid = url.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarButton tooltipContent={null} isActive={false} type="button">
          <Youtube />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Add YouTube Video</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addVideo();
                }
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="youtube-width">Width</Label>
              <Input
                id="youtube-width"
                type="number"
                min={MIN_WIDTH}
                max={MAX_WIDTH}
                placeholder={String(DEFAULT_WIDTH)}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="youtube-height">Height</Label>
              <Input
                id="youtube-height"
                type="number"
                min={MIN_HEIGHT}
                max={MAX_HEIGHT}
                placeholder={String(DEFAULT_HEIGHT)}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={addVideo} disabled={!isUrlValid}>
            Add Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
