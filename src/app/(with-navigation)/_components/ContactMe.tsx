import { Link } from "@/components/ui/link";
import { Paragraph, Title } from "@/components/ui/typography";
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
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <Title as="h2" size="2xl">
            Get in touch
          </Title>

          <Paragraph size="md">
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
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
