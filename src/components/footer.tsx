import { Link } from "react-router-dom";
import Logo from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950 py-8 text-slate-400 text-sm">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" aria-label="Smaller Home">
          <Logo size="sm" />
        </Link>

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