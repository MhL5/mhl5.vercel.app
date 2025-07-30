"use client";

import CopyButton from "@/components/blocks/buttons/CopyButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TailwindCssCalcProps = {
  className?: string;
};

export default function TailwindCssCalc({ className }: TailwindCssCalcProps) {
  const [inputValue, setInputValue] = useState("1");
  const [type, setType] = useState<"rem" | "px">("rem");

  const numericValue = parseFloat(inputValue);

  const result =
    type === "px"
      ? (isNaN(numericValue) ? 0 : numericValue / 16) * 4
      : (isNaN(numericValue) ? 0 : numericValue) * 4;

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Input
        value={inputValue}
        className="block"
        onChange={(e) => {
          let value = e.target.value;

          if (value.length > 10) return;

          if (value === "") return setInputValue("");

          value = value.replaceAll("rem", "").replaceAll("px", "");

          setInputValue(value);
        }}
      />
      <Button
        className="size-9"
        onClick={() => {
          setType((t) => (t === "rem" ? "px" : "rem"));
        }}
      >
        {type}
      </Button>
      <CopyButton content={result.toString()} className="size-9 shrink-0" />

      <p>{result}</p>
    </div>
  );
}
