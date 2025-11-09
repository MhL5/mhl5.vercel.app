"use client";

import { type ComponentProps, Suspense, use } from "react";
import { codeToHtml } from "shiki";
import { CopyButton, CopyButtonIcon } from "@/components/buttons/CopyButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ComponentSourceProps = {
  lang?: string;
  className?: string;
  code: string;
} & ComponentProps<"code">;

export default function ComponentSourceClient(props: ComponentSourceProps) {
  return (
    <Suspense
      fallback={
        <Skeleton className="h-10 max-w-full rounded-xl bg-code-background" />
      }
    >
      <ContentSuspended {...props} />
    </Suspense>
  );
}

function ContentSuspended({
  lang = "tsx",
  className,
  code,
  ...props
}: ComponentSourceProps) {
  const codeHtml = use(
    codeToHtml(code, {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    }),
  );

  return (
    <pre className="not-prose relative h-full max-w-full rounded-xl bg-code-background">
      <CopyButton
        contentToCopy={code}
        side="left"
        aria-label="Copy Code"
        className="absolute top-3 right-3"
      >
        <CopyButtonIcon />
      </CopyButton>

      <code
        // biome-ignore lint/security/noDangerouslySetInnerHtml: this is safe because the codeHtml variables comes from my own documents and are not user-generated
        dangerouslySetInnerHTML={{ __html: codeHtml }}
        className={cn("w-full max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}
