"use client";

import { TerminalIcon } from "lucide-react";
import { CopyButton } from "@/components/buttons/CopyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/registry/hooks/useLocalStorage/useLocalStorage";

const PackageManagersActions = {
  install: {
    pnpm: `pnpm add`,
    npm: `npm install`,
    yarn: `yarn add`,
    bun: `bun add`,
  },
  devInstall: {
    pnpm: `pnpm add -D`,
    npm: `npm install -D`,
    yarn: `yarn add -D`,
    bun: `bun add -D`,
  },
  run: {
    pnpm: `pnpm dlx`,
    npm: `npx`,
    yarn: `yarn`,
    bun: `bunx --bun`,
  },
};

type CliCommandCodeProps = {
  action?: keyof typeof PackageManagersActions;
  command: string;
};

export default function CliCommandCode({
  command,
  action = "run",
}: CliCommandCodeProps) {
  return (
    <CliCommandCodeInternal
      commands={Object.entries(PackageManagersActions[action]).map(
        ([label, code]) => ({
          label,
          code: `${code} ${command}`,
        }),
      )}
    />
  );
}

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

  return (
    <Card className="not-prose bg-code-background p-0">
      <CardContent className="p-0">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="gap-0"
        >
          <div className="flex items-center border-input border-b px-3 py-1">
            <div className="mr-2 flex size-4 items-center justify-center bg-foreground/40">
              <TerminalIcon className="size-3 text-code" />
            </div>
            <TabsList className="bg-code-background font-mono">
              {commands.map((command, index) => (
                <TabsTrigger
                  key={`${command.label}-${index}`}
                  value={command.label}
                  className="data-[state=active]:border-input data-[state=active]:bg-muted/50"
                >
                  {command.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <CopyButton
              contentToCopy={
                commands.find((cmd) => cmd.label === selectedTab)?.code || ""
              }
              className="ml-auto"
              aria-label="Copy Code"
              side="left"
            />
          </div>
          <div>
            {commands.map((command) => (
              <TabsContent
                key={command.label}
                value={command.label}
                className="no-scrollbar overflow-x-auto py-3.5 text-muted-foreground"
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
