import { LinkButton } from "@/components/ui/button";
import { CONTACT_INFO } from "@/constants";

export default function Footer() {
  return (
    <footer className="flex h-13 items-center border-t border-border/50 px-5">
      <div className="mx-auto w-full max-w-7xl text-center text-sm sm:text-start">
        Built by
        <LinkButton href={CONTACT_INFO.github} variant="link">
          Mohammad Lashani
        </LinkButton>
      </div>
    </footer>
  );
}
