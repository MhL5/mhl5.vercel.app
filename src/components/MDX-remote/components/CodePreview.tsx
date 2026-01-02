import { OpenInV0Button } from "@/components/buttons/OpenInV0Button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

import ComponentSource from "./ComponentSource";

const previewSourceCodes = {
  DebouncedInput: "@/registry/new-york/DebouncedInput/example.tsx",
  DrawerDialog: "@/registry/new-york/DrawerDialog/example.tsx",
  ErrorBoundary: "@/registry/new-york/ErrorBoundary/example.tsx",
  Img: "@/registry/new-york/Img/example.tsx",
  useLocalStorage: "@/registry/hooks/useLocalStorage/example.tsx",
  useSessionStorage: "@/registry/hooks/useSessionStorage/example.tsx",
  useCopyToClipboard: "@/registry/hooks/useCopyToClipboard/example.tsx",
  useIsMounted: "@/registry/hooks/useIsMounted/example.tsx",
  useUrlState: "@/registry/hooks/useUrlState/example.tsx",
  AutoGrid: "@/registry/new-york/AutoGrid/example.tsx",
  FallbackPagesError: "@/registry/new-york/FallbackPages/ErrorExample.tsx",
  FallbackPagesNotFound:
    "@/registry/new-york/FallbackPages/NotFoundExample.tsx",
  FallbackPagesLoading: "@/registry/new-york/FallbackPages/LoadingExample.tsx",
  TagsInput: "@/registry/new-york/TagsInput/example.tsx",

  useDebounce: "@/registry/hooks/useDebounce/example.tsx",
};

const previewSources = {
  DebouncedInput: dynamic(() =>
    import(previewSourceCodes.DebouncedInput).then((mod) => mod.default),
  ),
  DrawerDialog: dynamic(() =>
    import(previewSourceCodes.DrawerDialog).then((mod) => mod.default),
  ),
  ErrorBoundary: dynamic(() =>
    import(previewSourceCodes.ErrorBoundary).then((mod) => mod.default),
  ),
  Img: dynamic(() => import(previewSourceCodes.Img).then((mod) => mod.default)),
  useLocalStorage: dynamic(() =>
    import(previewSourceCodes.useLocalStorage).then((mod) => mod.default),
  ),
  useSessionStorage: dynamic(() =>
    import(previewSourceCodes.useSessionStorage).then((mod) => mod.default),
  ),
  useCopyToClipboard: dynamic(() =>
    import(previewSourceCodes.useCopyToClipboard).then((mod) => mod.default),
  ),
  useIsMounted: dynamic(() =>
    import(previewSourceCodes.useIsMounted).then((mod) => mod.default),
  ),
  useUrlState: dynamic(() =>
    import(previewSourceCodes.useUrlState).then((mod) => mod.default),
  ),
  AutoGrid: dynamic(() =>
    import(previewSourceCodes.AutoGrid).then((mod) => mod.default),
  ),
  FallbackPagesError: dynamic(() =>
    import(previewSourceCodes.FallbackPagesError).then((mod) => mod.default),
  ),
  FallbackPagesNotFound: dynamic(() =>
    import(previewSourceCodes.FallbackPagesNotFound).then((mod) => mod.default),
  ),
  FallbackPagesLoading: dynamic(() =>
    import(previewSourceCodes.FallbackPagesLoading).then((mod) => mod.default),
  ),
  TagsInput: dynamic(() =>
    import(previewSourceCodes.TagsInput).then((mod) => mod.default),
  ),

  useDebounce: dynamic(() =>
    import(previewSourceCodes.useDebounce).then((mod) => mod.default),
  ),
};

type CodePreviewProps = {
  name: keyof typeof previewSources;
};

export default async function CodePreview({ name }: CodePreviewProps) {
  const PreviewComponent = previewSources[name];
  const previewSourceCodePath = previewSourceCodes[name].replace("@/", "src/");

  if (!PreviewComponent)
    return (
      <p className="not-prose text-sm text-muted-foreground">
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
            <PreviewComponent />
          </TabsContent>
          <TabsContent value="code" className="h-full">
            <ComponentSource
              className="[&_pre]:h-[448px]"
              path={previewSourceCodePath}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
