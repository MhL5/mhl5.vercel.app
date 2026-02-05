"use client";

import {
  PreviewComponents,
  type componentPaths,
} from "@/components/MDX-remote/components/PreviewCode/constants";
import ButtonWithTooltip from "@/components/buttons/ButtonWithTooltip";
import { OpenInV0Button } from "@/components/buttons/OpenInV0Button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcw } from "lucide-react";
import { type CSSProperties, type ReactNode, useState } from "react";

type CodePreviewProps = {
  name: keyof typeof componentPaths;
  code: ReactNode;
  height?: "default" | "lg";
};

export default function PreviewCodeInternal({
  name,
  code,
  height = "default",
}: CodePreviewProps) {
  const PreviewComponent = PreviewComponents[name];
  const [previewComponentKey, setPreviewComponentKey] = useState(0);

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
      <div className="flex items-center justify-between gap-1">
        <TabsList className="flex w-fit">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <OpenInV0Button name={name} />
      </div>

      <Card
        className="h-[var(--preview-code-height)] overflow-y-auto rounded-lg bg-transparent p-0 [scrollbar-color:var(--muted-foreground)_var(--code-background)]"
        style={
          {
            "--preview-code-height": height === "default" ? "460px" : "600px",
          } as CSSProperties
        }
      >
        <CardContent className="h-full p-0">
          <TabsContent
            value="preview"
            className="relative flex h-full items-center justify-center p-4"
          >
            <ButtonWithTooltip
              tooltipContent={<>Re render</>}
              size="sm"
              variant="ghost"
              className="absolute end-3 top-3 ms-auto"
              onClick={() => setPreviewComponentKey(Date.now())}
            >
              <RefreshCcw />
            </ButtonWithTooltip>

            <PreviewComponent key={previewComponentKey} />
          </TabsContent>
          <TabsContent value="code" className="h-full">
            {code}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
