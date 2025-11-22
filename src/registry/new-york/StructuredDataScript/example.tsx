import type { Article, WithContext } from "schema-dts";
import StructuredDataScript from "@/registry/new-york/StructuredDataScript/StructuredDataScript";

const articleData: WithContext<Article> = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "My Article Title",
  author: {
    "@type": "Person",
    name: "John Doe",
  },
  datePublished: "2024-03-20",
};

export default function Example() {
  return <StructuredDataScript data={articleData} />;
}
