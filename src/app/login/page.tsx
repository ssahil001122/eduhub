import LoginForm from "@/components/login-form";

export const metadata = {
  title: "Login - Eduhub System",
  description: "Secure login portal for Eduhub Management System",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      
      <div className="relative z-10 w-full max-w-md p-6">
        <LoginForm />
      </div>
    </div>
  );
}
