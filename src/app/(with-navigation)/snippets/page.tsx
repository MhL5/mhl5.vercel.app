import MDXRemoteComponent from "@/MDXRemote";
import { fileReader } from "@/utils/fileReader";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Code Snippets Collection",
    description:
      "React snippets collections, built on top of shadcn/ui for use inside React and Next.js projects.",
  };
}

export default async function Page() {
  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <>
      <MDXRemoteComponent source={content} />
    </>
  );
}
