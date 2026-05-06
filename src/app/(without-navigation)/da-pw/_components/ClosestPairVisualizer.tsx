"use client";

import { type MouseEvent, useCallback, useEffect, useState } from "react";

// Types
type Point = {
  x: number;
  y: number;
};

type BestPair = {
  dist: number;
  p1: Point;
  p2: Point;
};

// Euclidean distance
const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

export default function ClosestPairVisualizer() {
  const [points, setPoints] = useState<Point[]>([
    { x: 50, y: 60 },
    { x: 150, y: 200 },
    { x: 220, y: 130 },
    { x: 80, y: 250 },
    { x: 260, y: 80 },
  ]);

  const [i, setI] = useState<number>(0);
  const [j, setJ] = useState<number>(1);
  const [best, setBest] = useState<BestPair | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Step logic
  const step = useCallback(() => {
    if (isFinished || points.length < 2) return;

    // Safety check
    if (!points[i] || !points[j]) return;

    const d = getDistance(points[i], points[j]);

    if (!best || d < best.dist) {
      setBest({ dist: d, p1: points[i], p2: points[j] });
    }

    // Move j forward
    if (j < points.length - 1) {
      setJ((prev) => prev + 1);
    }
    // Move to next i
    else if (i < points.length - 2) {
      setI((prev) => prev + 1);
      setJ(i + 2);
    }
    // Completely finished
    else {
      setIsFinished(true);
      setIsPlaying(false);
    }
  }, [i, j, points, best, isFinished]);

  // Auto-play loop
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying && !isFinished) {
      interval = setInterval(step, 50); // Fast playback
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isFinished, step]);

  // Reset system
  const reset = () => {
    setI(0);
    setJ(1);
    setBest(null);
    setIsFinished(false);
    setIsPlaying(false);
  };

  // Add point by clicking
  const addPoint = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => [...prev, { x, y }]);
    reset();
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border bg-slate-50 p-8 shadow-xl">
      <h2 className="mb-2 text-2xl font-extrabold text-slate-800">
        Closest Pair Visualizer
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        Brute Force: O(n²) Complexity
      </p>

      {/* Canvas Area */}
      <div
        className="relative size-87.5 cursor-crosshair overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white shadow-inner"
        onClick={addPoint}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {/* Currently checked pair */}
          {!isFinished && points[i] && points[j] && (
            <line
              x1={points[i].x}
              y1={points[i].y}
              x2={points[j].x}
              y2={points[j].y}
              stroke="#facc15"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}

          {/* Best pair */}
          {best && (
            <line
              x1={best.p1.x}
              y1={best.p1.y}
              x2={best.p2.x}
              y2={best.p2.y}
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Points */}
        {points.map((p, idx) => {
          const isCurrent = !isFinished && (idx === i || idx === j);
          const isBest = best && (p === best.p1 || p === best.p2);

          return (
            <div
              key={idx}
              className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 transition-all duration-200 ${
                isBest
                  ? "z-20 scale-125 border-green-700 bg-green-500"
                  : isCurrent
                    ? "z-10 scale-110 border-yellow-600 bg-yellow-400"
                    : "border-slate-400 bg-slate-300"
              }`}
              style={{ left: p.x, top: p.y }}
            >
              {isCurrent && (
                <div className="absolute inset-0 animate-ping rounded-full bg-yellow-400 opacity-75"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
        Click on canvas to add points
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={step}
          disabled={isFinished}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isFinished ? "Finished" : "Next Step"}
        </button>

        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          disabled={isFinished}
          className={`rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-md ${
            isPlaying
              ? "bg-red-500 hover:bg-red-600"
              : "bg-emerald-600 hover:bg-emerald-700"
          } disabled:opacity-50`}
        >
          {isPlaying ? "Pause" : "Auto Play"}
        </button>

        <button
          onClick={reset}
          className="rounded-lg bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300"
        >
          Reset
        </button>
      </div>

      {/* Info Panel */}
      <div className="mt-8 grid w-full grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Algorithm State
          </span>
          <span
            className={`text-sm font-bold ${
              isFinished ? "text-green-600" : "text-indigo-600"
            }`}
          >
            {isFinished ? "COMPLETED ✅" : `Checking Pair: (${i}, ${j})`}
          </span>
        </div>

        <div className="flex flex-col border-l pl-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Best Distance
          </span>
          <span className="text-sm font-bold text-slate-800">
            {best ? best.dist.toFixed(2) : "Calculating..."}
          </span>
        </div>
      </div>
    </div>
  );
}
