import { Badge } from "@/components/ui/badge";
import {
  CardClassName,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import Img from "@/registry/new-york/Img/Img";
import type { StaticImageData } from "next/image";

export type ProjectCardProps = {
  title: string;
  href?: `https://${string}`;
  description: string;
  dates: string;
  technologies: string[];
  status: "in progress" | "completed" | "coming soon";
  className?: string;
} & (
  | {
      video: string;
    }
  | {
      imageSrc: StaticImageData;
    }
);

export default function ProjectCard({
  title,
  href,
  description,
  dates,
  technologies,
  className,
  status,
  ...props
}: ProjectCardProps) {
  return (
    <Link
      href={href || "#"}
      variant="outline"
      className={cn(
        CardClassName,
        "flex h-full cursor-pointer flex-col gap-0 overflow-hidden px-0 pt-0 pb-3 whitespace-normal",
        className,
      )}
      target="_blank"
    >
      {"video" in props ? (
        <video
          src={props.video}
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none mx-auto h-50 w-full object-cover object-top" // needed because random black line at bottom of video
        />
      ) : (
        <Img
          src={props.imageSrc}
          alt={title}
          width={1000}
          height={500}
          className="h-50 w-full overflow-hidden object-cover object-top"
        />
      )}

      <CardHeader className="mt-2.25 mb-auto w-full px-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          {status === "in progress" && (
            <Badge variant="warning" className="rounded-sm text-xs capitalize">
              {status}
            </Badge>
          )}
          {status === "completed" && (
            <Badge variant="success" className="rounded-sm text-xs capitalize">
              {status}
            </Badge>
          )}
          {status === "coming soon" && (
            <Badge variant="info" className="rounded-sm text-xs capitalize">
              {status}
            </Badge>
          )}
        </div>

        <time className="inline-block text-xs">{dates}</time>
      </CardHeader>

      <CardContent className="mb-auto flex w-full flex-col px-2 pt-2">
        <CardDescription className="w-full text-sm text-pretty text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>

      {technologies && technologies.length > 0 && (
        <CardFooter className="mt-auto px-2 pt-2">
          <div className="flex flex-wrap gap-1">
            {technologies?.map((tag) => (
              <Badge className="text-xs" variant="outline" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Link>
  );
}
