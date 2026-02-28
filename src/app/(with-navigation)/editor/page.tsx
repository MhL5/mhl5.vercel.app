import type { Metadata } from "next";

import EditorDemo from "./_components/EditorDemo";

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
        <EditorDemo />
      </div>
    </section>
  );
}
