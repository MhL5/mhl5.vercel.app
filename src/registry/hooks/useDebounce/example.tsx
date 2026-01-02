"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

import { useDebouncedValue } from "./useDebounce";

export default function Example() {
  const [value, setValue] = useState("");

  const debouncedValue = useDebouncedValue(value, 300);

  return (
    <div>
      <div>Value: {value}</div>
      <div>Debounced Value: {debouncedValue}</div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
