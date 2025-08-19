import type { Thing, WithContext } from "schema-dts";

type StructuredDataScriptProps<T extends Thing> = {
  data: WithContext<T>;
  id?: string;
};

export default function StructuredDataScript<T extends Thing>({
  data,
  id,
}: StructuredDataScriptProps<T>) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
