import ComponentSource from "@/components/MDX-remote/components/ComponentSource";
import { componentPaths } from "@/components/MDX-remote/components/PreviewCode/constants";
import PreviewCodeInternal from "@/components/MDX-remote/components/PreviewCode/internal";

type CodePreviewProps = {
  name: keyof typeof componentPaths;
  height?: "default" | "lg";
};

export default function PreviewCode({
  name,
  height = "default",
}: CodePreviewProps) {
  const previewSourceCodePath = componentPaths[name].replace("@/", "src/");

  return (
    <PreviewCodeInternal
      name={name}
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
