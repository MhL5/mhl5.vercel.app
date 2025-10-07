import { Suspense } from "react";
import SnippetsList from "@/app/(with-navigation)/snippets/_components/SnippetsList";
import MdxRemoteServer from "@/features/MDX-remote/MdxRemoteServer";
import { fileReader } from "@/utils/fileReader";

export default async function Page() {
  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <>
      <MdxRemoteServer source={content} />

      <Suspense>
        <SnippetsList />
      </Suspense>
    </>
  );
}
