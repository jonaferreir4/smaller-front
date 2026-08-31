import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import Logo from "./logo";

export function Header() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Official Branding */}
        <Link to="/" aria-label="Smaller Home">
          <Logo size="md" />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800 text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;