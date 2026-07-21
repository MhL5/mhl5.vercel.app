import { Link } from "@/components/ui/link";
import { CONTACT_INFO } from "@/constants";
import type { ComponentProps } from "react";

export default function ContactMe(props: ComponentProps<"section">) {
  return (
    <section id="contact" {...props}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <h2 className="text-3xl font-semibold">Get in touch</h2>

          <p className="text-base text-muted-foreground">
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
