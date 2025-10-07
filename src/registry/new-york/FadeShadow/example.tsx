import { Star } from "lucide-react";
import Marquee from "@/components/ui/marquee";
import FadeShadow from "@/registry/new-york/FadeShadow/FadeShadow";

const items = Array.from({ length: 12 }).map(
  (_, i) => `${crypto.randomUUID()}-${i}`,
);

export default function Example() {
  return (
    <div className="relative overflow-hidden">
      {/* Marquee component from https://magicui.design/docs/components/marquee */}
      <Marquee pauseOnHover className="gap-3 [--duration:80s]">
        {items.map((key) => {
          return (
            <div
              key={key}
              className="flex h-43.75 w-76.5 shrink-0 flex-col gap-3 rounded-lg border border-muted bg-muted px-6 py-5 text-muted-foreground xl:h-52.25 xl:w-111.5 xl:gap-4"
            >
              <div className="flex min-h-11.25 items-center justify-between gap-2 text-foreground">
                <span className="truncate font-semibold text-base xl:text-lg">
                  Name
                </span>

                <Star className="size-4" />
              </div>

              <p className="line-clamp-4 text-xs leading-5 xl:text-base xl:leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                odio quam ad culpa et sequi hic ea? Hic, et, est libero vitae
                accusamus facilis voluptas, magni aliquid vel minima quo ab
                praesentium eaque. Tenetur ab aliquid excepturi atque dolores
                temporibus harum a fuga sint in? Vitae natus alias minus
                molestias.
              </p>
            </div>
          );
        })}
      </Marquee>

      <FadeShadow orientation="horizontal" positionX="left" className="w-1/3" />

      <FadeShadow
        orientation="horizontal"
        positionX="right"
        className="w-1/3"
      />
    </div>
  );
}
