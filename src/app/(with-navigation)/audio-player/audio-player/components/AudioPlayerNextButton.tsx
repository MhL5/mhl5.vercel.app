"use client";

import { useAudioPlayer } from "@/app/(with-navigation)/audio-player/audio-player/audio-player";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

function AudioPlayerNextButton(props: ComponentProps<typeof Button>) {
  const { activeItem, playList, play } = useAudioPlayer();

  const currentIndex =
    activeItem && playList
      ? playList.findIndex((item) => item.id === activeItem.id)
      : -1;

  const hasNext =
    !!playList && currentIndex > -1 && currentIndex < playList.length - 1;

  function handleNext() {
    if (!hasNext || !playList || currentIndex === -1) return;
    const nextItem = playList[currentIndex + 1];
    play(nextItem);
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      disabled={!hasNext}
      onClick={handleNext}
      {...props}
    >
      {/* Replace with your icon, e.g. Lucide, Heroicons, etc. */}
      <span aria-hidden="true">⏭</span>
      <span className="sr-only">Next track</span>
    </Button>
  );
}

export { AudioPlayerNextButton };
