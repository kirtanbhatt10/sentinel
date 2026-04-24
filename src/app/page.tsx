"use client";

import { useRouter } from "next/navigation";
import { Shield, Eye, Lock, Zap, ArrowRight, Upload, Search, FileText, CheckCircle2, Activity, Fingerprint, Database, LayoutDashboard, AlertTriangle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden bg-background">
      {/* Background Image & Effects - Fixed to viewport */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/hexagon-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse-slow pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Main Scrolling Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* === HERO SECTION === */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 w-full max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-6 mt-8 relative flex justify-center w-full">
              <Logo size="xl" animated={true} />
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl font-bold tracking-tight leading-tight mt-6">
              Protect Sports Content <br />
              with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 drop-shadow-[0_0_20px_rgba(0,255,136,0.3)]">AI Intelligence</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mt-6 text-center max-w-2xl mx-auto leading-relaxed">
              Sentinel detects piracy, visual reuse, and unauthorized broadcasts using advanced fingerprinting and perceptual hashing.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/analyze")}
                className="px-8 py-4 bg-primary/5 text-primary border border-primary/20 rounded-xl font-bold text-lg hover:bg-primary hover:text-secondary hover:border-primary hover:shadow-[0_0_15px_rgba(0,255,136,0.1)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Start Analysis
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/dashboard")}
                className="px-8 py-4 bg-primary/5 text-primary border border-primary/20 rounded-xl font-bold text-lg hover:bg-primary hover:text-secondary hover:border-primary hover:shadow-[0_0_15px_rgba(0,255,136,0.1)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                View Dashboard
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* === HOW IT WORKS === */}
        <section className="w-full max-w-5xl mx-auto px-6 py-24 border-t border-primary/10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Secure your content in three simple steps.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -translate-y-1/2 z-0"></div>
            
            <StepCard step="Step 1" icon={<Upload className="w-6 h-6 text-primary" />} title="Upload Content" desc="Add your original and suspect assets." />
            <StepCard step="Step 2" icon={<Search className="w-6 h-6 text-primary" />} title="AI Analysis" desc="Through AI, we detect misuse of images and content. Using perceptual hashing, we protect and prevent further unauthorized reuse." />
            <StepCard step="Step 3" icon={<FileText className="w-6 h-6 text-primary" />} title="Get Results" desc="Receive instant threat intelligence." />
          </div>
        </section>

        {/* === FEATURES GRID === */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24 border-t border-primary/10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-gray-400">Advanced tools for absolute digital protection.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Eye />} title="Visual Similarity" description="Perceptual hashing detects modified, cropped, or filtered versions." />
            <FeatureCard icon={<Fingerprint />} title="Cryptographic Fingerprints" description="Exact byte-level matching prevents direct copies and unauthorized redistribution." />
            <FeatureCard icon={<Database />} title="Secure Vault Storage" description="Store your digital assets securely and cross-reference new uploads." />
            <FeatureCard icon={<Activity />} title="Real-time Monitoring" description="Instant scanning and feedback for extremely fast threat response." />
            <FeatureCard icon={<Shield />} title="AI Threat Detection" description="Machine learning models classify potential copyright infringements." />
            <FeatureCard icon={<LayoutDashboard />} title="Analytics Dashboard" description="Comprehensive overview of scan histories, risks, and similarities." />
          </div>
        </section>

        {/* === PROBLEM + SOLUTION === */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24 border-t border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <h3 className="text-red-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> The Problem
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold">Content piracy is increasing uncontrollably.</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Creators and broadcasters lose massive revenue and control over their digital assets every second to unauthorized streams, clips, and re-uploads.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-panel p-10 rounded-3xl border-primary/30 relative"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-3xl z-0"></div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-primary font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4" /> The Solution
                </h3>
                <h2 className="text-2xl font-bold text-white">Sentinel detects reuse instantly.</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-gray-300 items-start">
                    <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
                    <span>Protects digital assets using multi-layer AI models.</span>
                  </li>
                  <li className="flex gap-3 text-gray-300 items-start">
                    <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
                    <span>Delivers sub-second perceptual hash matching.</span>
                  </li>
                  <li className="flex gap-3 text-gray-300 items-start">
                    <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
                    <span>Secures original files in a cryptographic active vault.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === DEMO / PREVIEW === */}
        <section className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-primary/10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time AI Analysis Output</h2>
            <p className="text-gray-400">See exactly how Sentinel breaks down and identifies intellectual property theft.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-4xl mx-auto glass-panel rounded-[2rem] border border-primary/20 overflow-hidden shadow-[0_20px_50px_rgba(0,255,136,0.1)] flex flex-col"
          >
            {/* Window controls */}
            <div className="h-12 bg-black/40 border-b border-primary/10 flex items-center justify-between px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">analysis_report_#SEN-8291.json</div>
            </div>

            {/* Realistic Content Mockup */}
            <div className="p-8 bg-black/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-primary/10 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                     <AlertTriangle className="w-6 h-6 text-primary" /> Threat Intelligence Report
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Scan completed in 0.84s • Multi-Layer Detection</p>
                </div>
                <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-xl border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                   <span className="text-sm text-gray-400">Risk Assessment:</span>
                   <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-red-500/20 text-red-400 border-red-500/30">High Risk</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Metrics */}
                <div className="space-y-6">
                  <h4 className="text-sm font-medium text-primary/70 uppercase tracking-wider mb-4">Confidence Metrics</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-gray-300">AI Structural Similarity</span><span className="text-white font-bold">87%</span></div>
                      <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-primary/10"><div className="bg-primary h-full w-[87%] rounded-full shadow-[0_0_10px_#00ff88]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-gray-300">Perceptual Visual Hash</span><span className="text-white font-bold">92%</span></div>
                      <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-primary/10"><div className="bg-primary h-full w-[92%] rounded-full shadow-[0_0_10px_#00ff88]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2"><span className="text-gray-300">Cryptographic Fingerprint</span><span className="text-gray-500 font-bold">0%</span></div>
                      <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-primary/10"><div className="bg-gray-600 h-full w-[0%] rounded-full"></div></div>
                      <p className="text-xs text-gray-500 mt-2">File hashes differ. Visual match confirms crop/filter modification.</p>
                    </div>
                  </div>
                </div>

                {/* Signals */}
                <div className="space-y-6">
                  <h4 className="text-sm font-medium text-primary/70 uppercase tracking-wider mb-4">Detection Summary</h4>
                  <div className="bg-black/30 rounded-xl p-6 border border-primary/20 space-y-5">
                    <div className="flex gap-3 text-sm text-gray-300 items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span><strong>High visual similarity detected</strong> in core structural features.</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-300 items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Perceptual hashing confirms <strong>unauthorized derivative work</strong>.</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-300 items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Evidence of applied color filters and 15% cropping.</span>
                    </div>
                    <div className="pt-5 mt-2 border-t border-primary/10 flex justify-between items-center">
                       <span className="text-sm text-gray-500">Recommended Action</span>
                       <span className="text-sm font-semibold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">Issue Takedown Notice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* === FINAL CTA === */}
        <section className="w-full px-6 my-24 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-[90%] md:w-[70%] lg:w-[60%] max-w-4xl mx-auto glass-panel px-8 py-16 md:px-12 md:py-20 rounded-[2rem] border border-primary/20 shadow-[0_20px_60px_rgba(0,255,136,0.1)] text-center relative overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 z-0 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center w-full">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">Start Protecting Your Content Today</h2>
              <p className="text-gray-400 text-base md:text-lg mb-10 max-w-2xl mx-auto">
                Join the revolution in digital rights management. Upload your first asset to the Sentinel vault.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/analyze")}
                className="px-10 py-5 bg-primary text-secondary rounded-xl font-bold text-xl hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all duration-300"
              >
                Start Analysis Now
              </motion.button>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}

function StepCard({ step, icon, title, desc }: { step: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-8 rounded-3xl border border-primary/10 flex flex-col items-center text-center relative z-10 bg-background/80"
    >
      <span className="px-3 py-1 bg-primary/5 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_10px_rgba(0,255,136,0.05)]">
        {step}
      </span>
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="glass-panel p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 border border-primary/10 group-hover:border-primary/30 transition-all duration-300 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function ScanLine() {
  return (
    <motion.div 
      animate={{ y: [-50, 50, -50] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="w-full h-1 bg-primary/50 shadow-[0_0_10px_#00ff88]"
    />
  );
}