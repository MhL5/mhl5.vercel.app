import ComponentSource from "@/components/mdx-components/ComponentSource";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2Icon } from "lucide-react";
import { lazy, Suspense, type ComponentType } from "react";

function lazyImportComponent(
  path: `examples/${string}` | `mhl5-registry/${string}`,
) {
  return lazy(async () => {
    const mod: Record<string, ComponentType<unknown>> = await import(
      `@/registry/new-york/${path}`
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
  alert: {
    preview: lazyImportComponent("examples/alert-example"),
    source: "src/registry/new-york/items/alert/alert.tsx",
  },
  alertExample: {
    preview: lazyImportComponent("examples/alert-example"),
    source: "src/registry/new-york/examples/alert-example.tsx",
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
