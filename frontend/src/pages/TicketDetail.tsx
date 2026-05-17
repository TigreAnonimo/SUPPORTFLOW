import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AppPages.css";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  // Estado del ticket cargado y bandera para manejar estado de carga.
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Carga la información de un ticket específico por ID.
  useEffect(() => {
    fetch(`${API_URL}/api/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Backend devuelve array → tomamos el primer elemento
        setTicket(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando ticket:", err);
        setLoading(false);
      });
  }, [id, API_URL]);

  // Estados de UI para carga o ausencia de datos.
  if (loading) {
    return <p className="text-gray-500">Cargando ticket...</p>;
  }

  if (!ticket) {
    return <p className="text-red-500">Ticket no encontrado</p>;
  }

  // Vista detallada del ticket con navegación de regreso y edición.
  return (
    <div className="glass-card max-w-2xl mx-auto p-8 rounded-2xl shadow-lg">
      <h1 className="page-title mb-6 text-center">
        Ticket #{ticket.id}
      </h1>

      <div className="space-y-4 text-lg">
        <p><strong>Título:</strong> {ticket.title}</p>

        <p>
          <strong>Estado:</strong>{" "}
          <span className={`pill pill-${ticket.status}`}>
            {ticket.status}
          </span>
        </p>

        <p>
          <strong>Prioridad:</strong>{" "}
          <span className={`pill pill-${ticket.priority}`}>
            {ticket.priority}
          </span>
        </p>

        <p><strong>Descripción:</strong></p>
        <p className="description-card">
          {ticket.description}
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate("/tickets")}
          className="primary-btn"
        >
          Volver
        </button>

        <button
          onClick={() => navigate(`/tickets/edit/${ticket.id}`)}
          className="primary-btn"
        >
          Editar Ticket
        </button>
      </div>
    </div>
  );
}
