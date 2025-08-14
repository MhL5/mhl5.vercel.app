"use client";

const packageManagersInstallCommands = {
  pnpm: `pnpm add`,
  npm: `npm install`,
  yarn: `yarn add`,
  bun: `bun add`,
};

export default function CliCommandCode({ command }: { command: string }) {
  return (
    <>
      <CliCommandCodeInternal
        commands={Object.entries(packageManagersInstallCommands).map(
          ([label, code]) => ({
            label,
            code: `${code} ${command}`,
          }),
        )}
      />
    </>
  );
}

import { useLocalStorage } from "@/app/(with-navigation)/snippets/hooks/useStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckIcon, ClipboardIcon, TerminalIcon, XIcon } from "lucide-react";
import { useState } from "react";

export function CliCommandCodeInternal({
  commands,
}: {
  commands: {
    label: string;
    code: string;
  }[];
}) {
  const [selectedTab, setSelectedTab] = useLocalStorage(
    "cli-method",
    commands[0].label,
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  function handleCopy() {
    const command = commands.find((cmd) => cmd.label === selectedTab);
    if (command) {
      navigator.clipboard
        .writeText(command.code)
        .then(() => setCopyState("copied"))
        .catch(() => setCopyState("error"))
        .finally(() => setTimeout(() => setCopyState("idle"), 2000));
    }
  }

  return (
    <Card className="not-prose bg-code-background p-0">
      <CardContent className="p-0">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="gap-0"
        >
          <div className="border-input flex items-center border-b px-3 py-1">
            <div className="bg-foreground/40 mr-2 flex size-4 items-center justify-center">
              <TerminalIcon className="text-code size-3" />
            </div>
            <TabsList className="bg-code-background font-mono">
              {commands.map((command, index) => (
                <TabsTrigger
                  key={index}
                  value={command.label}
                  className="data-[state=active]:border-input data-[state=active]:bg-muted/50"
                >
                  {command.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <Tooltip open={copyState !== "idle"}>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  className="text-muted-foreground ml-auto size-8"
                >
                  {copyState === "idle" ? (
                    <ClipboardIcon />
                  ) : copyState === "copied" ? (
                    <CheckIcon />
                  ) : (
                    <XIcon className="text-destructive" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {copyState === "error" ? "Error!" : "Copied"}
              </TooltipContent>
            </Tooltip>
          </div>
          <div>
            {commands.map((command) => (
              <TabsContent
                key={command.label}
                value={command.label}
                className="no-scrollbar text-muted-foreground overflow-x-auto py-3.5"
              >
                <pre>
                  <code className="px-4">{command.code}</code>
                </pre>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
