"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

export { ScrollToTopOnMount, ScrollToTopOnNavigation };
