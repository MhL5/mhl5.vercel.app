import Img from "@/registry/new-york/Img/Img";

export default function Example() {
  return (
    <div className="not-prose flex items-center justify-center gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Image failed to load</span>
        <Img
          src="/non-existent-image.jpg"
          alt="Non-existent image"
          width={300}
          height={200}
          className="h-70 w-50 rounded-lg border object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Image loaded successfully</span>
        <Img
          src="/img-example.jpg"
          alt="Example image"
          width={300}
          height={200}
          className="h-70 w-50 rounded-lg border object-cover"
        />
      </div>
    </div>
  );
}
