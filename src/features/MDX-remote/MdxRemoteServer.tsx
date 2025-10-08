import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import { mdxComponents } from "@/features/MDX-remote/MdxComponents";
import { mdxComponentsServer } from "@/features/MDX-remote/MdxComponentsServer";

type MdxRemoteServerProps = {
  source: ComponentProps<typeof MDXRemote>["source"];
};

export default function MdxRemoteServer({ source }: MdxRemoteServerProps) {
  return (
    <MDXRemote
      source={source}
      components={{
        ...mdxComponents,
        ...mdxComponentsServer,
      }}
    />
  );
}
