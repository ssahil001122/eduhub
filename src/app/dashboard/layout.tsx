import { auth } from "@/auth";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar role={session.user.role} />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full h-full">
        {/* Top Navigation */}
        <Topbar user={session.user} />
        
        {/* Main Viewport */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 border-t border-l border-slate-800 md:rounded-tl-3xl shadow-[inset_0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
