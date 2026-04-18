"use client";

import { useState } from "react";

export default function Home() {
  const [original, setOriginal] = useState<File | null>(null);
  const [suspect, setSuspect] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!original || !suspect) {
      return alert("Upload both images");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("originalImage", original);
    formData.append("suspectImage", suspect);
    formData.append("caption", caption);

    const res = await fetch("/api/analyze-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // 🔥 FIX: CLEAN + STRUCTURED SAVE
    const cleanData = {
      riskLevel: data?.riskLevel || "Unknown",
      similarityScore: Number(data?.similarityScore || 0),
      confidence: Number(data?.confidence || 0),
      classification: data?.classification || "Unknown",
      timestamp: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem("sentinelData") || "[]");
    localStorage.setItem(
      "sentinelData",
      JSON.stringify([cleanData, ...prev])
    );

    setResult(data);
    setLoading(false);
  };

  const getRiskStyle = (risk: string) => {
    if (!risk) return "bg-gray-500";
    if (["high", "critical"].includes(risk.toLowerCase()))
      return "bg-red-500/80";
    if (risk.toLowerCase() === "medium") return "bg-yellow-500/80";
    return "bg-green-500/80";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10 relative">
          <h1 className="text-4xl font-bold tracking-wide">Sentinel</h1>
          <p className="text-gray-400 mt-2 text-sm">
            AI-powered sports content protection
          </p>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="absolute right-0 top-0 text-sm text-gray-400 hover:text-white"
          >
            Dashboard →
          </button>
        </div>

        {/* Upload */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-gray-400 text-sm">Original Content</p>
              <input type="file" onChange={(e) => setOriginal(e.target.files?.[0] || null)} />
              {original && (
                <img src={URL.createObjectURL(original)} className="rounded-lg mt-2 max-h-40 object-cover" />
              )}
            </div>

            <div>
              <p className="text-gray-400 text-sm">Suspect Content</p>
              <input type="file" onChange={(e) => setSuspect(e.target.files?.[0] || null)} />
              {suspect && (
                <img src={URL.createObjectURL(suspect)} className="rounded-lg mt-2 max-h-40 object-cover" />
              )}
            </div>

          </div>

          <input
            className="mt-6 w-full p-3 rounded-lg bg-black/50 border border-white/10"
            placeholder="Optional caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3 rounded-lg bg-white text-black font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Content"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">

            <h2 className="text-xl font-semibold mb-4">
              Threat Intelligence Report
            </h2>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-gray-400">Risk Level</span>
              <span className={`px-3 py-1 rounded-full ${getRiskStyle(result.riskLevel)}`}>
                {result.riskLevel || "N/A"}
              </span>
            </div>

            <p>Similarity: {result.similarityScore || 0}%</p>
            <p>Confidence: {result.confidence || 0}%</p>

            <div className="mt-4">
              <p className="text-gray-400">Classification</p>
              <p>{result.classification}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}