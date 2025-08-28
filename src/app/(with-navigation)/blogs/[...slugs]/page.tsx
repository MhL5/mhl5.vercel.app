import MDXRemoteComponent from "@/features/MDX-remote/MDXRemoteComponent";
import { isDev } from "@/registry/utils/checks/checks";
import { fileReader } from "@/utils/fileReader";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slugs: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { slugs = [] } = await params;

  if (!isDev()) return redirect("/");
  if (!slugs || slugs.length === 0) return notFound();

  const content = await fileReader(`contents/blogs/${slugs.join("/")}.mdx`);

  return <MDXRemoteComponent source={content} />;
}
