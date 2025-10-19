import ReactMarkdownComponent from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import ComponentSourceClient from "@/features/MDX-remote/components/ComponentSourceClient";
import { mdxComponents } from "@/features/MDX-remote/MdxComponents";

export default function ReactMarkdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdownComponent
      remarkPlugins={[remarkGfm, remarkToc]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code(props) {
          const { children, className, ...rest } = props;

          return className?.startsWith("language-") ? (
            <ComponentSourceClient
              lang="tsx"
              code={String(children).replace(/\n$/, "")}
            />
          ) : (
            // @ts-expect-error The 'inline' attribute in ReactMarkDown implementation is mistakenly set as a boolean value 'true'. Overwriting it to a string 'true' to prevent console errors in the browser.
            <code {...rest} className={className} inline="true">
              {children}
            </code>
          );
        },
        ...mdxComponents,
      }}
    >
      {markdown}
    </ReactMarkdownComponent>
  );
}
