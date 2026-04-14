"use client";

import { FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  TagsInput,
  TagsInputInfo,
  TagsInputInput,
  TagsInputList,
  TagsInputTag,
} from "@/registry/new-york/TagsInput/TagsInput";
import { useState } from "react";

const tagsInitialValue = Array.from({ length: 5 }, (_, i) => `tag-${i}`);

export default function Example() {
  const [tags, setTags] = useState<string[]>(tagsInitialValue);
  const [errors, setErrors] = useState<Array<{ message: string }>>([]);

  return (
    <section className="grid w-full place-items-center">
      <div className="mx-auto w-full max-w-sm space-y-3 px-5">
        <TagsInput
          disabled={false}
          value={tags}
          onChange={setTags}
          maxTags={10}
          onError={setErrors}
        >
          <Label>
            Tags <TagsInputInfo />
          </Label>

          <TagsInputInput />
          <FieldError errors={errors} />

          <TagsInputList>
            {(value) =>
              value.map((tag) => (
                <TagsInputTag key={tag} value={tag}>
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
