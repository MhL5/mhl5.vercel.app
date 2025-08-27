import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export default function HeroSection({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn(
        "relative flex h-svh w-full flex-col items-center justify-center bg-gradient-to-tl dark:from-black dark:via-zinc-50/10 dark:to-black",
        className,
      )}
      {...props}
    >
      <div className="animate-fade-left via-muted h-px w-full bg-gradient-to-r from-zinc-300/0 to-zinc-300/0" />
      <h1 className="text-edge-outline animate-title bg-foreground font-space-grotesk z-10 mx-2 cursor-default bg-clip-text px-0.5 py-3.5 text-4xl font-semibold whitespace-nowrap text-transparent duration-300 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        Mohammad Lashani
      </h1>
      <div className="animate-fade-right via-muted h-px w-full bg-gradient-to-r from-zinc-300/0 to-zinc-300/0" />

      <div className="animate-fade-in mt-3 px-5 text-center">
        <h2 className="text-muted-foreground text-base tracking-wide sm:text-lg">
          a Software engineer passionate about building user-friendly and
          efficient web applications.
        </h2>
      </div>

      <div className="to-background pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent" />
    </section>
  );
}
