"use client";

import { AudioPlayerButton } from "@/app/(with-navigation)/audio-player/audio-player/components/AudioPlayerButton";
import { AudioPlayerDuration } from "@/app/(with-navigation)/audio-player/audio-player/components/AudioPlayerDuration";
import { AudioPlayerNextButton } from "@/app/(with-navigation)/audio-player/audio-player/components/AudioPlayerNextButton";
import { AudioPlayerPreviousButton } from "@/app/(with-navigation)/audio-player/audio-player/components/AudioPlayerPreviousButton";
import { AudioPlayerProgress } from "@/app/(with-navigation)/audio-player/audio-player/components/AudioPlayerProgress";
import { AudioPlayerSpeedDropdown } from "@/app/(with-navigation)/audio-player/audio-player/components/AudioPlayerSpeedDropdown";
import { AudioPlayerTime } from "@/app/(with-navigation)/audio-player/audio-player/components/AudioPlayerTime";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "lucide-react";

import {
  type AudioPlayerItem,
  AudioPlayerProvider,
  useAudioPlayer,
} from "./audio-player/audio-player";

const exampleTracks: AudioPlayerItem[] = [
  {
    id: "1",
    src: "/temp/2_5434098755836097144.mp3",
    data: {
      id: "1",
      title: "Midnight Echoes",
      artist: "Luna Wave",
      album: "Neon Nights",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/2_5434098755836097144.mp3",
    },
  },
  {
    id: "2",
    src: "/temp/4_5810181992242745544.mp3",
    data: {
      id: "2",
      title: "Electric Skyline",
      artist: "Synth Collective",
      album: "Future Vibes",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/4_5810181992242745544.mp3",
    },
  },
  {
    id: "3",
    src: "/temp/4_5818909872594360671.m4a",
    data: {
      id: "3",
      title: "Silent Forest",
      artist: "Nature Soundscapes",
      album: "Deep Sleep",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/4_5818909872594360671.m4a",
    },
  },
  {
    id: "4",
    src: "/temp/4_5855167973622290792.m4a",
    data: {
      id: "4",
      title: "Urban Pulse",
      artist: "City Beats",
      album: "Metro Rhythm",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/4_5855167973622290792.m4a",
    },
  },
  {
    id: "5",
    src: "/temp/4_5929176328921158771.mp3",
    data: {
      id: "5",
      title: "Ocean Waves",
      artist: "Zen Moods",
      album: "Calm Waters",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/4_5929176328921158771.mp3",
    },
  },
  {
    id: "6",
    src: "/temp/4_735364702485351829.mp3",
    data: {
      id: "6",
      title: "Desert Wind",
      artist: "Nomad Soul",
      album: "Sahara Dreams",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/4_735364702485351829.mp3",
    },
  },
  {
    id: "7",
    src: "/temp/NF_-_Remember_This.mp3",
    data: {
      id: "7",
      title: "Remember This",
      artist: "NF",
      album: "Perception",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/NF_-_Remember_This.mp3",
    },
  },
  {
    id: "8",
    src: "/temp/nf_chasing.mp3",
    data: {
      id: "8",
      title: "Chasing",
      artist: "NF",
      album: "Therapy Session",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/nf_chasing.mp3",
    },
  },
  {
    id: "9",
    src: "/temp/remix-rusi-.mp3",
    data: {
      id: "9",
      title: "Rusi Remix",
      artist: "DJ Aurora",
      album: "Late Night Cuts",
      artworkUrl: "https://picsum.photos/800/800.webp",
      url: "/temp/remix-rusi-.mp3",
    },
  },
];

export function AudioPlayerDemo() {
  return (
    <AudioPlayerProvider>
      <Content />
    </AudioPlayerProvider>
  );
}

const Content = () => {
  const player = useAudioPlayer();

  return (
    <Card className="@container grid max-h-120 w-full max-w-3xl grid-cols-[14rem_1fr] overflow-hidden p-0">
      <div className="flex h-full max-h-120 flex-col overflow-x-hidden overflow-y-auto bg-muted/50">
        {exampleTracks.map((song, index, playListArr) => (
          <SongListItem
            onClick={() => {
              player.setPlaylist(playListArr);
              player.play(song);
            }}
            key={song.id}
            song={song}
            trackNumber={index + 1}
          />
        ))}
      </div>

      <Player />
    </Card>
  );
};

const Player = () => {
  const player = useAudioPlayer();

  return (
    <div className="grid items-center p-4 sm:p-6">
      <header className="mb-4">
        <h3 className="text-base font-semibold sm:text-lg">
          {player.activeItem?.data?.title ?? "No track selected"}
        </h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={player.activeItem?.data.artworkUrl}
          alt=""
          width={200}
          height={200}
          className="max-h-60 w-full rounded-md object-cover"
        />
      </header>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <AudioPlayerButton
          variant="outline"
          size="default"
          className="h-12 w-12 shrink-0 sm:h-10 sm:w-10"
          disabled={!player.activeItem}
        />
        <AudioPlayerTime className="text-xs tabular-nums" />
        <AudioPlayerProgress className="min-w-40 flex-1" />
        <AudioPlayerDuration className="text-xs tabular-nums" />
        <AudioPlayerSpeedDropdown variant="ghost" size="icon" />
        <AudioPlayerPreviousButton />
        <AudioPlayerNextButton />
      </div>
    </div>
  );
};

const SongListItem = ({
  song,
  trackNumber,
  onClick,
}: {
  song: AudioPlayerItem;
  trackNumber: number;
  onClick: (track: AudioPlayerItem) => void;
}) => {
  const player = useAudioPlayer();
  const isActive = player.isItemActive(song.id);
  const isCurrentlyPlaying = isActive && player.isPlaying;

  return (
    <div className="group/song relative">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="sm"
        className={cn(
          "h-10 w-full justify-start px-3 font-normal sm:h-9 sm:px-2",
          isActive && "bg-secondary",
        )}
        onClick={() => onClick(song)}
      >
        <div className="flex w-full items-center gap-3">
          <div className="flex w-5 shrink-0 items-center justify-center">
            {isCurrentlyPlaying ? (
              <PauseIcon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
            ) : (
              <>
                <span className="text-sm text-muted-foreground/60 tabular-nums group-hover/song:invisible">
                  {trackNumber}
                </span>
                <PlayIcon className="invisible absolute h-4 w-4 group-hover/song:visible sm:h-3.5 sm:w-3.5" />
              </>
            )}
          </div>
          <span className="truncate text-left text-sm">{song.data.title}</span>
        </div>
      </Button>
    </div>
  );
};
