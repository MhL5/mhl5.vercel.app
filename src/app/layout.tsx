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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${figtree.variable} font-figtree min-w-xs antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
