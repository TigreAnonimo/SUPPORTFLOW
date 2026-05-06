import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./MainLayout.css";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <h2 className="app-brand">SupportFlow</h2>
        <nav className="app-nav">
          <button
            onClick={() => navigate("/dashboard")}
            className="app-nav-btn"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/tickets")}
            className="app-nav-btn"
          >
            Tickets
          </button>

          <button
            onClick={() => navigate("/tickets/new")}
            className="app-nav-btn"
          >
            Crear Ticket
          </button>
        </nav>
      </aside>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}
