import type { StringWithAutoComplete } from "@/registry/types/AutoComplete/AutoComplete";
import {
  BookIcon,
  Code2Icon,
  PackageIcon,
  PaletteIcon,
  ShapesIcon,
  SparklesIcon,
  WrenchIcon,
} from "lucide-react";
import type { JSX } from "react";

type BookmarkCategory = keyof typeof bookmarkCategories;

type Bookmark = {
  title: string;
  description: string;
  url: `https://${string}`;
  category: BookmarkCategory;
  tags: StringWithAutoComplete<
    | "primitive"
    | "headless"
    | "animation"
    | "blocks"
    | "components"
    | "ai"
    | "templates"
    | "skill"
  >[];
};

type BookmarksGroups = typeof bookmarksGroups;

const bookmarksGroups = ["development", "design", "other"] as const;

const aiBookmarks: Bookmark[] = (
  [
    {
      title: "AI Skills for Real Engineers by mattpocock",
      tags: ["ai", "skill", "mattpocock"],
      description:
        "A practical skill system for engineers who want to use AI without giving up their standards. Install the ones you want, then type a slash command.",
      url: "https://www.aihero.dev/skills",
    },
    // {
    //   title: "",
    //   description: "",
    //   tags: [],
    //   url: "",
    // },
  ] satisfies Omit<Bookmark, "category">[]
).map((b) => ({ ...b, category: "ai" }));

const developmentBookmarks: Bookmark[] = (
  [
    {
      title: "React doctor",
      description:
        "One command scans your codebase for security, performance, correctness, and architecture issues, then outputs a 0–100 score with actionable diagnostics.",
      url: "https://github.com/millionco/react-doctor",
      tags: ["react", "audit", "cli"],
    },
    {
      title: "eslint-plugin-jsx-a11y",
      description:
        "Static AST checker for accessibility rules on JSX elements. Helps ensure your React applications are accessible to users with disabilities.",
      url: "https://www.npmjs.com/package/eslint-plugin-jsx-a11y",
      tags: ["eslint", "accessibility"],
    },
    {
      title: "Unlighthouse",
      description:
        "Scan your entire website with Google Lighthouse - in 2 minutes. A powerful tool for automated Lighthouse auditing and performance analysis.",
      url: "https://unlighthouse.dev",
      tags: ["performance", "lighthouse", "audit"],
    },
    {
      title: "Guarahooks",
      description: "Hooks Library for Software Engineers",
      url: "https://guarahooks.com",
      tags: ["react", "hooks"],
    },
    // {
    //   title: "",
    //   description: "",
    //   tags: [],
    //   url: "",
    // },
  ] satisfies Omit<Bookmark, "category">[]
).map((b) => ({ ...b, category: "development" }));

const designBookmarks: Bookmark[] = (
  [
    {
      title: "awards website",
      description: "",
      url: "https://www.awwwards.com/inspiration_search",
      tags: ["inspiration", "awwwards"],
    },
    {
      title: "fonttrio",
      description: "Fonts paired for you Install with one command",
      tags: ["font"],
      url: "https://www.fonttrio.xyz",
    },
    {
      title: "kole jain website",
      description:
        "A growing collection of Figma components from my design videos and builds.",
      tags: ["figma"],
      url: "https://www.kolejain.com/resources",
    },
    // {
    //   title: "",
    //   description: "",
    //   tags: [],
    //   url: "",
    // },
  ] satisfies Omit<Bookmark, "category">[]
).map((b) => ({ ...b, category: "design" }));

const iconsBookmarks: Bookmark[] = (
  [
    {
      title: "Simple Icons",
      description: "3334 SVG icons for popular brands",
      url: "https://simpleicons.org/",
      tags: ["svg", "brands"],
    },
    {
      title: "Hero Icons",
      description:
        "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.",
      url: "https://heroicons.com/",
      tags: ["svg", "tailwind"],
    },
    {
      title: "lucide",
      description: "Beautiful & consistent icons",
      url: "https://lucide.dev/",
      tags: ["svg", "react"],
    },
    {
      title: "Tabler Icons",
      description:
        "A complete icon set with perfect line weights and spacing - ready for Figma, apps, and design systems.",
      url: "https://tabler.io/icons",
      tags: ["svg", "figma"],
    },
    {
      title: "3d icons",
      description: "Beautifully Crafted Free & Premium 3D Icons",
      url: "https://3dicons.co/",
      tags: ["3d"],
    },
    {
      title: "Lucid animated",
      description:
        "an open-source (MIT License) collection of smooth animated icons for your projects. feel free to use them, share your feedback, and let's make this library awesome together,Crafted with Motion & Lucide",
      url: "https://lucide-animated.com/",
      tags: ["animated", "lucide", "motion"],
    },
    {
      title: "icons0.dev",
      description: "the fastest icon search — for you and your AI agent",
      tags: [],
      url: "https://icons0.dev",
    },
    // {
    //   title: "",
    //   description: "",
    //   tags: [],
    //   url: "",
    // },
  ] satisfies Omit<Bookmark, "category">[]
).map((b) => ({ ...b, category: "icons" }));

const toolsBookmarks: Bookmark[] = (
  [
    {
      title: "The Open Agent Skills Ecosystem",
      description:
        "Skills are reusable capabilities for AI agents. Install them with a single command to enhance your agents with access to procedural knowledge.",
      url: "https://skills.sh",
      tags: ["ai", "agents", "skills"],
    },
    {
      title: "OG Image Generator",
      description:
        "Free Open Graph image generator for websites. Create beautiful social media preview images for your web pages.",
      url: "https://myogimage.com",
      tags: ["og image", "seo", "social"],
    },
    {
      title: "Pattern Craft",
      description: "Craft Beautiful Patterns Backgrounds",
      url: "https://patterncraft.reactbd.com",
      tags: ["background", "css", "patterns"],
    },
    {
      title: "QuickPic",
      description: "A bunch of simple tools for images. All free. No BS.",
      url: "https://quickpic.t3.gg/",
      tags: ["images", "converter"],
    },
    {
      title: "tweakcn",
      description: "Design Your Perfect shadcn/ui Theme",
      url: "https://tweakcn.com/",
      tags: ["shadcn", "theme", "colors"],
    },
    {
      title: "shoogle",
      description: "search shadcn blocks",
      url: "https://shoogle.dev",
      tags: ["shadcn", "search", "blocks"],
    },
    {
      title: "StackRender",
      description:
        "Design database schemas visually. Generate SQL migrations. Track schema changes as your project grows.",
      url: "https://stackrender.io",
      tags: ["database", "backend", "database schema"],
    },
    // {
    //   title: "",
    //   description: "",
    //   tags: [],
    //   url: "",
    // },
  ] satisfies Omit<Bookmark, "category">[]
).map((b) => ({ ...b, category: "tools" }));

const blogsBookmarks: Bookmark[] = (
  [
    {
      title: "conventional Git Commits",
      description:
        "The Conventional Commits specification is a lightweight convention on top of commit messages. ",
      url: "https://www.conventionalcommits.org/en/v1.0.0/#summary",
      tags: ["git", "conventions"],
    },
    {
      title: "TkDodo's blog",
      description: "TkDodo's blog, the maintainer of tanstack query",
      url: "https://tkdodo.eu/blog",
      tags: ["react", "react query", "blog"],
    },
    {
      title: "Stay up-to-date on Next.js",
      description:
        "A weekly newsletter with the most interesting Next.js News, Tutorials, Projects, and Tools. The easiest way to keep up with what’s happening in the ecosystem.",
      url: "https://nextjsweekly.com/",
      tags: ["next.js", "newsletter"],
    },
    {
      title: "next seo",
      description:
        "Next SEO is a plug in that makes managing your SEO easier in Next.js projects.",
      url: "https://github.com/garmeeh/next-seo/tree/main",
      tags: ["next.js", "seo"],
    },
    {
      title: "Build UI Recipes",
      description: "Recipes for building UI ",
      url: "https://buildui.com/recipes",
      tags: ["react", "recipes"],
    },
    // {
    //   title: "",
    //   description: "",
    //   tags: [],
    //   url: "",
    // },
  ] satisfies Omit<Bookmark, "category">[]
).map((b) => ({ ...b, category: "blogs" }));

const uiBookmarks: Bookmark[] = (
  [
    {
      title: "Aceternity UI",
      description:
        "Beautiful and modern UI components built with Tailwind CSS.",
      url: "https://ui.aceternity.com/",
      tags: ["motion", "tailwind"],
    },
    {
      title: "MagicUI",
      description: "Collection of magical UI components and effects.",
      url: "https://magicui.design/",
      tags: ["motion", "effects"],
    },
    {
      title: "react bits",
      description: "animated react components for creative developers",
      url: "https://reactbits.dev",
      tags: ["motion", "creative"],
    },
    {
      title: "Motion Primitives",
      description:
        "Animation primitives and components for modern web applications.",
      url: "https://motion-primitives.com/",
      tags: ["motion", "primitives"],
    },
    {
      title: "Animate UI",
      description:
        "A fully animated, open-source React component distribution. Browse a list of animated primitives, components and icons you can install and use in your projects.",
      url: "https://animate-ui.com/",
      tags: ["motion", "registry"],
    },
    {
      title: "Animata Design",
      description:
        "Hand-crafted ✍️ interaction animations and effects from around the internet 🛜 to copy and paste into your project.",
      url: "https://animata.design/",
      tags: ["micro interactions", "effects"],
    },
    {
      title: "Fancy Components",
      description:
        "with a growing library of ready-to-use react components & micro interactions. free & open source.. very good documentation",
      url: "https://www.fancycomponents.dev/",
      tags: ["micro interactions", "motion"],
    },
    {
      title: "useLayouts",
      description: "A micro-interaction UI library for professionals.",
      url: "https://uselayouts.com",
      tags: ["micro interactions"],
    },
    {
      title: "Badtz UI",
      description:
        "An open-source React UI library with production-ready animations. Weekly updates. Built with React, Tailwind, TypeScript & JavaScript.",
      url: "https://www.badtz-ui.com/",
      tags: ["motion", "tailwind"],
    },
    {
      title: "shadcn blocks",
      description: "The ultimate block set for Shadcn UI & Tailwind.",
      url: "https://www.shadcnblocks.com",
      tags: ["shadcn", "tailwind"],
    },
    {
      title: "shadcn design pro blocks",
      description: "The ultimate block set for Shadcn UI & Tailwind.",
      url: "https://www.shadcndesign.com/pro-blocks",
      tags: ["shadcn", "pro"],
    },
    {
      title: "Shadcn Studio",
      description:
        "New 🎉 Dashboard & Marketing UI Blocks, AI Theme Generator, Shadcn MCP & more... 🪄 Build Futuristic UIs with Shadcn Blocks at Warp Speed",
      url: "https://shadcnstudio.com/",
      tags: ["shadcn", "dashboard", "marketing"],
    },
    {
      title: "shadcnspace",
      description: "Extraordinary Shadcn UI blocks, components, and templates",
      url: "https://shadcnspace.com/components/badge",
      tags: ["shadcn", "templates"],
    },
    {
      title: "shadcn ui kit",
      description: "Build faster with pre-built assets using the Shadcn UI Kit",
      url: "https://shadcnuikit.com/",
      tags: ["shadcn", "dashboard"],
    },
    {
      title: "Efferd",
      description: "Beautiful Shadcn Blocks.",
      url: "https://efferd.com",
      tags: ["shadcn"],
    },
    {
      title: "Blocks.so",
      description:
        "Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.",
      url: "https://blocks.so/",
      tags: ["open source"],
    },
    {
      title: "Solace UI",
      description:
        "Production-ready sections, animated components, and full-page templates for Next.js, Tailwind CSS & Framer Motion",
      url: "https://www.solaceui.com/",
      tags: ["templates", "next.js"],
    },
    {
      title: "Square Ui",
      description:
        "Collection of beautifully crafted open-source layouts UI built with shadcn/ui.",
      url: "https://square.lndev.me/",
      tags: ["shadcn", "layouts"],
    },
    {
      title: "ui layouts",
      description:
        "Beautifully designed sections you can copy and paste straight into your apps. Creatively crafted with Tailwind CSS and shadcn/ui, these blocks are built for real-world React and Next.js projects",
      url: "https://www.ui-layouts.com/blocks",
      tags: ["shadcn", "sections"],
    },
    {
      title: "tailark",
      description:
        "Modern, Responsive, pre-built UI blocks designed for marketing websites.",
      url: "https://tailark.com/",
      tags: ["marketing", "landing page"],
    },
    {
      title: "MVP Blocks",
      description: "Prebuilt UI Logo blocks to ship beautiful MVPs fast",
      url: "https://blocks.mvp-subha.me/",
      tags: ["mvp", "landing page"],
    },
    {
      title: "EldoraUI BentoGrid",
      description: "Bento grid components and layouts for modern web design.",
      url: "https://www.eldoraui.site/",
      tags: ["bento", "grid"],
    },
    {
      title: "components.work",
      description: "collection of different blocks",
      url: "https://components.work/",
      tags: ["sections", "copy paste"],
    },
    {
      title: "Base UI",
      description:
        "Unstyled UI components for building accessible web apps and design systems. From the creators of Radix, Floating UI, and Material UI.",
      url: "https://base-ui.com/",
      tags: ["headless", "accessibility", "primitives"],
    },
    {
      title: "Origin UI",
      description:
        "Clean and minimal UI component library for modern applications.",
      url: "https://originui.com/",
      tags: ["shadcn", "tailwind"],
    },
    {
      title: "DiceUI",
      description:
        "A collection of composable, unstyled UI primitives for building accessible web applications.",
      url: "https://www.diceui.com/",
      tags: ["primitives", "headless"],
    },
    {
      title: "kibo ui",
      description:
        "Kibo UI is a custom registry of composable, accessible and open source components designed for use with shadcn/ui.",
      url: "https://www.kibo-ui.com/",
      tags: ["shadcn", "registry"],
    },
    {
      title: "skiper ui",
      description: "Components crafted for Modern Websites",
      url: "https://skiper-ui.com/",
      tags: ["motion", "components"],
    },
    {
      title: "21st.dev",
      description:
        "A collection of composable, unstyled UI primitives for building accessible web applications.",
      url: "https://21st.dev/home",
      tags: ["registry", "shadcn"],
    },
    {
      title: "Untitled UI",
      description:
        "Untitled UI React is the world’s largest collection of open-source React components built with Tailwind CSS and React Aria. Just copy, paste, and build.",
      url: "https://www.untitledui.com/react",
      tags: ["react aria", "tailwind"],
    },
    {
      title: "shadcn/ui expansions",
      description: "More components built on top of shadcn-ui.",
      url: "https://shadcnui-expansions.typeart.cc/",
      tags: ["shadcn"],
    },
    {
      title: "Enhanced Button",
      description:
        "Advanced button components with additional features and styles.",
      url: "https://enhanced-button.vercel.app/",
      tags: ["button", "shadcn"],
    },
    {
      title: "Cult UI",
      description: "Modern UI component library with unique design approach.",
      url: "https://www.cult-ui.com/",
      tags: ["shadcn"],
    },
    {
      title: "Awesome Shadcn UI",
      description: "Curated collection of shadcn/ui resources and components.",
      url: "https://awesome-shadcn-ui.vercel.app/",
      tags: ["shadcn", "awesome list"],
    },
    {
      title: "WDS Shadcn Registry",
      description: "Component registry for shadcn/ui by Web Dev Simplified.",
      url: "https://wds-shadcn-registry.netlify.app/",
      tags: ["shadcn", "registry"],
    },
    {
      title: "reui",
      description:
        "Open-source collection of UI components and animated effects built with React, Typescript, Tailwind CSS, and Motion. Pairs beautifully with shadcn/ui.",
      url: "https://reui.io/",
      tags: ["shadcn", "motion"],
    },
    {
      title: "kokonut UI",
      description:
        "Beautiful, modern UI components built with Tailwind CSS, shadcn/ui & Motion.100+ open-source components designed for React & Next.js.",
      url: "https://kokonutui.com/",
      tags: ["shadcn", "motion"],
    },
    {
      title: "smoothui",
      description:
        "Highly customizable, production-ready UI blocks for building beautiful websites and apps that look and feel the way you mean it.",
      url: "https://smoothui.dev/",
      tags: ["motion", "components"],
    },
    {
      title: "intent ui",
      description:
        "Accessible React component library to copy, customize, and own your UI.",
      url: "https://intentui.com/",
      tags: ["react aria", "accessibility"],
    },
    {
      title: "uiverse",
      description: "The Largest Library of Open-Source UI",
      url: "https://uiverse.io/",
      tags: ["css"],
    },
    {
      title: "Shadcn UI",
      description:
        "Essential UI components, advanced patterns, and AI integrations. From buttons to AI chat interfaces - everything you need to build modern applications.",
      url: "https://www.shadcn.io/",
      tags: ["shadcn", "ai"],
    },
    {
      title: "ElevenLabs UI",
      description:
        "ElevenLabs UI is a component library and custom registry built on top of shadcn/ui to help you build multimodal agentic experiences faster.",
      url: "https://ui.elevenlabs.io/docs",
      tags: ["shadcn", "ai", "voice"],
    },
    {
      title: "ai Elements",
      description:
        "A comprehensive collection of React components designed for building modern AI chat interfaces.",
      url: "https://ai-sdk.dev/elements/components",
      tags: ["ai", "chat", "vercel"],
    },
    {
      title: "Beautiful maps, made simple",
      description:
        "Ready to use, customizable map components for React.Built on MapLibre. Styled with Tailwind.",
      url: "https://www.mapcn.dev",
      tags: ["maps", "maplibre"],
    },
    {
      title: "Shadcn Phone Input",
      description:
        "Phone input component for shadcn/ui with international format support.",
      url: "https://shadcn-phone-input.vercel.app/",
      tags: ["shadcn", "forms", "input"],
    },
    {
      title: "shadcn tip tap",
      description:
        "Collection of custom extensions and toolbars for Tiptap editor.",
      url: "https://tiptap.niazmorshed.dev",
      tags: ["tiptap", "editor", "shadcn"],
    },
    {
      title: "evil charts",
      description:
        "Beautiful, responsive, customizable charts for your website.",
      url: "https://evilcharts.com/",
      tags: ["charts", "data viz"],
    },
    {
      title: "bklit",
      description: "Design engineered charts and components.",
      url: "https://ui.bklit.com",
      tags: ["charts", "data viz"],
    },
    {
      title: "Wigggle UI",
      description: "The first ever collection of Widgets for the Web.",
      url: "https://wigggle-ui.vercel.app/",
      tags: ["widgets"],
    },
    {
      title: "Pixel Perfect",
      description:
        "A pixel-perfect React component library for modern web apps",
      url: "https://www.pixel-perfect.space/",
      tags: ["react", "components"],
    },
    {
      title: "Shark ui",
      description:
        "A beautifully designed and accessible set of 90+ components, created to help you build reusable and scalable design systems.",
      url: "https://shark.vini.one",
      tags: ["headless", "accessibility", "primitives"],
    },
    {
      title: "kairoui",
      description: "Free landing page templates.",
      tags: ["animation", "templates"],
      url: "https://www.kairoui.online",
    },
    {
      title: "vengence ui",
      description:
        "Hover effects, animated tooltips, and scroll-driven layouts designed for modern marketing websites.",
      tags: ["animation", "components", "templates"],
      url: "https://www.vengenceui.com",
    },
    {
      title: "grootstudio",
      description:
        "a Library of High-Performing, SEO Optimised Components Designed for Modern Developers",
      tags: ["animation", "components", "templates"],
      url: "https://grootstudio.dev",
    },
    {
      title: "beui",
      description:
        "Copy-paste React components built with Motion and Tailwind CSS. Free, open source, and fully customizable.",
      tags: [
        "animation",
        "blocks",
        "components",
        "playground",
        "ai ui",
        "agent ui",
      ],
      url: "https://beui.dev",
    },
    {
      title: "Watermelon UI",
      description:
        "600+ free, open-source UI components crafted for the design community. Copy, paste, and ship — no strings attached.",
      tags: ["animation", "blocks", "components", "templates", "dashboard"],
      url: "https://ui.watermelon.sh",
    },
    {
      title: "jal-co/ui",
      description:
        " polished, composable components ready to install and adapt.",
      tags: ["animation", "components"],
      url: "https://ui.justinlevine.me/docs",
    },
    {
      title: "Spell ui - Refined UI components for Design Engineers",
      description:
        "A large collection of high-quality React components that you can copy and paste into any project.",
      tags: ["animation", "components"],
      url: "https://spell.sh",
    },
    {
      title: "@optics/design-system",
      description:
        "More than just a design system. It's a collection of tools and resources that help build a more accessible, intuitive, and aesthetically pleasing web applications.",
      url: "https://optics.agusmayol.com.ar/",
      tags: ["design system", "components", "primitive", "seo"],
    },
    {
      title: "Chánh Đại",
      description:
        "a Design Engineer, Creating with code. Small details matter.",
      url: "https://chanhdai.com/",
      tags: ["portfolio", "inspiration"],
    },
    {
      title: "Bag\Ui",
      description: "Build production-ready SaaS landing pages faster",
      tags: ["blocks"],
      url: "https://www.bagui.pro/",
    },
    // {
    //   title: "",
    //   description: "",
    //   tags: [],
    //   url: "",
    // },
  ] satisfies Omit<Bookmark, "category">[]
).map((b) => ({ ...b, category: "ui" }));

const bookmarkCategories = {
  // Development
  ui: {
    label: "UI",
    group: bookmarksGroups[0],
    icon: PackageIcon,
    count: uiBookmarks.length,
    color: "text-orange-600 hover:text-orange-600/90 dark:text-orange-400",
  },
  development: {
    label: "Development",
    group: bookmarksGroups[0],
    icon: Code2Icon,
    count: developmentBookmarks.length,
    color: "text-blue-600 hover:text-blue-600/90 dark:text-blue-400",
  },
  tools: {
    label: "Tools",
    group: bookmarksGroups[2],
    icon: WrenchIcon,
    count: toolsBookmarks.length,
    color: "text-emerald-600 hover:text-emerald-600/90 dark:text-emerald-400",
  },
  ai: {
    label: "AI",
    group: bookmarksGroups[0],
    color: "text-pink-600 hover:text-pink-600/90 dark:text-pink-400",
    icon: SparklesIcon,
    count: aiBookmarks.length,
  },

  // Design
  icons: {
    label: "Icons",
    group: bookmarksGroups[1],
    icon: ShapesIcon,
    count: iconsBookmarks.length,
    color: "text-violet-600 hover:text-violet-600/90 dark:text-violet-400",
  },
  design: {
    label: "Design & Inspiration",
    group: bookmarksGroups[1],
    icon: PaletteIcon,
    count: designBookmarks.length,
    color: "text-purple-600 hover:text-purple-600/90 dark:text-purple-400",
  },

  // Learning
  blogs: {
    label: "Learning",
    group: bookmarksGroups[2],
    icon: BookIcon,
    count: blogsBookmarks.length,
    color: "text-green-600 hover:text-green-600/90 dark:text-green-400",
  },
} as const satisfies Record<
  string,
  {
    label: string;
    group: BookmarksGroups[number];
    icon: JSX.ElementType;
    color: string;
    count: number;
  }
>;

const bookmarks = [
  ...aiBookmarks,
  ...designBookmarks,
  ...iconsBookmarks,
  ...uiBookmarks,
  ...toolsBookmarks,
  ...developmentBookmarks,
  ...blogsBookmarks,
] as const satisfies Bookmark[];

export {
  bookmarkCategories,
  bookmarks,
  bookmarksGroups,
  type Bookmark,
  type BookmarkCategory,
  type BookmarksGroups,
};
