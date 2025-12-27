import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

import { mdxClientComponents } from "./constants/mdxClientComponents";
import { mdxServerComponents } from "./constants/mdxServerComponents";

type MdxRemoteServerProps = {
  source: ComponentProps<typeof MDXRemote>["source"];
};

export default function MdxRemoteServer({ source }: MdxRemoteServerProps) {
  return (
    <MDXRemote
      source={source}
      components={{
        ...mdxClientComponents,
        ...mdxServerComponents,
      }}
    />
  );
}
