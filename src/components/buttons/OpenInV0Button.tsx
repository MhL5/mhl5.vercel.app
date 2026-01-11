import V0Svg from "@/components/icons/V0Svg";
import { LinkButton } from "@/components/ui/button";
import { absoluteUrl } from "@/utils/absoluteUrl";

type OpenInV0ButtonProps = {
  name: string;
};

export function OpenInV0Button({ name }: OpenInV0ButtonProps) {
  return (
    <LinkButton
      href={`https://v0.dev/chat/api/open?url=${absoluteUrl(`/r/${name}.json`)}`}
      target="_blank"
      rel="noreferrer"
      variant="ghost"
      aria-label="Open in v0"
    >
      Open in <V0Svg />
    </LinkButton>
  );
}
