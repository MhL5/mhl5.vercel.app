import { ModeToggleGroupDynamic } from "@/components/buttons/ModeToggleGroup";
import { Link } from "@/components/ui/link";
import { CONTACT_INFO } from "@/constants";

export default function Footer() {
  return (
    <footer className="grid min-h-13 w-full place-items-center border-t border-border/50 px-5">
      <div className="mx-auto my-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-1 text-center text-sm sm:text-start">
        <p>
          Built by
          <Link href={CONTACT_INFO.github} variant="link">
            Mohammad Lashani
          </Link>
        </p>
        <ModeToggleGroupDynamic />
      </div>
    </footer>
  );
}
