import CodeBlockServer from "@/components/code-components/CodeBlock/CodeBlockServer";
import CodeBlockShell from "@/components/code-components/CodeBlock/ui/Shell";
import CodePreview from "@/components/code-components/CodePreview";
import ComponentPreview from "@/components/mdx-components/ComponentPreview";
import SnippetH1 from "@/components/mdx-components/SnippetH1";
import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { codeToHtml } from "shiki";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
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
    ...components,
  };
}
