"use client";

import { useEffect, useState } from "react";

type Step = {
  array: number[];
  comparing: number[];
  left: number[];
  right: number[];
  sorted: number[];
  message: string;
};

const SIZE = 20;

const randomArray = () =>
  Array.from({ length: SIZE }, () => Math.floor(Math.random() * 200) + 20);

function mergeSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];

  function mergeSort(array: number[], l: number, r: number) {
    if (l >= r) return;

    const mid = Math.floor((l + r) / 2);

    mergeSort(array, l, mid);
    mergeSort(array, mid + 1, r);

    merge(array, l, mid, r);
  }

  function merge(array: number[], l: number, m: number, r: number) {
    const left = array.slice(l, m + 1);
    const right = array.slice(m + 1, r + 1);

    let i = 0;
    let j = 0;
    let k = l;

    steps.push({
      array: [...array],
      comparing: [],
      left,
      right,
      sorted: [],
      message: "Merging two sorted halves",
    });

    while (i < left.length && j < right.length) {
      steps.push({
        array: [...array],
        comparing: [k],
        left,
        right,
        sorted: [],
        message: `Comparing ${left[i]} and ${right[j]}`,
      });

      // @ts-expect-error todo: temp solution
      if (left[i] <= right[j]) {
        // @ts-expect-error todo: temp solution
        array[k] = left[i];
        i++;
      } else {
        // @ts-expect-error todo: temp solution
        array[k] = right[j];
        j++;
      }

      steps.push({
        array: [...array],
        comparing: [k],
        left,
        right,
        sorted: array.slice(l, k + 1),
        message: `Placed ${array[k]} into sorted position`,
      });

      k++;
    }

    while (i < left.length) {
      // @ts-expect-error todo: temp solution
      array[k] = left[i];
      i++;

      steps.push({
        array: [...array],
        comparing: [k],
        left,
        right,
        sorted: array.slice(l, k + 1),
        message: `Adding remaining element ${array[k]}`,
      });

      k++;
    }

    while (j < right.length) {
      // @ts-expect-error todo: temp solution
      array[k] = right[j];
      j++;

      steps.push({
        array: [...array],
        comparing: [k],
        left,
        right,
        sorted: array.slice(l, k + 1),
        message: `Adding remaining element ${array[k]}`,
      });

      k++;
    }
  }

  mergeSort(arr, 0, arr.length - 1);
  return steps;
}

export default function MergeSortVisualizer() {
  const [array, setArray] = useState<number[]>(() => randomArray());
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [speed, setSpeed] = useState(400);

  const start = () => {
    const arr = [...array];
    const s = mergeSortSteps(arr);
    setSteps(s);
    setStepIndex(0);
  };

  useEffect(() => {
    if (steps.length === 0) return;

    if (stepIndex >= steps.length) return;

    const timer = setTimeout(() => {
      // @ts-expect-error todo: temp solution
      setArray(steps[stepIndex].array);
      setStepIndex((s) => s + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [stepIndex, steps, speed]);

  const current = steps[stepIndex] || {
    comparing: [],
    left: [],
    right: [],
    sorted: [],
    message: "",
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6">
      <h1 className="text-center text-3xl font-bold">Merge Sort Visualizer</h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setArray(randomArray())}
          className="rounded bg-blue-500 px-4 py-2"
        >
          New Array
        </button>

        <button onClick={start} className="rounded bg-green-500 px-4 py-2">
          Start
        </button>

        <input
          type="range"
          min="100"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      {/* Bars */}
      <div className="flex h-72 items-end border p-2 text-gray-800">
        {array.map((v, i) => {
          let color = "bg-blue-500";

          // @ts-expect-error todo: temp solution
          if (current.comparing.includes(i)) color = "bg-yellow-400";
          // @ts-expect-error todo: temp solution
          if (current.sorted.includes(v)) color = "bg-green-500";

          return (
            <div
              key={i}
              className={`mx-px flex-1 ${color}`}
              style={{ height: v }}
            />
          );
        })}
      </div>

      {/* Explanation */}
      <div className="rounded bg-gray-100 p-4 text-center text-gray-800">
        {current.message || "IDLE"}
      </div>

      {/* Subarrays */}
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <div className="rounded bg-purple-100 p-3">
          <h3 className="font-semibold">Left Subarray</h3>
          <div>{current.left.join(", ")}</div>
        </div>

        <div className="rounded bg-pink-100 p-3">
          <h3 className="font-semibold">Right Subarray</h3>
          <div>{current.right.join(", ")}</div>
        </div>
      </div>
    </div>
  );
}
