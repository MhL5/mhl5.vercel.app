import { useAudioPlayer } from "@/app/(with-navigation)/audio-player/audio-player/audio-player";
import { cn } from "@/lib/utils";
import { Slider as SliderPrimitive } from "radix-ui";
import { type ComponentProps, useRef } from "react";

function AudioPlayerProgress({
  onValueChange,
  className,
  step,
  onPointerDown,
  onPointerUp,
  onKeyDown,
  disabled,
  ...props
}: Omit<ComponentProps<typeof SliderPrimitive.Root>, "min" | "max" | "value">) {
  const player = useAudioPlayer();
  const wasPlayingRef = useRef(false);

  return (
    <SliderPrimitive.Root
      value={[player.time]}
      min={0}
      max={player.duration ?? 0}
      onValueChange={(vals) => {
        if (!vals?.[0]) return;

        player.seek(vals?.[0]);
        onValueChange?.(vals);
      }}
      step={step || 0.25}
      onPointerDown={(e) => {
        wasPlayingRef.current = player.isPlaying;
        player.pause();
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        if (wasPlayingRef.current) player.play();
        onPointerUp?.(e);
      }}
      className={cn(
        "group/player relative flex h-4 touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === " ") {
          e.preventDefault();
          if (!player.isPlaying) player.play();
          else player.pause();
        }
        onKeyDown?.(e);
      }}
      disabled={
        player.duration === undefined ||
        !Number.isFinite(player.duration) ||
        Number.isNaN(player.duration) ||
        disabled
      }
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="relative flex h-0 w-0 items-center justify-center opacity-0 group-hover/player:opacity-100 focus-visible:opacity-100 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        data-slot="slider-thumb"
      >
        <div className="absolute size-3 rounded-full bg-foreground" />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
}

export { AudioPlayerProgress };
