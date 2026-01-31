"use client";

import {
  PreviewComponents,
  type componentPaths,
} from "@/components/MDX-remote/components/PreviewCode/constants";
import { OpenInV0Button } from "@/components/buttons/OpenInV0Button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ReactNode } from "react";

type CodePreviewProps = {
  name: keyof typeof componentPaths;
  code: ReactNode;
};

export default function PreviewCodeInternal({ name, code }: CodePreviewProps) {
  const PreviewComponent = PreviewComponents[name];

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
            {code}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
