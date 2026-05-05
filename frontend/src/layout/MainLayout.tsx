import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      
      {/* NAVBAR */}
      <nav className="bg-slate-800/80 backdrop-blur border-b border-white/10 px-6 py-4 flex gap-6 shadow-lg shadow-black/20">
        <Link to="/dashboard" className="font-medium hover:text-indigo-400 transition">
          Dashboard
        </Link>
        <Link to="/tickets" className="font-medium hover:text-indigo-400 transition">
          Tickets
        </Link>
      </nav>

      {/* CONTENIDO */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
