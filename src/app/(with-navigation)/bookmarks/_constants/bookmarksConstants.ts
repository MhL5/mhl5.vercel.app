import { snippetsCategoryConfig } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import { Book, Code2, Palette } from "lucide-react";

export type Bookmark = {
  title: string;
  description: string;
  url: `https://${string}`;
  category: "ui" | "design" | "tools" | "development" | "learningResources";
  featured?: boolean;
  tags?: string[];
};

const learningResourcesBookmarks: Bookmark[] = [
  {
    title: "conventional Git Commits",
    description:
      "The Conventional Commits specification is a lightweight convention on top of commit messages. ",
    url: "https://www.conventionalcommits.org/en/v1.0.0/#summary",
    category: "learningResources",
  },
  {
    title: "TkDodo's blog",
    description: "TkDodo's blog, the maintainer of tanstack query",
    url: "https://tkdodo.eu/blog",
    category: "learningResources",
  },
  {
    url: "https://nextjsweekly.com/",
    title: "Stay up-to-date on Next.js",
    description:
      "A weekly newsletter with the most interesting Next.js News, Tutorials, Projects, and Tools. The easiest way to keep up with what’s happening in the ecosystem.",
    category: "learningResources",
  },
  {
    url: "https://github.com/garmeeh/next-seo/tree/main",
    title: "next seo",
    description:
      "Next SEO is a plug in that makes managing your SEO easier in Next.js projects.",
    category: "learningResources",
  },
];

const toolsBookmarks: Bookmark[] = [
  {
    title: "OG Image Generator",
    description:
      "Free Open Graph image generator for websites. Create beautiful social media preview images for your web pages.",
    url: "https://ogimage.click/",
    category: "tools",
  },
  {
    title: "Pattern Craft",
    description: "Craft Beautiful Patterns Backgrounds",
    url: "https://patterncraft.fun",
    category: "tools",
  },
  {
    title: "QuickPic",
    description: "A bunch of simple tools for images. All free. No BS.",
    url: "https://quickpic.t3.gg/",
    category: "tools",
  },
  {
    title: "tweakcn",
    description: "Design Your Perfect shadcn/ui Theme",
    url: "https://tweakcn.com/",
    category: "tools",
  },
];
const developmentBookmarks: Bookmark[] = [
  {
    title: "eslint-plugin-jsx-a11y",
    description:
      "Static AST checker for accessibility rules on JSX elements. Helps ensure your React applications are accessible to users with disabilities.",
    url: "https://www.npmjs.com/package/eslint-plugin-jsx-a11y",
    category: "development",
  },
  {
    title: "Unlighthouse",
    description:
      "Scan your entire website with Google Lighthouse - in 2 minutes. A powerful tool for automated Lighthouse auditing and performance analysis.",
    url: "https://next.unlighthouse.dev/",
    category: "development",
  },
  {
    title: "Guarahooks",
    description: "Hooks Library for Software Engineers",
    url: "https://guarahooks.com",
    category: "development",
  },
];
const designBookmarks: Bookmark[] = [
  {
    title: "Simple Icons",
    description: "3334 SVG icons for popular brands",
    url: "https://simpleicons.org/",
    category: "design",
  },
  {
    title: "Hero Icons",
    description:
      "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.",
    url: "https://heroicons.com/",
    category: "design",
  },
  {
    title: "lucide",
    description: "Beautiful & consistent icons",
    url: "https://lucide.dev/",
    category: "design",
  },
  {
    title: "Tabler Icons",
    description:
      "A complete icon set with perfect line weights and spacing - ready for Figma, apps, and design systems.",
    url: "https://tabler.io/icons",
    category: "design",
  },
  {
    title: "3d icons",
    description: "Beautifully Crafted Free & Premium 3D Icons",
    url: "https://3dicons.co/",
    category: "design",
  },
];
const uiBookmarks: Bookmark[] = [
  {
    title: "Base UI",
    description:
      "Unstyled UI components for building accessible web apps and design systems. From the creators of Radix, Floating UI, and Material UI.",
    url: "https://base-ui.com/",
    category: "ui",
  },
  {
    title: "@optics/design-system",
    description:
      "More than just a design system. It's a collection of tools and resources that help build a more accessible, intuitive, and aesthetically pleasing web applications.",
    url: "https://optics.agusmayol.com.ar/",
    category: "ui",
  },
  {
    title: "useLayouts",
    description: "A micro-interaction UI library for professionals.",
    url: "https://uselayouts.com",
    category: "ui",
  },
  {
    title: "Badtz UI",
    description:
      "An open-source React UI library with production-ready animations. Weekly updates. Built with React, Tailwind, TypeScript & JavaScript.",
    url: "https://www.badtz-ui.com/",
    category: "ui",
  },
  {
    title: "Animata Design",
    description:
      "Hand-crafted ✍️ interaction animations and effects from around the internet 🛜 to copy and paste into your project.",
    category: "ui",
    url: "https://animata.design/",
  },
  {
    title: "Beautiful maps, made simple",
    description:
      "Ready to use, customizable map components for React.Built on MapLibre. Styled with Tailwind.",
    category: "ui",
    url: "https://www.mapcn.dev",
  },
  {
    title: "Shadcn Extension",
    description: "Additional components and utilities for shadcn/ui.",
    url: "https://shadcn-extension.vercel.app/",
    category: "ui",
  },
  {
    title: "Shadcn Phone Input",
    description:
      "Phone input component for shadcn/ui with international format support.",
    url: "https://shadcn-phone-input.vercel.app/",
    category: "ui",
  },
  {
    title: "Shadcn Form Builder",
    description: "Visual form builder and playground for shadcn/ui components.",
    url: "https://www.shadcn-form.com/",
    category: "ui",
  },
  {
    featured: true,
    title: "Aceternity UI",
    description: "Beautiful and modern UI components built with Tailwind CSS.",
    url: "https://ui.aceternity.com/",
    category: "ui",
  },
  {
    featured: true,
    title: "MagicUI",
    description: "Collection of magical UI components and effects.",
    url: "https://magicui.design/",
    category: "ui",
  },
  {
    title: "shadcn/ui expansions",
    description: "More components built on top of shadcn-ui.",
    url: "https://shadcnui-expansions.typeart.cc/",
    category: "ui",
  },
  {
    featured: true,
    title: "Enhanced Button",
    description:
      "Advanced button components with additional features and styles.",
    url: "https://enhanced-button.vercel.app/",
    category: "ui",
  },
  {
    title: "Cult UI",
    description: "Modern UI component library with unique design approach.",
    url: "https://www.cult-ui.com/",
    category: "ui",
  },
  {
    title: "Awesome Shadcn UI",
    description: "Curated collection of shadcn/ui resources and components.",
    url: "https://awesome-shadcn-ui.vercel.app/",
    category: "ui",
  },
  {
    title: "EldoraUI BentoGrid",
    description: "Bento grid components and layouts for modern web design.",
    url: "https://www.eldoraui.site/",
    category: "ui",
  },
  {
    title: "WDS Shadcn Registry",
    description: "Component registry for shadcn/ui by Web Dev Simplified.",
    url: "https://wds-shadcn-registry.netlify.app/",
    category: "ui",
  },
  {
    title: "Motion Primitives",
    description:
      "Animation primitives and components for modern web applications.",
    url: "https://motion-primitives.com/",
    category: "ui",
  },
  {
    title: "Origin UI",
    description:
      "Clean and minimal UI component library for modern applications.",
    url: "https://originui.com/",
    category: "ui",
  },
  {
    title: "DiceUI",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://www.diceui.com/",
    category: "ui",
  },
  {
    title: "MVP Blocks",
    description: "Prebuilt UI Logo blocks to ship beautiful MVPs fast",
    url: "https://blocks.mvp-subha.me/",
    category: "ui",
  },
  {
    title: "shsfui",
    description: "Motion-first UI library for those who care about details.",
    url: "https://www.shsfui.com/",
    category: "ui",
  },
  {
    title: "kibo ui",
    description:
      "Kibo UI is a custom registry of composable, accessible and open source components designed for use with shadcn/ui.",
    url: "https://www.kibo-ui.com/",
    category: "ui",
  },
  {
    title: "skiper ui",
    description: "Components crafted for Modern Websites",
    url: "https://skiper-ui.com/",
    category: "ui",
  },
  {
    title: "21st.dev",
    description:
      "A collection of composable, unstyled UI primitives for building accessible web applications.",
    url: "https://21st.dev/home",
    category: "ui",
  },
  {
    title: "Untitled UI",
    description:
      "Untitled UI React is the world’s largest collection of open-source React components built with Tailwind CSS and React Aria. Just copy, paste, and build.",
    url: "https://www.untitledui.com/react",
    category: "ui",
  },
  {
    title: "react bits",
    description: "animated react components for creative developers",
    url: "https://reactbits.dev",
    category: "ui",
    featured: true,
  },
  {
    title: "tailark",
    description:
      "Modern, Responsive, pre-built UI blocks designed for marketing websites.",
    url: "https://tailark.com/",
    category: "ui",
  },
  {
    title: "ai Elements",
    description:
      "A comprehensive collection of React components designed for building modern AI chat interfaces.",
    url: "https://ai-sdk.dev/elements/components",
    category: "ui",
  },
  {
    title: "components.work",
    description: "collection of different blocks",
    url: "https://components.work/",
    category: "ui",
  },
  {
    title: "reui",
    description:
      "Open-source collection of UI components and animated effects built with React, Typescript, Tailwind CSS, and Motion. Pairs beautifully with shadcn/ui.",
    url: "https://reui.io/",
    category: "ui",
  },
  {
    title: "kokonut UI",
    description:
      "Beautiful, modern UI components built with Tailwind CSS, shadcn/ui & Motion.100+ open-source components designed for React & Next.js.",
    url: "https://kokonutui.com/",
    category: "ui",
  },
  {
    title: "smoothui",
    description:
      "Highly customizable, production-ready UI blocks for building beautiful websites and apps that look and feel the way you mean it.",
    url: "https://smoothui.dev/",
    category: "ui",
  },
  {
    title: "shadcn blocks",
    description: "The ultimate block set for Shadcn UI & Tailwind.",
    url: "https://www.shadcnblocks.com",
    category: "ui",
  },
  {
    title: "shadcn tip tap",
    description:
      "Collection of custom extensions and toolbars for Tiptap editor.",
    url: "https://tiptap.niazmorshed.dev",
    category: "ui",
  },
  {
    title: "evil charts",
    description: "Beautiful, responsive, customizable charts for your website.",
    url: "https://evilcharts.com/",
    category: "ui",
  },
  {
    title: "uiverse",
    description: "The Largest Library of Open-Source UI",
    url: "https://uiverse.io/",
    category: "ui",
  },
  {
    title: "Build UI Recipes",
    description: "Recipes for building UI ",
    url: "https://buildui.com/recipes",
    category: "ui",
  },
  {
    title: "intent ui",
    description:
      "Accessible React component library to copy, customize, and own your UI.",
    url: "https://intentui.com/",
    category: "ui",
  },
  {
    title: "shadcn design pro blocks",
    description: "The ultimate block set for Shadcn UI & Tailwind.",
    url: "https://www.shadcndesign.com/pro-blocks",
    category: "ui",
  },
  {
    description:
      "New 🎉 Dashboard & Marketing UI Blocks, AI Theme Generator, Shadcn MCP & more... 🪄 Build Futuristic UIs with Shadcn Blocks at Warp Speed",
    url: "https://shadcnstudio.com/",
    category: "ui",
    title: "Shadcn Studio",
  },
  {
    url: "https://efferd.com",
    category: "ui",
    title: "Efferd",
    description: "Beautiful Shadcn Blocks.",
  },
  {
    url: "https://www.shadcn.io/",
    category: "ui",
    title: "Shadcn UI",
    description:
      "Essential UI components, advanced patterns, and AI integrations. From buttons to AI chat interfaces - everything you need to build modern applications.",
  },
  {
    url: "https://animate-ui.com/",
    category: "ui",
    title: "Animate UI",
    description:
      "A fully animated, open-source React component distribution. Browse a list of animated primitives, components and icons you can install and use in your projects.",
  },
  {
    url: "https://ui.elevenlabs.io/docs",
    category: "ui",
    title: "ElevenLabs UI",
    description:
      "ElevenLabs UI is a component library and custom registry built on top of shadcn/ui to help you build multimodal agentic experiences faster.",
  },
  {
    url: "https://blocks.so/",
    category: "ui",
    title: "Blocks.so",
    description:
      "Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.",
  },
  {
    url: "https://www.solaceui.com/",
    category: "ui",
    title: "Solace UI",
    description:
      "Production-ready sections, animated components, and full-page templates for Next.js, Tailwind CSS & Framer Motion",
  },
  {
    url: "https://square.lndev.me/",
    category: "ui",
    title: "Square Ui",
    description:
      "Collection of beautifully crafted open-source layouts UI built with shadcn/ui.",
  },
  {
    url: "https://www.fancycomponents.dev/",
    category: "ui",
    title: "Fancy Components",
    description:
      "with a growing library of ready-to-use react components & micro interactions. free & open source.. very good documentation",
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
  development: { icon: Code2, color: "text-blue-600 dark:text-blue-400" },
  design: { icon: Palette, color: "text-purple-600 dark:text-purple-400" },
  tools: {
    icon: snippetsCategoryConfig.utils.icon,
    color: snippetsCategoryConfig.utils.tailwindClass,
  },
  ui: {
    icon: snippetsCategoryConfig.components.icon,
    color: snippetsCategoryConfig.components.tailwindClass,
  },
  learningResources: {
    icon: Book,
    color: "text-green-600 dark:text-green-400",
  },
};
