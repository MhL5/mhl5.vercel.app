import { Title } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function HeroSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "@container relative flex h-[calc(100svh-var(--site-header-height))] w-full flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      <div className="h-px w-full animate-fade-left bg-linear-to-r from-zinc-300/0 via-muted to-zinc-300/0" />

      <Title
        as="h1"
        size="4xl"
        className="z-10 mx-2 animate-title cursor-default bg-foreground bg-clip-text px-0.5 py-3.5 text-center font-semibold text-transparent duration-300 @md:whitespace-nowrap"
      >
        Mohammad Lashani
      </Title>

      <div className="h-px w-full animate-fade-right bg-linear-to-r from-zinc-300/0 via-muted to-zinc-300/0" />

      <div className="mt-3 animate-fade-in px-5 text-center">
        <Title as="h2" size="default" className="text-muted-foreground">
          a Software engineer passionate about building user-friendly and
          efficient web applications.
        </Title>
      </div>
    </section>
  );
}
