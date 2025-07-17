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
import { Fragment } from "react";

export default function BreadCrumb() {
  const pathname = usePathname();

  const links = pathname
    .split("/")
    .reduce<{ href: string; label: string }[]>((acc, link, index, arr) => {
      if (!link) return acc;
      const href = arr.slice(0, index + 1).join("/");
      return [...acc, { href: `${href}`, label: link }];
    }, []);

  if (links.length === 1) return null;
  return (
    <Breadcrumb className="not-prose">
      <BreadcrumbList className="flex items-center p-0 sm:gap-1.5">
        {links.map((link) => {
          return (
            <Fragment key={link.href}>
              <BreadcrumbItem>
                {link.href === pathname ? (
                  <BreadcrumbPage>{link.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={link.href} className="capitalize">
                    {link.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              <BreadcrumbSeparator className="last:hidden" />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
