import { ManualInstallCodeCard } from "@/components/ManualInstallCodeCard";
import CliCommandCode from "@/components/mdx-components/CliCommandCode";
import ComponentSource from "@/components/mdx-components/ComponentSource";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { frontendDomain } from "@/constants/constants";
import type {
  CssVars,
  RegistryFileType,
  RegistryItemSchema,
} from "@/types/shadcn-registry";
import Link from "next/link";

const tabs = {
  cli: "cli",
  manual: "manual",
};

type InstallationTabsProps = {
  name: string;
};

export default async function InstallationTabs({
  name,
}: InstallationTabsProps) {
  const { filesToCopy, cssVars, npmModulesToInstall, registryDependencies } =
    await getCodeModuleData(name);
  const formattedCssVars = getFormattedCssVars(cssVars);

  return (
    <Tabs className="not-prose" defaultValue={tabs.cli}>
      <TabsList>
        <TabsTrigger value={tabs.cli}>CLI</TabsTrigger>
        <TabsTrigger value={tabs.manual}>Manual</TabsTrigger>
      </TabsList>
      <TabsContent value={tabs.cli} className="pt-3">
        <CliCommandCode
          command={`shadcn@latest add ${frontendDomain}/r/${name}.json`}
          action="run"
        />
      </TabsContent>
      <TabsContent value={tabs.manual} className="flex flex-col gap-8 pt-3">
        {registryDependencies != null && registryDependencies.length > 0 && (
          <div className="flex flex-col gap-4">
            <p>
              This component relies on other items which must be installed
              first.
            </p>
            <ul className="list-disc pl-10">
              {registryDependencies.map((dep) => (
                <li key={dep.name}>
                  <Link
                    href={dep.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize underline underline-offset-3"
                  >
                    {dep.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {npmModulesToInstall != null && npmModulesToInstall.length > 0 && (
          <div className="flex flex-col gap-4">
            <p>Install the following dependencies.</p>
            <CliCommandCode
              action="install"
              command={npmModulesToInstall.join(" ")}
            />
          </div>
        )}
        {filesToCopy != null && filesToCopy.length > 0 && (
          <div className="flex flex-col gap-4">
            <p>Copy and paste the following code into your project.</p>
            {filesToCopy.map((file) => (
              <ManualInstallCodeCard key={file.path} filePath={file.path}>
                <ComponentSource code={file.content} />
              </ManualInstallCodeCard>
            ))}
          </div>
        )}
        {typeof formattedCssVars === "string" &&
          formattedCssVars.trim().length > 0 && (
            <div className="flex flex-col gap-4">
              <p>Add the following colors to your CSS file</p>
              <ManualInstallCodeCard filePath="globals.css">
                <ComponentSource lang="css" code={formattedCssVars} />
              </ManualInstallCodeCard>
            </div>
          )}

        <p>Update the import paths to match your project setup.</p>
      </TabsContent>
    </Tabs>
  );
}

async function getCodeModuleData(registryItem: string) {
  const registryJson = (await import(`~/public/r/${registryItem}.json`))
    ?.default as RegistryItemSchema;

  const cssVars = registryJson?.cssVars || null;

  const filesToCopy = registryJson.files?.map((file) => {
    const pathFromType = getFileLocationFromType(file.type);
    return {
      path:
        file.target ??
        `${pathFromType}/${registryItem}.${file.path.split(".").pop()}`,
      // TODO: In what cases is content undefined?
      content: file.content ?? "",
    };
  });

  const npmModulesToInstall = registryJson.dependencies;

  const registryDependencies = registryJson.registryDependencies
    ?.map((dep) => {
      if (dep.startsWith("http")) {
        // This is a non-shadcn/ui dependency that is hosted on our registry.
        // Currently other registry dependencies are not supported.
        const name = dep.split("/").pop()?.split(".")[0]?.replace("-", " ");
        return {
          name,
          href: `${frontendDomain}/components/${name}`,
        };
      } else {
        // This is a shadcn/ui dependency.
        return {
          name: dep.replace("-", " "),
          href: `https://ui.shadcn.com/docs/components/${dep}`,
        };
      }
    })
    .filter((d) => d.name != null);

  return {
    filesToCopy,
    npmModulesToInstall,
    registryDependencies,
    cssVars,
  };
}

function getFormattedCssVars(cssVars: CssVars | null) {
  if (cssVars == null) return null;

  return Object.keys(cssVars)
    .map((key) => {
      const entries = Object.entries(
        cssVars[key as keyof typeof cssVars] ?? {},
      );
      if (entries.length === 0) return "";

      let cssSelector = "";
      switch (key) {
        case "light":
          cssSelector = ":root";
          break;
        case "dark":
          cssSelector = ".dark";
          break;
        case "theme":
          cssSelector = "@theme inline";
          break;
        default:
          cssSelector = key;
          break;
      }

      return `${cssSelector} {\n${entries
        .map(([k, v]) => `   --${k}: ${v};`)
        .join("\n")}\n}\n`;
    })
    .join("\n")
    .replaceAll('"', "");
}

function getFileLocationFromType(type: RegistryFileType) {
  switch (type) {
    case "registry:ui":
      return "src/components/mhl5-registry/ui";
    case "registry:page":
    case "registry:file":
      throw new Error("Page and file types require a target");
    case "registry:component":
      return "src/components/mhl5-registry";
    case "registry:lib":
      return "src/lib";
    case "registry:hook":
      return "src/hooks";
    case "registry:block":
    case "registry:style":
    case "registry:theme":
      // Not sure what to do with these types yet
      throw new Error("Block, style, and theme types are not supported yet");
    default:
      throw new Error(`Unknown file type: ${type satisfies never}`);
  }
}
