"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // ⭐ NUEVO
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ⭐ Rutas de autenticación
app.use("/api/auth", auth_routes_1.default);
// ⭐ Rutas de tickets
app.use("/api/tickets", ticket_routes_1.default);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});
