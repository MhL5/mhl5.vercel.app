import CodeBlockServer from "@/components/code-components/CodeBlock/CodeBlockServer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type CodePreviewProps = {
  preview: ReactNode;
  codePath: ComponentPropsWithoutRef<typeof CodeBlockServer>["path"];
};

export default function CodePreview({ codePath, preview }: CodePreviewProps) {
  return (
    <Tabs defaultValue="preview" className="min-h-110 w-full">
      <TabsList className="flex w-fit">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div className="bg-background flex h-96 items-center justify-center overflow-auto rounded-lg border">
          {preview}
        </div>
      </TabsContent>

      <TabsContent value="code">
        <CodeBlockServer path={codePath} />
      </TabsContent>
    </Tabs>
  );
}
