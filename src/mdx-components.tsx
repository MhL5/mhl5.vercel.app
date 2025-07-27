import LinkButton from "@/components/blocks/buttons/LinkButton";
import BreadCrumb from "@/components/BreadCrumb";
import CodeBlockServer from "@/components/code-components/CodeBlock/CodeBlockServer";
import CodeBlockShell from "@/components/code-components/CodeBlock/ui/Shell";
import CodePreview from "@/components/code-components/CodePreview";
import { Button } from "@/components/ui/button";
import { snippetsLinks } from "@/constants/snippetsLinks";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
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
    h1: ({ children, className, ...props }: ComponentPropsWithoutRef<"h1">) => {
      let prevNext: { title: string; url: string }[] = [];

      for (const category of snippetsLinks) {
        if (!category.items) continue;

        for (let i = 0; i < category.items.length; i++) {
          if (category.items[i].title === children) {
            const prev = category.items[i - 1];
            const next = category.items[i + 1];
            prevNext = [prev, next];
            break;
          }
        }

        if (prevNext.length) break;
      }

      return (
        <div className="grid gap-7">
          <BreadCrumb />

          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <h1
              className={cn(
                "mb-0 break-all",
                typeof children === "string" &&
                  !children.toLowerCase().startsWith("use")
                  ? "capitalize"
                  : "",
                className,
              )}
              {...props}
            >
              {children}
            </h1>

            <div className="flex gap-2">
              {prevNext.map((item, index) => {
                if (!item)
                  return (
                    <Button
                      key={`h1-link-button${index}`}
                      size="icon"
                      disabled={!item}
                      variant="secondary"
                      className="size-7"
                    >
                      <H1PrevNextChildren disabled={true} index={index} />
                    </Button>
                  );

                return (
                  <LinkButton
                    key={`h1-link-button${index}`}
                    href={item?.url || "#"}
                    buttonProps={{
                      size: "icon",
                      disabled: !item,
                      variant: "secondary",
                    }}
                    className="size-7"
                  >
                    <H1PrevNextChildren index={index} />
                  </LinkButton>
                );
              })}
            </div>
          </div>
        </div>
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
    CodeBlockServer: CodeBlockServer,
    CodePreview: CodePreview,
    SnippetH1: ({
      heading,
      className,
      pageSlug,
    }: {
      pageSlug: string;
      heading: ReactNode;
      className?: string;
    }) => {
      let prevNext: { title: string; url: string }[] = [];

      for (const category of snippetsLinks) {
        if (!category.items) continue;

        for (let i = 0; i < category.items.length; i++) {
          if (category.items[i].title === pageSlug) {
            const prev = category.items[i - 1];
            const next = category.items[i + 1];
            prevNext = [prev, next];
            break;
          }
        }

        if (prevNext.length) break;
      }

      return (
        <div className="grid gap-7">
          <BreadCrumb />

          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <h1
              className={cn(
                "mb-0 break-all",
                typeof heading === "string" &&
                  !heading.toLowerCase().startsWith("use")
                  ? "capitalize"
                  : "",
                className,
              )}
            >
              {heading}
            </h1>

            <div className="flex gap-2">
              {prevNext.map((item, index) => {
                if (!item)
                  return (
                    <Button
                      key={`h1-link-button${index}`}
                      size="icon"
                      disabled={!item}
                      variant="secondary"
                      className="size-7"
                    >
                      <H1PrevNextChildren disabled={true} index={index} />
                    </Button>
                  );

                return (
                  <LinkButton
                    key={`h1-link-button${index}`}
                    href={item?.url || "#"}
                    buttonProps={{
                      size: "icon",
                      disabled: !item,
                      variant: "secondary",
                    }}
                    className="size-7"
                  >
                    <H1PrevNextChildren index={index} />
                  </LinkButton>
                );
              })}
            </div>
          </div>
        </div>
      );
    },
    ...components,
  };
}

function H1PrevNextChildren({
  index,
  disabled,
}: {
  index: number;
  disabled?: boolean;
}) {
  return (
    <>
      <span className="sr-only">
        {disabled ? "not available" : `go ${index === 0 ? "previous" : "next"}`}
      </span>

      {index === 0 ? <ArrowRight className="rotate-180" /> : <ArrowRight />}
    </>
  );
}
