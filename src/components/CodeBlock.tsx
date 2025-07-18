import type { StringWithAutoComplete } from "@/app/(with-navigation)/snippets/types/AutoComplete";
import CopyButton from "@/components/blocks/buttons/CopyButton";
import { cn } from "@/lib/utils";
import fs from "node:fs/promises";
import type { ComponentPropsWithoutRef } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";

type CodeBlockProps = {
  path: StringWithAutoComplete<
    | "src/app/(with-navigation)/snippets/components/"
    | "src/app/(with-navigation)/snippets/configs/"
    | "src/app/(with-navigation)/snippets/hooks/"
    | "src/app/(with-navigation)/snippets/types/"
    | "src/app/(with-navigation)/snippets/utils/"
  >;
  lang?: BundledLanguage;
} & ComponentPropsWithoutRef<"code">;

export default async function CodeBlock({
  path,
  lang = "tsx",
  className,
  ...props
}: CodeBlockProps) {
  const code = await fileReader(path);

  const codeHTML = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <pre className="not-prose relative my-1 h-fit max-w-full overflow-x-auto">
      <CopyButton content={code as string} className="absolute top-3 right-3" />
      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className={cn("block max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}

type FileReaderParamsPath = StringWithAutoComplete<
  | "src/app/(with-navigation)/snippets/components/"
  | "src/app/(with-navigation)/snippets/configs/"
  | "src/app/(with-navigation)/snippets/hooks/"
  | "src/app/(with-navigation)/snippets/types/"
  | "src/app/(with-navigation)/snippets/utils/"
>;

async function fileReader(path: FileReaderParamsPath) {
  try {
    return await fs.readFile(`${process.cwd()}/${path}`, "utf8");
  } catch (error) {
    return error instanceof Error
      ? error?.message
      : "Something went wrong while importing the file!";
  }
}
