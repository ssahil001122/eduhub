"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, X, LayoutDashboard, Users, BookOpen, 
  TrendingUp, Settings, ShieldCheck, GraduationCap
} from "lucide-react"

// Expert Level Routing by Role
const navLinks = {
  ADMIN: [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Staff & Teachers", icon: Users, path: "/dashboard/staff" },
    { name: "Students", icon: GraduationCap, path: "/dashboard/students" },
    { name: "Finances", icon: TrendingUp, path: "/dashboard/finances" },
    { name: "System Settings", icon: Settings, path: "/dashboard/settings" },
  ],
  TEACHER: [
    { name: "My Classes", icon: BookOpen, path: "/dashboard" },
    { name: "Attendance", icon: ShieldCheck, path: "/dashboard/attendance" },
    { name: "Students Info", icon: Users, path: "/dashboard/students" },
  ],
  ACCOUNTANT: [
    { name: "Financial Overview", icon: TrendingUp, path: "/dashboard" },
    { name: "Fee Collection", icon: Users, path: "/dashboard/fees" },
  ]
}

export default function DashboardNavigation({ role }: { role: string }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false) // For mobile
  const [isCollapsed, setIsCollapsed] = useState(false) // For desktop
  
  const links = navLinks[role as keyof typeof navLinks] || []

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-500 rounded-full shadow-[0_0_20px_rgba(var(--brand-500),0.4)] flex items-center justify-center text-white sm:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : (typeof window !== "undefined" && window.innerWidth >= 640 ? 0 : -300) }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed sm:relative inset-y-0 left-0 z-50 bg-background/80 backdrop-blur-2xl border-r border-white/5 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">E</div>
              <span className="font-bold tracking-tight">Eduhub</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">E</div>
            </div>
          )}
          
          <button onClick={() => setIsOpen(false)} className="sm:hidden text-foreground/50 hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link 
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-brand-500/10 text-brand-400 font-bold border border-brand-500/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]'
                    : 'text-foreground/60 hover:bg-white/5 hover:text-foreground border border-transparent'
                }`}
              >
                <link.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-400' : 'text-foreground/40 group-hover:text-foreground'}`} />
                {!isCollapsed && <span>{link.name}</span>}
              </Link>
            )
          })}
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="p-4 border-t border-white/5 hidden sm:block">
           <button 
             onClick={() => setIsCollapsed(!isCollapsed)}
             className="w-full flex justify-center py-2 text-foreground/40 hover:text-foreground transition-colors glass-panel rounded-lg"
           >
             <Menu className="w-5 h-5" />
           </button>
        </div>
      </motion.aside>
    </>
  )
}
