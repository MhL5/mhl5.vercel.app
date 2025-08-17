import SnippetPageLinks from "@/app/(with-navigation)/snippets2/_components/SnippetPageLinks";
import CodeBlockServer from "@/components/code-components/CodeBlock/CodeBlockServer";
import CodeBlockShell from "@/components/code-components/CodeBlock/ui/Shell";
import CodePreview from "@/components/code-components/CodePreview";
import CliCommandCode from "@/components/mdx-components/CliCommandCode";
import ComponentPreview from "@/components/mdx-components/ComponentPreview";
import InstallationTabs from "@/components/mdx-components/InstallationTabs";
import SnippetH1 from "@/components/mdx-components/SnippetH1";
import { cn } from "@/lib/utils";
import { fileReader } from "@/utils/fileReader";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { codeToHtml } from "shiki";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Code Snippets Collection",
    description:
      "React snippets collections, built on top of shadcn/ui for use inside React and Next.js projects.",
  };
}

export default async function Page() {
  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <>
      <MDXRemote
        source={content}
        components={{
          a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
            if (href?.startsWith("/"))
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              );

            if (href?.startsWith("#"))
              return (
                <a href={href} {...props}>
                  {children}
                </a>
              );

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
          h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => {
            return (
              <h1
                id={
                  typeof children === "string"
                    ? children.toLowerCase().replaceAll(" ", "-")
                    : ""
                }
                {...props}
              >
                {children}
              </h1>
            );
          },
          h2: (props: ComponentPropsWithoutRef<"h2">) => {
            return (
              <h2
                id={
                  typeof props.children === "string"
                    ? props.children.toLowerCase().replaceAll(" ", "-")
                    : ""
                }
                {...props}
              />
            );
          },
          h3: (props: ComponentPropsWithoutRef<"h3">) => {
            return (
              <h3
                id={
                  typeof props.children === "string"
                    ? props.children.toLowerCase().replaceAll(" ", "-")
                    : ""
                }
                {...props}
              />
            );
          },
          pre: ({
            children,
            className,
            ...props
          }: ComponentPropsWithoutRef<"pre">) => {
            return (
              <pre className={cn("not-prose", className)} {...props}>
                {children}
              </pre>
            );
          },
          code: async ({
            children,
            className,
            ...props
          }: ComponentPropsWithoutRef<"code">) => {
            if (className?.startsWith("language-")) {
              // If it's a code block
              const lang = className.replace("language-", ""); // Extract the language (e.g., ts, js)
              const codeHTML = await codeToHtml(
                typeof children === "string" ? children : "",
                {
                  lang,
                  themes: {
                    light: "github-light",
                    dark: "github-dark",
                  },
                },
              );

              return (
                <CodeBlockShell
                  code={typeof children === "string" ? children : ""}
                  className={className}
                  {...props}
                  codeHTML={codeHTML}
                />
              );
            }

            return (
              <code
                {...props}
                className="prose-code:after:content-none bg-secondary text-secondary-foreground rounded-sm px-1.5 py-0.5 tracking-wide text-nowrap before:content-none after:content-none"
              >
                {typeof children === "string"
                  ? children.replaceAll("`", "")
                  : children}
              </code>
            );
          },
          CodeBlockServer,
          CodePreview,
          SnippetH1,
          ComponentPreview,
          CliCommandCode,
          InstallationTabs,
        }}
      />
      <SnippetPageLinks />
    </>
  );
}
