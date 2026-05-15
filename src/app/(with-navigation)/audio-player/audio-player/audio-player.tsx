"use client";

import { NetworkState } from "@/app/(with-navigation)/audio-player/audio-player/constants/NetworkState";
import { ReadyState } from "@/app/(with-navigation)/audio-player/audio-player/constants/ReadyState";
import { useAnimationFrame } from "@/app/(with-navigation)/audio-player/audio-player/hooks/useAnimationFrame";
import {
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

type AudioPlayerItem = {
  id: string | number;
  src: string;
  data: {
    id: string;
    name: string;
    url: string;
  };
};

type AudioPlayerApi = {
  ref: RefObject<HTMLAudioElement | null>;
  activeItem: AudioPlayerItem | null;
  duration: number | undefined;
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

    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch (error) {
        toast.error(
          `Play promise error: ${error instanceof Error ? error?.message : "unknown error"}`,
        );
      }
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

    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch (error) {
        toast.error(
          error instanceof Error ? error?.message : "Pause: Unknown error",
        );
      }
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

  const isPlaying = !paused;
  const isBuffering =
    readyState < ReadyState.HAVE_FUTURE_DATA &&
    networkState === NetworkState.NETWORK_LOADING;

  return (
    <AudioPlayerContext.Provider
      value={{
        ref: audioRef,
        duration,
        error,
        isPlaying,
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
    </AudioPlayerContext.Provider>
  );
}

function useAudioPlayer(): AudioPlayerApi {
  const context = useContext(AudioPlayerContext);
  if (!context)
    throw new Error(
      "useAudioPlayer cannot be called outside of AudioPlayerProvider",
    );
  return context;
}

export { AudioPlayerProvider, useAudioPlayer, type AudioPlayerItem };
