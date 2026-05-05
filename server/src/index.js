const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tickets = [];
let idCounter = 1;

// GET todos los tickets
app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

// GET ticket por ID
app.get("/api/tickets/:id", (req, res) => {
  const ticket = tickets.find(t => t.id == req.params.id);
  if (!ticket) return res.status(404).json({ error: "No encontrado" });
  res.json(ticket);
});

// POST crear ticket
app.post("/api/tickets", (req, res) => {
  const newTicket = { id: idCounter++, status: "Abierto", ...req.body };
  tickets.push(newTicket);
  res.json(newTicket);
});

// PUT editar ticket
app.put("/api/tickets/:id", (req, res) => {
  const index = tickets.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "No encontrado" });

  tickets[index] = { ...tickets[index], ...req.body };
  res.json(tickets[index]);
});

// DELETE eliminar ticket
app.delete("/api/tickets/:id", (req, res) => {
  tickets = tickets.filter(t => t.id != req.params.id);
  res.json({ message: "Eliminado" });
});

app.listen(3000, () => console.log("Backend corriendo en http://localhost:3000"));
