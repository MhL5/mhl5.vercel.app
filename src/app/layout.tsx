import type { Metadata } from "next";
import { frontendDomain } from "@/constants/constants";
import Providers from "@/providers/Providers";
import "@/styles/globals.css";
import localFont from "next/font/local";

const figtree = localFont({
  src: "./fonts/Figtree/Figtree-VariableFont_wght.ttf",
  variable: "--font-figtree",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(frontendDomain),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "MhL - Software Engineer Portfolio",
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
    { name: "Mohammad Lashani", url: frontendDomain },
    {
      name: "محمد لشنی",
      url: frontendDomain,
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${figtree.variable} min-w-xs font-figtree antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
