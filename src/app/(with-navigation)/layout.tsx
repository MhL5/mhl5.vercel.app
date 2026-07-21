import BottomNavigation from "@/app/(with-navigation)/_components/BottomNavigation";
import Footer from "@/app/(with-navigation)/_components/Footer";
import Header from "@/app/(with-navigation)/_components/Header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BottomNavigation />
    </>
  );
}
