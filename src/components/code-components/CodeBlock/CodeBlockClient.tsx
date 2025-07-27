"use client";

import type { CodeBlockProps } from "@/components/code-components/CodeBlock/types/types";
import CodeBlockShell from "@/components/code-components/CodeBlock/ui/Shell";
import CodeBlockSkeleton from "@/components/code-components/CodeBlock/ui/Skeleton";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type CodeBlockClientProps = {
  code: string;
} & CodeBlockProps;

export default function CodeBlockClient({
  code,
  lang = "tsx",
  className,
  ...props
}: CodeBlockClientProps) {
  const [codeHTML, setCodeHTML] = useState<string | null>(null);

  useEffect(() => {
    async function getCodeHTML() {
      const codeHTML = await codeToHtml(code.trim(), {
        lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
      setCodeHTML(codeHTML);
    }
    getCodeHTML();
  }, [code, lang]);

  if (!codeHTML) return <CodeBlockSkeleton />;

  return (
    <CodeBlockShell
      code={code}
      codeHTML={codeHTML}
      className={className}
      {...props}
    />
  );
}
