"use client";

import DebouncedInput from "@/registry/new-york/DebouncedInput/DebouncedInput";
import { useState } from "react";

export default function Example() {
  const [value, setValue] = useState("Hey");

  return (
    <div className="mx-auto w-full max-w-xs space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span>Debounced Value: </span>
        {value && (
          <output className="w-fit min-w-10 rounded-md bg-muted p-2 text-xs break-words text-muted-foreground">
            {value}
          </output>
        )}
      </div>
      <DebouncedInput
        delay={500}
        value={value}
        onDebouncedChange={(value) => setValue(value)}
      />
    </div>
  );
}
