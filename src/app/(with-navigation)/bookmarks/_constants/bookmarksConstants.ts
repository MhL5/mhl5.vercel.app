import { snippetsCategoryConfig } from "@/constants/constants";
import { Book, Code2, Globe, Palette } from "lucide-react";

export type Bookmark = {
  title: string;
  description: string;
  url: `https://${string}`;
  category: "UI" | "Design" | "Tools" | "Development" | "Learning-Resources";
  featured?: boolean;
};

const learningResourcesBookmarks: Bookmark[] = [
  {
    title: "conventional Git Commits",
    description:
      "The Conventional Commits specification is a lightweight convention on top of commit messages. ",
    url: "https://www.conventionalcommits.org/en/v1.0.0/#summary",
    category: "Learning-Resources",
  },
  {
    title: "TkDodo's blog",
    description: "TkDodo's blog, the maintainer of tanstack query",
    url: "https://tkdodo.eu/blog",
    category: "Learning-Resources",
  },
];

const toolsBookmarks: Bookmark[] = [
  {
    title: "OG Image Generator",
    description:
      "Free Open Graph image generator for websites. Create beautiful social media preview images for your web pages.",
    url: "https://ogimage.click/",
    category: "Tools",
  },
  {
    title: "Pattern Craft",
    description: "Craft Beautiful Patterns Backgrounds",
    url: "https://patterncraft.fun",
    category: "Tools",
  },
];
const developmentBookmarks: Bookmark[] = [
  {
    title: "eslint-plugin-jsx-a11y",
    description:
      "Static AST checker for accessibility rules on JSX elements. Helps ensure your React applications are accessible to users with disabilities.",
    url: "https://www.npmjs.com/package/eslint-plugin-jsx-a11y",
    category: "Development",
  },
  {
    title: "Unlighthouse",
    description:
      "Scan your entire website with Google Lighthouse - in 2 minutes. A powerful tool for automated Lighthouse auditing and performance analysis.",
    url: "https://next.unlighthouse.dev/",
    category: "Development",
  },
  {
    title: "Guarahooks",
    description: "Hooks Library for Software Engineers",
    url: "https://guarahooks.com",
    category: "Development",
  },
];
const designBookmarks: Bookmark[] = [
  {
    title: "Simple Icons",
    description: "3334 SVG icons for popular brands",
    url: "https://simpleicons.org/",
    category: "Design",
  },
  {
    title: "Hero Icons",
    description:
      "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.",
    url: "https://heroicons.com/",
    category: "Design",
  },
];
const uiBookmarks: Bookmark[] = [
  {
    title: "Base UI",
    description:
      "Unstyled UI components for building accessible web apps and design systems. From the creators of Radix, Floating UI, and Material UI.",
    url: "https://base-ui.com/",
    category: "UI",
  },
  {
    title: "Animata Design",
    description:
      "Hand-crafted ✍️ interaction animations and effects from around the internet 🛜 to copy and paste into your project.",
    category: "UI",
    url: "https://animata.design/",
  },
  {
    title: "Shadcn Extension",
    description: "Additional components and utilities for shadcn/ui.",
    url: "https://shadcn-extension.vercel.app/",
    category: "UI",
  },
  {
    title: "Shadcn Phone Input",
    description:
      "Phone input component for shadcn/ui with international format support.",
    url: "https://shadcn-phone-input.vercel.app/",
    category: "UI",
  },
  {
    title: "Shadcn Form Builder",
    description: "Visual form builder and playground for shadcn/ui components.",
    url: "https://www.shadcn-form.com/",
    category: "UI",
  },
  {
    featured: true,
    title: "Aceternity UI",
    description: "Beautiful and modern UI components built with Tailwind CSS.",
    url: "https://ui.aceternity.com/",
    category: "UI",
  },
  {
    featured: true,
    title: "MagicUI",
    description: "Collection of magical UI components and effects.",
    url: "https://magicui.design/",
    category: "UI",
  },
  {
    title: "shadcn/ui expansions",
    description: "More components built on top of shadcn-ui.",
    url: "https://shadcnui-expansions.typeart.cc/",
    category: "UI",
  },
  {
    featured: true,
    title: "Enhanced Button",
    description:
      "Advanced button components with additional features and styles.",
    url: "https://enhanced-button.vercel.app/",
    category: "UI",
  },
  {
    title: "Cult UI",
    description: "Modern UI component library with unique design approach.",
    url: "https://www.cult-ui.com/",
    category: "UI",
  },
  {
    title: "Awesome Shadcn UI",
    description: "Curated collection of shadcn/ui resources and components.",
    url: "https://awesome-shadcn-ui.vercel.app/",
    category: "UI",
  },
  {
    title: "EldoraUI BentoGrid",
    description: "Bento grid components and layouts for modern web design.",
    url: "https://www.eldoraui.site/",
    category: "UI",
  },
  {
    title: "WDS Shadcn Registry",
    description: "Component registry for shadcn/ui by Web Dev Simplified.",
    url: "https://wds-shadcn-registry.netlify.app/",
    category: "UI",
  },
  {
    title: "Motion Primitives",
    description:
      "Animation primitives and components for modern web applications.",
    url: "https://motion-primitives.com/",
    category: "UI",
  },
  {
    title: "Origin UI",
    description:
      "Clean and minimal UI component library for modern applications.",
    url: "https://originui.com/",
    category: "UI",
  },
  {
    title: "DiceUI",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://www.diceui.com/",
    category: "UI",
  },
  {
    title: "MVP Blocks",
    description: "Prebuilt UI Logo blocks to ship beautiful MVPs fast",
    url: "https://blocks.mvp-subha.me/",
    category: "UI",
  },
  {
    title: "shsfui",
    description: "Motion-first UI library for those who care about details.",
    url: "https://www.shsfui.com/",
    category: "UI",
  },
  {
    title: "kibo ui",
    description:
      "Kibo UI is a custom registry of composable, accessible and open source components designed for use with shadcn/ui.",
    url: "https://www.kibo-ui.com/",
    category: "UI",
  },
  {
    title: "skiper ui",
    description: "Components crafted for Modern Websites",
    url: "https://skiper-ui.com/",
    category: "UI",
  },
  {
    title: "21st.dev",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://21st.dev/home",
    category: "UI",
  },
  {
    title: "Untitled UI",
    description:
      "Untitled UI React is the world’s largest collection of open-source React components built with Tailwind CSS and React Aria. Just copy, paste, and build.",
    url: "https://www.untitledui.com/react",
    category: "UI",
  },
  {
    title: "react bits",
    description: "animated react components for creative developers",
    url: "https://reactbits.dev",
    category: "UI",
    featured: true,
  },
  {
    title: "tailark",
    description:
      "Modern, Responsive, pre-built UI blocks designed for marketing websites.",
    url: "https://tailark.com/",
    category: "UI",
  },
  {
    title: "ai Elements",
    description:
      "A comprehensive collection of React components designed for building modern AI chat interfaces.",
    url: "https://ai-sdk.dev/elements/components",
    category: "UI",
  },
  {
    title: "components.work",
    description: "collection of different blocks",
    url: "https://components.work/",
    category: "UI",
  },
  {
    title: "reui",
    description:
      "Open-source collection of UI components and animated effects built with React, Typescript, Tailwind CSS, and Motion. Pairs beautifully with shadcn/ui.",
    url: "https://reui.io/",
    category: "UI",
  },
  {
    title: "kokonut UI",
    description:
      "Beautiful, modern UI components built with Tailwind CSS, shadcn/ui & Motion.100+ open-source components designed for React & Next.js.",
    url: "https://kokonutui.com/",
    category: "UI",
  },
  {
    title: "smoothui",
    description:
      "Highly customizable, production-ready UI blocks for building beautiful websites and apps that look and feel the way you mean it.",
    url: "https://smoothui.dev/",
    category: "UI",
  },
  {
    title: "shadcn blocks",
    description: "The ultimate block set for Shadcn UI & Tailwind.",
    url: "https://www.shadcnblocks.com",
    category: "UI",
  },
];

export const allBookmarks: Bookmark[] = [
  ...toolsBookmarks,
  ...developmentBookmarks,
  ...designBookmarks,
  ...uiBookmarks,
  ...learningResourcesBookmarks,
];

export const bookmarkCategoryConfig = {
  Development: { icon: Code2, color: "text-blue-600 dark:text-blue-400" },
  Design: { icon: Palette, color: "text-purple-600 dark:text-purple-400" },
  Tools: {
    icon: snippetsCategoryConfig["utils"].icon,
    color: snippetsCategoryConfig["utils"].tailwindClass,
  },
  General: { icon: Globe, color: "text-gray-600 dark:text-gray-400" },
  UI: {
    icon: snippetsCategoryConfig["components"].icon,
    color: snippetsCategoryConfig["components"].tailwindClass,
  },
  "Learning-Resources": {
    icon: Book,
    color: "text-green-600 dark:text-green-400",
  },
};
