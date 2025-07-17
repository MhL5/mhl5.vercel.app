import Providers from "@/providers/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Figtree } from "next/font/google";

const nunito = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Figtree({
  subsets: ["latin"],
  variable: "--font-roboto",
  style: "normal",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // todo: env
  metadataBase: new URL("https://mhl5.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "MhL",
    template: "%s | MhL",
  },
  description:
    "I'm a software engineer with a passion for building products that help people live better lives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${roboto.variable} font-roboto min-w-xs antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
