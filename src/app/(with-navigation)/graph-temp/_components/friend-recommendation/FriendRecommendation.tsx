"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FriendRecommendation() {
  const [selectedUser, setSelectedUser] = useState("alice");
  const recommendations = recommendFriends(social, selectedUser);
  const recommendationScores = getRecommendationScores(social, selectedUser);
  const recommendationPaths = getRecommendationPaths(social, selectedUser);

  return (
    <section className="mx-auto grid w-full max-w-7xl place-items-center gap-5">
      {/* Header */}
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          1. Social Graph Recommendations
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize friend recommendations based on mutual connections
        </p>
      </div>

      {/* User selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {Object.keys(social).map((user) => (
          <Button
            key={user}
            variant={selectedUser === user ? "default" : "outline"}
            onClick={() => setSelectedUser(user)}
            className="capitalize transition-all hover:scale-105"
          >
            {user}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Graph visualization */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-center text-xl font-bold text-gray-900 capitalize dark:text-white">
              Social Graph - {selectedUser}
            </h2>
            <SocialGraphVisualization
              graph={social}
              selectedUser={selectedUser}
              recommendations={recommendations}
              recommendationScores={recommendationScores}
              recommendationPaths={recommendationPaths}
            />
            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded bg-blue-600"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  Your connections
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded bg-green-500"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  Direct friends
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 rounded bg-purple-500"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  Recommendations
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-8 border-t-2 border-dashed border-amber-400"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  Recommendation paths
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations list */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Friend Recommendations
          </h3>
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((user) => {
                const mutualFriends = getMutualFriends(
                  social,
                  selectedUser,
                  user,
                );
                return (
                  <div
                    key={user}
                    className="group rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4 transition-all hover:shadow-md dark:border-purple-800 dark:from-purple-900/20 dark:to-blue-900/20"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-900 capitalize dark:text-white">
                        {user}
                      </span>
                      <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                        {recommendationScores.get(user)} mutual
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Via:{" "}
                      <span className="font-medium capitalize">
                        {mutualFriends.join(", ")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No recommendations available
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function SocialGraphVisualization({
  graph,
  selectedUser,
  recommendations,
  recommendationScores,
  recommendationPaths,
}: {
  graph: SocialGraph;
  selectedUser: string;
  recommendations: string[];
  recommendationScores: Map<string, number>;
  recommendationPaths: Map<string, string[]>;
}) {
  const users = Object.keys(graph);
  const centerX = 400;
  const centerY = 300;
  const radius = 180;

  // Calculate positions for nodes in a circle
  const nodePositions = users.reduce(
    (acc, user, index) => {
      const angle = (index * 2 * Math.PI) / users.length - Math.PI / 2;
      acc[user] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
      return acc;
    },
    {} as Record<string, { x: number; y: number }>,
  );

  const getNodeColor = (user: string) => {
    if (user === selectedUser) return "bg-blue-600";
    if (graph[selectedUser]?.has(user)) return "bg-green-500";
    if (recommendations.includes(user)) return "bg-purple-500";
    return "bg-gray-400";
  };

  const getNodeSize = (user: string) => {
    if (user === selectedUser) return 28;
    if (recommendations.includes(user)) return 22;
    if (graph[selectedUser]?.has(user)) return 20;
    return 16;
  };

  // Helper to create curved path for recommendation lines
  const createCurvedPath = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    viaX: number,
    viaY: number,
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const controlX = midX + (viaX - midX) * 0.3;
    const controlY = midY + (viaY - midY) * 0.3;
    return `M ${x1} ${y1} Q ${controlX} ${controlY}, ${x2} ${y2}`;
  };

  return (
    <svg width="800" height="600" className="h-auto w-full">
      <defs>
        {/* Gradient for recommendation paths */}
        <linearGradient
          id="recommendationGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
        </linearGradient>
        {/* Glow filter for selected user */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Draw recommendation paths (curved lines showing how recommendations work) */}
      {Array.from(recommendationPaths.entries()).map(
        ([recommended, mutualFriends]) =>
          mutualFriends.map((mutualFriend) => {
            const selectedPos = nodePositions[selectedUser];
            const recommendedPos = nodePositions[recommended];
            const mutualPos = nodePositions[mutualFriend];

            return (
              <g key={`path-${recommended}-${mutualFriend}`}>
                {/* Curved path from selected -> mutual -> recommended */}
                <path
                  d={createCurvedPath(
                    selectedPos.x,
                    selectedPos.y,
                    recommendedPos.x,
                    recommendedPos.y,
                    mutualPos.x,
                    mutualPos.y,
                  )}
                  fill="none"
                  stroke="url(#recommendationGradient)"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                  opacity="0.7"
                  className="animate-pulse"
                />
              </g>
            );
          }),
      )}

      {/* Draw direct friendship edges */}
      {users.map((user) =>
        Array.from(graph[user] || []).map((friend) => {
          // Only draw edge once (avoid duplicates)
          if (user > friend) return null;

          const pos1 = nodePositions[user];
          const pos2 = nodePositions[friend];
          const isSelectedConnection =
            user === selectedUser || friend === selectedUser;
          const isFriendOfSelected =
            (user === selectedUser && graph[selectedUser]?.has(friend)) ||
            (friend === selectedUser && graph[selectedUser]?.has(user));

          return (
            <line
              key={`${user}-${friend}`}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke={
                isFriendOfSelected
                  ? "#10b981"
                  : isSelectedConnection
                    ? "#3b82f6"
                    : "#e5e7eb"
              }
              strokeWidth={
                isFriendOfSelected ? 3 : isSelectedConnection ? 2 : 1
              }
              opacity={
                isFriendOfSelected ? 0.8 : isSelectedConnection ? 0.6 : 0.2
              }
            />
          );
        }),
      )}

      {/* Draw nodes */}
      {users.map((user) => {
        const pos = nodePositions[user];
        const isSelected = user === selectedUser;
        const isFriend = graph[selectedUser]?.has(user);
        const isRecommended = recommendations.includes(user);
        const isMutualFriend =
          Array.from(recommendationPaths.values()).flat().includes(user) &&
          !isFriend &&
          !isSelected;

        return (
          <g key={user}>
            {/* Node circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={getNodeSize(user)}
              className={getNodeColor(user)}
              fill="currentColor"
              filter={isSelected ? "url(#glow)" : undefined}
            />
            {/* Selected user ring */}
            {isSelected && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={getNodeSize(user) + 6}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                opacity="0.6"
              />
            )}
            {/* Mutual friend indicator ring */}
            {isMutualFriend && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={getNodeSize(user) + 3}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.7"
              />
            )}
            {/* Label background */}
            <rect
              x={pos.x - 30}
              y={pos.y + getNodeSize(user) + 8}
              width="60"
              height="20"
              rx="4"
              fill="white"
              fillOpacity="0.9"
              className="dark:fill-opacity-90 dark:fill-gray-900"
            />
            {/* Label */}
            <text
              x={pos.x}
              y={pos.y + getNodeSize(user) + 22}
              textAnchor="middle"
              className="fill-gray-900 text-sm font-semibold capitalize dark:fill-white"
            >
              {user}
              {isRecommended && (
                <tspan className="fill-purple-600 text-xs font-bold dark:fill-purple-400">
                  {" "}
                  ({recommendationScores.get(user)})
                </tspan>
              )}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function getRecommendationScores(
  graph: SocialGraph,
  user: string,
): Map<string, number> {
  const friends = graph[user] ?? new Set();
  const scores = new Map<string, number>();

  friends.forEach((friend) => {
    graph[friend].forEach((fof) => {
      if (fof === user || friends.has(fof)) return;
      scores.set(fof, (scores.get(fof) ?? 0) + 1);
    });
  });

  return scores;
}

function getRecommendationPaths(
  graph: SocialGraph,
  user: string,
): Map<string, string[]> {
  const friends = graph[user] ?? new Set();
  const paths = new Map<string, string[]>();

  friends.forEach((friend) => {
    graph[friend].forEach((fof) => {
      if (fof === user || friends.has(fof)) return;
      const current = paths.get(fof) ?? [];
      paths.set(fof, [...current, friend]);
    });
  });

  return paths;
}

function getMutualFriends(
  graph: SocialGraph,
  selectedUser: string,
  recommendedUser: string,
): string[] {
  const selectedFriends = graph[selectedUser] ?? new Set();
  const recommendedFriends = graph[recommendedUser] ?? new Set();

  return Array.from(selectedFriends).filter((friend) =>
    recommendedFriends.has(friend),
  );
}

const social: SocialGraph = {
  alice: new Set(["bob", "carol", "eve"]),
  bob: new Set(["alice", "dave", "frank"]),
  carol: new Set(["alice", "dave", "grace"]),
  dave: new Set(["bob", "carol", "heidi"]),
  eve: new Set(["alice", "frank"]),
  frank: new Set(["bob", "eve"]),
  grace: new Set(["carol", "heidi"]),
  heidi: new Set(["dave", "grace"]),
};

type SocialGraph = Record<string, Set<string>>;

function recommendFriends(graph: SocialGraph, user: string): string[] {
  const friends = graph[user] ?? new Set();
  const scores = new Map<string, number>();

  friends.forEach((friend) => {
    graph[friend].forEach((fof) => {
      if (fof === user || friends.has(fof)) return;
      scores.set(fof, (scores.get(fof) ?? 0) + 1);
    });
  });

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1]) // most mutual friends first
    .map(([u]) => u);
}
