"use client";

import { useEffect, useMemo, useState } from "react";

type Point = { x: number; y: number };

type Step = {
  hull: Point[];
  pivot?: Point;
  current?: Point;
};

function orientation(a: Point, b: Point, c: Point) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function distSq(a: Point, b: Point) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

function grahamScanSteps(points: Point[]): Step[] {
  const steps: Step[] = [];
  if (points.length < 3) return steps;

  const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
  const pivot = sorted[0];

  steps.push({ hull: [], pivot });

  const remaining = sorted.slice(1).sort((a, b) => {
    // @ts-expect-error todo: temp solution
    const o = orientation(pivot, a, b);
    // @ts-expect-error todo: temp solution
    if (o === 0) return distSq(pivot, a) - distSq(pivot, b);
    return -o;
  });

  const ordered = [pivot, ...remaining];
  const stack: Point[] = [];

  for (const p of ordered) {
    steps.push({ hull: [...stack], pivot, current: p });

    while (
      stack.length >= 2 &&
      // @ts-expect-error todo: temp solution
      orientation(stack[stack.length - 2], stack[stack.length - 1], p) <= 0
    ) {
      stack.pop();
      steps.push({ hull: [...stack], pivot, current: p });
    }

    // @ts-expect-error todo: temp solution
    stack.push(p);
    steps.push({ hull: [...stack], pivot, current: p });
  }

  return steps;
}

export default function GrahamScanVisualizer() {
  const [points, setPoints] = useState<Point[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [index, setIndex] = useState(0);

  const width = 560;
  const height = 420;
  const nodeSize = 14;
  const radius = nodeSize / 2;

  const currentStep = useMemo(
    () => steps[index] || { hull: [] },
    [index, steps],
  );

  const addPoint = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setPoints((prev) => [...prev, { x, y }]);
    setSteps([]);
    setIndex(0);
  };

  const run = () => {
    const s = grahamScanSteps(points);
    setSteps(s);
    setIndex(0);
  };

  useEffect(() => {
    if (!steps.length) return;
    if (index >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setIndex((i) => i + 1);
    }, 200);

    return () => clearTimeout(timer);
  }, [steps, index]);

  const hullSegments = useMemo(() => {
    const hull = currentStep.hull || [];
    const segments: Array<{ a: Point; b: Point }> = [];
    for (let i = 1; i < hull.length; i++) {
      // @ts-expect-error todo: temp solution
      segments.push({ a: hull[i - 1], b: hull[i] });
    }
    return segments;
  }, [currentStep]);

  const isSamePoint = (a?: Point, b?: Point) =>
    !!a && !!b && a.x === b.x && a.y === b.y;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Graham Scan Visualizer
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Click inside the box to add points, then press Run.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setPoints([]);
                setSteps([]);
                setIndex(0);
              }}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Clear
            </button>
            <button
              onClick={run}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Run
            </button>
          </div>
        </div>

        {/* Info tooltip / legend */}
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-semibold text-slate-900">
            Legend
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="h-3 w-3 rounded-full bg-blue-600" />
              <span>Normal point</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span>Pivot</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="h-3 w-3 rounded-full bg-yellow-400 ring-1 ring-yellow-500/40" />
              <span>Current point</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="h-3 w-3 rounded-full bg-red-600" />
              <span>Point in hull</span>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white"
          style={{ width, height }}
          onClick={addPoint}
        >
          {/* Single SVG layer for lines so connections are clean */}
          <svg
            width={width}
            height={height}
            className="absolute inset-0"
            viewBox={`0 0 ${width} ${height}`}
          >
            {hullSegments.map((seg, i) => (
              <line
                key={i}
                x1={seg.a.x}
                y1={seg.a.y}
                x2={seg.b.x}
                y2={seg.b.y}
                stroke="#dc2626"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Nodes */}
          {points.map((p, i) => {
            const isPivot = isSamePoint(currentStep.pivot, p);
            const isCurrent = isSamePoint(currentStep.current, p);
            const inHull = currentStep.hull?.some((h) => isSamePoint(h, p));

            let color = "bg-blue-600 border-blue-700 shadow-blue-200/60";

            if (inHull) {
              color = "bg-red-600 border-red-700 shadow-red-200/60";
            }
            if (isPivot) {
              color = "bg-green-500 border-green-700 shadow-green-200/60";
            }
            if (isCurrent) {
              color = "bg-yellow-400 border-yellow-500 shadow-yellow-200/60";
            }

            return (
              <div
                key={i}
                className={`absolute rounded-full border-2 shadow-md transition-all duration-300 ${color}`}
                style={{
                  width: nodeSize,
                  height: nodeSize,
                  left: p.x - radius,
                  top: p.y - radius,
                }}
              />
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-700">
            {steps.length === 0 ? (
              <span className="text-slate-600">
                Add at least 3 points to run the animation.
              </span>
            ) : (
              <span>
                Step <span className="text-slate-900">{index + 1}</span>
                {" / "}
                <span className="text-slate-900">{steps.length}</span>
              </span>
            )}
          </div>

          <div className="text-sm text-slate-500">
            {points.length} point{points.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>
    </div>
  );
}
