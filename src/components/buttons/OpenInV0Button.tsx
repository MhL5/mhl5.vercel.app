import V0Svg from "@/components/icons/V0Svg";
import { Button } from "@/components/ui/button";
import { frontendDomain } from "@/constants/constants";
import Link from "next/link";

type OpenInV0ButtonProps = {
  name: string;
};

export function OpenInV0Button({ name }: OpenInV0ButtonProps) {
  return (
    <Button aria-label="Open in v0" variant="ghost" asChild>
      <Link
        href={`https://v0.dev/chat/api/open?url=${frontendDomain}/r/${name}.json`}
        target="_blank"
        rel="noreferrer"
      >
        Open in <V0Svg />
      </Link>
    </Button>
  );
}
