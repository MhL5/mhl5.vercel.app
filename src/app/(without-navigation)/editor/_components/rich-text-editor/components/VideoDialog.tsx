"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Video } from "lucide-react";
import { useCallback, useState } from "react";

import { useCurrentEditor } from "../hooks/useEditor";
import { ToolbarButton } from "./ToolbarButton";

export default function VideoDialog() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [poster, setPoster] = useState("");
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);

  const resetForm = useCallback(() => {
    setUrl("");
    setPoster("");
    setControls(true);
    setAutoplay(false);
    setLoop(false);
    setMuted(false);
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

    editor
      .chain()
      .focus()
      .setVideo({
        src: trimmedUrl,
        ...(poster.trim() && { poster: poster.trim() }),
        controls,
        autoplay,
        loop,
        muted,
      })
      .run();

    setOpen(false);
    resetForm();
  }, [editor, url, poster, controls, autoplay, loop, muted, resetForm]);

  const isUrlValid = url.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarButton
          tooltipContent="Insert video"
          isActive={false}
          type="button"
        >
          <Video />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="video-url">Video URL</Label>
            <Input
              id="video-url"
              type="url"
              placeholder="https://example.com/video.mp4"
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

          <div className="grid gap-2">
            <Label htmlFor="video-poster">Poster URL (optional)</Label>
            <Input
              id="video-poster"
              type="url"
              placeholder="https://example.com/poster.jpg"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="video-controls"
                checked={controls}
                onCheckedChange={(checked) => setControls(checked === true)}
              />
              <Label
                htmlFor="video-controls"
                className="cursor-pointer text-sm font-normal"
              >
                Show controls
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="video-autoplay"
                checked={autoplay}
                onCheckedChange={(checked) => setAutoplay(checked === true)}
              />
              <Label
                htmlFor="video-autoplay"
                className="cursor-pointer text-sm font-normal"
              >
                Autoplay
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="video-loop"
                checked={loop}
                onCheckedChange={(checked) => setLoop(checked === true)}
              />
              <Label
                htmlFor="video-loop"
                className="cursor-pointer text-sm font-normal"
              >
                Loop
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="video-muted"
                checked={muted}
                onCheckedChange={(checked) => setMuted(checked === true)}
              />
              <Label
                htmlFor="video-muted"
                className="cursor-pointer text-sm font-normal"
              >
                Muted
              </Label>
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
