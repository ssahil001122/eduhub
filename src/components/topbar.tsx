import { LogOut, Bell, Search, Menu } from "lucide-react";
import { signOut } from "@/auth";

interface TopbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function Topbar({ user }: TopbarProps) {
  return (
    <header className="h-16 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden md:flex items-center relative">
          <Search className="h-4 w-4 absolute left-3 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 border-l border-slate-800 pl-4 ml-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-sm font-semibold text-white leading-none">{user.name}</span>
            <span className="text-xs text-indigo-400 uppercase tracking-wider font-semibold mt-1">{user.role}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-[2px]">
            <div className="h-full w-full rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center">
              <span className="text-xs font-bold text-white">{user.name?.charAt(0)}</span>
            </div>
          </div>
          
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button title="Sign Out" className="p-2 ml-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10">
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
