import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error("Error cargando tickets:", err));
  }, []);

  // ⭐ FUNCIÓN PARA ELIMINAR
  async function handleDelete(id: number) {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este ticket?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      // Actualizar tabla sin recargar
      setTickets((prev) => prev.filter((t: any) => t.id !== id));
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al eliminar el ticket");
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Tickets</h1>

        <Link
          to="/tickets/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nuevo Ticket
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Título</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Prioridad</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t: any) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.id}</td>
                <td className="p-3">{t.title}</td>
                <td className="p-3">{t.status}</td>
                <td className="p-3">{t.priority}</td>

                {/* ⭐⭐⭐ ACCIONES COMPLETAS ⭐⭐⭐ */}
                <td className="p-3 flex gap-3">
                  <Link
                    to={`/tickets/${t.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Ver detalle
                  </Link>

                  <Link
                    to={`/tickets/edit/${t.id}`}
                    className="text-green-600 hover:underline"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
                {/* ⭐⭐⭐ FIN ACCIONES ⭐⭐⭐ */}
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hay tickets todavía
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
