import Providers from "@/providers/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
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
  metadataBase: new URL("https://mhl5.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "MhL",
    template: "%s | MhL",
  },
  description:
    "a Software engineer passionate about building user-friendly and efficient web applications.",
  authors: [{ name: "Mohammad Lashani", url: "https://mhl5.vercel.app/" }],
  creator: "Mohammad Lashani",
  publisher: "Mohammad Lashani",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta
        name="google-site-verification"
        content="g7HzkDJ_qyLAOSKx-K1cerilM6AQwiMrEgROLkMDyLA"
      />
      <body
        className={`${spaceGrotesk.variable} ${figtree.variable} min-w-xs font-figtree antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
