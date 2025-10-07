import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/features/MDX-remote/MdxComponents";

type MdxRemoteClientProps = {
  source: MDXRemoteSerializeResult;
};

export default function MdxRemoteClient({ source }: MdxRemoteClientProps) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
