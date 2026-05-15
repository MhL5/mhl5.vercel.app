"use client";

import { AudioPlayerDemo } from "@/app/(with-navigation)/audio-player/Demo";
import { exampleTracks } from "@/app/(with-navigation)/audio-player/audio-player/constants";

export default function Page() {
  async function handleClick() {}

  return (
    <section className="grid min-h-dvh w-full place-items-center">
      <div>
        <AudioPlayerDemo />
      </div>
    </section>
  );
}
