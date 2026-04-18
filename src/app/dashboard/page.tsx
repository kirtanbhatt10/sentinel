"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("sentinelData") || "[]");

      const cleaned = stored.map((d: any) => ({
        riskLevel: d?.riskLevel || "Unknown",
        similarityScore: Number(d?.similarityScore || 0),
        confidence: Number(d?.confidence || 0),
        classification: d?.classification || "Unknown",
      }));

      setData(cleaned);
    } catch {
      setData([]);
    }
  }, []);

  const total = data.length;

  const highRisk = data.filter(
    (d) =>
      d.riskLevel.toLowerCase() === "high" ||
      d.riskLevel.toLowerCase() === "critical"
  ).length;

  const avgSimilarity = total
    ? Math.round(
        data.reduce((a, b) => a + b.similarityScore, 0) / total
      )
    : 0;

  const avgConfidence = total
    ? Math.round(
        data.reduce((a, b) => a + b.confidence, 0) / total
      )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          Sentinel Intelligence Dashboard
        </h1>

        <button
          onClick={() => (window.location.href = "/analyze")}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Analyze
        </button>
      </div>

      {/* Empty State */}
      {total === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No analysis yet</p>
          <p className="text-sm mt-2">Run scans from Analyze page</p>
        </div>
      )}

      {/* DATA */}
      {total > 0 && (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-10">

            <div className="bg-white/5 p-6 rounded-xl">
              <p className="text-gray-400">Total Scans</p>
              <h2 className="text-2xl font-bold mt-2">{total}</h2>
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <p className="text-gray-400">High Risk</p>
              <h2 className="text-2xl font-bold mt-2 text-red-400">
                {highRisk}
              </h2>
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <p className="text-gray-400">Avg Similarity</p>
              <h2 className="text-2xl font-bold mt-2 text-green-400">
                {avgSimilarity}%
              </h2>
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <p className="text-gray-400">Avg Confidence</p>
              <h2 className="text-2xl font-bold mt-2 text-blue-400">
                {avgConfidence}%
              </h2>
            </div>

          </div>

          {/* Risk Distribution */}
          <div className="bg-white/5 p-6 rounded-xl mb-10">
            <h2 className="text-xl mb-4">Risk Distribution</h2>

            {["Low", "Medium", "High", "Critical"].map((level) => {
              const count = data.filter(
                (d) =>
                  (d.riskLevel || "").toLowerCase() === level.toLowerCase()
              ).length;

              const percent = total ? (count / total) * 100 : 0;

              return (
                <div key={level} className="mb-3">
                  <div className="flex justify-between text-sm">
                    <span>{level}</span>
                    <span>{count}</span>
                  </div>

                  <div className="w-full bg-gray-800 h-2 rounded mt-1">
                    <div
                      className="bg-purple-400 h-2 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Similarity Trend */}
          <div className="bg-white/5 p-6 rounded-xl mb-10">
            <h2 className="text-xl mb-4">Similarity Trend</h2>

            <div className="flex items-end gap-2 h-32">
              {data.slice(0, 10).map((item, i) => (
                <div
                  key={i}
                  className="bg-green-400 w-6 rounded"
                  style={{ height: `${item.similarityScore}%` }}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 p-6 rounded-xl">
            <h2 className="text-xl mb-4">Recent Analysis</h2>

            <div className="space-y-3">
              {data.slice(0, 6).map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm border-b border-white/10 pb-2"
                >
                  <div>
                    <p>{item.classification}</p>
                    <p className="text-xs text-gray-500">
                      Similarity: {item.similarityScore}%
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.riskLevel === "High" || item.riskLevel === "Critical"
                        ? "bg-red-500/80"
                        : item.riskLevel === "Medium"
                        ? "bg-yellow-500/80"
                        : "bg-green-500/80"
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}