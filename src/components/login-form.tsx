"use client";

import { useActionState, useState } from "react";
import { authenticate } from "@/app/actions/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  const t = {
    en: {
      welcome: "Welcome Back",
      subtitle: "Sign in to access Eduhub Management System",
      email: "Email Address",
      password: "Password",
      login: "Sign In",
      loggingIn: "Authenticating...",
      langToggle: "اردو"
    },
    ur: {
      welcome: "خوش آمدید",
      subtitle: "ایجو ہب مینجمنٹ سسٹم میں لاگ ان کریں",
      email: "ای میل ایڈریس",
      password: "پاس ورڈ",
      login: "لاگ ان کریں",
      loggingIn: "تصدیق ہو رہی ہے...",
      langToggle: "English"
    }
  };

  const isUrdu = lang === "ur";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl`}
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Top action bar */}
      <div className="absolute top-4 right-4 left-4 z-20 flex w-full justify-between items-center px-4" style={{ right: 0, left: 0 }}>
        <div /> {/* Spacer */}
        <button
          type="button"
          onClick={() => setLang(l => l === "en" ? "ur" : "en")}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 focus:outline-none"
        >
          <Globe className="h-4 w-4" />
          <span>{t[lang].langToggle}</span>
        </button>
      </div>

      <div className="relative z-10 pt-8 mt-4">
        <motion.div layout className="mb-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <h1 className="text-2xl font-bold tracking-tighter">EH</h1>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{t[lang].welcome}</h2>
          <p className="mt-2 text-slate-400">{t[lang].subtitle}</p>
        </motion.div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className={`pointer-events-none absolute inset-y-0 flex items-center text-slate-400 transition-colors group-focus-within:text-indigo-400 ${isUrdu ? 'pr-4 right-0' : 'pl-4 left-0'}`}>
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder={t[lang].email}
                required
                className={`w-full rounded-2xl border border-white/10 bg-black/20 py-4 text-white placeholder-slate-500 shadow-inner transition focus:border-indigo-500 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isUrdu ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              />
            </div>
            
            <div className="relative group">
              <div className={`pointer-events-none absolute inset-y-0 flex items-center text-slate-400 transition-colors group-focus-within:text-indigo-400 ${isUrdu ? 'pr-4 right-0' : 'pl-4 left-0'}`}>
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder={t[lang].password}
                required
                className={`w-full rounded-2xl border border-white/10 bg-black/20 py-4 text-white placeholder-slate-500 shadow-inner transition focus:border-indigo-500 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isUrdu ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              />
            </div>
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden rounded-xl bg-red-500/10"
              >
                <div className="p-3 flex items-center text-sm font-medium text-red-400">
                  <div className={`h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse ${isUrdu ? 'ml-2' : 'mr-2'}`}></div>
                  {errorMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isPending}
            className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t[lang].loggingIn}
                </>
              ) : (
                <>
                  {t[lang].login}
                  <ArrowRight className={`h-5 w-5 transition-transform ${isUrdu ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </>
              )}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-xs text-slate-500 mb-2">Test Accounts Database</p>
          <div className="flex justify-center gap-4 text-xs font-mono text-slate-400">
            <span>admin@eduhub.com</span>
            <span>/</span>
            <span>password123</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
