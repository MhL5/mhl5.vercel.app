import type { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Iframe from "@/features/MDX-remote/components/Iframe";

import MdxHeading from "./components/MdxHeading";
import MdxLink from "./components/MdxLink";
import MdxPre from "./components/MdxPre";

export const mdxComponents: ComponentProps<typeof MDXRemote>["components"] = {
  a: MdxLink,
  h1: (props) => <MdxHeading heading="h1" {...props} />,
  h2: (props) => <MdxHeading heading="h2" {...props} />,
  h3: (props) => <MdxHeading heading="h3" {...props} />,
  h4: (props) => <MdxHeading heading="h4" {...props} />,
  h5: (props) => <MdxHeading heading="h5" {...props} />,
  h6: (props) => <MdxHeading heading="h6" {...props} />,
  pre: MdxPre,
  Alert,
  AlertDescription,
  AlertTitle,
  Iframe: Iframe,
};
