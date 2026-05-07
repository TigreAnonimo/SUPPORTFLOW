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
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold">Tickets abiertos</h2>
          <p className="text-4xl font-bold mt-2 text-blue-600">{stats.open}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg border-l-4 border-green-500">
          <h2 className="text-xl font-semibold">Tickets cerrados</h2>
          <p className="text-4xl font-bold mt-2 text-green-600">{stats.closed}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold">Pendientes</h2>
          <p className="text-4xl font-bold mt-2 text-yellow-600">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}
