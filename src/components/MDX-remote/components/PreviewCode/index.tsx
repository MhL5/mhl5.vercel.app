import ComponentSource from "@/components/MDX-remote/components/ComponentSource";
import { componentPaths } from "@/components/MDX-remote/components/PreviewCode/constants";
import PreviewCodeInternal from "@/components/MDX-remote/components/PreviewCode/internal";

type CodePreviewProps = {
  name: keyof typeof componentPaths;
  /** registry item the "Open in v0" button targets, when it differs from `name` */
  registryName?: string;
  height?: "default" | "lg";
};

export default function PreviewCode({
  name,
  registryName,
  height = "default",
}: CodePreviewProps) {
  const previewSourceCodePath = componentPaths[name].replace("@/", "src/");

  return (
    <PreviewCodeInternal
      name={name}
      registryName={registryName}
      height={height}
      code={
        <ComponentSource
          className="[&_pre]:h-[calc(var(--preview-code-height)-2px)]"
          path={previewSourceCodePath}
        />
      }
    />
  );
}
