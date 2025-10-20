"use client";

import { useState } from "react";
import SnippetToc from "@/app/(with-navigation)/snippets/_components/SnippetToc";
import DropArea from "@/components/DropArea";
import Prose from "@/components/Prose";
import ReactMarkdown from "@/features/MDX-remote/ReactMarkdown";

export default function MarkdownRenderer() {
  const [md, setMd] = useState("");

  async function handleAddMd(file: FileList | null) {
    if (!file || file.length === 0) return;

    const newFile = await Array.from(file)?.[0]?.text();

    setMd(newFile || "");
  }

  return (
    <div className="mx-auto min-h-svh w-full max-w-7xl px-5">
      {!md ? (
        <DropArea
          className="my-8 w-full"
          onDrop={(e) => {
            handleAddMd(e.dataTransfer.files);
          }}
          onChange={(e) => {
            handleAddMd(e.target.files);
          }}
          disabled={false}
        />
      ) : (
        <section className="mx-auto grid min-h-dvh w-full max-w-8xl pt-8 2xl:grid-cols-[1fr_15rem]">
          <Prose as="div">
            <ReactMarkdown markdown={md} />
          </Prose>
          <aside className="hidden pt-8 pb-2 2xl:flex 2xl:flex-col">
            <SnippetToc tocDepth={6} />
          </aside>
        </section>
      )}
    </div>
  );
}
