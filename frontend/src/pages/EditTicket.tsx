import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AppPages.css";

export default function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Media");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar datos del ticket
  useEffect(() => {
    fetch(`http://localhost:3000/api/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setPriority(data.priority);
        setDescription(data.description);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando ticket:", err));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const updatedTicket = {
      title,
      priority,
      description,
    };

    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTicket),
    });

    if (res.ok) {
      navigate("/tickets");
    } else {
      alert("Error al actualizar el ticket");
    }
  }

  if (loading) return <p className="form-help">Cargando...</p>;

  return (
    <div className="glass-card form-card">
      <h1 className="page-title">Editar Ticket #{id}</h1>

      <form onSubmit={handleSubmit} className="form-stack">
        <div className="form-group">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="dark-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            required
          />
        </div>

        <button type="submit" className="primary-btn">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
