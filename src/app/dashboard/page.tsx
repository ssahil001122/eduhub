import { auth } from "@/auth";

export const metadata = {
  title: "Dashboard - Eduhub System",
};

export default async function DashboardPage() {
  const session = await auth();
  const role = session?.user?.role;
  const name = session?.user?.name || "User";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Welcome back, {name}!
        </h1>
        <p className="text-slate-400">
          Here is what's happening with your school today.
        </p>
      </div>

      {role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Students" value="1,245" trend="+12%" positive />
          <StatCard title="Total Teachers" value="103" trend="+2%" positive />
          <StatCard title="Revenue (MTD)" value="$45,210" trend="+8%" positive />
          
          <div className="col-span-1 md:col-span-3 bg-slate-950 border border-slate-800 rounded-3xl p-6 mt-4">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Admin Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition">Register New User</button>
              <button className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl hover:bg-slate-700 transition">View System Logs</button>
            </div>
          </div>
        </div>
      )}

      {role === "teacher" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="My Classes Today" value="5" trend="" positive />
          <StatCard title="Assignments Pending" value="14" trend="-3" positive={false} />
          
          <div className="col-span-1 md:col-span-2 bg-slate-950 border border-slate-800 rounded-3xl p-6 mt-4">
            <h2 className="text-xl font-semibold text-white mb-4">Upcoming Schedule</h2>
            <p className="text-slate-500 italic">No classes scheduled in the next hour.</p>
          </div>
        </div>
      )}

      {role === "accountant" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="Pending Invoices" value="124" trend="Action Needed" positive={false} />
          <StatCard title="Collections Today" value="$2,450" trend="+15%" positive />
        </div>
      )}
      
      {role === "student" && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">You are officially enrolled.</h2>
          <p className="text-slate-400">Class schedule and assignments will appear here soon.</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, trend, positive }: { title: string, value: string, trend: string, positive?: boolean }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
      <h3 className="text-slate-400 font-medium text-sm mb-2 relative z-10">{title}</h3>
      <div className="flex items-end gap-3 relative z-10">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        {trend && (
          <span className={`text-sm font-semibold mb-1 ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
