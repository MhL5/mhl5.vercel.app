import { useAudioPlayer } from "@/app/(with-navigation)/audio-player/audio-player/audio-player";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, SettingsIcon } from "lucide-react";
import type { ComponentProps } from "react";

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

type AudioPlayerSpeedDropdownProps = {
  speeds?: readonly number[];
} & ComponentProps<typeof Button>;

function AudioPlayerSpeedDropdown({
  speeds = PLAYBACK_SPEEDS,
  variant = "ghost",
  size = "icon",
  ...props
}: AudioPlayerSpeedDropdownProps) {
  const player = useAudioPlayer();
  const currentSpeed = player.playbackRate;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          aria-label="Playback speed"
          {...props}
        >
          <SettingsIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-30">
        {speeds.map((speed) => (
          <DropdownMenuItem
            key={speed}
            onClick={() => player.setPlaybackRate(speed)}
            className="flex items-center justify-between"
          >
            <span className={speed === 1 ? "" : "font-mono"}>
              {speed === 1 ? "Normal" : `${speed}x`}
            </span>
            {currentSpeed === speed && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { AudioPlayerSpeedDropdown };
