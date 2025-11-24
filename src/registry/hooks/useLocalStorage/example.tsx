"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMounted } from "@/registry/hooks/useIsMounted/useIsMounted";
import { useLocalStorage } from "@/registry/hooks/useLocalStorage/useLocalStorage";
import { formatDate } from "@/registry/utils/formatters/formatters";

export default function Example() {
  const isMounted = useIsMounted();

  if (!isMounted) return "Mounting...";
  return <Content />;
}

function Content() {
  const [value, setValue] = useLocalStorage("test", () => ({
    text: "",
    createdAt: new Date(),
  }));

  return (
    <div className="grid size-full place-items-center">
      <div className="flex flex-col gap-2">
        <span className="text-sm">
          Created at:{" "}
          {formatDate(value.createdAt, {
            month: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
        <div className="flex items-center gap-2">
          <Input
            value={value.text}
            placeholder="Try useLocalStorage"
            className="w-full max-w-sm"
            onChange={(e) => setValue({ ...value, text: e.target.value })}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setValue(() => ({
                text: "",
                createdAt: new Date(),
              }));
            }}
            className="w-fit"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
