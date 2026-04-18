"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* HERO */}
      <h1 className="text-6xl font-bold text-center leading-tight">
        Protect Sports Content <br />
        with <span className="text-green-400">AI</span>
      </h1>

      <p className="text-gray-400 mt-6 text-center max-w-xl">
        Detect piracy, content reuse, and misuse using advanced AI + visual analysis.
      </p>

      <button
        onClick={() => router.push("/analyze")}
        className="mt-8 px-8 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-400 transition"
      >
        Start Analysis
      </button>

    </div>
  );
}