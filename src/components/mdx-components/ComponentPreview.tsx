import CodeBlockServer from "@/components/code-components/CodeBlock/CodeBlockServer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, type ComponentType } from "react";

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
    source: "src/registry/new-york/mhl5-registry/alert/alert.tsx",
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
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );

  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="flex w-fit">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="overflow-hidden">
        <div className="bg-background flex h-96 items-center justify-center overflow-auto rounded-lg border">
          <Component />
        </div>
      </TabsContent>

      <TabsContent value="code" className="overflow-hidden">
        <CodeBlockServer path={componentSourcePath} />
      </TabsContent>
    </Tabs>
  );
}
