import { BookmarkIcon, CodeIcon, HomeIcon } from "lucide-react";

const navigationLinks = [
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

export { navigationLinks };
