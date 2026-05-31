"use client";

import { useAudioPlayer } from "@/app/(with-navigation)/audio-player/audio-player/audio-player";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

function AudioPlayerPreviousButton(props: ComponentProps<typeof Button>) {
  const { activeItem, playList, play } = useAudioPlayer();

  const currentIndex =
    activeItem && playList
      ? playList.findIndex((item) => item.id === activeItem.id)
      : -1;

  const hasPrevious = !!playList && currentIndex > 0;

  function handlePrevious() {
    if (!hasPrevious || !playList || currentIndex === -1) return;
    const prevItem = playList[currentIndex - 1];
    play(prevItem);
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      disabled={!hasPrevious}
      onClick={handlePrevious}
      {...props}
    >
      {/* Replace with your icon */}
      <span aria-hidden="true">⏮</span>
      <span className="sr-only">Previous track</span>
    </Button>
  );
}

export { AudioPlayerPreviousButton };
