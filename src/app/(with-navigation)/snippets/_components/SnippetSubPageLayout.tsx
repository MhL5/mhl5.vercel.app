"use client";

import LinkButton from "@/components/blocks/buttons/LinkButton";
import SearchableLayout from "@/components/SearchableLayout";
import { snippetsLinks } from "@/constants/snippetsLinks";

type SnippetSubPageLayoutProps = {
  pageName: string;
};

export default function SnippetSubPageLayout({
  pageName,
}: SnippetSubPageLayoutProps) {
  const snippet = snippetsLinks.find((link) => link.title === pageName);

  if (!snippet || !snippet.items) return null;
  return (
    <SearchableLayout
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
        variant: "ghost",
        size: "lg",
      }}
      href={url}
      className="not-prose justify-start text-start"
    >
      {title}
    </LinkButton>
  );
}
