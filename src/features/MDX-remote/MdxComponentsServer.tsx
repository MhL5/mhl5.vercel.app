import type { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";

import CliCommandCode from "./components/CliCommandCode";
import CodePreview from "./components/CodePreview";
import ComponentSource from "./components/ComponentSource";
import InstallationTabs from "./components/InstallationTabs";
import MdxCode from "./components/MdxCode";

export const mdxComponentsServer: ComponentProps<
  typeof MDXRemote
>["components"] = {
  code: MdxCode,
  CodePreview,
  CliCommandCode,
  InstallationTabs,
  ComponentSource,
};
