import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ticketRoutes from "./routes/ticket.routes";
import authRoutes from "./routes/auth.routes"; // ⭐ NUEVO

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ⭐ Rutas de autenticación
app.use("/api/auth", authRoutes);

// ⭐ Rutas de tickets
app.use("/api/tickets", ticketRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});
