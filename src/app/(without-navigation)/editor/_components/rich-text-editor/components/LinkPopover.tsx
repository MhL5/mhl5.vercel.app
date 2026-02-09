import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useEditorState } from "@tiptap/react";
import { CheckIcon, ExternalLink, LinkIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { useCurrentEditor } from "../hooks/useEditor";
import { ToolbarButton } from "./ToolbarButton";

export default function LinkPopover() {
  const [open, setOpen] = useState(false);
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isLink: ctx.editor.isActive("link"),
    }),
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolbarButton isActive={editorState.isLink} tooltipContent={null}>
          <LinkIcon />
        </ToolbarButton>
      </PopoverTrigger>
      <Content />
    </Popover>
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

  const href = editorState.href || "";

  function handleApply(href: string) {
    const urlSchema = z.string().url();
    const result = urlSchema.safeParse(href);

    if (!result.success) return toast.error("Invalid URL");

    const validatedHref = result.data;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: validatedHref, target: "_blank" })
      .run();
  }

  return (
    <PopoverContent className="flex w-fit items-center gap-2 p-1.5">
      <form
        className="flex w-fit items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleApply(e.target.link.value);
        }}
      >
        <Label htmlFor="link-input" className="sr-only">
          URL
        </Label>
        <Input
          id="link-input"
          defaultValue={href}
          placeholder="Enter link"
          name="link"
          className="h-8 w-56"
        />
        <ToolbarButton
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
        tooltipContent={"Open in new window"}
        isActive={false}
        onClick={() => window.open(href, "_blank")}
      >
        <ExternalLink />
      </ToolbarButton>

      <ToolbarButton
        tooltipContent={"Remove link"}
        isActive={false}
        variant="destructive"
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Trash2 />
      </ToolbarButton>
    </PopoverContent>
  );
}
