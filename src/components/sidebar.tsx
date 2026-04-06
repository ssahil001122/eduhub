import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, CreditCard, Settings, CheckCircle } from "lucide-react";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "teacher", "accountant", "student"] },
    { name: "Manage Users", href: "/dashboard/users", icon: Users, roles: ["admin"] },
    { name: "Classes & Subjects", href: "/dashboard/classes", icon: BookOpen, roles: ["admin", "teacher"] },
    { name: "Attendance", href: "/dashboard/attendance", icon: CheckCircle, roles: ["admin", "teacher"] },
    { name: "Fees & Invoices", href: "/dashboard/finance", icon: CreditCard, roles: ["admin", "accountant"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["admin"] },
  ];

  const filteredLinks = links.filter(link => link.roles.includes(role));

  return (
    <div className="w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-inner">
            <span className="text-white font-bold text-sm">EH</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Eduhub</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
          Menu
        </div>
        {filteredLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors group"
            >
              <Icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
