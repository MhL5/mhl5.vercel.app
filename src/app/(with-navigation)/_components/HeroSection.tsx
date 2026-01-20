import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function HeroSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative flex h-[calc(100svh-var(--site-header-height))] w-full flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      <div className="h-px w-full animate-fade-left bg-gradient-to-r from-zinc-300/0 via-muted to-zinc-300/0" />
      <h1 className="z-10 mx-2 animate-title cursor-default bg-foreground bg-clip-text px-0.5 py-3.5 font-space-grotesk text-4xl font-semibold whitespace-nowrap text-transparent duration-300 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        Mohammad Lashani
      </h1>
      <div className="h-px w-full animate-fade-right bg-gradient-to-r from-zinc-300/0 via-muted to-zinc-300/0" />

      <div className="mt-3 animate-fade-in px-5 text-center">
        <h2 className="text-base tracking-wide text-muted-foreground sm:text-lg">
          a Software engineer passionate about building user-friendly and
          efficient web applications.
        </h2>
      </div>
    </section>
  );
}
