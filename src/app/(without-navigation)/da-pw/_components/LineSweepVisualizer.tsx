"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Reservation = {
  id: number;
  room: string;
  start: number; // minutes from 0..DAY_MIN
  end: number; // minutes from 0..DAY_MIN
};

const DAY_MIN = 12 * 60; // 12h window
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function mmToTime(mm: number) {
  const h = Math.floor(mm / 60);
  const m = mm % 60;
  const hh = String(h).padStart(2, "0");
  const mm2 = String(m).padStart(2, "0");
  return `${hh}:${mm2}`;
}

function timeToMm(s: string) {
  const [hh, mm] = s.split(":").map(Number);
  // @ts-expect-error todo: temp solution
  return hh * 60 + mm;
}

function round15(mm: number) {
  return Math.round(mm / 15) * 15;
}

function niceTicks(totalMin: number) {
  // every hour major tick
  const ticks: number[] = [];
  for (let t = 0; t <= totalMin; t += 60) ticks.push(t);
  return ticks;
}

function overlap(a: Reservation, b: Reservation) {
  // half-open intervals [start, end)
  return a.start < b.end && b.start < a.end;
}

export default function ReservationSweepVisualizer() {
  const width = 860;
  const laneHeight = 44;

  const [reservations, setReservations] = useState<Reservation[]>([
    { id: 1, room: "Room A", start: timeToMm("01:00"), end: timeToMm("03:30") },
    { id: 2, room: "Room B", start: timeToMm("02:00"), end: timeToMm("05:00") },
    { id: 3, room: "Room C", start: timeToMm("04:15"), end: timeToMm("06:00") },
    { id: 4, room: "Room D", start: timeToMm("04:45"), end: timeToMm("07:30") },
  ]);

  const rooms = useMemo(() => {
    const uniq = Array.from(new Set(reservations.map((r) => r.room)));
    return uniq.length ? uniq : ["Room A"];
  }, [reservations]);

  const height = useMemo(() => rooms.length * laneHeight + 56, [rooms.length]);

  const [sweepMin, setSweepMin] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(4); // minutes per tick
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // add-with-drag state
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [draft, setDraft] = useState<{
    room: string;
    start: number;
    end: number;
    active: boolean;
  } | null>(null);

  const pxPerMin = width / DAY_MIN;
  const sweepX = sweepMin * pxPerMin;

  const active = useMemo(() => {
    // half-open [start,end) so end exactly at sweep is considered inactive
    return reservations.filter((r) => r.start <= sweepMin && sweepMin < r.end);
  }, [reservations, sweepMin]);

  const conflictsAtSweep = useMemo(() => {
    // any overlaps among active reservations (usually across rooms this is okay,
    // but this highlights simultaneous load)
    const pairs: Array<[Reservation, Reservation]> = [];
    for (let i = 0; i < active.length; i++) {
      for (let j = i + 1; j < active.length; j++) {
        // @ts-expect-error todo: temp solution
        if (overlap(active[i], active[j])) pairs.push([active[i], active[j]]);
      }
    }
    return pairs;
  }, [active]);

  const events = useMemo(() => {
    // sweep line concept: sorted events
    const ev = reservations.flatMap((r) => [
      { t: r.start, kind: "start" as const, r },
      { t: r.end, kind: "end" as const, r },
    ]);
    ev.sort((a, b) => a.t - b.t || (a.kind === "end" ? -1 : 1)); // end before start at same time
    return ev;
  }, [reservations]);

  const nearestEvents = useMemo(() => {
    const prev = [...events].reverse().find((e) => e.t <= sweepMin);
    const next = events.find((e) => e.t > sweepMin);
    return { prev, next };
  }, [events, sweepMin]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setSweepMin((prev) => {
        const next = prev + speed;
        if (next >= DAY_MIN) {
          setIsPlaying(false);
          return DAY_MIN;
        }
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [isPlaying, speed]);

  function xToMin(clientX: number) {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const x = clamp(clientX - rect.left, 0, width);
    return round15(Math.round((x / width) * DAY_MIN));
  }

  function laneFromClientY(clientY: number) {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return rooms[0];
    const y = clientY - rect.top - 44; // offset due to header area inside board
    const idx = clamp(Math.floor(y / laneHeight), 0, rooms.length - 1);
    return rooms[idx];
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // click/drag to create reservation
    if (!boardRef.current) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);

    const start = xToMin(e.clientX);
    const room = laneFromClientY(e.clientY);

    if (room) setDraft({ room, start, end: start, active: true });
    setSelectedId(null);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draft?.active) return;
    const end = xToMin(e.clientX);
    setDraft((d) => (d ? { ...d, end } : d));
  }

  function onPointerUp() {
    if (!draft?.active) return;

    const a = draft.start;
    const b = draft.end;
    const start = Math.min(a, b);
    const end = Math.max(a, b);

    setDraft(null);

    if (end - start < 15) return; // too small
    const id = Date.now();

    setReservations((prev) => [...prev, { id, room: draft.room, start, end }]);
    setSelectedId(id);
  }

  function removeSelected() {
    if (selectedId == null) return;
    setReservations((prev) => prev.filter((r) => r.id !== selectedId));
    setSelectedId(null);
  }

  const ticks = niceTicks(DAY_MIN);

  const selected = selectedId
    ? (reservations.find((r) => r.id === selectedId) ?? null)
    : null;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border bg-slate-50 p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Room Reservations — Line Sweep Timeline
          </h2>
          <p className="text-sm text-slate-600">
            Drag on a room lane to create a reservation. The red vertical line
            is the sweep position (current time).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={() => setSweepMin((m) => clamp(m - 30, 0, DAY_MIN))}
            className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
          >
            −30m
          </button>
          <button
            onClick={() => setSweepMin((m) => clamp(m + 30, 0, DAY_MIN))}
            className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
          >
            +30m
          </button>

          <div className="ml-1 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
            <span className="text-slate-500">Speed</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm"
            >
              <option value={1}>1 min/tick</option>
              <option value={2}>2 min/tick</option>
              <option value={4}>4 min/tick</option>
              <option value={8}>8 min/tick</option>
              <option value={15}>15 min/tick</option>
            </select>
          </div>

          <button
            onClick={() => {
              setIsPlaying(false);
              setSweepMin(0);
              setSelectedId(null);
              setReservations([]);
            }}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
          >
            Reset
          </button>
        </div>
      </div>

      {/* status bar */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Sweep time
          </div>
          <div className="mt-1 text-2xl font-bold text-slate-900">
            {mmToTime(sweepMin)}
          </div>
          <input
            type="range"
            min={0}
            max={DAY_MIN}
            step={15}
            value={sweepMin}
            onChange={(e) => setSweepMin(Number(e.target.value))}
            className="mt-3 w-full"
          />
          <div className="mt-1 text-xs text-slate-500">
            Tip: the range slider jumps in 15-minute steps.
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Active rooms at sweep
          </div>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div className="text-3xl font-bold text-amber-600">
              {active.length}
            </div>
            <div className="text-xs text-slate-500">
              {active.length
                ? active.map((r) => r.room).join(", ")
                : "No rooms reserved now"}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-600">
            {nearestEvents.prev ? (
              <div>
                Last event:{" "}
                <span className="font-semibold">
                  {mmToTime(nearestEvents.prev.t)}
                </span>{" "}
                — {nearestEvents.prev.kind.toUpperCase()}{" "}
                <span className="font-semibold">
                  {nearestEvents.prev.r.room}
                </span>
              </div>
            ) : (
              <div>Last event: —</div>
            )}
            {nearestEvents.next ? (
              <div>
                Next event:{" "}
                <span className="font-semibold">
                  {mmToTime(nearestEvents.next.t)}
                </span>{" "}
                — {nearestEvents.next.kind.toUpperCase()}{" "}
                <span className="font-semibold">
                  {nearestEvents.next.r.room}
                </span>
              </div>
            ) : (
              <div>Next event: —</div>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Conflicts (simultaneous load)
          </div>
          <div className="mt-1 text-3xl font-bold text-rose-600">
            {conflictsAtSweep.length}
          </div>
          <div className="mt-2 text-xs text-slate-600">
            {conflictsAtSweep.length ? (
              <ul className="list-disc pl-4">
                {conflictsAtSweep.slice(0, 4).map(([a, b], i) => (
                  <li key={i}>
                    {a.room} & {b.room}
                  </li>
                ))}
                {conflictsAtSweep.length > 4 && (
                  <li>+{conflictsAtSweep.length - 4} more</li>
                )}
              </ul>
            ) : (
              "No overlap among active reservations."
            )}
          </div>
        </div>
      </div>

      {/* timeline board */}
      <div className="mt-4 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {/* header with ticks */}
        <div className="border-b bg-slate-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-700">Timeline</div>
            <div className="text-xs text-slate-500">
              Window: {mmToTime(0)} → {mmToTime(DAY_MIN)}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="w-28 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Rooms
            </div>
            <div className="relative" style={{ width }}>
              {/* tick labels */}
              {ticks.map((t) => (
                <div
                  key={t}
                  className="absolute top-0 -translate-x-1/2 text-[11px] text-slate-500"
                  style={{ left: t * pxPerMin }}
                >
                  {mmToTime(t)}
                </div>
              ))}
              {/* tick lines */}
              <svg
                className="mt-5 block"
                width={width}
                height={12}
                aria-hidden="true"
              >
                {ticks.map((t) => (
                  <line
                    key={t}
                    x1={t * pxPerMin}
                    y1={0}
                    x2={t * pxPerMin}
                    y2={12}
                    stroke="#cbd5e1"
                    strokeWidth={1}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div
          ref={boardRef}
          className="relative px-4 py-4 select-none"
          style={{ height }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div className="flex gap-3">
            {/* room labels */}
            <div className="w-28">
              {rooms.map((room) => (
                <div
                  key={room}
                  className="flex h-11 items-center text-sm font-semibold text-slate-700"
                >
                  {room}
                </div>
              ))}
            </div>

            {/* lanes */}
            <div className="relative" style={{ width }}>
              {/* vertical grid (hour) */}
              <svg
                className="absolute inset-0"
                width={width}
                height={rooms.length * laneHeight}
                aria-hidden="true"
              >
                {ticks.map((t) => (
                  <line
                    key={t}
                    x1={t * pxPerMin}
                    y1={0}
                    x2={t * pxPerMin}
                    y2={rooms.length * laneHeight}
                    stroke="#e2e8f0"
                    strokeWidth={1}
                  />
                ))}
              </svg>

              {/* sweep line */}
              <div
                className="pointer-events-none absolute top-0 bottom-0 z-20"
                style={{ left: sweepX }}
              >
                <div className="h-full w-0.5 bg-red-500" />
                <div className="mt-2 -translate-x-1/2 rounded-md bg-red-500 px-2 py-1 text-[11px] font-semibold text-white shadow">
                  {mmToTime(sweepMin)}
                </div>
              </div>

              {/* reservations */}
              {reservations.map((r) => {
                const laneIdx = rooms.indexOf(r.room);
                const top = laneIdx * laneHeight + 8;

                const isActive = r.start <= sweepMin && sweepMin < r.end;
                const isSelected = selectedId === r.id;

                const left = r.start * pxPerMin;
                const barW = Math.max(6, (r.end - r.start) * pxPerMin);

                return (
                  <button
                    key={r.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(r.id);
                    }}
                    className={[
                      "absolute z-10 h-7 rounded-lg px-2 text-left text-xs font-semibold text-white shadow-sm",
                      "ring-2 ring-transparent transition hover:brightness-110",
                      isActive ? "bg-amber-500" : "bg-indigo-600",
                      isSelected ? "ring-slate-900" : "",
                    ].join(" ")}
                    style={{ left, top, width: barW }}
                    title={`${r.room} ${mmToTime(r.start)}–${mmToTime(r.end)}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">
                        {mmToTime(r.start)}–{mmToTime(r.end)}
                      </span>
                      {isActive && (
                        <span className="rounded bg-white/20 px-1 py-0.5 text-[10px]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* draft bar */}
              {draft?.active && (
                <div
                  className="absolute z-30 h-7 rounded-lg bg-slate-400/60 ring-2 ring-slate-500"
                  style={{
                    left: Math.min(draft.start, draft.end) * pxPerMin,
                    width: Math.max(
                      6,
                      Math.abs(draft.end - draft.start) * pxPerMin,
                    ),
                    top: rooms.indexOf(draft.room) * laneHeight + 8,
                  }}
                />
              )}

              {/* lane separators */}
              {rooms.map((_, i) => (
                <div
                  key={i}
                  className="absolute right-0 left-0 border-t border-slate-100"
                  style={{ top: i * laneHeight }}
                />
              ))}
            </div>
          </div>

          {/* inspector */}
          <div className="mt-4 flex flex-col gap-2 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-700">
              {selected ? (
                <>
                  <span className="font-semibold text-slate-900">
                    Selected:
                  </span>{" "}
                  {selected.room} •{" "}
                  <span className="font-mono">
                    {mmToTime(selected.start)}–{mmToTime(selected.end)}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-slate-900">
                    Selected:
                  </span>{" "}
                  none (click a bar)
                </>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!nearestEvents.next) return;
                  setSweepMin(nearestEvents.next.t);
                }}
                className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100 disabled:opacity-50"
                disabled={!nearestEvents.next}
              >
                Jump to next event
              </button>

              <button
                onClick={removeSelected}
                className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
                disabled={selectedId == null}
              >
                Delete selected
              </button>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            How to read: Blue bars are reservations; Amber bars are reservations
            active at the current sweep time. The sweep line moves left→right
            and changes the active set.
          </div>
        </div>
      </div>
    </div>
  );
}

