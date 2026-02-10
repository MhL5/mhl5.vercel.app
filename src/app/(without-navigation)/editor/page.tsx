"use client";

import { TiptapEditorDynamic } from "./_components/rich-text-editor/TiptapEditor";
import { htmlContent } from "./test/content";

export default function Page() {
  return (
    <section className="flex min-h-dvh w-full items-start justify-center pt-40">
      <div className="mx-auto w-full max-w-4xl">
        <TiptapEditorDynamic content={htmlContent} onUpdate={() => {}} />
      </div>
    </section>
  );
}
