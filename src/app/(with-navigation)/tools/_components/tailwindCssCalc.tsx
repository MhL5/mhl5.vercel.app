"use client";

import { useState } from "react";
import CopyButton from "@/components/buttons/CopyButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TailwindCssCalcProps = {
  className?: string;
};

export default function TailwindCssCalc({ className }: TailwindCssCalcProps) {
  const [inputValue, setInputValue] = useState("1");
  const [type, setType] = useState<"rem" | "px">("rem");

  const numericValue = parseFloat(inputValue);

  const result =
    type === "px"
      ? (Number.isNaN(numericValue) ? 0 : numericValue / 16) * 4
      : (Number.isNaN(numericValue) ? 0 : numericValue) * 4;

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
        className="size-8"
        onClick={() => {
          setType((t) => (t === "rem" ? "px" : "rem"));
        }}
      >
        {type}
      </Button>
      <CopyButton
        variant="secondary"
        content={result.toString()}
        className="size-9 shrink-0"
        side="top"
      />

      <p>{result}</p>
    </div>
  );
}
