import LinkButton from "@/components/blocks/buttons/LinkButton";
import { snippetsCategoryConfig } from "@/constants/constants";
import { snippetsLinks } from "@/constants/snippetsLinks";
import { cn } from "@/lib/utils";

export default function SnippetPageLinks() {
  return (
    <nav className="not-prose mt-7 flex flex-wrap items-center gap-2.5">
      {snippetsLinks.map((snippet) => {
        const Icon = snippetsCategoryConfig?.[snippet.title]?.icon;
        const titleClass =
          snippetsCategoryConfig?.[snippet.title]?.tailwindClass;
        return (
          <LinkButton
            buttonProps={{
              variant: "secondary",
              size: "lg",
            }}
            key={snippet.title}
            href={snippet.url}
            className={cn(
              "justify-start px-0 text-start text-base",
              titleClass,
            )}
          >
            <Icon />
            {snippet.title}
          </LinkButton>
        );
      })}
    </nav>
  );
}
