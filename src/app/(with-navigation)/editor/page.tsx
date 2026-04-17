import { TiptapEditorDemo } from "@/components/TiptapEditor/TiptapEditorDemo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function Page() {
  return (
    <section className="flex min-h-dvh w-full items-start justify-center pt-5">
      <div className="mx-auto w-full max-w-4xl px-5">
        <TiptapEditorDemo />
      </div>
    </section>
  );
}
