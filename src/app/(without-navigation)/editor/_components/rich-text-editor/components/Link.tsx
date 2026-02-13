import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { CheckIcon, ExternalLink, LinkIcon, Unlink } from "lucide-react";
import { type SubmitEvent, useId, useState } from "react";
import z from "zod";

import { useCurrentEditor } from "../hooks/useCurrentEditor";
import { ToolbarButton } from "./ui/ToolbarButton";

function LinkDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton tooltipContent={"Insert link"} isActive={false}>
          <LinkIcon />
        </ToolbarButton>
      </PopoverTrigger>

      <PopoverContent align="center" className="p-0">
        <Content />
      </PopoverContent>
    </Popover>
  );
}

function LinkBubbleMenu() {
  const { editor } = useCurrentEditor();
  const { isLinkActive } = useEditorState({
    editor,
    selector: (ctx) => ({
      isLinkActive: ctx.editor.isActive("link"),
    }),
  });

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="linkBubbleMenu"
      shouldShow={() => isLinkActive}
      options={{ placement: "top" }}
    >
      {isLinkActive ? <Content /> : null}
    </BubbleMenu>
  );
}

function Content() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      href: ctx.editor.getAttributes("link").href,
      text: ctx.editor.getAttributes("link"),
      from: ctx.editor.state.selection.from,
      to: ctx.editor.state.selection.to,
    }),
  });
  const [error, setError] = useState("");
  const urlInputId = useId();

  const isInvalid = !!error;
  const href = editorState.href || "";

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const href = formData.get("link");

    const result = z.url().safeParse(href);

    if (!result.success) return setError(z.prettifyError(result.error));
    setError("");

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: result.data, target: "_blank" })
      .run();
  }

  return (
    <div className="flex w-fit items-start gap-2 rounded-md bg-card p-1.5">
      <form className="flex w-fit items-start gap-2" onSubmit={handleSubmit}>
        <Field data-invalid={isInvalid}>
          <FieldLabel htmlFor={urlInputId} className="sr-only">
            URL
          </FieldLabel>
          <Input
            id={urlInputId}
            name="link"
            defaultValue={href}
            aria-invalid={isInvalid}
            placeholder="Enter link"
            className="h-8 w-44"
          />

          {isInvalid && error && <FieldError errors={[{ message: error }]} />}
        </Field>

        <ToolbarButton
          tooltipContentSide="top"
          type="submit"
          className="ms-auto"
          tooltipContent={"Apply"}
          isActive={false}
        >
          <CheckIcon />
        </ToolbarButton>
      </form>

      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-6"
      />

      <ToolbarButton
        tooltipContentSide="top"
        tooltipContent={"Open in new window"}
        isActive={false}
        onClick={() => window.open(href, "_blank")}
      >
        <ExternalLink />
      </ToolbarButton>

      <ToolbarButton
        tooltipContentSide="top"
        tooltipContent={"Remove link"}
        isActive={false}
        variant="destructive"
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Unlink />
      </ToolbarButton>
    </div>
  );
}

export { LinkBubbleMenu, LinkDropdown };
