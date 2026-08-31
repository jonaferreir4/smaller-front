import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950 py-8 text-slate-400 text-sm">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
            S
          </div>
          <span className="font-medium text-slate-300">Smaller</span>
        </div>

        <nav className="flex items-center gap-6 text-xs text-slate-400">
          <Link to="/" className="hover:text-slate-200 transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-slate-200 transition-colors">
            Dashboard
          </Link>
        </nav>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Smaller. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;