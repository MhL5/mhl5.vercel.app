import CliCommandCode from "@/components/mdx-components/CliCommandCode";
import CodePreview from "@/components/mdx-components/CodePreview";
import ComponentSource from "@/components/mdx-components/ComponentSource";
import InstallationTabs from "@/components/mdx-components/InstallationTabs";
import MdxCode from "@/components/mdx-components/MdxCode";
import MdxHeading from "@/components/mdx-components/MdxHeading";
import MdxLink from "@/components/mdx-components/MdxLink";
import MdxPre from "@/components/mdx-components/MdxPre";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MDXRemote } from "next-mdx-remote/rsc";

type MDXRemoteProps = {
  source: string;
};

export default function MDXRemoteComponent({ source }: MDXRemoteProps) {
  return (
    <MDXRemote
      source={source}
      components={{
        a: MdxLink,
        h1: (props) => <MdxHeading heading="h1" {...props} />,
        h2: (props) => <MdxHeading heading="h2" {...props} />,
        h3: (props) => <MdxHeading heading="h3" {...props} />,
        h4: (props) => <MdxHeading heading="h4" {...props} />,
        h5: (props) => <MdxHeading heading="h5" {...props} />,
        h6: (props) => <MdxHeading heading="h6" {...props} />,
        pre: MdxPre,
        code: MdxCode,
        CodePreview,
        CliCommandCode,
        InstallationTabs,
        ComponentSource,
        Alert,
        AlertDescription,
        AlertTitle,
      }}
    />
  );
}
