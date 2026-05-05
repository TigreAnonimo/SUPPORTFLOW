import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando ticket:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Cargando ticket...</p>;
  }

  if (!ticket) {
    return <p className="text-red-500">Ticket no encontrado</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Ticket #{ticket.id}
      </h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-3">
        <p><strong>Título:</strong> {ticket.title}</p>
        <p><strong>Estado:</strong> {ticket.status}</p>
        <p><strong>Prioridad:</strong> {ticket.priority}</p>
        <p><strong>Descripción:</strong> {ticket.description}</p>
      </div>
    </div>
  );
}
