import type { ComponentProps } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import Iframe from "./components/Iframe";
import MdxHeading from "./components/MdxHeading";
import MdxLink from "./components/MdxLink";
import MdxPre from "./components/MdxPre";

export const mdxComponents = {
  a: MdxLink,
  h1: (props: ComponentProps<"h1">) => <MdxHeading heading="h1" {...props} />,
  h2: (props: ComponentProps<"h2">) => <MdxHeading heading="h2" {...props} />,
  h3: (props: ComponentProps<"h3">) => <MdxHeading heading="h3" {...props} />,
  h4: (props: ComponentProps<"h4">) => <MdxHeading heading="h4" {...props} />,
  h5: (props: ComponentProps<"h5">) => <MdxHeading heading="h5" {...props} />,
  h6: (props: ComponentProps<"h6">) => <MdxHeading heading="h6" {...props} />,
  pre: MdxPre,
  Alert,
  AlertDescription,
  AlertTitle,
  Iframe: Iframe,
};
