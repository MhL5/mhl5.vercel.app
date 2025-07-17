import CopyButton from "@/components/blocks/buttons/CopyButton";
import LinkButton from "@/components/blocks/buttons/LinkButton";
import CustomBreadCrumb from "@/components/BreadCrumb";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
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
    h1: ({ children, className, ...props }: ComponentPropsWithoutRef<"h1">) => {
      return (
        <div className="grid gap-7">
          <CustomBreadCrumb />

          <div className="mb-2 flex items-center justify-between gap-3">
            <h1
              className={cn(
                "mb-0",
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
              <LinkButton
                href="#"
                buttonProps={{
                  size: "icon",
                  variant: "secondary",
                }}
                className="size-7"
              >
                <ArrowRight className="rotate-180" />
              </LinkButton>
              <LinkButton
                href="#"
                buttonProps={{
                  size: "icon",
                  variant: "secondary",
                }}
                className="size-7"
              >
                <ArrowRight />
              </LinkButton>
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
        const codeHTML = await codeToHtml(children as string, {
          lang,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        });

        return (
          <div className="relative h-fit max-w-full overflow-x-auto">
            <CopyButton
              content={children as string}
              className="absolute top-3 right-3"
            />
            <code
              dangerouslySetInnerHTML={{ __html: codeHTML }}
              className={cn("block max-w-full", className)}
              {...props}
            />
          </div>
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
    ...components,
  };
}
