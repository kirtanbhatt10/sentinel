"use client";

import { useEffect, useState } from "react";
import { Lock, ShieldCheck, Database, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MetricCard } from "@/components/ui/MetricCard";
import { motion, Variants } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function VaultPage() {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("protectedAssets") || "[]");
      setAssets(stored);
    } catch {
      setAssets([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-10 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px] -z-10 pointer-events-none opacity-40"></div>

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
          <div className="flex gap-3">
            <button onClick={() => (window.location.href = "/analyze")} className="px-6 py-2.5 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors text-sm font-medium text-primary">
              Analyze
            </button>
            <button onClick={() => (window.location.href = "/dashboard")} className="px-6 py-2.5 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors text-sm font-medium text-primary">
              Dashboard
            </button>
          </div>
        </div>

        {assets.length === 0 ? (
          <div className="glass-panel border border-white/5 rounded-3xl p-16 text-center mt-20 animate-slide-up">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Vault is Empty</h2>
            <p className="text-gray-400 mb-6">You haven't registered any protected assets yet.</p>
            <button onClick={() => (window.location.href = "/analyze")} className="px-6 py-3 bg-primary text-secondary rounded-xl font-semibold hover:bg-primary-dark transition-colors">
              Protect an Asset
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="space-y-8"
          >
            
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Total Protected Assets"
                value={assets.length}
                icon={<Lock className="w-6 h-6" />}
              />
              <MetricCard
                title="Registry Status"
                value="Active"
                valueColorClass="text-primary"
                icon={<ShieldCheck className="w-6 h-6 text-primary" />}
              />
              <MetricCard
                title="Detection Ready"
                value="Yes"
                valueColorClass="text-primary"
                icon={<Database className="w-6 h-6 text-primary" />}
              />
            </div>

            {/* Asset Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {assets.map((item, index) => (
                <motion.div variants={itemVariants} key={index} className="glass-panel p-6 rounded-2xl border border-primary/10 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <StatusBadge status="Protected" />
                  </div>
                  
                  <h3 className="font-semibold text-lg text-white mb-1 truncate" title={item.filename || "Unnamed Asset"}>
                    {item.filename || "Unnamed Asset"}
                  </h3>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono bg-black/20 p-2 rounded-lg">
                      <span className="text-gray-500">ID:</span> {item.assetId}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      Registered: {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-primary/20 flex flex-wrap gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-primary/5 rounded text-primary/70 border border-primary/20">Fingerprint</span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-primary/5 rounded text-primary/70 border border-primary/20">Visual Hash</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        )}
      </motion.div>
    </div>
  );
}