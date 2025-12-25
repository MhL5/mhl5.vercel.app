import { Badge } from "@/components/ui/badge";
import {
  CardClassName,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Img from "@/registry/new-york/Img/Img";
import type { StaticImageData } from "next/image";
import Link from "next/link";

export type ProjectCardProps = {
  title: string;
  href?: `https://${string}`;
  description: string;
  dates: string;
  technologies: string[];
  status: "in progress" | "completed" | "coming soon";
  links?: {
    icon: React.ReactNode;
    type: string;
    href: `https://${string}`;
  }[];
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
  links,
  className,
  status,
  ...props
}: ProjectCardProps) {
  return (
    <Link
      href={href || "#"}
      className={cn(
        CardClassName,
        "cursor-pointer gap-0 overflow-hidden pt-0 pb-1",
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
      <CardHeader className="mt-2.25 px-2">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-xl">{title}</CardTitle>
            {status === "in progress" && (
              <Badge variant="warning" className="text-sm capitalize">
                {status}
              </Badge>
            )}
            {status === "completed" && (
              <Badge variant="success" className="text-sm capitalize">
                {status}
              </Badge>
            )}
            {status === "coming soon" && (
              <Badge variant="info" className="text-sm capitalize">
                {status}
              </Badge>
            )}
          </div>
          <time className="mb-2 inline-block text-sm">{dates}</time>
          <p className="max-w-full text-sm text-pretty text-muted-foreground">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col px-2 pt-2">
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {technologies?.map((tag) => (
              <Badge className="text-xs" variant="outline" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link) => (
              <Link
                href={link?.href}
                key={link.type + link.href}
                target="_blank"
              >
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Link>
  );
}
