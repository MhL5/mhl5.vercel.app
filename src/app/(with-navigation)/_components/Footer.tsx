"use client";

import { Link } from "@/components/ui/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CONTACT_INFO } from "@/constants";
import dynamic from "next/dynamic";

const ModeToggleGroupDynamic = dynamic(
  () =>
    import("@/components/buttons/ModeToggleGroup").then(
      (m) => m.ModeToggleGroup,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-7 w-21 rounded-md" />,
  },
);

export default function Footer() {
  return (
    <footer className="flex h-13 items-center border-t border-border/50 px-5">
      <div className="mx-auto w-full max-w-7xl text-center text-sm sm:text-start">
        Built by
        <Link href={CONTACT_INFO.github} variant="link">
          Mohammad Lashani
        </Link>
      </div>
      <ModeToggleGroupDynamic />
    </footer>
  );
}
