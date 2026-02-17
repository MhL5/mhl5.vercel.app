import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "@tanstack/react-form";
import type { NodeViewProps } from "@tiptap/react";
import { Link, Upload } from "lucide-react";
import { useState } from "react";
import z from "zod";

import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { isValidPosition } from "../../../utils/isValidPosition";
import { AssetUploadNodeDropZone } from "./AssetUploadNodeDropZone";

const schema = z.object({
  src: z.url(),
  alt: z.string().min(4),
});
type Schema = z.infer<typeof schema>;

type ImageFormProps = {
  formId: string;
  getPos: NodeViewProps["getPos"];
  node: NodeViewProps["node"];
};

export function ImageForm({ formId, getPos, node }: ImageFormProps) {
  const { editor } = useCurrentEditor();
  const [uploaded, setUpload] = useState(false);
  const form = useForm({
    defaultValues: {
      src: "",
      alt: "",
    } satisfies Schema,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value: { alt, src } }) => {
      const trimmedAlt = alt.trim();
      const trimmedSrc = src.trim();

      const pos = getPos();
      if (!isValidPosition(pos) || !trimmedSrc) return;
      const from = pos;
      const to = pos + node.nodeSize;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .insertContentAt(from, {
          type: "image",
          attrs: {
            src: trimmedSrc,
            alt: trimmedAlt ? trimmedAlt : "",
            "aria-hidden": trimmedAlt ? false : true,
          },
        })
        .run();
    },
  });

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
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

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
                    <FieldLabel htmlFor={field.name} className="mb-3">
                      Upload
                    </FieldLabel>
                    {uploaded ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={field.state.value}
                        alt={form.state.values.alt}
                        loading="lazy"
                        className="size-full max-h-90 rounded-sm object-cover"
                      />
                    ) : (
                      <AssetUploadNodeDropZone
                        accept="image/*"
                        onUploadSuccess={(url) => {
                          setUpload(true);
                          field.handleChange(url);
                        }}
                        isInvalid={isInvalid}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="url" className="mt-3 space-y-3">
                    <FieldLabel htmlFor={field.name}>Url</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </TabsContent>
                </Tabs>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
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
      </FieldGroup>
    </form>
  );
}
