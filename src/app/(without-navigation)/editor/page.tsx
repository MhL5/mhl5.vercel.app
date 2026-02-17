import type { Metadata } from "next";

import EditorDemo from "./EditorTest";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function Page() {
  return (
    <section className="flex min-h-dvh w-full items-start justify-center pt-20">
      <div className="mx-auto w-full max-w-4xl">
        <EditorDemo />
      </div>
    </section>
  );
}
