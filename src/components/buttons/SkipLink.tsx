"use client";

import { Link } from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

/**
 * @todo FIX BUG: if page doesn't include a element with main id, the document query selector returns the last element with main id from other pages
 */
export default function SkipLink() {
  const [pageIncludesMain, setPageIncludesMain] = useState(false);
  const pathname = usePathname();

  const onPageIncludesMainEvent = useEffectEvent(() => {
    setPageIncludesMain(true);
  });

  useEffect(() => {
    const element = document.body.querySelector("#main");
    if (element) onPageIncludesMainEvent();
  }, [pathname]);

  if (!pageIncludesMain) return null;
  return (
    <Link
      href={{
        hash: "main",
      }}
      className="fixed -start-20 -top-20 z-50 w-fit transition-all duration-100 ease-in focus-visible:start-5 focus-visible:top-5"
    >
      Skip to main content
    </Link>
  );
}
