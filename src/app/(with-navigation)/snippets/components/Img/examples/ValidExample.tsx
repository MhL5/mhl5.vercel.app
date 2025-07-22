import Img from "@/app/(with-navigation)/snippets/components/Img";

export default function ValidExample() {
  return (
    <Img
      src="/img-example.jpg"
      alt="Example image"
      width={300}
      height={200}
      className="h-70 w-50 rounded-lg border object-cover"
    />
  );
}
