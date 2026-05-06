import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AppPages.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // Estado para estadísticas (cuando conectemos backend)
  const stats = {
    open: 12,
    closed: 34,
    pending: 5,
  };

  // Validación de sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <h2 className="stat-label">Tickets abiertos</h2>
          <p className="stat-value">{stats.open}</p>
        </div>

        <div className="glass-card stat-card">
          <h2 className="stat-label">Tickets cerrados</h2>
          <p className="stat-value">{stats.closed}</p>
        </div>

        <div className="glass-card stat-card">
          <h2 className="stat-label">Pendientes</h2>
          <p className="stat-value">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}
