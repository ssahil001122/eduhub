"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, ShieldCheck, TrendingUp, Users, Sparkles, ChevronRight } from "lucide-react";

// Translation Dictionary - Punchy, Promax Copy
const content = {
  en: {
    fontClass: "font-sans",
    dir: "ltr",
    badge: "Introducing Eduhub 2.0",
    titlePart1: "The OS for",
    titlePart2: "Modern Schools.",
    subtitle: "A breathtakingly simple yet powerful digital ecosystem. Say goodbye to paperwork and hello to seamless campus management.",
    dashboardBtn: "Start for free",
    featuresBtn: "Book a demo",
    mockupHeader: "Eduhub Command Center",
    statsWaitlist: "Active Students",
    statsRevenue: "Monthly Revenue",
    featuresHeader: "Engineered for excellence.",
    featuresSub: "Every tool you need, crafted with obsessive attention to detail.",
    features: [
      { icon: Users, title: "Admissions", desc: "Frictionless digital enrollment." },
      { icon: BookOpen, title: "Attendance", desc: "Real-time tracking & biometric sync." },
      { icon: TrendingUp, title: "Finance", desc: "Automated billing & smart reconciliation." },
      { icon: ShieldCheck, title: "Security", desc: "Bank-grade encryption & backups." },
    ]
  },
  ur: {
    fontClass: "font-urdu text-[1.2em] leading-[2.2] tracking-normal",
    dir: "rtl",
    badge: "متعارف کراتے ہیں ایجو-ہب",
    titlePart1: "جدید اسکولوں کا",
    titlePart2: "مستقبل۔",
    subtitle: "کاغذی کارروائی کو الوداع کہیں اور بغیر کسی رکاوٹ کے اسکول مینجمنٹ کا تجربہ کریں۔ یہ ایک ایسا ڈیجیٹل ایکو سسٹم ہے جو آپ کے اسکول کو انگلیوں پر چلاتا ہے۔",
    dashboardBtn: "مفت آغاز کریں",
    featuresBtn: "مزید تفصیلات",
    mockupHeader: "ایجو-ہب کمانڈ سینٹر",
    statsWaitlist: "فعال طلباء",
    statsRevenue: "ماہانہ آمدنی",
    featuresHeader: "بہترین کارکردگی کے لیے تیار کردہ۔",
    featuresSub: "ہر وہ ٹول جس کی آپ کو ضرورت ہے، انتہائی توجہ اور مہارت کے ساتھ ڈیزائن کیا گیا ہے۔",
    features: [
      { icon: Users, title: "داخلہ سسٹم", desc: "بغیر کسی دقت کے ڈیجیٹل داخلے۔" },
      { icon: BookOpen, title: "ڈیجیٹل حاضری", desc: "لائیو ٹریکنگ اور پش نوٹیفکیشنز۔" },
      { icon: TrendingUp, title: "فنانس سسٹم", desc: "فیس کی خودکار وصولی اور رسیدیں۔" },
      { icon: ShieldCheck, title: "جدید سیکیورٹی", desc: "بینک گریڈ انکرپشن اور محفوظ کلاؤڈ۔" },
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "ur">("ur");
  const t = content[lang];
  const isUr = lang === "ur";

  return (
    <main className={`flex-1 relative bg-background text-foreground ${t.fontClass} selection:bg-brand-500/30 overflow-x-hidden`} dir={t.dir}>
      {/* Absolute Backgrounds */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-brand-500/10 blur-[180px] rounded-full pointer-events-none" />
      
      {/* High-End Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/50 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-foreground text-background flex items-center justify-center font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] font-sans">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
          </div>
          <span className="font-bold text-xl tracking-tighter font-sans hidden sm:block">Eduhub</span>
        </div>
        <div className="flex gap-2 sm:gap-6 items-center">
          <button 
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-sm font-sans text-foreground/80 cursor-pointer"
          >
            {lang === "en" ? "اردو" : "English"}
          </button>
          <div className="w-[1px] h-4 bg-white/10" />
          <Link href="/login" className="px-4 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hidden sm:block">
            {lang === "en" ? "Log in" : "لاگ اِن"}
          </Link>
          <Link href="/register" className="px-5 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:scale-105 transition-transform">
            {lang === "en" ? "Sign Up" : "اکاؤنٹ بنائیں"}
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-10 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10 min-h-screen">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={lang}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-foreground/80 mb-8"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>{t.badge}</span>
            </motion.div>
            
            <h1 className={`text-6xl sm:text-7xl lg:text-8xl font-black mb-8 ${isUr ? 'leading-[1.8] py-4 tracking-normal' : 'leading-[1.1] tracking-tight'}`}>
              <span className="text-foreground/90 block pb-2">{t.titlePart1}</span>
              <span className={`text-gradient inline-block ${isUr ? 'pb-8 pt-4 leading-[1.6]' : ''}`}>
                {t.titlePart2}
              </span>
            </h1>
            
            <p className={`text-xl sm:text-2xl text-foreground/60 mb-10 max-w-3xl font-light ${isUr ? 'leading-[2.4]' : ''}`}>
              {t.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full mt-4">
              <div className="glow-btn">
                <Link href="/dashboard" className="relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all">
                  {t.dashboardBtn}
                  <ChevronRight className={`w-5 h-5 ${isUr ? 'rotate-180' : ''}`} />
                </Link>
              </div>
              <Link href="#features" className="w-full sm:w-auto px-8 py-4 glass-panel rounded-full font-medium hover:bg-white/5 transition-colors">
                {t.featuresBtn}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3D Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100, rotateX: 25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-24 perspective-1000 relative"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full -z-10" />
          <div className="w-full max-w-5xl mx-auto glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative font-sans" dir="ltr">
             {/* MacOS style traffic lights */}
             <div className="h-12 bg-white/5 flex items-center px-6 gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="mx-auto text-xs font-medium text-foreground/40 hidden sm:block">{t.mockupHeader}</div>
             </div>
             
             {/* Mockup UI */}
             <div className="flex h-[400px] sm:h-[600px] bg-black/40">
                {/* Sidebar */}
                <div className="w-16 sm:w-64 border-r border-white/5 p-4 flex flex-col gap-4">
                  <div className="h-8 w-8 sm:w-full bg-white/10 rounded-md" />
                  <div className="h-8 w-8 sm:w-full bg-white/5 rounded-md" />
                  <div className="h-8 w-8 sm:w-full bg-white/5 rounded-md" />
                </div>
                {/* Main Content */}
                <div className="flex-1 p-6 sm:p-10 flex flex-col gap-6">
                  <div className="flex justify-between items-end">
                    <div className="h-8 w-40 bg-white/10 rounded-md" />
                    <div className="h-8 w-24 bg-brand-500/30 rounded-md" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="h-32 glass-panel rounded-xl p-6 flex flex-col justify-center">
                      <div className="text-foreground/50 text-sm mb-2">{t.statsWaitlist}</div>
                      <div className="text-3xl font-bold">1,840</div>
                    </div>
                    <div className="h-32 glass-panel rounded-xl p-6 flex flex-col justify-center border-t border-t-brand-500/50">
                      <div className="text-foreground/50 text-sm mb-2">{t.statsRevenue}</div>
                      <div className="text-3xl font-bold">$42,500</div>
                    </div>
                    <div className="h-32 glass-panel rounded-xl p-6 flex flex-col justify-center hidden sm:flex">
                      <div className="text-foreground/50 text-sm mb-2">Staff</div>
                      <div className="text-3xl font-bold">142</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 glass-panel rounded-xl border border-white/5 relative overflow-hidden">
                     {/* Fake Graph Lines */}
                     <svg className="absolute bottom-0 w-full h-[80%] text-brand-500/20" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,100 L0,50 Q25,80 50,30 T100,50 L100,100 Z" fill="currentColor" />
                     </svg>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-32 relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 flex flex-col items-center">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 text-gradient inline-block ${isUr ? 'leading-[2.2] py-8 tracking-normal' : 'tracking-tight mb-6'}`}>
              {t.featuresHeader}
            </h2>
            <p className={`text-foreground/60 text-lg sm:text-xl max-w-2xl mx-auto ${isUr ? 'leading-[2]' : ''}`}>
              {t.featuresSub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {t.features.map((Feature, idx) => (
              <div 
                key={idx} 
                className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-foreground flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-500/20 group-hover:text-brand-400 group-hover:border-brand-500/30 transition-all duration-500">
                  <Feature.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className={`font-bold text-2xl mb-3 ${isUr ? 'leading-[1.8]' : ''}`}>{Feature.title}</h3>
                <p className={`text-foreground/50 text-base ${isUr ? 'leading-[2]' : ''}`}>{Feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
