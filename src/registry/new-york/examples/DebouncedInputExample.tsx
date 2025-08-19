"use client";

import DebouncedInput from "@/registry/new-york/items/DebouncedInput/DebouncedInput";
import { useState } from "react";

export default function Example() {
  const [value, setValue] = useState("Hey");

  return (
    <div className="mx-auto w-full max-w-xs space-y-3">
      <div className="flex flex-col gap-2">
        <span>Debounced Value: </span>
        <span className="min-h-5 text-sm">{value}</span>
      </div>

      <DebouncedInput
        delay={500}
        initialValue={value}
        onDebouncedChange={(value) => setValue(value)}
      />
    </div>
  );
}
