import ProjectCard, {
  type ProjectCardProps,
} from "@/app/(with-navigation)/_components/my-projects/ProjectCard";
import anywriteImg from "@/app/(with-navigation)/_components/my-projects/assets/anywrite.png";
import appleAppsImg from "@/app/(with-navigation)/_components/my-projects/assets/apple-apps.png";
import kafshMeImg from "@/app/(with-navigation)/_components/my-projects/assets/kafsh-me.png";
import vsimImg from "@/app/(with-navigation)/_components/my-projects/assets/vsim.png";
import { Paragraph, Title } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const projects: ProjectCardProps[] = [
  {
    title: "Anywrite",
    description:
      "Official website for a anywrite application, a smart-keyboard tool that helps you write faster, smarter, and more efficiently.",
    href: "https://anywrite.ai",
    dates: "August 20, 2024",
    status: "completed",
    technologies: [
      "NextJs 15",
      "Typescript",
      "TailwindCSS",
      "Shadcn UI",
      "Framer Motion",
      "Next Intl",
      "next-mdx-remote",
    ],
    imageSrc: anywriteImg,
  },
  {
    title: "Vsim",
    description: "Official website for a Vsim, a sms verification service.",
    href: "https://vsimapp.com",
    dates: "September 18, 2024",
    status: "completed",
    technologies: [
      "NextJs 15",
      "Typescript",
      "TailwindCSS",
      "Shadcn UI",
      "Framer Motion",
      "Next Intl",
      "Tanstack query",
      "next-mdx-remote",
    ],

    imageSrc: vsimImg,
  },
  {
    title: "AppleApps",
    description:
      "platform for downloading applications,Not affiliated with Apple Inc. ",
    href: "https://apple-apps.vercel.app/",
    dates: "June 22, 2025",
    status: "in progress",
    technologies: [
      "NextJs 15",
      "Typescript",
      "TailwindCSS",
      "Shadcn UI",
      "next-mdx-remote",
    ],

    imageSrc: appleAppsImg,
  },
  {
    title: "KafshMe",
    description:
      "An e-commerce website for a KafshMe, a platform for buying and selling high quality Shoes.",
    href: "https://kafsh.me",
    dates: "December 08, 2024",
    status: "coming soon",
    technologies: [
      "NextJs 15",
      "Typescript",
      "TailwindCSS",
      "Shadcn UI",
      "Tanstack query",
      "next-mdx-remote",
    ],

    imageSrc: kafshMeImg,
  },
  // {
  //   title: "SyncLine",
  //   description:
  //     "The first CRM that imports your WhatsApp & Telegram history and makes every chat instantly searchable",
  //   href: "https://app.syncline.ai",
  //   dates: "September 01, 2025",
  //   status: "in progress",
  //   technologies: [
  //     "NextJs 15",
  //     "Typescript",
  //     "TailwindCSS",
  //     "Shadcn UI",
  //     "Tanstack query",
  //     "next-mdx-remote",
  //   ],
  //   imageSrc: synclineImg,
  // },
];

export default function MyProjects({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("mx-auto w-full max-w-7xl px-5", className)}
      {...props}
    >
      <header className="mx-auto mb-10 w-full max-w-lg space-y-6 text-center">
        <Title as="h2" size="2xl" className="font-semibold tracking-tight">
          Check out my latest work
        </Title>
        <Paragraph size="md">
          I&apos;ve worked on a variety of projects, from simple websites to
          complex web applications. Here are a few of my favorites
        </Paragraph>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
