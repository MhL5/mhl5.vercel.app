import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ReactNode } from "react";

type CodePreviewProps = {
  children: ReactNode;
  preview: ReactNode;
};

export default function CodePreview({ preview, children }: CodePreviewProps) {
  return (
    <Tabs defaultValue="preview" className="min-h-110 w-full">
      <TabsList className="flex w-fit">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div className="bg-background flex h-96 items-center justify-center overflow-auto rounded-lg border p-4">
          {preview}
        </div>
      </TabsContent>

      <TabsContent value="code">{children}</TabsContent>
    </Tabs>
  );
}
