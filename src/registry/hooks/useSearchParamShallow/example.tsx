"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

import { useSearchParamShallow } from "./useSearchParamShallow";

export default function Example() {
  return (
    <Suspense>
      <ExampleSuspended />
    </Suspense>
  );
}

function ExampleSuspended() {
  const [value, setValue] = useSearchParamShallow("name");

  return (
    <section className="grid w-full place-items-center">
      <div className="max-w-sm">
        <div className="">
          <div>Current value: {value || ""}</div>
        </div>

        <div className="mt-2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-37 justify-start"
            onClick={() => setValue(`test`)}
          >
            Set value to test
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setValue("")}
            className="w-30"
          >
            Clear value
          </Button>
        </div>

        <div className="mt-5">
          <label>
            Enter a value to update url state:
            <Input
              placeholder="Enter a value to update url state"
              value={value || ""}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
