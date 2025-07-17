import Particles from "@/app/(with-navigation)/_components/Particles";

export default function Home() {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-tl dark:from-black dark:via-zinc-100/10 dark:to-black">
      <Particles
        className="animate-fade-in absolute inset-0 -z-10"
        quantity={100}
      />

      <div className="animate-fade-left via-muted hidden h-px w-dvw bg-gradient-to-r from-zinc-300/0 to-zinc-300/0 md:block" />
      <h1 className="text-edge-outline animate-title bg-foreground font-space-grotesk z-10 cursor-default bg-clip-text px-0.5 py-3.5 text-4xl font-semibold whitespace-nowrap text-transparent duration-300 sm:text-6xl md:text-7xl lg:text-8xl">
        Mohammad Lashani
      </h1>
      <div className="animate-fade-right via-muted hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 to-zinc-300/0 md:block" />

      <div className="animate-fade-in mt-3 text-center">
        <h2 className="text-muted-foreground text-sm tracking-wide lg:text-base">
          I&apos;m a software engineer with a passion for building products that
          help people live better lives.
        </h2>
      </div>
    </div>
  );
}
