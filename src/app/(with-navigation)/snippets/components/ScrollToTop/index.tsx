"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTopOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    handleScroll();
  }, [pathname]);

  return null;
}

export function ScrollToTopOnMount() {
  useEffect(() => {
    handleScroll();
  }, []);

  return null;
}

function handleScroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
