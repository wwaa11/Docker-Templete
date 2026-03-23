import LoginForm from '@/components/auth/LoginForm';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-primary/5 -skew-y-6 -translate-y-24 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-secondary/5 skew-y-6 translate-y-24 pointer-events-none" />

      {/* Main Login UI */}
      <div className="z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <LoginForm />
      </div>

      {/* Footer / Copyright */}
      <div className="absolute bottom-6 text-center text-xs opacity-40 uppercase tracking-widest font-bold">
        © 2026 Healthcare Management System • Secure Portal
      </div>
    </main>
  );
}

