import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AppPages.css";

export default function EditTicket() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("medium");

  // Obtener ticket existente
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tickets/${id}`);
        const data = await res.json();

        setTitle(data[0].title);
        setDescription(data[0].description);
        setStatus(data[0].status);
        setPriority(data[0].priority);
      } catch (error) {
        console.error("Error al cargar ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  // Enviar actualización (PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTicket = {
      title,
      description,
      status,
      priority,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTicket),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el ticket");
      }

      navigate("/tickets");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar el ticket");
    }
  };

  return (
    <div className="glass-card form-card max-w-xl mx-auto p-8 rounded-2xl shadow-lg">
      <h1 className="page-title mb-6 text-center">Editar Ticket</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input-field h-28 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field"
            >
              <option value="open">Abierto</option>
              <option value="pending">Pendiente</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Prioridad</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input-field"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-btn w-full mt-4">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
