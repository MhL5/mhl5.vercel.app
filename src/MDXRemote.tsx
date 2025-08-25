import CliCommandCode from "@/components/mdx-components/CliCommandCode";
import CodePreview from "@/components/mdx-components/CodePreview";
import ComponentSource from "@/components/mdx-components/ComponentSource";
import InstallationTabs from "@/components/mdx-components/InstallationTabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type MDXRemoteProps = {
  source: string;
};

export default function MDXRemoteComponent({ source }: MDXRemoteProps) {
  return (
    <MDXRemote
      source={source}
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
            const lang = className.replace("language-", ""); // Extract the

            return (
              <ComponentSource
                code={typeof children === "string" ? children : ""}
                lang={lang}
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
        CodePreview,
        CliCommandCode,
        InstallationTabs,
        ComponentSource,
        Alert,
        AlertDescription,
        AlertTitle,
      }}
    />
  );
}
