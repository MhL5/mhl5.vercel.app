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
import { Music } from "lucide-react";
import { useCallback, useState } from "react";

import { useCurrentEditor } from "../hooks/useEditor";
import { ToolbarButton } from "./ToolbarButton";

export default function AudioDialog() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);

  const resetForm = useCallback(() => {
    setUrl("");
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

  const addAudio = useCallback(() => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;

    editor
      .chain()
      .focus()
      .setAudio({
        src: trimmedUrl,
        controls,
        autoplay,
        loop,
        muted,
      })
      .run();

    setOpen(false);
    resetForm();
  }, [editor, url, controls, autoplay, loop, muted, resetForm]);

  const isUrlValid = url.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarButton
          tooltipContent="Insert audio"
          isActive={false}
          type="button"
        >
          <Music />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Add Audio</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="audio-url">Audio URL</Label>
            <Input
              id="audio-url"
              type="url"
              placeholder="https://example.com/audio.mp3"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAudio();
                }
              }}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="audio-controls"
                checked={controls}
                onCheckedChange={(checked) => setControls(checked === true)}
              />
              <Label
                htmlFor="audio-controls"
                className="cursor-pointer text-sm font-normal"
              >
                Show controls
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="audio-autoplay"
                checked={autoplay}
                onCheckedChange={(checked) => setAutoplay(checked === true)}
              />
              <Label
                htmlFor="audio-autoplay"
                className="cursor-pointer text-sm font-normal"
              >
                Autoplay
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="audio-loop"
                checked={loop}
                onCheckedChange={(checked) => setLoop(checked === true)}
              />
              <Label
                htmlFor="audio-loop"
                className="cursor-pointer text-sm font-normal"
              >
                Loop
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="audio-muted"
                checked={muted}
                onCheckedChange={(checked) => setMuted(checked === true)}
              />
              <Label
                htmlFor="audio-muted"
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
          <Button onClick={addAudio} disabled={!isUrlValid}>
            Add Audio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
