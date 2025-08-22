import Marquee from "@/components/ui/marquee";
import FadeShadow from "@/registry/new-york/FadeShadow/FadeShadow";
import { Star } from "lucide-react";

export default function Example() {
  return (
    <>
      <div className="relative overflow-hidden">
        {/* Marquee component from https://magicui.design/docs/components/marquee */}
        <Marquee pauseOnHover className="gap-3 [--duration:80s]">
          {Array.from({ length: 12 }).map((_, i) => {
            return (
              <div
                key={i}
                className="border-muted bg-muted text-muted-foreground flex h-43.75 w-76.5 shrink-0 flex-col gap-3 rounded-lg border px-6 py-5 xl:h-52.25 xl:w-111.5 xl:gap-4"
              >
                <div className="text-foreground flex min-h-11.25 items-center justify-between gap-2">
                  <span className="truncate text-base font-semibold xl:text-lg">
                    Name
                  </span>

                  <Star className="size-4" />
                </div>

                <p className="line-clamp-4 text-xs leading-5 xl:text-base xl:leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Omnis, odio quam ad culpa et sequi hic ea? Hic, et, est libero
                  vitae accusamus facilis voluptas, magni aliquid vel minima quo
                  ab praesentium eaque. Tenetur ab aliquid excepturi atque
                  dolores temporibus harum a fuga sint in? Vitae natus alias
                  minus molestias.
                </p>
              </div>
            );
          })}
        </Marquee>

        <FadeShadow
          orientation="horizontal"
          positionX="left"
          className="w-1/3"
        />

        <FadeShadow
          orientation="horizontal"
          positionX="right"
          className="w-1/3"
        />
      </div>
    </>
  );
}
