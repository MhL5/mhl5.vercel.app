import { NavLink, NavLinkPending } from "@/components/ui/NavLink";
import { BookmarkIcon, CodeIcon, HomeIcon } from "lucide-react";

const links = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Snippets",
    href: "/snippets",
    icon: CodeIcon,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    icon: BookmarkIcon,
  },
] as const;

export default function BottomNavigation() {
  return (
    <>
      <nav
        className="fixed bottom-0 z-50 flex h-(--site-bottom-nav-height) w-full items-stretch border-t border-border bg-background/80 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {links.map(({ href, label, icon: Icon }) => (
          <NavLink
            key={href}
            href={href}
            variant="ghost"
            className="group flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-none text-xs text-muted-foreground has-data-[pending=true]:animate-pulse aria-[current=page]:text-primary"
          >
            <NavLinkPending className="hidden" />
            <Icon className="size-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div
        className="h-[calc(var(--site-bottom-nav-height)+0.5rem)] lg:hidden"
        aria-hidden="true"
      />
    </>
  );
}
