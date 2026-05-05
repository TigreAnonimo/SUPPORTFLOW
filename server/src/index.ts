import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketRoutes from "./routes/ticket.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});
