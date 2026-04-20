"use client";

import { useEffect, useState } from "react";

export default function VaultPage() {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("protectedAssets") || "[]"
      );

      setAssets(stored);
    } catch {
      setAssets([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a18] to-[#111127] text-white p-8">

      {/* Header */}
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Sentinel Vault
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Protected Sports Media Assets
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                (window.location.href =
                  "/analyze")
              }
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              Analyze
            </button>

            <button
              onClick={() =>
                (window.location.href =
                  "/dashboard")
              }
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              Dashboard
            </button>

          </div>
        </div>

        {/* Empty State */}
        {assets.length === 0 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-semibold">
              No Protected Assets Yet
            </h2>

            <p className="text-gray-400 mt-3 text-sm">
              Go to Analyze page and click
              "Protect This Asset"
            </p>
          </div>
        )}

        {/* Stats */}
        {assets.length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-sm">
                  Total Protected
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {assets.length}
                </h2>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-sm">
                  Registry Status
                </p>

                <h2 className="text-2xl font-bold mt-2 text-green-400">
                  Active
                </h2>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-sm">
                  Detection Ready
                </p>

                <h2 className="text-2xl font-bold mt-2 text-blue-400">
                  Yes
                </h2>
              </div>

            </div>

            {/* Asset List */}
            <div className="space-y-4">

              {assets.map((item, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center"
                >

                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.filename ||
                        "Unnamed Asset"}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      {item.assetId}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Protected on{" "}
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">

                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs inline-block">
                      Protected
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Fingerprint +
                      Visual Signature
                    </p>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
}