"use client";

import { useState } from "react";

async function generateFingerprint(file: File) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function generatePerceptualHash(file: File) {
  return new Promise<string>((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 8;
      canvas.height = 8;

      ctx?.drawImage(img, 0, 0, 8, 8);

      const imageData = ctx?.getImageData(0, 0, 8, 8).data;
      const gray: number[] = [];

      for (let i = 0; i < imageData!.length; i += 4) {
        const avg =
          (imageData![i] +
            imageData![i + 1] +
            imageData![i + 2]) /
          3;

        gray.push(avg);
      }

      const mean =
        gray.reduce((a, b) => a + b, 0) / gray.length;

      const hash = gray
        .map((v) => (v > mean ? "1" : "0"))
        .join("");

      resolve(hash);
    };

    reader.readAsDataURL(file);
  });
}

function compareHashes(a: string, b: string) {
  let matches = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) matches++;
  }

  return Math.round((matches / a.length) * 100);
}

export default function Home() {
  const [original, setOriginal] = useState<File | null>(null);
  const [suspect, setSuspect] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [assetId, setAssetId] = useState("");
  const [protectedAsset, setProtectedAsset] = useState(false);
  const [matchedAsset, setMatchedAsset] = useState<any>(null);

  const protectOriginalAsset = async () => {
    if (!original) {
      return alert("Upload original content first");
    }

    const fingerprint =
      await generateFingerprint(original);

    const pHash =
      await generatePerceptualHash(original);

    const id =
      "SEN-" +
      Math.floor(
        10000 + Math.random() * 90000
      );

    const protectedData = {
      assetId: id,
      filename: original.name,
      fingerprint,
      perceptualHash: pHash,
      createdAt: new Date().toISOString(),
    };

    const prev = JSON.parse(
      localStorage.getItem("protectedAssets") || "[]"
    );

    localStorage.setItem(
      "protectedAssets",
      JSON.stringify([protectedData, ...prev])
    );

    setAssetId(id);
    setProtectedAsset(true);
  };

  const handleSubmit = async () => {
    if (!original || !suspect) {
      return alert("Upload both images");
    }

    setLoading(true);
    setMatchedAsset(null);

    try {
      const originalFingerprint =
        await generateFingerprint(original);

      const suspectFingerprint =
        await generateFingerprint(suspect);

      const fingerprintMatch =
        originalFingerprint === suspectFingerprint;

      const fingerprintSimilarity =
        fingerprintMatch ? 100 : 0;

      const originalPHash =
        await generatePerceptualHash(original);

      const suspectPHash =
        await generatePerceptualHash(suspect);

      const perceptualSimilarity =
        compareHashes(originalPHash, suspectPHash);

      // 🔥 Vault Match Check
      const vault = JSON.parse(
        localStorage.getItem("protectedAssets") || "[]"
      );

      let foundMatch = null;

      for (const item of vault) {
        const score = compareHashes(
          item.perceptualHash,
          suspectPHash
        );

        if (score >= 80) {
          foundMatch = item;
          break;
        }
      }

      setMatchedAsset(foundMatch);

      const formData = new FormData();
      formData.append("originalImage", original);
      formData.append("suspectImage", suspect);
      formData.append("caption", caption);

      const res = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const finalData = {
        ...data,
        fingerprintMatch,
        fingerprintSimilarity,
        perceptualSimilarity,
      };

      const cleanData = {
        riskLevel: finalData?.riskLevel || "Unknown",
        similarityScore: Number(
          finalData?.similarityScore || 0
        ),
        confidence: Number(
          finalData?.confidence || 0
        ),
        classification:
          finalData?.classification || "Unknown",
        fingerprintSimilarity,
        perceptualSimilarity,
        timestamp: new Date().toISOString(),
      };

      const prev = JSON.parse(
        localStorage.getItem("sentinelData") || "[]"
      );

      localStorage.setItem(
        "sentinelData",
        JSON.stringify([cleanData, ...prev])
      );

      setResult(finalData);
    } catch (error) {
      console.log(error);

      setResult({
        error: "Failed to analyze content",
      });
    }

    setLoading(false);
  };

  const getRiskStyle = (risk: string) => {
    if (!risk) return "bg-gray-500";

    if (
      ["high", "critical"].includes(
        risk.toLowerCase()
      )
    ) {
      return "bg-red-500/80";
    }

    if (risk.toLowerCase() === "medium") {
      return "bg-yellow-500/80";
    }

    return "bg-green-500/80";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a18] to-[#111127] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-10 relative">
          <h1 className="text-4xl font-bold tracking-wide">
            Sentinel
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            AI-powered sports content protection
          </p>

          <div className="absolute right-0 top-0 flex gap-3">

            <button
              onClick={() =>
                (window.location.href = "/vault")
              }
              className="text-sm text-gray-400 hover:text-white"
            >
              Vault →
            </button>

            <button
              onClick={() =>
                (window.location.href = "/dashboard")
              }
              className="text-sm text-gray-400 hover:text-white"
            >
              Dashboard →
            </button>

          </div>
        </div>

        {/* Upload Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">

          <div className="grid grid-cols-2 gap-6">

            {/* Original */}
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                Original Content
              </p>

              <input
                type="file"
                onChange={(e) =>
                  setOriginal(
                    e.target.files?.[0] || null
                  )
                }
              />

              {original && (
                <>
                  <img
                    src={URL.createObjectURL(original)}
                    className="rounded-lg mt-2 max-h-40 object-cover"
                  />

                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs">
                    Ready for Protection
                  </div>

                  <button
                    onClick={protectOriginalAsset}
                    className="mt-2 block px-3 py-2 rounded-lg bg-green-500 text-black text-xs font-semibold"
                  >
                    Protect This Asset
                  </button>
                </>
              )}
            </div>

            {/* Suspect */}
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                Suspect Content
              </p>

              <input
                type="file"
                onChange={(e) =>
                  setSuspect(
                    e.target.files?.[0] || null
                  )
                }
              />

              {suspect && (
                <img
                  src={URL.createObjectURL(suspect)}
                  className="rounded-lg mt-2 max-h-40 object-cover"
                />
              )}
            </div>
          </div>

          <input
            className="mt-6 w-full p-3 rounded-lg bg-black/50 border border-white/10 placeholder-gray-500"
            placeholder="Optional caption..."
            value={caption}
            onChange={(e) =>
              setCaption(e.target.value)
            }
          />

          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Scanning Threat Signals...
              </>
            ) : (
              "Analyze Content"
            )}
          </button>
        </div>

        {/* Protection Status */}
        {protectedAsset && (
          <div className="mt-6 backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
            <h3 className="text-green-300 font-semibold">
              Asset Protected Successfully
            </h3>

            <p className="text-sm mt-2 text-gray-300">
              Asset ID: {assetId}
            </p>

            <p className="text-sm text-gray-400">
              Fingerprint + Visual Signature Registered
            </p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">

            {/* Compare View */}
            <div className="grid grid-cols-2 gap-4 mb-6">

              <div>
                <p className="text-xs text-green-400 mb-2">
                  Protected Asset
                </p>

                {original && (
                  <img
                    src={URL.createObjectURL(original)}
                    className="rounded-xl h-40 w-full object-cover border border-green-500/20"
                  />
                )}
              </div>

              <div>
                <p className="text-xs text-red-400 mb-2">
                  Suspicious Upload
                </p>

                {suspect && (
                  <img
                    src={URL.createObjectURL(suspect)}
                    className="rounded-xl h-40 w-full object-cover border border-red-500/20"
                  />
                )}
              </div>

            </div>

            <h2 className="text-xl font-semibold">
              Sentinel Threat Intelligence Report
            </h2>

            <p className="text-xs text-gray-500 mb-4 mt-1">
              Multi-Layer Detection • AI + Fingerprint + Visual Analysis
            </p>

            {result.error ? (
              <p>{result.error}</p>
            ) : (
              <>
                {/* Vault Match */}
                {matchedAsset && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-300 font-semibold">
                      Protected Asset Match Detected
                    </p>

                    <p className="text-sm mt-2">
                      Asset ID: {matchedAsset.assetId}
                    </p>

                    <p className="text-sm text-gray-400">
                      {matchedAsset.filename}
                    </p>
                  </div>
                )}

                {/* Risk */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gray-400">
                    Risk Level
                  </span>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg ${getRiskStyle(
                      result.riskLevel
                    )}`}
                  >
                    {result.riskLevel || "N/A"}
                  </span>
                </div>

                {/* Metrics */}
                <div className="space-y-4 mb-6">

                  <div>
                    <p className="text-gray-400">
                      AI Similarity
                    </p>

                    <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{
                          width: `${result.similarityScore || 0}%`,
                        }}
                      />
                    </div>

                    <p className="text-sm mt-1">
                      {result.similarityScore || 0}%
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Confidence
                    </p>

                    <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-400 h-2 rounded-full"
                        style={{
                          width: `${result.confidence || 0}%`,
                        }}
                      />
                    </div>

                    <p className="text-sm mt-1">
                      {result.confidence || 0}%
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Exact Fingerprint
                    </p>

                    <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
                      <div
                        className="bg-purple-400 h-2 rounded-full"
                        style={{
                          width: `${result.fingerprintSimilarity}%`,
                        }}
                      />
                    </div>

                    <p className="text-sm mt-1">
                      {result.fingerprintSimilarity}%
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Visual Similarity
                    </p>

                    <div className="w-full bg-gray-800 rounded-full h-2 mt-1">
                      <div
                        className="bg-pink-400 h-2 rounded-full"
                        style={{
                          width: `${result.perceptualSimilarity}%`,
                        }}
                      />
                    </div>

                    <p className="text-sm mt-1">
                      {result.perceptualSimilarity}%
                    </p>
                  </div>

                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-6 text-sm">

                  <div>
                    <p className="text-gray-400">
                      Classification
                    </p>
                    <p className="mt-1">
                      {result.classification}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Transformations
                    </p>
                    <p className="mt-1">
                      {result.transformations}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Reuse Detection
                    </p>
                    <p className="mt-1">
                      {result.reuseDetected}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Recommended Action
                    </p>
                    <p className="mt-1">
                      {result.recommendedAction}
                    </p>
                  </div>

                </div>

                {/* Evidence */}
                <div className="mt-6">
                  <p className="text-gray-400">
                    AI Evidence Signals
                  </p>

                  <div className="mt-3 space-y-2 text-sm">
                    {(result.reasoning || "")
                      .split(".")
                      .filter(
                        (line: string) =>
                          line.trim() !== ""
                      )
                      .slice(0, 4)
                      .map(
                        (
                          line: string,
                          i: number
                        ) => (
                          <div
                            key={i}
                            className="flex gap-2 items-start"
                          >
                            <span className="text-green-400">
                              ✔
                            </span>

                            <span>
                              {line.trim()}.
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}