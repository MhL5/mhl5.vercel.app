"use client";

/**
 * A central place for users to add attachments to the editor.
 * Attachments: image, video, audio, YouTube.
 */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImageIcon,
  Link,
  Music,
  Paperclip,
  UploadCloud,
  Video,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCurrentEditor } from "../hooks/useCurrentEditor";
import {
  EditorPopover,
  EditorPopoverContent,
  EditorPopoverTrigger,
} from "./ui/EditorPopover";
import { ToolbarButton } from "./ui/ToolbarButton";

type AttachmentType = "image" | "video" | "audio" | "youtube" | null;

// ---------------------------------------------------------------------------
// Main Attachments (dropdown + dialog shell)
// ---------------------------------------------------------------------------
export function Attachments() {
  const [dialogType, setDialogType] = useState<AttachmentType>(null);

  const closeDialog = useCallback(() => {
    setDialogType(null);
  }, []);

  const dialogOpen = dialogType !== null;

  const dropdownContent = [
    {
      icon: ImageIcon,
      label: "Image",
      onClick: () => setDialogType("image"),
    },
    {
      icon: Video,
      label: "Video",
      onClick: () => setDialogType("video"),
    },
    {
      icon: Music,
      label: "Audio",
      onClick: () => setDialogType("audio"),
    },
    {
      icon: Youtube,
      label: "YouTube",
      onClick: () => setDialogType("youtube"),
    },
  ];

  return (
    <>
      <EditorPopover>
        <EditorPopoverTrigger asChild>
          <ToolbarButton
            tooltipContent={null}
            aria-label="Insert attachment (image, video, audio, YouTube)"
            isActive={false}
            type="button"
          >
            <Paperclip />
          </ToolbarButton>
        </EditorPopoverTrigger>

        <EditorPopoverContent align="end" className="grid w-fit gap-0.5 p-1">
          {dropdownContent.map(({ icon: Icon, label, onClick }) => (
            <Button
              variant="ghost"
              onClick={onClick}
              key={label}
              className="w-full justify-start gap-2"
            >
              <Icon />
              {label}
            </Button>
          ))}
        </EditorPopoverContent>
      </EditorPopover>

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent onPointerDownOutside={(e) => e.stopPropagation()}>
          {dialogType === "image" && (
            <ImageAttachmentDialog
              onSuccess={closeDialog}
              onCancel={closeDialog}
            />
          )}
          {dialogType === "video" && (
            <VideoAttachmentDialog
              onSuccess={closeDialog}
              onCancel={closeDialog}
            />
          )}
          {dialogType === "audio" && (
            <AudioAttachmentDialog
              onSuccess={closeDialog}
              onCancel={closeDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ImageAttachmentDialog({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { editor } = useCurrentEditor();
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [url, setUrl] = useState("");
  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const insertedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (uploadPreview?.startsWith("blob:") && !insertedRef.current) {
        URL.revokeObjectURL(uploadPreview);
      }
    };
  }, [uploadPreview]);

  const insert = useCallback(
    (src: string) => {
      if (!src.trim()) return;
      insertedRef.current = true;
      editor.chain().focus().setImage({ src: src.trim() }).run();
      onSuccess();
    },
    [editor, onSuccess],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (uploadPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(uploadPreview);
    }
    setUploadPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add an Image</DialogTitle>
        <DialogDescription>
          Easily embed an image in your document by uploading a file or
          providing a URL.
        </DialogDescription>
      </DialogHeader>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "upload" | "url")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="gap-2">
            <UploadCloud className="size-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-2">
            <Link className="size-4" />
            URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="att-image-upload">Choose an image</Label>
            <Input
              id="att-image-upload"
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          {uploadPreview && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="rounded-md border border-input bg-muted/30 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadPreview}
                  alt="Upload preview"
                  className="max-h-40 max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="url" className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="att-image-url">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="att-image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setUrlPreview(null);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" && setUrlPreview(url.trim() || null)
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUrlPreview(url.trim() || null)}
              >
                Preview
              </Button>
            </div>
          </div>
          {urlPreview && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="rounded-md border border-input bg-muted/30 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlPreview}
                  alt="URL preview"
                  className="max-h-40 max-w-full object-contain"
                  onError={() => setUrlPreview(null)}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        {tab === "upload" ? (
          <Button
            onClick={() => uploadPreview && insert(uploadPreview)}
            disabled={!uploadPreview}
          >
            Insert
          </Button>
        ) : (
          <Button
            onClick={() => url.trim() && insert(url.trim())}
            disabled={!url.trim()}
          >
            Insert
          </Button>
        )}
      </DialogFooter>
    </>
  );
}

function VideoAttachmentDialog({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { editor } = useCurrentEditor();
  const [url, setUrl] = useState("");
  const [poster, setPoster] = useState("");
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);

  const add = useCallback(() => {
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
    onSuccess();
  }, [editor, url, poster, controls, autoplay, loop, muted, onSuccess]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Video</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="att-video-url">Video URL</Label>
          <Input
            id="att-video-url"
            type="url"
            placeholder="https://example.com/video.mp4"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="att-video-poster">Poster URL (optional)</Label>
          <Input
            id="att-video-poster"
            type="url"
            placeholder="https://example.com/poster.jpg"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-video-controls"
              checked={controls}
              onCheckedChange={(c) => setControls(c === true)}
            />
            <Label
              htmlFor="att-video-controls"
              className="cursor-pointer text-sm font-normal"
            >
              Show controls
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-video-autoplay"
              checked={autoplay}
              onCheckedChange={(c) => setAutoplay(c === true)}
            />
            <Label
              htmlFor="att-video-autoplay"
              className="cursor-pointer text-sm font-normal"
            >
              Autoplay
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-video-loop"
              checked={loop}
              onCheckedChange={(c) => setLoop(c === true)}
            />
            <Label
              htmlFor="att-video-loop"
              className="cursor-pointer text-sm font-normal"
            >
              Loop
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-video-muted"
              checked={muted}
              onCheckedChange={(c) => setMuted(c === true)}
            />
            <Label
              htmlFor="att-video-muted"
              className="cursor-pointer text-sm font-normal"
            >
              Muted
            </Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={add} disabled={!url.trim()}>
          Add Video
        </Button>
      </DialogFooter>
    </>
  );
}

function AudioAttachmentDialog({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { editor } = useCurrentEditor();
  const [url, setUrl] = useState("");
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);

  const add = useCallback(() => {
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
    onSuccess();
  }, [editor, url, controls, autoplay, loop, muted, onSuccess]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Audio</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="att-audio-url">Audio URL</Label>
          <Input
            id="att-audio-url"
            type="url"
            placeholder="https://example.com/audio.mp3"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-audio-controls"
              checked={controls}
              onCheckedChange={(c) => setControls(c === true)}
            />
            <Label
              htmlFor="att-audio-controls"
              className="cursor-pointer text-sm font-normal"
            >
              Show controls
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-audio-autoplay"
              checked={autoplay}
              onCheckedChange={(c) => setAutoplay(c === true)}
            />
            <Label
              htmlFor="att-audio-autoplay"
              className="cursor-pointer text-sm font-normal"
            >
              Autoplay
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-audio-loop"
              checked={loop}
              onCheckedChange={(c) => setLoop(c === true)}
            />
            <Label
              htmlFor="att-audio-loop"
              className="cursor-pointer text-sm font-normal"
            >
              Loop
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="att-audio-muted"
              checked={muted}
              onCheckedChange={(c) => setMuted(c === true)}
            />
            <Label
              htmlFor="att-audio-muted"
              className="cursor-pointer text-sm font-normal"
            >
              Muted
            </Label>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={add} disabled={!url.trim()}>
          Add Audio
        </Button>
      </DialogFooter>
    </>
  );
}
