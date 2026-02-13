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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { ToolbarButton } from "./ui/ToolbarButton";

const YOUTUBE_DEFAULT_WIDTH = 640;
const YOUTUBE_DEFAULT_HEIGHT = 360;
const YOUTUBE_MIN_WIDTH = 320;
const YOUTUBE_MAX_WIDTH = 1024;
const YOUTUBE_MIN_HEIGHT = 180;
const YOUTUBE_MAX_HEIGHT = 720;

type AttachmentType = "image" | "video" | "audio" | "youtube" | null;

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
        <DialogTitle>Insert Image</DialogTitle>
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

// ---------------------------------------------------------------------------
// Video attachment dialog
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Audio attachment dialog
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// YouTube attachment dialog
// ---------------------------------------------------------------------------

function YoutubeAttachmentDialog({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { editor } = useCurrentEditor();
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState(String(YOUTUBE_DEFAULT_WIDTH));
  const [height, setHeight] = useState(String(YOUTUBE_DEFAULT_HEIGHT));

  const add = useCallback(() => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;
    const w = Math.max(
      YOUTUBE_MIN_WIDTH,
      Math.min(YOUTUBE_MAX_WIDTH, parseInt(width, 10) || YOUTUBE_DEFAULT_WIDTH),
    );
    const h = Math.max(
      YOUTUBE_MIN_HEIGHT,
      Math.min(
        YOUTUBE_MAX_HEIGHT,
        parseInt(height, 10) || YOUTUBE_DEFAULT_HEIGHT,
      ),
    );
    editor
      .chain()
      .focus()
      .setYoutubeVideo({ src: trimmedUrl, width: w, height: h })
      .run();
    onSuccess();
  }, [editor, url, width, height, onSuccess]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add YouTube Video</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="att-youtube-url">YouTube URL</Label>
          <Input
            id="att-youtube-url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
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
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="att-youtube-width">Width</Label>
            <Input
              id="att-youtube-width"
              type="number"
              min={YOUTUBE_MIN_WIDTH}
              max={YOUTUBE_MAX_WIDTH}
              placeholder={String(YOUTUBE_DEFAULT_WIDTH)}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="att-youtube-height">Height</Label>
            <Input
              id="att-youtube-height"
              type="number"
              min={YOUTUBE_MIN_HEIGHT}
              max={YOUTUBE_MAX_HEIGHT}
              placeholder={String(YOUTUBE_DEFAULT_HEIGHT)}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
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

// ---------------------------------------------------------------------------
// Main Attachments (dropdown + dialog shell)
// ---------------------------------------------------------------------------
export function Attachments() {
  const [dialogType, setDialogType] = useState<AttachmentType>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const openDialog = useCallback((type: NonNullable<AttachmentType>) => {
    setDialogType(type);
    setDropdownOpen(false);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogType(null);
  }, []);

  const dialogOpen = dialogType !== null;

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <ToolbarButton
            tooltipContent="Insert attachment (image, video, audio, YouTube)"
            isActive={false}
            type="button"
          >
            <Paperclip />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => openDialog("image")}>
            <ImageIcon className="mr-2 size-4" />
            Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDialog("video")}>
            <Video className="mr-2 size-4" />
            Video
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDialog("audio")}>
            <Music className="mr-2 size-4" />
            Audio
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDialog("youtube")}>
            <Youtube className="mr-2 size-4" />
            YouTube
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.stopPropagation()}
        >
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
          {dialogType === "youtube" && (
            <YoutubeAttachmentDialog
              onSuccess={closeDialog}
              onCancel={closeDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
