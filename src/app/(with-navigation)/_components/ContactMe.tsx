import { Link } from "@/components/ui/link";
import { CONTACT_INFO } from "@/constants";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function ContactMe({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section id="contact" className={cn("", className)} {...props}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-semibold tracking-tight sm:text-3xl md:text-6xl">
            Get in touch
          </h2>

          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Want to chat? Just shoot me with a dm on{" "}
            <Link
              href={CONTACT_INFO.telegram}
              target="_blank"
              variant="link"
              className="text-base"
            >
              Telegram
            </Link>
            or{" "}
            <Link
              href={CONTACT_INFO.discord}
              target="_blank"
              variant="link"
              className="text-base"
            >
              Discord
            </Link>
            and I&apos;ll respond whenever I can.
          </p>
        </div>
      </div>
    </section>
  );
}
