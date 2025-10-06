import SnippetToc from "@/app/(with-navigation)/snippets/_components/SnippetToc";
import Prose from "@/components/Prose";
import MDXRemoteServer from "@/features/MDX-remote/MDXRemoteServer";

type DocumentLayoutProps = {
  source: string;
};

/**
 * this is only used for temp rendering md files and viewing them on browser on development mode
 * ( idk like notion and obsidian ui ! i know it's not good but it works )
 */
export default function DocumentLayout({ source }: DocumentLayoutProps) {
  return (
    <section className="mx-auto grid min-h-dvh w-full max-w-8xl grid-cols-[1fr_15rem] pt-8">
      <Prose As="div" className="mx-auto w-full max-w-4xl">
        <MDXRemoteServer source={source} />
      </Prose>
      <div>
        <SnippetToc tocDepth={6} />
      </div>
    </section>
  );
}
