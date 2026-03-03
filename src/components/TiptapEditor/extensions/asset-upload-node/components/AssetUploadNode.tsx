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
import { useUploadFile } from "@/components/upload-deprecated/api/uploadFile";
import { FileItem } from "@/components/upload-deprecated/components/FileItem";
import type { DropZoneProps } from "@/components/upload/DropZone";
import { DropZone } from "@/components/upload/DropZone";
import { cn } from "@/lib/utils";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { Eye, Link, RefreshCcw, Trash2, Upload } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { EditorButton } from "../../../components/EditorButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { useEditorMessages } from "../../../i18n/EditorMessagesContext";
import { focusNextNode } from "../../../utils/focusNextNode";
import { isValidPosition } from "../../../utils/isValidPosition";
import type { MediaType } from "../asset-upload-node";
import { ASSET_UPLOAD_NODE_ICONS } from "../constants";

export default function AssetUploadNode({
  node,
  getPos,
  deleteNode,
}: NodeViewProps) {
  const { messages } = useEditorMessages();
  const formId = useId();
  const mediaType = node.attrs.mediaType as MediaType;
  const titleMap = {
    image: messages.image,
    audio: messages.audio,
    video: messages.video,
  };
  const title = titleMap[mediaType];
  const Icon = ASSET_UPLOAD_NODE_ICONS[mediaType];

  return (
    <NodeViewWrapper className="not-prose my-4 w-full">
      <Card key={mediaType + title} className="rounded-sm">
        <CardHeader>
          <CardTitle className="items-center">
            <Icon className="me-1 mb-0.25 inline-block size-5" /> {title}
          </CardTitle>
          <CardDescription>{messages.insertMedia(mediaType)}</CardDescription>
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
            {messages.cancel}
          </Button>
          <Button form={formId} type="submit">
            {messages.insert}
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
  const { messages } = useEditorMessages();
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
          editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .insertContentAt(from, {
              type: "image",
              attrs: {
                src,
                alt,
                title: alt,
              },
            })
            .run();
          break;
        case "audio":
          editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .setAudio({
              src,
              ...videoAndAudioOptions,
            })
            .run();
          break;
        case "video":
          editor
            .chain()
            .focus()
            .deleteRange({ from, to })
            .insertVideo({
              src,
              ...videoAndAudioOptions,
            })
            .run();
          break;
        default:
          toast.error(`Invalid media type: ${mediaType satisfies never}`);
          break;
      }

      focusNextNode(editor);
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
              <Preview
                mediaType={mediaType}
                src={field.state.value}
                onRemovePreview={() => {
                  field.handleChange("");
                  setShowPreview(false);
                }}
              />
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
                  <FieldLabel htmlFor={field.name}>{messages.alt}</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder={messages.imageAlt}
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
  const { messages } = useEditorMessages();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const urlInputId = useId();

  return (
    <Field data-invalid={isInvalid}>
      <Tabs className="w-full" defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <Upload />
            {messages.upload}
          </TabsTrigger>
          <TabsTrigger value="url" className="gap-2">
            <Link />
            {messages.urlTab}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-3">
          <FieldLabel htmlFor={urlInputId} className="mb-3">
            {messages.upload}
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
          <FieldLabel htmlFor={urlInputId}>{messages.urlTab}</FieldLabel>
          <div className="flex items-center gap-2">
            <Input
              id={urlInputId}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={isInvalid}
              placeholder={messages.urlPlaceholder}
              type="url"
            />
            <Button
              size="sm"
              disabled={!field.state.value || isInvalid}
              onClick={onPreview}
              type="button"
            >
              <Eye /> {messages.preview}
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
  const { messages } = useEditorMessages();

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
        messages={messages.FileItem}
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
      className="w-full rounded-sm"
      inputId={inputId}
      isInvalid={isInvalid}
      accept={accept}
      multiple={false}
      disabled={false}
      onFileSelect={(file) => handleUpload(file)}
    />
  );
}

type PreviewProps = {
  mediaType: MediaType;
  onRemovePreview: () => void;
  src: string;
};

function Preview(props: PreviewProps) {
  const { messages } = useEditorMessages();
  const { mediaType, src, onRemovePreview } = props;
  const [previewError, setPreviewError] = useState<string | null>(null);

  function handleRemove() {
    setPreviewError(null);
    onRemovePreview();
  }

  function createErrorMessage(mediaType: MediaType) {
    return messages.invalidMediaUrl(mediaType);
  }

  if (previewError)
    return (
      <div className="relative isolate flex w-full flex-wrap items-center gap-2 overflow-hidden rounded-sm border border-destructive p-3">
        <p
          role="alert"
          data-slot="preview-error-message"
          aria-live="polite"
          className="text-destructive"
        >
          {previewError}
        </p>

        <EditorButton
          isActive={false}
          tooltipContent={messages.retry}
          onClick={handleRemove}
          variant="outline"
          size="icon"
          className={`ms-auto`}
          tooltipContentSide="top"
        >
          <RefreshCcw />
        </EditorButton>
        <ExitAndExitPreviewButton onRemove={handleRemove} />
      </div>
    );
  return (
    <div className="relative isolate grid min-h-15.75 w-full place-items-center overflow-hidden rounded-sm border [&:has([data-slot='preview-audio'])]:grid-cols-[1fr_2rem] [&:has([data-slot='preview-audio'])]:gap-2 [&:has([data-slot='preview-audio'])]:p-3">
      {mediaType === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          data-slot="preview-image"
          className="min-h-15.5 w-full rounded-sm object-cover"
          loading="lazy"
          onError={() => setPreviewError(createErrorMessage("image"))}
        />
      ) : mediaType === "audio" ? (
        <audio
          {...videoAndAudioOptions}
          src={src}
          data-slot="preview-audio"
          className="my-0! min-h-15.5 w-full"
          onError={() => setPreviewError(createErrorMessage("audio"))}
        />
      ) : (
        <video
          {...videoAndAudioOptions}
          src={src}
          data-slot="preview-video"
          className="my-0! min-h-15.5 w-full"
          onError={() => setPreviewError(createErrorMessage("video"))}
        />
      )}
      <ExitAndExitPreviewButton
        onRemove={handleRemove}
        className="absolute end-2.5 top-2.5 ms-auto"
      />
    </div>
  );
}

function ExitAndExitPreviewButton({
  onRemove,
  className,
}: {
  className?: string;
  onRemove: () => void;
}) {
  const { messages } = useEditorMessages();
  return (
    <EditorButton
      tooltipContentSide="top"
      isActive={false}
      onClick={onRemove}
      variant="destructive"
      size="icon"
      className={className}
      tooltipContent={messages.resetAndExitPreview}
    >
      <Trash2 />
    </EditorButton>
  );
}
