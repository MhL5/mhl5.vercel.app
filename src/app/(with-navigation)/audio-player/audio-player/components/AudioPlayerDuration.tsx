import { useAudioPlayer } from "@/app/(with-navigation)/audio-player/audio-player/audio-player";
import { formatTime } from "@/app/(with-navigation)/audio-player/audio-player/utils/formatTime";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AudioPlayerDurationProps = ComponentProps<"span">;

function AudioPlayerDuration({
  className,
  ...otherProps
}: AudioPlayerDurationProps) {
  const player = useAudioPlayer();

  return (
    <span
      {...otherProps}
      className={cn("text-sm text-muted-foreground tabular-nums", className)}
    >
      {player.duration !== null &&
      player.duration !== undefined &&
      !Number.isNaN(player.duration)
        ? formatTime(player.duration)
        : "--:--"}
    </span>
  );
}

export { AudioPlayerDuration };
