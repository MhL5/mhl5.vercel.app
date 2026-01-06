import { Button, type ButtonProps } from "@/components/ui/button";
import { CONTACT_INFO } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
            <ContactMeButton>
              <Link href={CONTACT_INFO.telegram} target="_blank">
                telegram
              </Link>
            </ContactMeButton>{" "}
            or{" "}
            <ContactMeButton>
              <Link href={CONTACT_INFO.discord} target="_blank">
                discord
              </Link>
            </ContactMeButton>
            and I&apos;ll respond whenever I can.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactMeButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "size-fit p-0 px-1 text-base text-blue-600 capitalize underline dark:text-blue-400",
        className,
      )}
      variant="link"
      {...props}
    />
  );
}
