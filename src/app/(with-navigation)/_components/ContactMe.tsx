import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

const links = {
  telegram: "https://t.me/mhl_5",
  discord: "https://discord.com/users/649998586154844160",
} as const;

export default function ContactMe({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section id="contact" className={cn("", className)} {...props}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-semibold text-5xl tracking-tight sm:text-3xl md:text-6xl">
            Get in touch
          </h2>

          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Want to chat? Just shoot me with a dm on{" "}
            <FooterLinkButton>
              <Link href={links.telegram} target="_blank">
                telegram
              </Link>
            </FooterLinkButton>{" "}
            or{" "}
            <FooterLinkButton>
              <Link href={links.discord} target="_blank">
                discord
              </Link>
            </FooterLinkButton>
            and I&apos;ll respond whenever I can.
          </p>
        </div>
      </div>
    </section>
  );
}

function FooterLinkButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "size-fit p-0 px-1 text-base capitalize underline",
        className,
      )}
      variant="link"
      {...props}
    />
  );
}
