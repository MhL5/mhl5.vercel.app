import { useAudioPlayer } from "@/app/(with-navigation)/audio-player/audio-player/audio-player";
import { formatTime } from "@/app/(with-navigation)/audio-player/audio-player/utils/formatTime";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AudioPlayerTimeProps = ComponentProps<"span">;

function AudioPlayerTime({ className, ...otherProps }: AudioPlayerTimeProps) {
  const { time } = useAudioPlayer();

  return (
    <span
      {...otherProps}
      className={cn("text-sm text-muted-foreground tabular-nums", className)}
    >
      {formatTime(time)}
    </span>
  );
}

export { AudioPlayerTime };
