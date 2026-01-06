"use client";

import MdxRemoteClient from "@/components/MDX-remote/MdxRemoteClient";
import Prose from "@/components/Prose";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useComposedRefs } from "@/hooks/useComposedRefs";
import { cn } from "@/lib/utils";
import { FileText, Loader2 } from "lucide-react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {
  type ComponentProps,
  type ComponentPropsWithRef,
  type Dispatch,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
  createContext,
  use,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

type MarkdownTextAreaContextType = {
  markdownTextareaRef: RefObject<HTMLTextAreaElement | null>;

  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  handleShowPreview: () => void;

  source: MDXRemoteSerializeResult | null;
  setSource: Dispatch<SetStateAction<MDXRemoteSerializeResult | null>>;

  isPending: boolean;
};

const MarkdownTextAreaContext =
  createContext<MarkdownTextAreaContextType | null>(null);

export function MarkdownTextArea({ children }: PropsWithChildren) {
  const markdownTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [source, setSource] =
    useState<MarkdownTextAreaContextType["source"]>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleShowPreview() {
    setIsPending(true);
    serialize(markdownTextareaRef?.current?.value || "")
      .then((result) => {
        setSource(result);
        setShowPreview(true);
      })
      .catch((error) => {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong!",
        );
        setIsPending(false);
      })
      .then(() => {
        setIsPending(false);
      });
  }

  return (
    <MarkdownTextAreaContext
      value={{
        markdownTextareaRef,
        showPreview,
        setShowPreview,
        source,
        setSource,
        isPending,
        handleShowPreview,
      }}
    >
      {children}

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="flex max-h-[90dvh] max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
          <DialogHeader className="border-b bg-muted/30 px-6 py-4">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              Markdown Preview
            </DialogTitle>
            <DialogDescription>
              See how your markdown content will be rendered
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-auto px-6 py-5">
            {source ? (
              <Prose as="article">
                <MdxRemoteClient source={source} />
              </Prose>
            ) : (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="me-2 size-5 animate-spin" />
                Rendering preview...
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MarkdownTextAreaContext>
  );
}

function useMarkdownTextAreaContext() {
  const context = use(MarkdownTextAreaContext);
  if (!context)
    throw new Error(
      "MarkdownTextAreaContext was called outside of its provider",
    );
  return context;
}

export function MarkdownTextareaTextarea({
  className,
  ref,
  ...props
}: ComponentProps<typeof Textarea>) {
  const { markdownTextareaRef } = useMarkdownTextAreaContext();
  const composedRef = useComposedRefs(markdownTextareaRef, ref);

  return (
    <Textarea className={cn("h-100", className)} ref={composedRef} {...props} />
  );
}

export function MarkdownTextareaPreviewButton({
  onClick,
  disabled,
  ...props
}: ComponentPropsWithRef<typeof Button>) {
  const { handleShowPreview, isPending } = useMarkdownTextAreaContext();

  return (
    <Button
      disabled={isPending || disabled}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        handleShowPreview();
      }}
      {...props}
    />
  );
}
