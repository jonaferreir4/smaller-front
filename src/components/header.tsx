// header.tsx
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-base-200 shadow-md">
            <div className="navbar container mx-auto">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">Smaller</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}