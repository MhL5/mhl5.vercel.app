import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { type ComponentProps, useId, useState } from "react";
import z from "zod";

import { ToolbarButton } from "../../../components/ToolbarButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";

export function YoutubeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ToolbarButton
          tooltipContent="Add YouTube video"
          isActive={false}
          type="button"
        >
          <YoutubeIcon />
        </ToolbarButton>
      </DialogTrigger>

      <Content onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}

function Content({ onSuccess }: { onSuccess: () => void }) {
  const { editor } = useCurrentEditor();
  const form = useForm({
    defaultValues: {
      src: "",
    },
    validators: {
      onSubmit: z.object({
        src: z.url(),
      }),
    },
    onSubmit: ({ value: { src } }) => {
      editor.chain().focus().setYoutubeVideo({ src }).run();
      onSuccess();
    },
  });

  const youtubeInputId = useId();
  const formId = useId();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <YoutubeIcon className="me-2 inline-block" />
          Insert a YouTube Video
        </DialogTitle>
        <DialogDescription>
          Paste the full YouTube URL to embed a video into your document.
        </DialogDescription>
      </DialogHeader>

      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="grid gap-4"
      >
        <form.Field name="src">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={youtubeInputId}>YouTube URL</FieldLabel>
                <Input
                  id={youtubeInputId}
                  autoFocus
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {field.state.meta.errors && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </form.Field>
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" form={formId}>
          Add Video
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function YoutubeIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("text-red-500", className)}
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
