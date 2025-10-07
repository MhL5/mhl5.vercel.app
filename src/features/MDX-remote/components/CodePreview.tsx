import { Loader2Icon } from "lucide-react";
import { type ComponentType, lazy, Suspense } from "react";
import { OpenInV0Button } from "@/components/buttons/OpenInV0Button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentSource from "@/features/MDX-remote/components/ComponentSource";

function lazyImportComponent(path: string) {
  return lazy(async () => {
    const mod: Record<string, ComponentType<unknown>> = await import(
      `@/registry/${path}`
    );
    const exportName =
      Object.keys(mod).find(
        (key) =>
          typeof mod?.[key] === "function" || typeof mod?.[key] === "object",
      ) || "";

    return {
      default: mod.default || mod[exportName],
    };
  });
}

// without @/registry/
const CodePreviewSources = {
  Colors: "new-york/Colors/example.tsx",
  DebouncedInput: "new-york/DebouncedInput/example.tsx",
  DrawerDialog: "new-york/DrawerDialog/example.tsx",
  ErrorBoundary: "new-york/ErrorBoundary/example.tsx",
  FadeShadow: "new-york/FadeShadow/example.tsx",
  Img: "new-york/Img/example.tsx",
  MatchMedia: "new-york/MatchMedia/example.tsx",
  useCopyToClipboard: "hooks/useCopyToClipboard/example.tsx",
  useIsMounted: "hooks/useIsMounted/example.tsx",
  useUrlState: "hooks/useUrlState/example.tsx",
  AutoGrid: "new-york/AutoGrid/example.tsx",
  FallbackPagesError: "new-york/FallbackPages/ErrorExample.tsx",
  FallbackPagesNotFound: "new-york/FallbackPages/NotFoundExample.tsx",
  FallbackPagesLoading: "new-york/FallbackPages/LoadingExample.tsx",
};
const CODE_PREVIEWS = Object.entries(CodePreviewSources).reduce(
  (acc, [key, value]) => {
    acc[key as keyof typeof CodePreviewSources] = lazyImportComponent(value);
    return acc;
  },
  {} as Record<keyof typeof CodePreviewSources, ComponentType<unknown>>,
);

type CodePreviewProps = {
  name: keyof typeof CODE_PREVIEWS;
};

export default function CodePreview({ name }: CodePreviewProps) {
  const CodePreview = CODE_PREVIEWS[name];
  const CodePreviewSource = CodePreviewSources?.[name];

  if (!CodePreview || !CodePreviewSource)
    return (
      <p className="not-prose text-muted-foreground text-sm">
        Component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );

  return (
    <Tabs defaultValue="preview" className="not-prose w-full">
      <div className="flex items-center justify-between gap-2">
        <TabsList className="flex w-fit">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <OpenInV0Button name={name} />
      </div>

      <Card className="h-[450px] overflow-y-auto rounded-lg bg-transparent p-0 [scrollbar-color:var(--muted-foreground)_var(--code-background)]">
        <CardContent className="h-full p-0">
          <TabsContent
            value="preview"
            className="flex h-full items-center justify-center p-4"
          >
            <Suspense
              fallback={<Loader2Icon className="size-16 animate-spin" />}
            >
              <CodePreview />
            </Suspense>
          </TabsContent>
          <TabsContent value="code" className="h-full">
            <ComponentSource path={`src/registry/${CodePreviewSource}`} />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
