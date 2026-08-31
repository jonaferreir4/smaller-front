import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 blur-[130px] rounded-full opacity-70 animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-60 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full opacity-40"
        aria-hidden="true"
      />

      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;