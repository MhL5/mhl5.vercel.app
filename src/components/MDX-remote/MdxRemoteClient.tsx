"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { mdxClientComponents } from "./constants/mdxClientComponents";

type MdxRemoteClientProps = {
  source: MDXRemoteSerializeResult;
};

export default function MdxRemoteClient({ source }: MdxRemoteClientProps) {
  return <MDXRemote {...source} components={mdxClientComponents} />;
}
