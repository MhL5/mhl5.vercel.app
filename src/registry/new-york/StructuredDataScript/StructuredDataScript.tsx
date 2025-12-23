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
      // this is safe as long as the data comes from our code and not from the users input
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
