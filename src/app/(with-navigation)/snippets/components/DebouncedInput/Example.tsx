"use client";

import DebouncedInput from "@/app/(with-navigation)/snippets/components/DebouncedInput";
import { useState } from "react";

export default function Example() {
  const [value, setValue] = useState("");

  return (
    <div className="mx-auto w-full max-w-xs space-y-3">
      <div className="flex flex-col gap-2">
        <span>Debounced Value: </span>
        <span className="min-h-5 text-sm">{value}</span>
      </div>

      <DebouncedInput
        initialValue="Hello"
        onDebouncedChange={(value) => setValue(value)}
      />
    </div>
  );
}
