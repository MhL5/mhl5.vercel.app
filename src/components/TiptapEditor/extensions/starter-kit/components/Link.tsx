import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form-nextjs";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { CheckIcon, ExternalLink, LinkIcon, Unlink } from "lucide-react";
import { useId } from "react";
import z from "zod";

import { EditorButton } from "../../../components/EditorButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { useEditorMessages } from "../../../i18n/EditorMessagesContext";

function LinkPopover() {
  const { messages } = useEditorMessages();
  const { editor } = useCurrentEditor();
  const { isLinkActive } = useEditorState({
    editor,
    selector: (ctx) => ({
      isLinkActive: ctx.editor.isActive("link"),
    }),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <EditorButton
          tooltipContent={messages.insertLink}
          isActive={isLinkActive}
        >
          <LinkIcon />
        </EditorButton>
      </PopoverTrigger>

      <PopoverContent align="center" className="p-0">
        <Content />
      </PopoverContent>
    </Popover>
  );
}

function LinkBubbleMenu() {
  const { editor } = useCurrentEditor();
  const { isLinkActive, href } = useEditorState({
    editor,
    selector: (ctx) => ({
      isLinkActive: ctx.editor.isActive("link"),
      href: ctx.editor.getAttributes("link").href,
    }),
  });

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="linkBubbleMenu"
      shouldShow={() => isLinkActive}
      options={{ placement: "top" }}
    >
      {isLinkActive ? <Content key={href} /> : null}
    </BubbleMenu>
  );
}

function Content() {
  const { messages } = useEditorMessages();
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
  const form = useForm({
    defaultValues: {
      href: editorState.href || "",
    },
    validators: {
      onSubmit: z.object({
        href: z.union([
          z.url(),
          z.string().regex(/^#[\w-]+$/, messages.linkUrlError),
        ]),
      }),
    },
    onSubmit: ({ value: { href } }) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href, target: "_blank" })
        .run();
    },
  });
  const urlInputId = useId();

  return (
    <div className="flex w-fit items-start gap-2 rounded-md border bg-card p-1.5">
      <form
        className="flex w-fit items-start gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="href">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={urlInputId} className="sr-only">
                  {messages.url}
                </FieldLabel>
                <Input
                  id={urlInputId}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={messages.enterLink}
                  className="h-7 w-44"
                />
                {field.state.meta.errors && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            );
          }}
        </form.Field>

        <EditorButton
          tooltipContentSide="top"
          type="submit"
          className="ms-auto"
          tooltipContent={messages.apply}
          isActive={false}
        >
          <CheckIcon />
        </EditorButton>
      </form>

      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-6"
      />

      <form.Subscribe selector={(state) => state.values.href}>
        {(href) => (
          <EditorButton
            tooltipContentSide="top"
            tooltipContent={messages.openInNewWindow}
            isActive={false}
            onClick={() => window.open(href, "_blank")}
          >
            <ExternalLink />
          </EditorButton>
        )}
      </form.Subscribe>

      <EditorButton
        tooltipContentSide="top"
        tooltipContent={messages.removeLink}
        isActive={false}
        variant="destructive"
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Unlink />
      </EditorButton>
    </div>
  );
}

export { LinkBubbleMenu, LinkPopover };
