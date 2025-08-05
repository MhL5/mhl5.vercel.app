"use client";

import DebouncedInput from "@/app/(with-navigation)/snippets/components/DebouncedInput";
import useUrlState from "@/app/(with-navigation)/snippets/hooks/useUrlState";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Example() {
  const [value, setValue, isPending] = useUrlState("name");

  return (
    <section className="grid w-full place-items-center">
      <div>
        <div className="">
          <div>Current value: {value || ""}</div>
          <div>isPending: {isPending ? "true" : "false"}</div>
        </div>

        <div className="mt-2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-37 justify-start"
            onClick={() => setValue((prev) => prev + "test")}
          >
            Set value to test
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setValue("")}
            disabled={isPending}
            className="w-30"
          >
            Clear value
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          </Button>
        </div>

        <div className="mt-5">
          <div>With Debounce:</div>
          <DebouncedInput
            delay={100}
            className="min-w-xs"
            placeholder="Enter a value to update url state with"
            initialValue={value}
            onDebouncedChange={(value) => setValue(value)}
          />
        </div>
      </div>
    </section>
  );
}
