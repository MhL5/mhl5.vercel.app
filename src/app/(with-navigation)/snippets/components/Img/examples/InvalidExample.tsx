import Img from "@/app/(with-navigation)/snippets/components/Img";

export default function InvalidExample() {
  return (
    <Img
      src="/non-existent-image.jpg"
      alt="Non-existent image"
      width={300}
      height={200}
      className="h-70 w-50 rounded-lg border object-cover"
    />
  );
}
