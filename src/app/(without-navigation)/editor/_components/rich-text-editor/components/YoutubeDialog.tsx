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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type SubmitEvent, useId, useState } from "react";
import z from "zod";

import { useCurrentEditor } from "../hooks/useCurrentEditor";
import { ToolbarButton } from "./ToolbarButton";

export function YoutubeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ToolbarButton
          tooltipContent="Add YouTube video"
          isActive={false}
          type="button"
        >
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
            className="text-red-500"
          >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
          </svg>
        </ToolbarButton>
      </DialogTrigger>

      <Content />
    </Dialog>
  );
}

function Content() {
  const { editor } = useCurrentEditor();
  const [error, setError] = useState("");

  const youtubeInputId = useId();
  const formId = useId();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = formData.get("youtube-url") as string;

    const result = z.url().safeParse(url);
    if (!result.success) return setError(z.prettifyError(result.error));
    else setError("");

    editor.chain().focus().setYoutubeVideo({ src: result.data }).run();
  }

  const isUrlInputInvalid = !!error;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Insert a YouTube Video</DialogTitle>
        <DialogDescription>
          Paste the full YouTube URL to embed a video into your document.
        </DialogDescription>
      </DialogHeader>

      <form id={formId} onSubmit={handleSubmit} className="grid gap-4">
        <Field data-invalid={isUrlInputInvalid}>
          <FieldLabel htmlFor={youtubeInputId}>YouTube URL</FieldLabel>
          <Input
            id={youtubeInputId}
            autoFocus
            name="youtube-url"
            aria-invalid={isUrlInputInvalid}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <FieldDescription>
            Paste the full YouTube URL to embed a video into your document.
          </FieldDescription>
          {isUrlInputInvalid && <FieldError errors={[{ message: error }]} />}
        </Field>
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
