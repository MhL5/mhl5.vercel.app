"use client";

import { type ComponentProps, useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import CopyButton from "@/components/buttons/CopyButton";
import { cn } from "@/lib/utils";

type ComponentSourceProps = {
  lang?: string;
  className?: string;
  code: string;
} & ComponentProps<"code">;

export default function ComponentSourceClient({
  lang = "tsx",
  className,
  code,
  ...props
}: ComponentSourceProps) {
  const [codeHtml, setCodeHtml] = useState("");

  useEffect(() => {
    async function getCodeHtml() {
      const codeHtml = await codeToHtml(code, {
        lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });

      setCodeHtml(codeHtml);
    }
    getCodeHtml();
  }, [code, lang]);

  return (
    <pre className="not-prose relative h-full max-w-full rounded-xl bg-code-background">
      <CopyButton content={code} className="absolute top-3 right-3" />

      <code
        // biome-ignore lint/security/noDangerouslySetInnerHtml: this is safe because the codeHtml variables comes from my own documents and are not user-generated
        dangerouslySetInnerHTML={{ __html: codeHtml }}
        className={cn("w-full max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}
