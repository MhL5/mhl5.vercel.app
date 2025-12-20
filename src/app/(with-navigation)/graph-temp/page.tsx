import FastestRoute from "@/app/(with-navigation)/graph-temp/_components/fastest-route/FastestRoute";
import FriendRecommendation from "@/app/(with-navigation)/graph-temp/_components/friend-recommendation/FriendRecommendation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Graph",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 p-5">
      <FriendRecommendation />
      <FastestRoute />
    </div>
  );
}
