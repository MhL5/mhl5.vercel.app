"use client";

import ClosestPairVisualizer from "@/app/(without-navigation)/da-pw/_components/ClosestPairVisualizer";
import GrahamScanVisualizer from "@/app/(without-navigation)/da-pw/_components/GrahamScanVisualizer";
import JarvisMarchVisualizer from "@/app/(without-navigation)/da-pw/_components/JarvisMarchVisualizer";
import LineSweepVisualizer from "@/app/(without-navigation)/da-pw/_components/LineSweepVisualizer";
import MergeSortVisualizer from "@/app/(without-navigation)/da-pw/_components/MergeSortVisualizer";
import ClientOnly from "@/components/utils/ClientOnly";

export default function Page() {
  return (
    <section className="grid min-h-dvh w-full place-items-center">
      <div className="grid gap-24 pt-20 pb-50">
        <ClientOnly>
          <ClosestPairVisualizer />

          <LineSweepVisualizer />

          <MergeSortVisualizer />

          <GrahamScanVisualizer />

          <JarvisMarchVisualizer />
        </ClientOnly>
      </div>
    </section>
  );
}
