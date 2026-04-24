"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ShieldAlert, Fingerprint, Activity, Crosshair, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

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
        timestamp: d?.timestamp || new Date().toISOString(),
      }));
      setData(cleaned);
    } catch {
      setData([]);
    }
  }, []);

  const total = data.length;
  const highRisk = data.filter((d) => ["high", "critical"].includes((d.riskLevel || "").toLowerCase())).length;
  const avgSimilarity = total ? Math.round(data.reduce((a, b) => a + b.similarityScore, 0) / total) : 0;
  const avgConfidence = total ? Math.round(data.reduce((a, b) => a + b.confidence, 0) / total) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-10 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] -z-10 pointer-events-none opacity-40"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div className="flex flex-col items-start gap-2">
            <Logo size="lg" />
          </div>
          <button
            onClick={() => (window.location.href = "/analyze")}
            className="px-6 py-2.5 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors text-sm font-medium text-primary"
          >
            ← Back to Analyze
          </button>
        </div>

        {total === 0 ? (
          <div className="glass-panel border border-white/5 rounded-3xl p-16 text-center mt-20 animate-slide-up">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Analysis Data Yet</h2>
            <p className="text-gray-400">Run your first scan from the Analyze page to populate this dashboard.</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="space-y-8"
          >
            
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Scans"
                value={<AnimatedNumber value={total} />}
                icon={<Activity className="w-6 h-6" />}
              />
              <MetricCard
                title="High Risk Threats"
                value={<AnimatedNumber value={highRisk} />}
                icon={<ShieldAlert className="w-6 h-6 text-primary" />}
                valueColorClass="text-primary"
              />
              <MetricCard
                title="Avg Similarity"
                value={<AnimatedNumber value={avgSimilarity} suffix="%" />}
                icon={<Fingerprint className="w-6 h-6 text-primary" />}
                valueColorClass="text-primary"
              />
              <MetricCard
                title="Avg Confidence"
                value={<AnimatedNumber value={avgConfidence} suffix="%" />}
                icon={<Crosshair className="w-6 h-6 text-primary" />}
                valueColorClass="text-primary"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Risk Distribution */}
              <div className="glass-panel p-8 rounded-3xl border border-primary/20">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-primary" />
                  Risk Distribution
                </h2>
                <div className="space-y-5">
                  {[
                    { level: "Critical", color: "bg-red-500", text: "text-red-400" },
                    { level: "High", color: "bg-red-400", text: "text-red-300" },
                    { level: "Medium", color: "bg-yellow-500", text: "text-yellow-400" },
                    { level: "Low", color: "bg-primary", text: "text-primary" }
                  ].map(({ level, color, text }) => {
                    const count = data.filter((d) => (d.riskLevel || "").toLowerCase() === level.toLowerCase()).length;
                    const percent = total ? (count / total) * 100 : 0;

                    return (
                      <div key={level}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">{level} Risk</span>
                          <span className={cn("font-semibold", text)}>{count} scans</span>
                        </div>
                        <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-primary/20">
                          <div
                            className={cn("h-full rounded-full transition-all duration-1000", color)}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Similarity Trend */}
              <div className="glass-panel p-8 rounded-3xl border border-primary/20 lg:col-span-2">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Similarity Trend (Last 15 Scans)
                </h2>
                
                <div className="h-48 flex items-end justify-between gap-2 mt-8 border-b border-primary/20 pb-2 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-t border-primary/50 border-dashed w-full h-0"></div>
                    <div className="border-t border-primary/50 border-dashed w-full h-0"></div>
                    <div className="border-t border-primary/50 border-dashed w-full h-0"></div>
                  </div>

                  {data.slice(0, 15).reverse().map((item, i) => (
                    <div key={i} className="relative group w-full flex justify-center h-full items-end">
                      <div
                        className={cn(
                          "w-full max-w-[40px] rounded-t-sm transition-all duration-500 group-hover:opacity-80 group-hover:bg-white",
                          item.similarityScore > 80 ? "bg-red-500" : item.similarityScore > 60 ? "bg-yellow-500" : "bg-primary"
                        )}
                        style={{ height: `${Math.max(item.similarityScore, 5)}%` }}
                      />
                      {/* Tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-primary/20 text-primary text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20">
                        {item.similarityScore}% - {item.riskLevel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel p-8 rounded-3xl border border-primary/20">
              <h2 className="text-xl font-semibold mb-6">Recent Analysis Log</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-primary/70 uppercase bg-primary/5 border-b border-primary/20">
                    <tr>
                      <th className="px-6 py-4 font-medium">Classification</th>
                      <th className="px-6 py-4 font-medium">Similarity</th>
                      <th className="px-6 py-4 font-medium">Confidence</th>
                      <th className="px-6 py-4 font-medium text-right">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 8).map((item, i) => (
                      <tr key={i} className="border-b border-primary/10 hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-medium text-white">{item.classification}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {item.similarityScore}%
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {item.confidence}%
                        </td>
                        <td className="px-6 py-4 text-right">
                          <StatusBadge status={item.riskLevel} className="ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        )}
      </motion.div>
    </div>
  );
}