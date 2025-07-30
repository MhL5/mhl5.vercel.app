import TailwindCssCalc from "@/app/(with-navigation)/tools/_components/tailwindCssCalc";
import ToolCard from "@/app/(with-navigation)/tools/_components/ToolCard/ToolCard";

export default function ToolsPage() {
  return (
    <section className="mx-auto min-h-dvh max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-8">
        <h1 className="text-foreground flex items-center gap-3 text-4xl font-bold tracking-tight sm:text-5xl">
          🛠️ Tools
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          A Personal collection of custom tools that i find useful.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ToolCard
          title="Tailwind CSS Calculator"
          description="Convert between rem and px values for Tailwind CSS spacing"
        >
          <TailwindCssCalc />
        </ToolCard>
      </div>
    </section>
  );
}
