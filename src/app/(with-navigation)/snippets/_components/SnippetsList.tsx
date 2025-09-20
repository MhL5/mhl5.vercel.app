"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { navigationLinks, snippetsCategoryConfig } from "@/constants/constants";
import { cn } from "@/lib/utils";
import useUrlState from "@/registry/hooks/useUrlState/useUrlState";
import { AutoGrid } from "@/registry/new-york/AutoGrid/AutoGrid";
import DebouncedInput from "@/registry/new-york/DebouncedInput/DebouncedInput";
import Typography from "@/registry/new-york/Typography/Typography";
import type { Route } from "next";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function SnippetsList() {
  const [categoryFiler, setCategoryFilter] = useUrlState("category", {
    history: "replace",
    defaultValue: "all",
    shallow: true,
  });
  const [search, setSearch] = useState("");

  const categoryClassName =
    snippetsCategoryConfig?.[
      categoryFiler as keyof typeof snippetsCategoryConfig
    ]?.tailwindClass;

  return (
    <section id="search" className="not-prose mt-8 min-h-svh">
      <header className="mb-4 flex flex-col items-start justify-between gap-5">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <Typography variant="h2" className="text-start">
            Snippets
          </Typography>

          <div className="flex flex-wrap items-center gap-2 capitalize">
            <Select
              defaultValue="all"
              value={categoryFiler}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className={cn("capitalize", categoryClassName)}>
                <SelectValue placeholder="all" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="capitalize">
                  All
                </SelectItem>
                {navigationLinks.map((link) => {
                  return (
                    <SelectItem
                      key={link.title}
                      value={link.title}
                      className="capitalize"
                    >
                      {link.title}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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
            categoryFiler !== "all" &&
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
                <Button
                  key={item.title}
                  variant="ghost"
                  className={`${config?.tailwindClass || "text-muted-foreground"} h-10 w-full justify-start overflow-hidden`}
                  asChild
                >
                  <Link href={item.url as Route}>
                    {Icon && (
                      <Icon className="hidden md:inline-block md:size-5" />
                    )}
                    <span className="truncate">{item.title}</span>
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
