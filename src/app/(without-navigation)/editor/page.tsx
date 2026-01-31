"use client";

import { Button } from "@/components/ui/button";

export default function Test() {
  async function handleClick() {}

  return (
    <section className="grid min-h-dvh w-full place-items-center">
      <div className="mx-auto w-full max-w-7xl">
        <Button size="lg" onClick={handleClick}>
          Click me{" "}
        </Button>
      </div>
    </section>
  );
}
