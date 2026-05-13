"use client";

import MdxCodeClient from "@/components/MDX-remote/components/MdxCodeClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMounted } from "@/registry/hooks/useIsMounted/useIsMounted";
import { useLocalStorage } from "@/registry/hooks/useLocalStorage/useLocalStorage";

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
    <div className="mx-auto grid size-full max-w-xs place-items-center sm:max-w-md">
      <div className="flex max-w-xs flex-col gap-2 overflow-x-hidden! sm:max-w-md">
        <h2>LocalStorage Value:</h2>
        <MdxCodeClient className="language-ts text-sm text-wrap break-all">
          {JSON.stringify(value, null, 2)}
        </MdxCodeClient>
        <div className="flex w-full max-w-xs items-center gap-2 overflow-x-auto sm:max-w-md">
          <Input
            value={value.text}
            placeholder="Try useLocalStorage"
            className="w-full"
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
