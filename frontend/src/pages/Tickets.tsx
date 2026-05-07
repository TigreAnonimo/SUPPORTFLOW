import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppPages.css";

interface Ticket {
  id: number;
  title: string;
  status: "open" | "closed" | "pending";
  priority: "low" | "medium" | "high";
  date?: string;
}

export default function Tickets() {
  const navigate = useNavigate();
  // Lista de tickets mostrada en la tabla principal.
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Obtener tickets reales del backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tickets");
        const data = await res.json();

        const formatted = data.map((t: any) => ({
          ...t,
          date: t.created_at?.split("T")[0] ?? "N/A",
        }));

        setTickets(formatted);
      } catch (error) {
        console.error("Error al obtener tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Validación de sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  // Eliminar ticket (DELETE)
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar este ticket?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el ticket");
      }

      // Actualizar tabla sin recargar
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar el ticket");
    }
  };

  // Vista de listado con acciones rápidas por ticket.
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tickets</h1>
        <button onClick={() => navigate("/tickets/new")} className="primary-btn">
          Crear Ticket
        </button>
      </div>

      <div className="glass-card tickets-table-wrap shadow-lg rounded-xl overflow-hidden">
        <table className="tickets-table w-full">
          <thead className="bg-gray-100/95 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Prioridad</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-3">{ticket.id}</td>
                <td className="p-3 font-semibold text-slate-100">{ticket.title}</td>

                <td className="p-3">
                  <span className={`pill pill-${ticket.status}`}>
                    {ticket.status}
                  </span>
                </td>

                <td className="p-3">
                  <span className={`pill pill-${ticket.priority}`}>
                    {ticket.priority}
                  </span>
                </td>

                <td className="p-3">{ticket.date}</td>

                <td className="p-3">
                  {/* Acciones disponibles para cada fila del listado */}
                  <div className="row-actions">
                    <button
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                      className="action-link"
                    >
                      Ver
                    </button>

                    <button
                      onClick={() => navigate(`/tickets/edit/${ticket.id}`)}
                      className="action-link"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="action-link text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
