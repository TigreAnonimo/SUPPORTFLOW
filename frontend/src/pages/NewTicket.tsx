import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppPages.css";

export default function NewTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTicket = {
      title,
      description,
      status,
      priority,
    };

    try {
      const res = await fetch("http://localhost:3000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTicket),
      });

      if (!res.ok) {
        throw new Error("Error al crear el ticket");
      }

      navigate("/tickets");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear el ticket");
    }
  };

  return (
    <div className="glass-card form-card">
      <h1 className="page-title">Crear Ticket</h1>

      <form onSubmit={handleSubmit} className="ticket-form">
        <div>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Error de acceso al panel de cliente"
          required
        />
        </div>

        <div>
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe el problema con el mayor detalle posible..."
          required
        />
        </div>

        <div className="ticket-form-row">
          <div>
            <label>Estado</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Abierto</option>
              <option value="pending">Pendiente</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>

          <div>
            <label>Prioridad</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-btn">
          Crear Ticket
        </button>
      </form>
    </div>
  );
}
