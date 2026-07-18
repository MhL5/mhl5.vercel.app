"use client";

import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
// eslint-disable-next-line no-restricted-imports
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

import { buttonVariants } from "./button";
import Spinner from "./spinner";

type NavLinkProps = {
  children:
    | ReactNode
    | ((
        params: ReturnType<typeof useLinkStatus> & { isActive: boolean },
      ) => ReactNode);
  exact?: boolean;
} & Omit<ComponentProps<typeof Link>, "children"> &
  VariantProps<typeof buttonVariants>;

function NavLink({
  exact,
  children,
  className,
  size,
  variant = "ghost",
  href,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = checkActive(pathname, href.toString(), exact);

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ size, variant }), className)}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      <UseLinkStatus>
        {(status) =>
          children instanceof Function
            ? children({ isActive, ...status })
            : children
        }
      </UseLinkStatus>
    </Link>
  );
}

type NavLinkPendingProps = ComponentProps<typeof Spinner>;

/**
 * NavLinkPending displays a loading spinner when a link navigation is in progress.
 * To avoid unnecessary flicker on quick navigation, it uses a fade-in animation for smoother UX.
 */
function NavLinkPending({ children, ...props }: NavLinkPendingProps) {
  const { pending } = useLinkStatus();

  if (!pending) return children;
  return (
    <Spinner data-slot="NavLinkPending" data-pending={pending} {...props} />
  );
}

type UseLinkStatusProps = {
  children: (status: ReturnType<typeof useLinkStatus>) => ReactNode;
};

function UseLinkStatus({ children }: UseLinkStatusProps) {
  return children(useLinkStatus());
}

function checkActive(pathname: string, href: string, exact?: boolean) {
  if (exact || href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export { NavLink, NavLinkPending };
