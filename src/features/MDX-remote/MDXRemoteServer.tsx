import { mdxComponents } from "@/features/MDX-remote/MdxComponents";
import { mdxComponentsServer } from "@/features/MDX-remote/MdxComponentsServer";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

type MDXRemoteServerProps = {
  source: ComponentProps<typeof MDXRemote>["source"];
};

export default function MDXRemoteServer({ source }: MDXRemoteServerProps) {
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
