"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = require("../controllers/ticket.controller");
const router = (0, express_1.Router)();
// ⭐ RUTA DE ESTADÍSTICAS (debe ir antes de /:id)
router.get("/stats/all", ticket_controller_1.TicketController.getStats);
// CRUD principal
router.get("/", ticket_controller_1.TicketController.getAll);
router.get("/:id", ticket_controller_1.TicketController.getById);
router.post("/", ticket_controller_1.TicketController.create);
router.put("/:id", ticket_controller_1.TicketController.update);
router.delete("/:id", ticket_controller_1.TicketController.delete);
exports.default = router;
