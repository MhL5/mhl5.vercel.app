import Footer from "@/app/(with-navigation)/_components/Footer";
import Header from "@/app/(with-navigation)/_components/Header";
import type { ReactNode } from "react";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
