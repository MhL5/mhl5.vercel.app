"use client";

import CopyButton from "@/components/buttons/CopyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/registry/hooks/useStorage/useStorage";
import { TerminalIcon } from "lucide-react";

const PackageManagersActions = {
  install: {
    pnpm: `pnpm add`,
    npm: `npm install`,
    yarn: `yarn add`,
    bun: `bun add`,
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
    <>
      <CliCommandCodeInternal
        commands={Object.entries(PackageManagersActions[action]).map(
          ([label, code]) => ({
            label,
            code: `${code} ${command}`,
          }),
        )}
      />
    </>
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

            <CopyButton
              content={
                commands.find((cmd) => cmd.label === selectedTab)?.code || ""
              }
              className="ml-auto"
            />
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
