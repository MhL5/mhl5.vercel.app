import { type MouseEvent, useEffect, useState } from "react";

type Point = { x: number; y: number };

type Step = {
  hull: Point[];
  current?: Point;
  checking?: Point;
  pivot?: Point;
};

function orientation(a: Point, b: Point, c: Point) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function leftmostPoint(points: Point[]) {
  return points.reduce((min, p) => (p.x < min.x ? p : min));
}

function jarvisMarchSteps(points: Point[]): Step[] {
  const steps: Step[] = [];
  if (points.length < 3) return steps;

  const hull: Point[] = [];
  let current = leftmostPoint(points);

  steps.push({ hull: [], current, pivot: current });

  while (true) {
    hull.push(current);

    // Start by assuming next point after current is the candidate
    let next = points[0] === current ? points[1] : points[0];

    for (const p of points) {
      if (p === current || p === next) continue;

      steps.push({
        hull: [...hull],
        current,
        checking: p,
        pivot: hull[0],
      });

      // If p is more counter‑clockwise, choose it
      // @ts-expect-error todo: temp solution
      if (orientation(current, next, p) < 0) {
        next = p;
        steps.push({
          hull: [...hull],
          current,
          checking: p,
          pivot: hull[0],
        });
      }
    }
    // @ts-expect-error todo: temp solution
    current = next;

    steps.push({
      hull: [...hull],
      current,
      pivot: hull[0],
    });

    if (current === hull[0]) break; // wrapped back
  }

  return steps;
}

export default function JarvisMarchVisualizer() {
  const [points, setPoints] = useState<Point[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [index, setIndex] = useState(0);

  const width = 560;
  const height = 420;

  const step = steps[index] || {};

  const addPoint = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    // @ts-expect-error todo: temp solution
    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setPoints((p) => [...p, { x, y }]);
    setSteps([]);
    setIndex(0);
  };

  const run = () => {
    const s = jarvisMarchSteps(points);
    setSteps(s);
    setIndex(0);
  };

  // Auto animation
  useEffect(() => {
    if (!steps.length) return;
    if (index >= steps.length - 1) return;

    const t = setTimeout(() => setIndex(index + 1), 150);
    return () => clearTimeout(t);
  }, [steps, index]);

  const isSame = (a?: Point, b?: Point) =>
    !!a && !!b && a.x === b.x && a.y === b.y;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Jarvis March Visualizer (Auto Run)
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setPoints([]);
                setSteps([]);
              }}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-white"
            >
              Clear
            </button>

            <button
              onClick={run}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white"
            >
              Run
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 rounded-xl border bg-white p-4 text-sm">
          <div className="mb-2 font-semibold text-slate-900">Legend</div>
          <div className="grid grid-cols-2 gap-2 text-slate-700 sm:grid-cols-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600" />
              Normal point
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              Pivot (start)
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              Current hull point
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-pink-500" />
              Checking point
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div
          className="relative overflow-hidden rounded-2xl border bg-white"
          style={{ width, height }}
          // @ts-expect-error todo: temp solution
          onClick={addPoint}
        >
          <svg
            className="absolute inset-0"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
          >
            {/* Draw hull edges */}
            {/*  @ts-expect-error todo: temp solution */}
            {step.hull &&
              // @ts-expect-error todo: temp solution
              step.hull.map((p, i) => {
                if (i === 0) return null;
                // @ts-expect-error todo: temp solution
                const prev = step.hull[i - 1];
                return (
                  <line
                    key={i}
                    x1={prev.x}
                    y1={prev.y}
                    x2={p.x}
                    y2={p.y}
                    stroke="red"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
          </svg>

          {/* Draw points */}
          {points.map((p, i) => {
            // @ts-expect-error todo: temp solution
            const isPivot = isSame(step.pivot, p);
            // @ts-expect-error todo: temp solution
            const isCurrent = isSame(step.current, p);
            // @ts-expect-error todo: temp solution
            const isChecking = isSame(step.checking, p);
            // @ts-expect-error todo: temp solution
            const inHull = step.hull?.some((h) => isSame(h, p));

            let color = "bg-blue-600 border-blue-800";

            if (isPivot) color = "bg-green-500 border-green-700";
            else if (isCurrent) color = "bg-yellow-400 border-yellow-600";
            else if (isChecking) color = "bg-pink-500 border-pink-700";
            else if (inHull) color = "bg-red-600 border-red-800";

            return (
              <div
                key={i}
                className={`absolute rounded-full border-2 ${color}`}
                style={{
                  width: 14,
                  height: 14,
                  left: p.x - 7,
                  top: p.y - 7,
                }}
              />
            );
          })}
        </div>

        <div className="mt-4 text-sm text-slate-700">
          {steps.length
            ? `Step ${index + 1} / ${steps.length}`
            : "Click inside the area to add points → Press Run"}
        </div>
      </div>
    </div>
  );
}
