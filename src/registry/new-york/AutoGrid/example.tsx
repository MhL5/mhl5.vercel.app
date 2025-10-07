"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import AutoGrid from "@/registry/new-york/AutoGrid/AutoGrid";

export default function Example() {
  const [size, setSize] = useState(350);

  return (
    <div className="relative flex w-full flex-col flex-wrap items-center gap-3">
      <div className="grid w-full gap-2">
        <label htmlFor="slider-size">Change the Auto Grid size: {size}px</label>
        <Slider
          id="slider-size"
          className="w-full"
          step={1}
          min={250}
          max={700}
          value={[size]}
          onValueChange={(value) => setSize(value[0])}
        />
      </div>

      <AutoGrid
        uniqueId="auto-grid-example-1234"
        maxColCount={4}
        minColSize={7}
        gap={1}
        className="w-full rounded-sm border border-dashed p-3"
        style={{
          width: `${size}px`,
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="w-full rounded border p-2"
            key={`Column-${index + 1}`}
          >
            Column {index + 1}
          </div>
        ))}
      </AutoGrid>
    </div>
  );
}
