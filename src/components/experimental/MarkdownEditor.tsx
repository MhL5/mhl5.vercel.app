"use client";

import MdxRemoteClient from "@/components/MDX-remote/MdxRemoteClient";
import Prose from "@/components/Prose";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/registry/hooks/useDebounce/useDebounce";
import { Eye, FileText, PenBox } from "lucide-react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import {
  type ChangeEvent,
  type ComponentProps,
  useEffect,
  useState,
} from "react";

const viewModes = [
  { value: "split", icon: FileText },
  { value: "editor", icon: PenBox },
  { value: "preview", icon: Eye },
] as const;

type MarkdownEditorProps = {
  value: string;
  onValueChange: (value: string) => void;
} & Omit<ComponentProps<"textarea">, "value">;

export default function MarkdownEditor({
  value,
  onValueChange,
  ...props
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(value);
  const [viewMode, setViewMode] = useState<(typeof viewModes)[number]>(
    viewModes[0],
  );
  const [serializedMarkdown, setSerializedMarkdown] =
    useState<MDXRemoteSerializeResult | null>(null);

  useDebounce(
    async () => setSerializedMarkdown(await serialize(markdown)),
    1000,
    [markdown],
  );

  async function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    onValueChange(value);
    setMarkdown(value);
  }

  useEffect(() => {
    if (!serializedMarkdown) serialize(markdown).then(setSerializedMarkdown);
  }, [serializedMarkdown, markdown]);

  return (
    <div className="relative mx-auto flex h-200 w-full max-w-[1400px] flex-col overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/5">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-gradient-to-r from-muted/50 to-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <FileText className="size-4" />
          <span className="font-medium">Markdown Editor</span>
        </div>

        <div className="flex items-center">
          {viewModes.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="xs"
              onClick={() => setViewMode({ value, icon: Icon })}
              variant={value === viewMode.value ? "default" : "outline"}
              className="gap-1.5 px-2.5 text-xs first:rounded-e-none nth-[2]:rounded-none nth-[3]:rounded-s-none"
            >
              <Icon className="size-3.5" />
              <span className="hidden capitalize sm:inline">{value}</span>
            </Button>
          ))}
        </div>
      </header>

      {/* Main content area */}
      <section className="flex min-h-0 flex-1 bg-muted/40">
        {viewMode.value !== "preview" && (
          <div className="mx-auto size-full w-full max-w-3xl">
            <textarea
              dir="auto"
              value={markdown}
              onChange={handleChange}
              className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
              placeholder="Start writing your markdown..."
              spellCheck={false}
              {...props}
            />
          </div>
        )}

        <Separator orientation="vertical" />

        {viewMode.value !== "editor" && (
          <div className="mx-auto w-full max-w-3xl overflow-y-auto">
            {serializedMarkdown ? (
              <Prose
                as="div"
                dir="auto"
                className="mx-auto min-h-0 max-w-3xl flex-1 p-4"
              >
                <MdxRemoteClient source={serializedMarkdown} />
              </Prose>
            ) : (
              <Skeleton className="absolute size-full rounded-none" />
            )}
          </div>
        )}
      </section>
    </div>
  );
}
