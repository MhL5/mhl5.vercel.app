"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const pathname = usePathname();

  const links = pathname.split("/");

  if (links.length === 1) return null;
  return (
    <Breadcrumb className="not-prose">
      <BreadcrumbList className="flex items-center p-0 capitalize sm:gap-1.5">
        <BreadcrumbItem>
          <BreadcrumbLink href="/snippets">Snippets</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href={`/snippets#search?category=${links?.[2]}`}>
            {links?.[2]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>{links?.[3]}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
