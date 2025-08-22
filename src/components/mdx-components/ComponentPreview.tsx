import ComponentSource from "@/components/mdx-components/ComponentSource";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2Icon } from "lucide-react";
import { lazy, Suspense, type ComponentType } from "react";

function lazyImportComponent(
  path:
    | `new-york/examples/${string}`
    | `new-york/${string}`
    | `hooks/${string}`,
) {
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

const COMPONENT_PREVIEWS = {
  colors: {
    preview: lazyImportComponent("new-york/colors/example"),
    source: "src/registry/new-york/colors/example.tsx",
  },
  DebouncedInput: {
    preview: lazyImportComponent("new-york/DebouncedInput/example"),
    source: "src/registry/new-york/DebouncedInput/Example.tsx",
  },
  DrawerDialog: {
    preview: lazyImportComponent("new-york/DrawerDialog/Example"),
    source: "src/registry/new-york/DrawerDialog/Example.tsx",
  },
  FadeShadow: {
    preview: lazyImportComponent("new-york/FadeShadow/Example"),
    source: "src/registry/new-york/FadeShadow/Example.tsx",
  },

  useIsMountedExample: {
    preview: lazyImportComponent("hooks/useIsMounted/Example"),
    source: "src/registry/hooks/useIsMounted/Example.tsx",
  },
  useDebouncedExample: {
    preview: lazyImportComponent("hooks/useDebounce/Example"),
    source: "src/registry/hooks/useDebounce/Example.tsx",
  },
  useCopyToClipboardExample: {
    preview: lazyImportComponent("hooks/useCopyToClipboard/Example"),
    source: "src/registry/hooks/useCopyToClipboard/Example.tsx",
  },
  useEventListenerExample: {
    preview: lazyImportComponent("hooks/useEventListener/Example"),
    source: "src/registry/hooks/useEventListener/Example.tsx",
  },
  useIsVisibleExample: {
    preview: lazyImportComponent("hooks/useIsVisible/Example"),
    source: "src/registry/hooks/useIsVisible/Example.tsx",
  },
  useMediaQueryExample: {
    preview: lazyImportComponent("hooks/useMediaQuery/Example"),
    source: "src/registry/hooks/useMediaQuery/Example.tsx",
  },
  useOnClickOutsideExample: {
    preview: lazyImportComponent("hooks/useOnClickOutside/Example"),
    source: "src/registry/hooks/useOnClickOutside/Example.tsx",
  },
  usePreviousExample: {
    preview: lazyImportComponent("hooks/usePrevious/Example"),
    source: "src/registry/hooks/usePrevious/Example.tsx",
  },
  useSizeExample: {
    preview: lazyImportComponent("hooks/useSize/Example"),
    source: "src/registry/hooks/useSize/Example.tsx",
  },
  useStateWithHistoryExample: {
    preview: lazyImportComponent("hooks/useStateWithHistory/Example"),
    source: "src/registry/hooks/useStateWithHistory/Example.tsx",
  },
  useStateWithValidationExample: {
    preview: lazyImportComponent("hooks/useStateWithValidation/Example"),
    source: "src/registry/hooks/useStateWithValidation/Example.tsx",
  },
};

type ComponentPreviewProps = {
  name: keyof typeof COMPONENT_PREVIEWS;
};

export default function ComponentPreview({ name }: ComponentPreviewProps) {
  const Component = COMPONENT_PREVIEWS[name]["preview"];
  const componentSourcePath = COMPONENT_PREVIEWS[name]["source"];

  if (!Component)
    return (
      <p className="text-muted-foreground not-prose text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );

  return (
    <Tabs defaultValue="preview" className="not-prose w-full">
      <TabsList className="flex w-fit">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      {/*  */}
      <Card className="h-[450px] overflow-y-auto rounded-lg bg-transparent p-0 [scrollbar-color:var(--muted-foreground)_var(--code-background)]">
        <CardContent className="h-full p-0">
          <TabsContent
            value="preview"
            className="flex h-full items-center justify-center p-4"
          >
            <Suspense
              fallback={<Loader2Icon className="size-16 animate-spin" />}
            >
              <Component />
            </Suspense>
          </TabsContent>
          <TabsContent value="code" className="h-full">
            <ComponentSource path={componentSourcePath} />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
