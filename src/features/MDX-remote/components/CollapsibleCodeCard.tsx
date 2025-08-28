"use client";

import { CSSIcon } from "@/components/icons/css-icon";
import { TypeScriptIcon } from "@/components/icons/typescript-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CodeIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

type CollapsibleCodeCardProps = {
  filePath: string;
  children: ReactNode;
};

export default function CollapsibleCodeCard({
  filePath,
  children,
}: CollapsibleCodeCardProps) {
  const Icon = getIcon(filePath);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="not-content bg-code-background overflow-hidden p-0">
      <CardContent className="p-0">
        <div className="border-input flex items-center border-b px-3 py-1">
          <Icon className="text-muted-foreground mr-2 size-4" />
          <div className="text-muted-foreground font-mono">{filePath}</div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground ml-auto"
            onClick={() => setIsExpanded((e) => !e)}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
        <div
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            !isExpanded && "max-h-60",
          )}
        >
          {children}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="from-code-background via-code-background/70 text-muted-foreground absolute inset-x-0 bottom-0 h-18 bg-gradient-to-t via-70% to-transparent text-sm"
            >
              Expand
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getIcon(filePath: string) {
  if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
    return TypeScriptIcon;
  }
  if (filePath.endsWith(".css")) {
    return CSSIcon;
  }
  return CodeIcon;
}
