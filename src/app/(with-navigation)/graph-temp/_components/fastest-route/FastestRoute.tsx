"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useEffectEvent, useState } from "react";

type Node = {
  id: string;
  name: string;
  x: number;
  y: number;
};

type Edge = {
  from: string;
  to: string;
  weight: number; // travel time in minutes
};

type Graph = {
  nodes: Node[];
  edges: Edge[];
};

// Map graph representing locations and routes
const mapGraph: Graph = {
  nodes: [
    { id: "A", name: "Home", x: 150, y: 100 },
    { id: "B", name: "Park", x: 400, y: 120 },
    { id: "C", name: "Mall", x: 650, y: 150 },
    { id: "D", name: "School", x: 200, y: 300 },
    { id: "E", name: "Office", x: 450, y: 320 },
    { id: "F", name: "Airport", x: 700, y: 350 },
    { id: "G", name: "Stadium", x: 300, y: 500 },
    { id: "H", name: "Hospital", x: 550, y: 520 },
  ],
  edges: [
    { from: "A", to: "B", weight: 5 },
    { from: "A", to: "D", weight: 8 },
    { from: "B", to: "C", weight: 6 },
    { from: "B", to: "E", weight: 4 },
    { from: "C", to: "F", weight: 7 },
    { from: "D", to: "E", weight: 3 },
    { from: "D", to: "G", weight: 9 },
    { from: "E", to: "F", weight: 5 },
    { from: "E", to: "H", weight: 6 },
    { from: "F", to: "H", weight: 4 },
    { from: "G", to: "H", weight: 8 },
    { from: "B", to: "D", weight: 7 },
    { from: "E", to: "C", weight: 5 },
  ],
};

type AlgorithmState = {
  distances: Map<string, number>;
  visited: Set<string>;
  previous: Map<string, string | null>;
  current: string | null;
  path: string[];
};

export default function FastestRoute() {
  const [startNode, setStartNode] = useState("A");
  const [endNode, setEndNode] = useState("F");
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState | null>(
    null,
  );
  const [finalPath, setFinalPath] = useState<string[]>([]);

  const nodes = mapGraph.nodes.map((n) => n.id);

  // dijkstra
  function ShortestPath(start: string, end: string): AlgorithmState[] {
    const states: AlgorithmState[] = [];
    const distances = new Map<string, number>();
    const visited = new Set<string>();
    const previous = new Map<string, string | null>();

    // Initialize distances
    mapGraph.nodes.forEach((node) => {
      distances.set(node.id, node.id === start ? 0 : Infinity);
      previous.set(node.id, null);
    });

    const getNeighbors = (nodeId: string): Edge[] => {
      return mapGraph.edges.filter(
        (edge) => edge.from === nodeId || edge.to === nodeId,
      );
    };

    const getOtherNode = (edge: Edge, nodeId: string): string => {
      return edge.from === nodeId ? edge.to : edge.from;
    };

    while (true) {
      // Find unvisited node with smallest distance
      let current: string | null = null;
      let minDistance = Infinity;

      distances.forEach((distance, nodeId) => {
        if (!visited.has(nodeId) && distance < minDistance) {
          minDistance = distance;
          current = nodeId;
        }
      });

      if (current === null || current === end) {
        // Reconstruct path
        const path: string[] = [];
        let node: string | null = end;
        while (node !== null) {
          path.unshift(node);
          node = previous.get(node) ?? null;
        }

        states.push({
          distances: new Map(distances),
          visited: new Set(visited),
          previous: new Map(previous),
          current: null,
          path,
        });
        break;
      }

      visited.add(current);

      // Update distances to neighbors
      const neighbors = getNeighbors(current);
      neighbors.forEach((edge) => {
        const neighbor = getOtherNode(edge, current!);
        if (!visited.has(neighbor)) {
          const newDistance = distances.get(current!)! + edge.weight;
          if (newDistance < distances.get(neighbor)!) {
            distances.set(neighbor, newDistance);
            previous.set(neighbor, current);
          }
        }
      });

      states.push({
        distances: new Map(distances),
        visited: new Set(visited),
        previous: new Map(previous),
        current,
        path: [],
      });
    }

    return states;
  }

  const onMount = useEffectEvent(() => {
    const states = ShortestPath(startNode, endNode);
    if (states.length > 0) {
      setAlgorithmState(states[0]);
      const finalState = states[states.length - 1];
      const path = finalState.path;
      setFinalPath(path);
    }
  });

  useEffect(() => {
    onMount();
  }, [startNode, endNode]);

  return (
    <section className="mx-auto grid w-full max-w-7xl place-items-center gap-5">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          2. Fastest Route Algorithm (Dijkstra&apos;s)
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize how maps find the fastest route using graph algorithms
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Start:
          </label>
          <Select value={startNode} onValueChange={setStartNode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((node) => (
                <SelectItem disabled={node === endNode} key={node} value={node}>
                  {mapGraph.nodes.find((n) => n.id === node)?.name} ({node})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            End:
          </label>
          <Select value={endNode} onValueChange={setEndNode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {nodes.map((node) => (
                <SelectItem
                  disabled={node === startNode}
                  key={node}
                  value={node}
                >
                  {mapGraph.nodes.find((n) => n.id === node)?.name} ({node})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {finalPath.length > 0 && (
          <div className="ml-4 rounded-lg bg-green-50 px-4 py-2 dark:bg-green-900/20">
            <div className="text-sm font-semibold text-green-700 dark:text-green-400">
              Fastest Route: {finalPath.join(" → ")}
            </div>
          </div>
        )}
      </div>

      {/* Graph Visualization */}
      <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
          Route Visualization
        </h3>
        <RouteVisualization
          graph={mapGraph}
          algorithmState={algorithmState}
          finalPath={finalPath}
          startNode={startNode}
          endNode={endNode}
        />

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-4 sm:grid-cols-4 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded bg-blue-600"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              Start node
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded bg-red-600"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              End node
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded bg-green-500"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              Visited node
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded bg-yellow-400"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              Current node
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 border-t-2 border-green-600"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              Fastest route
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 border-t border-gray-400"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              Regular edge
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteVisualization({
  graph,
  algorithmState,
  finalPath,
  startNode,
  endNode,
}: {
  graph: Graph;
  algorithmState: AlgorithmState | null;
  finalPath: string[];
  startNode: string;
  endNode: string;
}) {
  const getNodeColor = (nodeId: string) => {
    if (nodeId === startNode) return "fill-blue-600";
    if (nodeId === endNode) return "fill-red-600";
    if (algorithmState?.visited.has(nodeId)) return "fill-green-500";
    if (algorithmState?.current === nodeId) return "fill-yellow-400";
    return "fill-gray-400";
  };

  const getNodeSize = (nodeId: string) => {
    if (nodeId === startNode || nodeId === endNode) return 20;
    if (algorithmState?.current === nodeId) return 18;
    return 14;
  };

  const isPathEdge = (from: string, to: string) => {
    for (let i = 0; i < finalPath.length - 1; i++) {
      if (
        (finalPath[i] === from && finalPath[i + 1] === to) ||
        (finalPath[i] === to && finalPath[i + 1] === from)
      ) {
        return true;
      }
    }
    return false;
  };

  const getEdgeColor = (from: string, to: string) => {
    if (isPathEdge(from, to)) return "#16a34a"; // green-600
    return "#9ca3af"; // gray-400
  };

  const getEdgeWidth = (from: string, to: string) => {
    if (isPathEdge(from, to)) return 3;
    return 1;
  };

  return (
    <svg width="800" height="600" className="h-auto w-full">
      <defs>
        {/* Glow filter for path */}
        <filter id="pathGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Draw edges */}
      {graph.edges.map((edge) => {
        const fromNode = graph.nodes.find((n) => n.id === edge.from);
        const toNode = graph.nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return null;

        const isPath = isPathEdge(edge.from, edge.to);
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;

        return (
          <g key={`${edge.from}-${edge.to}`}>
            <line
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={getEdgeColor(edge.from, edge.to)}
              strokeWidth={getEdgeWidth(edge.from, edge.to)}
              opacity={isPath ? 1 : 0.3}
              markerEnd={isPath ? "url(#arrowhead)" : undefined}
              filter={isPath ? "url(#pathGlow)" : undefined}
            />
            {/* Edge weight label */}
            <text
              x={midX}
              y={midY - 5}
              textAnchor="middle"
              className="fill-gray-600 text-xs font-medium dark:fill-gray-400"
              style={{ pointerEvents: "none" }}
            >
              {edge.weight}min
            </text>
          </g>
        );
      })}

      {/* Draw nodes */}
      {graph.nodes.map((node) => {
        const isInPath = finalPath.includes(node.id);
        const distance = algorithmState?.distances.get(node.id) ?? Infinity;
        const showDistance =
          algorithmState && distance !== Infinity && node.id !== startNode;

        return (
          <g key={node.id}>
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={getNodeSize(node.id)}
              className={getNodeColor(node.id)}
              stroke={
                isInPath && node.id !== startNode && node.id !== endNode
                  ? "#16a34a"
                  : "none"
              }
              strokeWidth={isInPath ? 3 : 0}
            />
            {/* Distance label */}
            {showDistance && (
              <text
                x={node.x}
                y={node.y - getNodeSize(node.id) - 8}
                textAnchor="middle"
                className="fill-gray-700 text-xs font-bold dark:fill-gray-300"
              >
                {distance}
              </text>
            )}
            {/* Node label */}
            <text
              x={node.x}
              y={node.y + getNodeSize(node.id) + 20}
              textAnchor="middle"
              className="fill-gray-900 text-sm font-semibold dark:fill-white"
            >
              {node.name}
            </text>
            <text
              x={node.x}
              y={node.y + getNodeSize(node.id) + 35}
              textAnchor="middle"
              className="fill-gray-600 text-xs dark:fill-gray-400"
            >
              ({node.id})
            </text>
          </g>
        );
      })}
    </svg>
  );
}
