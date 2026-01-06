import Providers from "@/providers/Providers";
import "@/styles/globals.css";
import { domainUrl } from "@/utils/absoluteUrl";
import type { Metadata } from "next";
import localFont from "next/font/local";

const figtree = localFont({
  src: "../assets/fonts/Figtree/Figtree-VariableFont_wght.ttf",
  variable: "--font-figtree",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../assets/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(domainUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "MhL",
    template: "%s | MhL",
  },
  description:
    "Mohammad Lashani - Software engineer passionate about building user-friendly and efficient web applications. Explore my portfolio, code snippets, and technical insights.",
  keywords: [
    "Mohammad Lashani",
    "React",
    "Next.js",
    "MhL5",
    "MhL5 portfolio",
    "MhL5 snippets",
    "Mohammad lashani portfolio",
    "Mohammad lashani snippets",
    "Mohammad lashani code snippets",
    "Mohammad lashani code snippets collection",
    "محمد لشنی",
    "محمد حسین لشنی",
    "کدهای MhL5",
  ],
  authors: [
    { name: "Mohammad Lashani", url: domainUrl },
    {
      name: "محمد لشنی",
      url: domainUrl,
    },
  ],
  creator: "Mohammad Lashani",
  publisher: "Mohammad Lashani",
  verification: {
    google: "g7HzkDJ_qyLAOSKx-K1cerilM6AQwiMrEgROLkMDyLA",
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${figtree.variable} min-w-xs font-figtree antialiased`}
      >
        <div className="fixed inset-0 -z-10 h-full w-full dark:bg-[radial-gradient(125%_125%_at_50%_100%,var(--background)_40%,#010133_100%)]" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
