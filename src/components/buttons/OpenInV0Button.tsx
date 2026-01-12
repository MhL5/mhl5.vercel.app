import V0Svg from "@/components/icons/V0Svg";
import { Link } from "@/components/ui/link";
import { absoluteUrl } from "@/utils/absoluteUrl";

type OpenInV0ButtonProps = {
  name: string;
};

export function OpenInV0Button({ name }: OpenInV0ButtonProps) {
  return (
    <Link
      href={`https://v0.dev/chat/api/open?url=${absoluteUrl(`/r/${name}.json`)}`}
      target="_blank"
      rel="noreferrer"
      variant="ghost"
      aria-label="Open in v0"
    >
      Open in <V0Svg />
    </Link>
  );
}
