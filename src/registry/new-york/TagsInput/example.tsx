"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  TagsInput,
  TagsInputErrorMessage,
  TagsInputInfo,
  TagsInputInput,
  TagsInputList,
  TagsInputTag,
} from "@/registry/new-york/TagsInput/TagsInput";

export default function Example() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <section className="grid w-full place-items-center">
      <div className="mx-auto w-full max-w-sm space-y-3 px-5">
        <Label>
          Tags <TagsInputInfo />
        </Label>

        <TagsInput
          disabled={false}
          value={tags}
          onChange={setTags}
          maxTags={10}
        >
          <TagsInputInput placeholder="Enter tags" />
          <TagsInputErrorMessage />

          <TagsInputList>
            {(value) =>
              value.map((tag, i) => (
                <TagsInputTag key={`${tag}-${tag + i}`} value={tag}>
                  {tag}
                </TagsInputTag>
              ))
            }
          </TagsInputList>
        </TagsInput>
      </div>
    </section>
  );
}
