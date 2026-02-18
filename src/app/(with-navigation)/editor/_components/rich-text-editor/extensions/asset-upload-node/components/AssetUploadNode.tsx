import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DropZoneProps } from "@/components/upload/DropZone";
import DropZone from "@/components/upload/DropZone";
import { useUploadFile } from "@/components/upload/api/uploadFile";
import { FileItem } from "@/components/upload/components/FileItem";
import { cn } from "@/lib/utils";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { Eye, Link, Trash2, Upload } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { isValidPosition } from "../../../utils/isValidPosition";
import type { MediaType } from "../asset-upload-node";
import { ASSET_UPLOAD_NODE_ICONS } from "../constants";

const assetsList = {
  image: {
    icon: ASSET_UPLOAD_NODE_ICONS.image,
    title: "Image",
  },
  audio: {
    icon: ASSET_UPLOAD_NODE_ICONS.audio,
    title: "Audio",
  },
  video: {
    icon: ASSET_UPLOAD_NODE_ICONS.video,
    title: "Video",
  },
} as const;

export default function AssetUploadNode({
  node,
  getPos,
  deleteNode,
}: NodeViewProps) {
  const formId = useId();
  const mediaType = node.attrs.mediaType as MediaType;
  const { icon: Icon, title } = assetsList[mediaType];

  return (
    <NodeViewWrapper className="not-prose my-4 w-full">
      <Card key={mediaType + title} className="rounded-sm">
        <CardHeader>
          <CardTitle className="items-center">
            <Icon className="me-1 mb-0.25 inline-block size-5" /> {title}
          </CardTitle>
          <CardDescription>
            insert an {mediaType} into the document
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AssetForm
            formId={formId}
            getPos={getPos}
            node={node}
            mediaType={mediaType}
          />
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={deleteNode}>
            Cancel
          </Button>
          <Button form={formId} type="submit">
            Insert
          </Button>
        </CardFooter>
      </Card>
    </NodeViewWrapper>
  );
}

const videoAndAudioOptions = {
  autoPlay: false,
  loop: false,
  muted: false,
  controls: true,
} as const;

type BaseFormProps = {
  formId: string;
  getPos: NodeViewProps["getPos"];
  node: NodeViewProps["node"];
  mediaType: MediaType;
};

const imageFormSchema = z.object({
  src: z.url().trim(),
  alt: z.string().min(4).trim(),
});
const audioVideoFormSchema = z.object({ src: z.url().trim() });

function AssetForm({ formId, getPos, node, mediaType }: BaseFormProps) {
  const schema = mediaType === "image" ? imageFormSchema : audioVideoFormSchema;
  const defaultValues =
    mediaType === "image" ? { src: "", alt: "" } : { src: "" };

  const { editor } = useCurrentEditor();
  const form = useForm({
    defaultValues: defaultValues satisfies z.infer<typeof schema>,
    validators: {
      onChange: schema,
    },
    onSubmit: ({ value: { alt, src } }) => {
      const pos = getPos();
      if (!isValidPosition(pos)) return;
      const from = pos;
      const to = pos + node.nodeSize;

      switch (mediaType) {
        case "image":
          return editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .insertContentAt(from, {
              type: "image",
              attrs: {
                src,
                alt,
              },
            })
            .run();
        case "audio":
          return editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .setAudio({
              src,
              ...videoAndAudioOptions,
            })
            .run();
        case "video":
          return editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .setVideo({
              src,
              ...videoAndAudioOptions,
            })
            .run();
        default:
          return toast.error(
            `Invalid media type: ${mediaType satisfies never}`,
          );
      }
    },
  });
  const [showPreview, setShowPreview] = useState(false);

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="src">
          {(field) =>
            showPreview ? (
              <div
                className={`${mediaType === "audio" ? "grid-cols-[1fr_2rem] gap-2 p-3" : ""} relative isolate grid w-full place-items-center overflow-hidden rounded-sm border`}
              >
                {mediaType === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={field.state.value}
                    alt={field.state.value}
                    className="w-full rounded-sm object-cover"
                    loading="lazy"
                  />
                ) : mediaType === "audio" ? (
                  <audio
                    {...videoAndAudioOptions}
                    src={field.state.value}
                    className="my-0! w-full"
                  />
                ) : (
                  <video
                    {...videoAndAudioOptions}
                    src={field.state.value}
                    className="my-0! w-full"
                  />
                )}
                <Button
                  onClick={() => {
                    field.handleChange("");
                    setShowPreview(false);
                  }}
                  variant="destructive"
                  size="icon"
                  aria-label="Remove image"
                  className={`${mediaType === "audio" ? "end-2" : "end-2 top-2"} absolute z-10`}
                >
                  <Trash2 />
                </Button>
              </div>
            ) : (
              <UploadOrUrlField
                onPreview={() => setShowPreview(true)}
                accept={
                  mediaType === "image"
                    ? "image/*"
                    : mediaType === "audio"
                      ? "audio/*"
                      : "video/*"
                }
                field={field}
              />
            )
          }
        </form.Field>

        {mediaType === "image" && (
          <form.Field name="alt">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Alt</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Image Alt"
                    type="text"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        )}
      </FieldGroup>
    </form>
  );
}

type UploadOrUrlFieldProps = {
  field: AnyFieldApi;
  accept: DropZoneProps["accept"];
  onPreview: () => void;
};

function UploadOrUrlField({ field, accept, onPreview }: UploadOrUrlFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const urlInputId = useId();

  return (
    <Field data-invalid={isInvalid}>
      <Tabs className="w-full" defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <Upload />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-2">
            <Link />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-3">
          <FieldLabel htmlFor={urlInputId} className="mb-3">
            Upload
          </FieldLabel>

          <AssetUploadNodeDropZone
            inputId={urlInputId}
            accept={accept}
            onUploadSuccess={(url) => {
              onPreview();
              field.handleChange(url);
            }}
            isInvalid={isInvalid}
          />
        </TabsContent>

        <TabsContent value="url" className="mt-3 space-y-3">
          <FieldLabel htmlFor={urlInputId}>Url</FieldLabel>
          <div className="flex items-center gap-2">
            <Input
              id={urlInputId}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={isInvalid}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            <Button
              size="sm"
              disabled={!field.state.value || isInvalid}
              onClick={onPreview}
              type="button"
            >
              <Eye /> Preview
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function AssetUploadNodeDropZone({
  accept,
  onUploadSuccess,
  isInvalid,
  inputId,
}: {
  accept: DropZoneProps["accept"];
  onUploadSuccess: (url: string) => void;
  isInvalid: boolean;
  inputId: string;
}) {
  const { uploadState, handleUpload, handleRemove, handleRetry } =
    useUploadFile({ onSuccess: onUploadSuccess });

  const showFileItem =
    uploadState.file &&
    (uploadState.progressPercentage < 100 || Boolean(uploadState.error));

  if (showFileItem && uploadState.file)
    return (
      <FileItem
        className={cn(
          "w-full rounded-sm",
          isInvalid && "border-destructive text-destructive",
        )}
        file={uploadState.file}
        error={uploadState.error}
        uploadSpeed={uploadState.uploadSpeed}
        progress={uploadState.progressPercentage}
        onRemove={handleRemove}
        onRetry={handleRetry}
        disabled={false}
      />
    );
  return (
    <DropZone
      className={cn(
        "w-full rounded-sm",
        isInvalid && "border-destructive text-destructive",
      )}
      inputId={inputId}
      accept={accept}
      multiple={false}
      disabled={false}
      onFileSelect={(file) => handleUpload(file)}
    />
  );
}
