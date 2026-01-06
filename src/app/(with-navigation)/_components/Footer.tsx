import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-13 items-center border-t border-border/50 px-5">
      <div className="mx-auto w-full max-w-7xl text-center text-sm sm:text-start">
        Built by
        <Button asChild variant="link" className="h-fit px-1 underline">
          <Link href={CONTACT_INFO.github}>Mohammad Lashani</Link>
        </Button>
      </div>
    </footer>
  );
}
