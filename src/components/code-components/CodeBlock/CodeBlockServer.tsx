import type { StringWithAutoComplete } from "~/contents/snippets/types/AutoComplete/AutoComplete";
import type { CodeBlockProps } from "@/components/code-components/CodeBlock/types/types";
import CodeBlockShell from "@/components/code-components/CodeBlock/ui/Shell";
import CodeBlockSkeleton from "@/components/code-components/CodeBlock/ui/Skeleton";
import { fileReader } from "@/utils/fileReader";
import { Suspense } from "react";
import { codeToHtml } from "shiki";

type CodeBlockServerProps = {
  path: StringWithAutoComplete<
    | "src/app/(with-navigation)/snippets/components/"
    | "src/app/(with-navigation)/snippets/configs/"
    | "src/app/(with-navigation)/snippets/hooks/"
    | "src/app/(with-navigation)/snippets/types/"
    | "src/app/(with-navigation)/snippets/utils/"
  >;
} & CodeBlockProps;

export default async function CodeBlockServer(props: CodeBlockServerProps) {
  return (
    <Suspense fallback={<CodeBlockSkeleton />}>
      <Suspended {...props} />
    </Suspense>
  );
}

async function Suspended({
  path,
  lang = "tsx",
  className,
  ...props
}: CodeBlockServerProps) {
  const code = await fileReader(path);
  const codeHTML = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <CodeBlockShell
      code={code}
      codeHTML={codeHTML}
      className={className}
      {...props}
    />
  );
}
