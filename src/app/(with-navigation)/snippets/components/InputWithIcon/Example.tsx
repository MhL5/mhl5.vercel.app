"use client";

import {
  InputWithIcon,
  InputWithIconIconSlot,
  InputWithIconInput,
} from "@/app/(with-navigation)/snippets/components/InputWithIcon";
import { Search } from "lucide-react";

export default function Example() {
  return (
    <div className="space-y-4">
      <div>
        <div>icon on the right</div>
        <InputWithIcon iconXPosition="right">
          <InputWithIconIconSlot>
            <Search />
          </InputWithIconIconSlot>
          <InputWithIconInput
            className="text-base placeholder:text-sm"
            placeholder="Search..."
          />
        </InputWithIcon>
      </div>

      <div>
        <div>icon on the left</div>
        <InputWithIcon>
          <InputWithIconIconSlot>
            <Search />
          </InputWithIconIconSlot>
          <InputWithIconInput
            className="text-base placeholder:text-sm"
            placeholder="Search..."
          />
        </InputWithIcon>
      </div>
    </div>
  );
}
