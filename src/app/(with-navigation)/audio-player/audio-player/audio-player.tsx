"use client";

import { NetworkState } from "@/app/(with-navigation)/audio-player/audio-player/constants/NetworkState";
import { ReadyState } from "@/app/(with-navigation)/audio-player/audio-player/constants/ReadyState";
import { useAnimationFrame } from "@/app/(with-navigation)/audio-player/audio-player/hooks/useAnimationFrame";
import {
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  createContext,
  use,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

type AudioPlayerItem = {
  id: string | number;
  src: string;
  data: {
    id: string; // track id (can mirror `id`)
    title: string; // title for Media Session
    artist: string; // artist name
    album?: string; // optional album name
    artworkUrl?: string; // optional artwork URL
    url: string; // canonical URL to this track (e.g., page or file)
  };
};

type AudioPlayerApi = {
  ref: RefObject<HTMLAudioElement | null>;
  activeItem: AudioPlayerItem | null;
  duration: number | undefined;
  playList: AudioPlayerItem[] | null; // Added
  setPlaylist: Dispatch<SetStateAction<AudioPlayerItem[] | null>>; // Added
  error: MediaError | null;
  isPlaying: boolean;
  isBuffering: boolean;
  playbackRate: number;
  isItemActive: (id: string | number | null) => boolean;
  setActiveItem: (item: AudioPlayerItem | null) => Promise<void>;
  play: (item?: AudioPlayerItem | null) => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  time: number;
};

const AudioPlayerContext = createContext<AudioPlayerApi | null>(null);

function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [playList, setPlaylist] = useState<AudioPlayerItem[] | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const itemRef = useRef<AudioPlayerItem | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [readyState, setReadyState] = useState<number>(0);
  const [networkState, setNetworkState] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [error, setError] = useState<MediaError | null>(null);
  const [activeItem, _setActiveItem] = useState<AudioPlayerItem | null>(null);
  const [paused, setPaused] = useState(true);
  const [playbackRate, setPlaybackRateState] = useState<number>(1);

  const isPlaying = !paused;
  const isBuffering =
    readyState < ReadyState.HAVE_FUTURE_DATA &&
    networkState === NetworkState.NETWORK_LOADING;

  async function setActiveItem(item: AudioPlayerItem | null) {
    if (!audioRef.current) return;

    if (item?.id === itemRef.current?.id) return;

    itemRef.current = item;
    const currentRate = audioRef.current.playbackRate;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (item === null) audioRef.current.removeAttribute("src");
    else audioRef.current.src = item.src;

    audioRef.current.load();
    audioRef.current.playbackRate = currentRate;
  }

  async function play(item?: AudioPlayerItem | null) {
    if (!audioRef.current) return;

    if (playPromiseRef.current)
      try {
        await playPromiseRef.current;
      } catch (error) {
        toast.error(
          `Play promise error: ${error instanceof Error ? error?.message : "unknown error"}`,
        );
      }

    if (item === undefined) {
      const playPromise = audioRef.current.play();
      playPromiseRef.current = playPromise;
      return playPromise;
    }
    if (item?.id === activeItem?.id) {
      const playPromise = audioRef.current.play();
      playPromiseRef.current = playPromise;
      return playPromise;
    }

    itemRef.current = item;
    const currentRate = audioRef.current.playbackRate;

    if (!audioRef.current.paused) audioRef.current.pause();

    audioRef.current.currentTime = 0;

    if (item === null) audioRef.current.removeAttribute("src");
    else audioRef.current.src = item.src;

    audioRef.current.load();
    audioRef.current.playbackRate = currentRate;
    const playPromise = audioRef.current.play();
    playPromiseRef.current = playPromise;
    return playPromise;
  }

  async function pause() {
    if (!audioRef.current) return;

    if (playPromiseRef.current)
      try {
        await playPromiseRef.current;
      } catch (error) {
        toast.error(
          error instanceof Error ? error?.message : "Pause: Unknown error",
        );
      }

    audioRef.current.pause();
    playPromiseRef.current = null;
  }

  function seek(time: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  }

  function setPlaybackRate(rate: number) {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRateState(rate);
  }

  function isItemActive(id: string | number | null) {
    return activeItem?.id === id;
  }

  useAnimationFrame(() => {
    if (!audioRef.current) return;

    _setActiveItem(itemRef.current);
    setReadyState(audioRef.current.readyState);
    setNetworkState(audioRef.current.networkState);
    setTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
    setPaused(audioRef.current.paused);
    setError(audioRef.current.error);
    setPlaybackRateState(audioRef.current.playbackRate);
  });

  const onPlayEffectEvent = useEffectEvent((audio?: AudioPlayerItem) => {
    if (audio) play(audio);
    else play();
  });

  useEffect(() => {
    if (!("mediaSession" in navigator) || !activeItem || !playList) return;

    if (!activeItem) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = "none";
      return;
    }

    const { title, artist, album, artworkUrl } = activeItem.data;

    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album,
      artwork: artworkUrl
        ? [
            {
              src: artworkUrl,
              sizes: "512x512",
              type: "image/png",
            },
          ]
        : [],
    });

    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

    navigator.mediaSession.setActionHandler("play", () => onPlayEffectEvent());
    navigator.mediaSession.setActionHandler("pause", () => pause());

    const currentIndex = playList.findIndex(
      (item) => item.id === activeItem.id,
    );

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      if (currentIndex < playList.length - 1)
        onPlayEffectEvent(playList[currentIndex + 1]);
      else navigator.mediaSession.setActionHandler("nexttrack", null);
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      if (currentIndex > 0) onPlayEffectEvent(playList[currentIndex - 1]);
      else navigator.mediaSession.setActionHandler("previoustrack", null);
    });
  }, [activeItem, playList, isPlaying]);

  return (
    <AudioPlayerContext
      value={{
        ref: audioRef,
        duration,
        error,
        isPlaying,
        playList,
        setPlaylist,
        isBuffering,
        activeItem,
        playbackRate,
        isItemActive,
        setActiveItem,
        play,
        pause,
        seek,
        setPlaybackRate,
        time,
      }}
    >
      <audio ref={audioRef} className="hidden" crossOrigin="anonymous" />
      {children}
    </AudioPlayerContext>
  );
}

function useAudioPlayer(): AudioPlayerApi {
  const context = use(AudioPlayerContext);
  if (!context)
    throw new Error(
      "useAudioPlayer cannot be called outside of AudioPlayerProvider",
    );
  return context;
}

export { AudioPlayerProvider, useAudioPlayer, type AudioPlayerItem };
