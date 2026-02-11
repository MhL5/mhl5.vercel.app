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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Link, UploadCloud } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { useCurrentEditor } from "../hooks/useEditor";
import { ToolbarButton } from "./ToolbarButton";

export function ImageButton() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlValue, setUrlValue] = useState("");
  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const insertedRef = useRef(false);

  const resetForm = useCallback(() => {
    setUrlValue("");
    setUrlPreview(null);
    setUploadPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        if (!insertedRef.current && uploadPreview?.startsWith("blob:")) {
          URL.revokeObjectURL(uploadPreview);
        }
        insertedRef.current = false;
        resetForm();
      } else {
        insertedRef.current = false;
      }
    },
    [resetForm, uploadPreview],
  );

  const insertImage = useCallback(
    (src: string) => {
      if (!src.trim()) return;
      insertedRef.current = true;
      editor.chain().focus().setImage({ src: src.trim() }).run();
      setOpen(false);
      resetForm();
    },
    [editor, resetForm],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    // Revoke previous blob if any
    if (uploadPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(uploadPreview);
    }

    const blobUrl = URL.createObjectURL(file);
    setUploadPreview(blobUrl);
  };

  const handleUploadSubmit = () => {
    if (uploadPreview) {
      insertImage(uploadPreview);
    }
  };

  const handleUrlPreview = () => {
    const trimmed = urlValue.trim();
    if (trimmed) {
      setUrlPreview(trimmed);
    } else {
      setUrlPreview(null);
    }
  };

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      insertImage(urlValue.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarButton tooltipContent={null} isActive={false} type="button">
          <ImageIcon />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "upload" | "url")}
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
              <Label htmlFor="image-upload">Choose an image</Label>
              <Input
                id="image-upload"
                ref={fileInputRef}
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
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={urlValue}
                  onChange={(e) => {
                    setUrlValue(e.target.value);
                    setUrlPreview(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleUrlPreview()}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleUrlPreview}
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {activeTab === "upload" ? (
            <Button onClick={handleUploadSubmit} disabled={!uploadPreview}>
              Insert
            </Button>
          ) : (
            <Button onClick={handleUrlSubmit} disabled={!urlValue.trim()}>
              Insert
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
