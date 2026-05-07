import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    open: 0,
    closed: 0,
    pending: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tickets/stats/all");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error obteniendo estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-100">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold text-slate-800">Tickets abiertos</h2>
          <p className="text-4xl font-extrabold mt-2 text-blue-800">{stats.open}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg border-l-4 border-green-600">
          <h2 className="text-xl font-semibold text-slate-800">Tickets cerrados</h2>
          <p className="text-4xl font-extrabold mt-2 text-green-800">{stats.closed}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg border-l-4 border-amber-600">
          <h2 className="text-xl font-semibold text-slate-800">Pendientes</h2>
          <p className="text-4xl font-extrabold mt-2 text-amber-800">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}
