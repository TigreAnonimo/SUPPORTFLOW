import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppPages.css";

interface Ticket {
  id: number;
  title: string;
  status: "open" | "closed" | "pending";
  priority: "low" | "medium" | "high";
  date: string;
}

export default function Tickets() {
  const navigate = useNavigate();

  // Datos mock por ahora (luego los conectamos al backend)
  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      title: "Error en login",
      status: "open",
      priority: "high",
      date: "2024-05-01",
    },
    {
      id: 2,
      title: "No carga el dashboard",
      status: "pending",
      priority: "medium",
      date: "2024-05-02",
    },
    {
      id: 3,
      title: "Problema con notificaciones",
      status: "closed",
      priority: "low",
      date: "2024-05-03",
    },
  ]);

  // Validación de sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tickets</h1>
        <button onClick={() => navigate("/tickets/new")} className="primary-btn">
          Crear Ticket
        </button>
      </div>

      <div className="glass-card tickets-table-wrap">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>
                  <span className={`pill pill-${ticket.status}`}>{ticket.status}</span>
                </td>
                <td>
                  <span className={`pill pill-${ticket.priority}`}>{ticket.priority}</span>
                </td>
                <td>{ticket.date}</td>
                <td className="row-actions">
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
                    onClick={() => alert("Eliminar ticket " + ticket.id)}
                    className="action-link"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
