import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AppPages.css";

export default function NewTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Media");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTicket = {
      title,
      priority,
      description,
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
      alert("Hubo un problema al crear el ticket");
    }
  }

  return (
    <div className="glass-card form-card">
      <h1 className="page-title">Crear nuevo ticket</h1>

      <form onSubmit={handleSubmit} className="form-stack">
        <div className="form-group">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="dark-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Error al iniciar sesión"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Prioridad</label>
          <select
            className="dark-field"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            className="dark-field"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el problema..."
            required
          />
        </div>

        <button type="submit" className="primary-btn">
          Crear ticket
        </button>
      </form>
    </div>
  );
}
