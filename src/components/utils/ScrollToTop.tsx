"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type ScrollToTopProps = { variant: "on-navigation" | "on-mount" };

export default function ScrollToTop({ variant }: ScrollToTopProps) {
  if (variant === "on-navigation") return <ScrollToTopOnNavigation />;

  return <ScrollToTopOnMount />;
}

function ScrollToTopOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    handleScroll();
  }, [pathname]);

  return null;
}

function ScrollToTopOnMount() {
  useEffect(() => {
    handleScroll();
  }, []);

  return null;
}

function handleScroll() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}
