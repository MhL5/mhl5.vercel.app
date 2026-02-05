import ComponentSource from "@/components/MDX-remote/components/ComponentSource";
import { componentPaths } from "@/components/MDX-remote/components/PreviewCode/constants";
import PreviewCodeInternal from "@/components/MDX-remote/components/PreviewCode/internal";

type CodePreviewProps = {
  name: keyof typeof componentPaths;
};

export default function PreviewCode({ name }: CodePreviewProps) {
  const previewSourceCodePath = componentPaths[name].replace("@/", "src/");

  return (
    <PreviewCodeInternal
      name={name}
      code={
        <ComponentSource
          className="[&_pre]:h-[calc(var(--preview-code-height)-2px)]"
          path={previewSourceCodePath}
        />
      }
    />
  );
}
