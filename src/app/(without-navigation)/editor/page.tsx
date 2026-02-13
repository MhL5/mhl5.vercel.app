"use client";

import { htmlContent } from "../test/content";
import { TiptapEditorDynamic } from "./_components/rich-text-editor/TiptapEditor";

export default function Page() {
  return (
    <section className="flex min-h-dvh w-full items-start justify-center pt-20">
      <div className="mx-auto w-full max-w-4xl">
        <TiptapEditorDynamic
          content={htmlContent}
          onUpdate={({ editor }) => {
            // eslint-disable-next-line no-console
            console.log(editor.getHTML());
          }}
        />
      </div>
    </section>
  );
}
