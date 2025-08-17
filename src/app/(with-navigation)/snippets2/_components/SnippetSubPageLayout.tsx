"use client";

import LinkButton from "@/components/blocks/buttons/LinkButton";
import SearchableLayout from "@/components/SearchableLayout";
import { snippetsCategoryConfig } from "@/constants/constants";
import { snippetsLinks } from "@/constants/snippetsLinks";

type SnippetSubPageLayoutProps = {
  pageName: string;
};

export default function SnippetSubPageLayout({
  pageName,
}: SnippetSubPageLayoutProps) {
  const snippet = snippetsLinks.find((link) => link.title === pageName);

  if (!snippet || !snippet.items) return null;
  const Icon = snippetsCategoryConfig?.[pageName]?.icon;
  const titleClass = snippetsCategoryConfig?.[pageName]?.tailwindClass;
  return (
    <SearchableLayout
      titleIcon={Icon}
      titleClassName={titleClass}
      title={pageName}
      items={snippet.items}
      render={(item) => <SnippetSubPageLayoutCard key={item.title} {...item} />}
      filter={(item, searchQuery) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      }
    />
  );
}

type SnippetSubPageLayoutCardProps = {
  title: string;
  url: string;
};

function SnippetSubPageLayoutCard({
  title,
  url,
}: SnippetSubPageLayoutCardProps) {
  return (
    <LinkButton
      buttonProps={{
        variant: "link",
        size: "lg",
      }}
      href={url}
      className="not-prose justify-start px-0 text-start"
    >
      {title}
    </LinkButton>
  );
}
