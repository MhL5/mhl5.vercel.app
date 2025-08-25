"use client";

import { Button } from "@/components/ui/button";
import { navigationLinks, snippetsCategoryConfig } from "@/constants/constants";
import { cn } from "@/lib/utils";
import useUrlState from "@/registry/hooks/useUrlState/useUrlState";
import { AutoGrid } from "@/registry/new-york/AutoGrid/AutoGrid";
import DebouncedInput from "@/registry/new-york/DebouncedInput/DebouncedInput";
import Typography from "@/registry/new-york/Typography/Typography";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function SnippetsList() {
  const [categoryFiler, setCategoryFilter] = useUrlState("category", {
    history: "replace",
  });
  const [search, setSearch] = useState("");

  return (
    <section id="search" className="not-prose mt-8">
      <header className="mb-4 flex flex-col items-start justify-between gap-5">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <Typography variant="h2" className="text-start">
            Snippets
          </Typography>

          <div className="flex flex-wrap items-center gap-2 capitalize">
            {navigationLinks.map((link) => {
              const isActive = categoryFiler === link.title;
              const config =
                snippetsCategoryConfig[
                  link.title as keyof typeof snippetsCategoryConfig
                ];
              return (
                <Button
                  key={link.title}
                  variant={isActive ? "default" : "secondary"}
                  size="sm"
                  className={cn(
                    "capitalize",
                    isActive ? "" : config?.tailwindClass || "text-gray-600",
                  )}
                  onClick={() => setCategoryFilter(link.title)}
                >
                  {link.title}
                </Button>
              );
            })}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setCategoryFilter("");
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>
        <DebouncedInput
          initialValue={search}
          onDebouncedChange={setSearch}
          placeholder="Search snippets"
          delay={300}
        />
      </header>

      <AutoGrid
        uniqueId={`SnippetsList`}
        grid={{
          maxColCount: 3,
          minColSize: 10,
          gap: 1,
        }}
        className="mx-auto max-w-4xl"
      >
        {navigationLinks.map((link) => {
          if (
            categoryFiler &&
            !link.title
              .trim()
              .toLowerCase()
              .includes(categoryFiler.trim().toLowerCase())
          )
            return null;

          const config =
            snippetsCategoryConfig[
              link.title as keyof typeof snippetsCategoryConfig
            ];
          const Icon = config?.icon;
          const filteredItems = link.items?.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
          );

          if (filteredItems?.length === 0) return null;

          return (
            <Fragment key={link.title}>
              {filteredItems?.map((item) => (
                <Button key={item.title} variant="ghost" asChild>
                  <Link
                    href={item.url}
                    className={`${config?.tailwindClass || "text-gray-600"} h-10 w-full justify-start text-base`}
                  >
                    {Icon && <Icon className="size-5" />}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </Fragment>
          );
        })}
      </AutoGrid>
    </section>
  );
}
