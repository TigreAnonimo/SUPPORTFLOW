import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Editar Ticket #{id}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Prioridad</label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
