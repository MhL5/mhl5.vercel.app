import {
  type AudioPlayerItem,
  useAudioPlayer,
} from "@/app/(with-navigation)/audio-player/audio-player/audio-player";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, PauseIcon, PlayIcon } from "lucide-react";
import type { ComponentProps } from "react";

type AudioPlayerButtonProps = ComponentProps<typeof Button> & {
  item?: AudioPlayerItem;
};

function AudioPlayerButton({ item, ...props }: AudioPlayerButtonProps) {
  const player = useAudioPlayer();

  if (!item)
    return (
      <PlayButton
        {...props}
        playing={player.isPlaying}
        onPlayingChange={(shouldPlay) =>
          shouldPlay ? player.play() : player.pause()
        }
        loading={player.isBuffering && player.isPlaying}
      />
    );

  return (
    <PlayButton
      {...props}
      playing={player.isItemActive(item.id) && player.isPlaying}
      onPlayingChange={(shouldPlay) =>
        shouldPlay ? player.play(item) : player.pause()
      }
      loading={
        player.isItemActive(item.id) && player.isBuffering && player.isPlaying
      }
    />
  );
}

type PlayButtonProps = ComponentProps<typeof Button> & {
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
  loading?: boolean;
};

function PlayButton({
  playing,
  onPlayingChange,
  className,
  onClick,
  loading,
  ...props
}: PlayButtonProps) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        onPlayingChange(!playing);
        onClick?.(e);
      }}
      className={cn("relative", className)}
      aria-label={playing ? "Pause" : "Play"}
      type="button"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin opacity-50" />
      ) : playing ? (
        <PauseIcon aria-hidden="true" />
      ) : (
        <PlayIcon aria-hidden="true" />
      )}
    </Button>
  );
}

export { AudioPlayerButton };
