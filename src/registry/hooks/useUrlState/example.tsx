"use client";

import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUrlState from "@/registry/hooks/useUrlState/useUrlState";
import DebouncedInput from "@/registry/new-york/DebouncedInput/DebouncedInput";

export default function Example() {
  return (
    <Suspense>
      <ExampleSuspended />
    </Suspense>
  );
}

function ExampleSuspended() {
  const [value, setValue, isPending] = useUrlState("name");
  const [shallow, setShallow] = useUrlState("shallow", {
    shallow: true,
    history: "push",
  });

  return (
    <section className="grid w-full place-items-center">
      <div className="max-w-sm">
        <div className="">
          <div>Current value: {value || ""}</div>
          <div>isPending: {isPending ? "true" : "false"}</div>
        </div>

        <div className="mt-2 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-37 justify-start"
            onClick={() => setValue(() => `test`)}
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
            delay={500}
            className="min-w-xs"
            placeholder="Enter a value to update url state"
            value={value}
            onDebouncedChange={(value) => setValue(value)}
          />
        </div>

        <div className="mt-5">
          <div>Shallow mode:</div>
          <p className="mb-1 text-muted-foreground text-sm">
            Enabling shallow mode updates the URL in the browser without causing
            a full server-side re-render.
          </p>

          <Input
            placeholder="Enter a value to update url state"
            value={shallow}
            onChange={(e) => setShallow(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
