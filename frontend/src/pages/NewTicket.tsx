import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Crear nuevo ticket</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Título</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Error al iniciar sesión"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Prioridad</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el problema..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear ticket
        </button>
      </form>
    </div>
  );
}
