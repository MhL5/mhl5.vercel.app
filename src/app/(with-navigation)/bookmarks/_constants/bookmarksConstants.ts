import {
  Blocks,
  Book,
  Code2,
  Package,
  Palette,
  Shapes,
  Sparkles,
  Wrench,
} from "lucide-react";

// TODO: SKILLS https://github.com/BuilderIO/skills
// https://github.com/mattpocock/skills
// https://www.kolejain.com/
// https://jonas.io/
// https://unlayer.com/elements
// https://spell.sh/
// https://icons0.dev/
// https://ui.justinlevine.me/docs
/*
Todo: add these as well
https://ui.watermelon.sh/
https://beui.dev/
https://grootstudio.dev/
https://www.vengenceui.com/
https://www.kairoui.online/
*/
// Tools
// https://www.better-t-stack.dev/
// https://www.fonttrio.xyz/

/**
 * Categories are grouped in the sidebar by `group`.
 * `color`/`hoverColor` are written out in full so tailwind can pick them up.
 */
const bookmarkCategoryConfig = {
  ui: {
    label: "UI Libraries",
    group: "dev",
    icon: Package,
    color: "text-orange-600 hover:text-orange-600/90 dark:text-orange-400",
    hoverColor: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
  },
  blocks: {
    label: "Blocks & Templates",
    group: "dev",
    icon: Blocks,
    color: "text-amber-600 hover:text-amber-600/90 dark:text-amber-400",
    hoverColor: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
  },
  animation: {
    label: "Animation",
    group: "dev",
    icon: Sparkles,
    color: "text-pink-600 hover:text-pink-600/90 dark:text-pink-400",
    hoverColor: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
  },
  development: {
    label: "Development",
    group: "dev",
    icon: Code2,
    color: "text-blue-600 hover:text-blue-600/90 dark:text-blue-400",
    hoverColor: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  tools: {
    label: "Tools",
    group: "dev",
    icon: Wrench,
    color: "text-emerald-600 hover:text-emerald-600/90 dark:text-emerald-400",
    hoverColor:
      "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  icons: {
    label: "Icons",
    group: "design",
    icon: Shapes,
    color: "text-violet-600 hover:text-violet-600/90 dark:text-violet-400",
    hoverColor: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
  },
  design: {
    label: "Design & Inspiration",
    group: "design",
    icon: Palette,
    color: "text-purple-600 hover:text-purple-600/90 dark:text-purple-400",
    hoverColor: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
  },
  learning: {
    label: "Learning",
    group: "other",
    icon: Book,
    color: "text-green-600 hover:text-green-600/90 dark:text-green-400",
    hoverColor: "group-hover:text-green-600 dark:group-hover:text-green-400",
  },
} as const;

const bookmarkGroupConfig = {
  dev: { label: "Dev" },
  design: { label: "Design" },
  other: { label: "Other" },
} as const;

type BookmarkCategory = keyof typeof bookmarkCategoryConfig;
type BookmarkGroup = keyof typeof bookmarkGroupConfig;

type Bookmark = {
  title: string;
  description: string;
  url: `https://${string}`;
  category: BookmarkCategory;
  featured?: boolean;
  tags?: string[];
};

const toolsBookmarks: Bookmark[] = [
  {
    title: "The Open Agent Skills Ecosystem",
    description:
      "Skills are reusable capabilities for AI agents. Install them with a single command to enhance your agents with access to procedural knowledge.",
    url: "https://skills.sh",
    category: "tools",
    tags: ["ai", "agents", "skills"],
  },
  {
    title: "OG Image Generator",
    description:
      "Free Open Graph image generator for websites. Create beautiful social media preview images for your web pages.",
    url: "https://ogimage.click/",
    category: "tools",
    tags: ["og image", "seo", "social"],
  },
  {
    title: "Pattern Craft",
    description: "Craft Beautiful Patterns Backgrounds",
    url: "https://patterncraft.reactbd.com",
    category: "tools",
    tags: ["background", "css", "patterns"],
  },
  {
    title: "QuickPic",
    description: "A bunch of simple tools for images. All free. No BS.",
    url: "https://quickpic.t3.gg/",
    category: "tools",
    tags: ["images", "converter"],
  },
  {
    title: "tweakcn",
    description: "Design Your Perfect shadcn/ui Theme",
    url: "https://tweakcn.com/",
    category: "tools",
    tags: ["shadcn", "theme", "colors"],
  },
  {
    title: "Shadcn Form Builder",
    description: "Visual form builder and playground for shadcn/ui components.",
    url: "https://www.shadcn-form.com/",
    category: "tools",
    tags: ["shadcn", "forms", "generator"],
  },
  {
    title: "shoogle",
    description: "search shadcn blocks",
    url: "https://shoogle.dev",
    category: "tools",
    tags: ["shadcn", "search", "blocks"],
  },
];

const developmentBookmarks: Bookmark[] = [
  {
    title: "React doctor",
    description:
      "One command scans your codebase for security, performance, correctness, and architecture issues, then outputs a 0–100 score with actionable diagnostics.",
    url: "https://github.com/millionco/react-doctor",
    category: "development",
    tags: ["react", "audit", "cli"],
  },
  {
    title: "eslint-plugin-jsx-a11y",
    description:
      "Static AST checker for accessibility rules on JSX elements. Helps ensure your React applications are accessible to users with disabilities.",
    url: "https://www.npmjs.com/package/eslint-plugin-jsx-a11y",
    category: "development",
    tags: ["eslint", "accessibility"],
  },
  {
    title: "Unlighthouse",
    description:
      "Scan your entire website with Google Lighthouse - in 2 minutes. A powerful tool for automated Lighthouse auditing and performance analysis.",
    url: "https://next.unlighthouse.dev/",
    category: "development",
    tags: ["performance", "lighthouse", "audit"],
  },
  {
    title: "Guarahooks",
    description: "Hooks Library for Software Engineers",
    url: "https://guarahooks.com",
    category: "development",
    tags: ["react", "hooks"],
  },
];

const iconsBookmarks: Bookmark[] = [
  {
    title: "Simple Icons",
    description: "3334 SVG icons for popular brands",
    url: "https://simpleicons.org/",
    category: "icons",
    tags: ["svg", "brands"],
  },
  {
    title: "Hero Icons",
    description:
      "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.",
    url: "https://heroicons.com/",
    category: "icons",
    tags: ["svg", "tailwind"],
  },
  {
    title: "lucide",
    description: "Beautiful & consistent icons",
    url: "https://lucide.dev/",
    category: "icons",
    tags: ["svg", "react"],
  },
  {
    title: "Tabler Icons",
    description:
      "A complete icon set with perfect line weights and spacing - ready for Figma, apps, and design systems.",
    url: "https://tabler.io/icons",
    category: "icons",
    tags: ["svg", "figma"],
  },
  {
    title: "3d icons",
    description: "Beautifully Crafted Free & Premium 3D Icons",
    url: "https://3dicons.co/",
    category: "icons",
    tags: ["3d"],
  },
  {
    title: "Lucid animated",
    description:
      "an open-source (MIT License) collection of smooth animated icons for your projects. feel free to use them, share your feedback, and let's make this library awesome together,Crafted with Motion & Lucide",
    url: "https://lucide-animated.com/",
    category: "icons",
    tags: ["animated", "lucide", "motion"],
  },
];

const designBookmarks: Bookmark[] = [
  {
    title: "@optics/design-system",
    description:
      "More than just a design system. It's a collection of tools and resources that help build a more accessible, intuitive, and aesthetically pleasing web applications.",
    url: "https://optics.agusmayol.com.ar/",
    category: "design",
    tags: ["design system", "accessibility"],
  },
  {
    title: "Chánh Đại",
    description: "a Design Engineer, Creating with code. Small details matter.",
    url: "https://chanhdai.com/",
    category: "design",
    tags: ["portfolio", "inspiration"],
  },
  {
    title: "awards website",
    description: "",
    url: "https://www.awwwards.com/inspiration_search",
    category: "design",
    tags: ["inspiration", "awwwards"],
  },
];

const uiBookmarks: Bookmark[] = [
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
    featured: true,
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
    description: "Beautiful, responsive, customizable charts for your website.",
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
    description: "A pixel-perfect React component library for modern web apps",
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
].map((b) => ({ ...(b as Bookmark), category: "ui" }));

const blocksBookmarks: Bookmark[] = [
  {
    title: "shadcn blocks",
    description: "The ultimate block set for Shadcn UI & Tailwind.",
    url: "https://www.shadcnblocks.com",
    category: "blocks",
    tags: ["shadcn", "tailwind"],
  },
  {
    title: "shadcn design pro blocks",
    description: "The ultimate block set for Shadcn UI & Tailwind.",
    url: "https://www.shadcndesign.com/pro-blocks",
    category: "blocks",
    tags: ["shadcn", "pro"],
  },
  {
    title: "Shadcn Studio",
    description:
      "New 🎉 Dashboard & Marketing UI Blocks, AI Theme Generator, Shadcn MCP & more... 🪄 Build Futuristic UIs with Shadcn Blocks at Warp Speed",
    url: "https://shadcnstudio.com/",
    category: "blocks",
    tags: ["shadcn", "dashboard", "marketing"],
  },
  {
    title: "shadcnspace",
    description: "Extraordinary Shadcn UI blocks, components, and templates",
    url: "https://shadcnspace.com/components/badge",
    category: "blocks",
    tags: ["shadcn", "templates"],
  },
  {
    title: "shadcn ui kit",
    description: "Build faster with pre-built assets using the Shadcn UI Kit",
    url: "https://shadcnuikit.com/",
    category: "blocks",
    tags: ["shadcn", "dashboard"],
  },
  {
    title: "Efferd",
    description: "Beautiful Shadcn Blocks.",
    url: "https://efferd.com",
    category: "blocks",
    tags: ["shadcn"],
  },
  {
    title: "Blocks.so",
    description:
      "Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.",
    url: "https://blocks.so/",
    category: "blocks",
    tags: ["open source"],
  },
  {
    title: "Solace UI",
    description:
      "Production-ready sections, animated components, and full-page templates for Next.js, Tailwind CSS & Framer Motion",
    url: "https://www.solaceui.com/",
    category: "blocks",
    tags: ["templates", "next.js"],
  },
  {
    title: "Square Ui",
    description:
      "Collection of beautifully crafted open-source layouts UI built with shadcn/ui.",
    url: "https://square.lndev.me/",
    category: "blocks",
    tags: ["shadcn", "layouts"],
  },
  {
    title: "ui layouts",
    description:
      "Beautifully designed sections you can copy and paste straight into your apps. Creatively crafted with Tailwind CSS and shadcn/ui, these blocks are built for real-world React and Next.js projects",
    url: "https://www.ui-layouts.com/blocks",
    category: "blocks",
    tags: ["shadcn", "sections"],
  },
  {
    title: "tailark",
    description:
      "Modern, Responsive, pre-built UI blocks designed for marketing websites.",
    url: "https://tailark.com/",
    category: "blocks",
    tags: ["marketing", "landing page"],
  },
  {
    title: "MVP Blocks",
    description: "Prebuilt UI Logo blocks to ship beautiful MVPs fast",
    url: "https://blocks.mvp-subha.me/",
    category: "blocks",
    tags: ["mvp", "landing page"],
  },
  {
    title: "EldoraUI BentoGrid",
    description: "Bento grid components and layouts for modern web design.",
    url: "https://www.eldoraui.site/",
    category: "blocks",
    tags: ["bento", "grid"],
  },
  {
    title: "components.work",
    description: "collection of different blocks",
    url: "https://components.work/",
    category: "blocks",
    tags: ["sections", "copy paste"],
  },
];

const animationBookmarks: Bookmark[] = [
  {
    featured: true,
    title: "Aceternity UI",
    description: "Beautiful and modern UI components built with Tailwind CSS.",
    url: "https://ui.aceternity.com/",
    category: "animation",
    tags: ["motion", "tailwind"],
  },
  {
    featured: true,
    title: "MagicUI",
    description: "Collection of magical UI components and effects.",
    url: "https://magicui.design/",
    category: "animation",
    tags: ["motion", "effects"],
  },
  {
    featured: true,
    title: "react bits",
    description: "animated react components for creative developers",
    url: "https://reactbits.dev",
    category: "animation",
    tags: ["motion", "creative"],
  },
  {
    title: "Motion Primitives",
    description:
      "Animation primitives and components for modern web applications.",
    url: "https://motion-primitives.com/",
    category: "animation",
    tags: ["motion", "primitives"],
  },
  {
    title: "Animate UI",
    description:
      "A fully animated, open-source React component distribution. Browse a list of animated primitives, components and icons you can install and use in your projects.",
    url: "https://animate-ui.com/",
    category: "animation",
    tags: ["motion", "registry"],
  },
  {
    title: "Animata Design",
    description:
      "Hand-crafted ✍️ interaction animations and effects from around the internet 🛜 to copy and paste into your project.",
    url: "https://animata.design/",
    category: "animation",
    tags: ["micro interactions", "effects"],
  },
  {
    title: "Fancy Components",
    description:
      "with a growing library of ready-to-use react components & micro interactions. free & open source.. very good documentation",
    url: "https://www.fancycomponents.dev/",
    category: "animation",
    tags: ["micro interactions", "motion"],
  },
  {
    title: "useLayouts",
    description: "A micro-interaction UI library for professionals.",
    url: "https://uselayouts.com",
    category: "animation",
    tags: ["micro interactions"],
  },
  {
    title: "Badtz UI",
    description:
      "An open-source React UI library with production-ready animations. Weekly updates. Built with React, Tailwind, TypeScript & JavaScript.",
    url: "https://www.badtz-ui.com/",
    category: "animation",
    tags: ["motion", "tailwind"],
  },
];

const learningBookmarks: Bookmark[] = [
  {
    title: "conventional Git Commits",
    description:
      "The Conventional Commits specification is a lightweight convention on top of commit messages. ",
    url: "https://www.conventionalcommits.org/en/v1.0.0/#summary",
    category: "learning",
    tags: ["git", "conventions"],
  },
  {
    title: "TkDodo's blog",
    description: "TkDodo's blog, the maintainer of tanstack query",
    url: "https://tkdodo.eu/blog",
    category: "learning",
    tags: ["react", "react query", "blog"],
  },
  {
    title: "Stay up-to-date on Next.js",
    description:
      "A weekly newsletter with the most interesting Next.js News, Tutorials, Projects, and Tools. The easiest way to keep up with what’s happening in the ecosystem.",
    url: "https://nextjsweekly.com/",
    category: "learning",
    tags: ["next.js", "newsletter"],
  },
  {
    title: "next seo",
    description:
      "Next SEO is a plug in that makes managing your SEO easier in Next.js projects.",
    url: "https://github.com/garmeeh/next-seo/tree/main",
    category: "learning",
    tags: ["next.js", "seo"],
  },
  {
    title: "Build UI Recipes",
    description: "Recipes for building UI ",
    url: "https://buildui.com/recipes",
    category: "learning",
    tags: ["react", "recipes"],
  },
];

const allBookmarks: Bookmark[] = [
  ...uiBookmarks,
  ...blocksBookmarks,
  ...animationBookmarks,
  ...developmentBookmarks,
  ...toolsBookmarks,
  ...iconsBookmarks,
  ...designBookmarks,
  ...learningBookmarks,
];

const bookmarkCategories = Object.keys(
  bookmarkCategoryConfig,
) as BookmarkCategory[];

function getBookmarkHostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function getBookmarkFaviconUrl(url: string) {
  return `https://www.google.com/s2/favicons?domain=${getBookmarkHostname(url)}&sz=64`;
}

export {
  type BookmarkCategory,
  type Bookmark,
  type BookmarkGroup,
  getBookmarkFaviconUrl,
  getBookmarkHostname,
  bookmarkCategories,
  allBookmarks,
  bookmarkGroupConfig,
  bookmarkCategoryConfig,
};
