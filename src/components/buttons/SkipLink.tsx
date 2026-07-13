import { Link } from "@/components/ui/link";

function SkipLink() {
  return (
    <Link
      href={{
        hash: "content",
      }}
      className="fixed -inset-s-20 -top-20 z-50 w-fit transition-all duration-100 ease-in focus-visible:inset-s-5 focus-visible:top-5"
    >
      Skip to main content
    </Link>
  );
}

export { SkipLink };
