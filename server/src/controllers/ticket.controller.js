"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const ticket_model_1 = require("../models/ticket.model");
exports.TicketController = {
    async getAll(req, res) {
        try {
            const tickets = await ticket_model_1.TicketModel.getAll();
            res.json(tickets);
        }
        catch (error) {
            res.status(500).json({ error: "Error al obtener los tickets" });
        }
    },
    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const ticket = await ticket_model_1.TicketModel.getById(id);
            if (!ticket || (Array.isArray(ticket) && ticket.length === 0)) {
                return res.status(404).json({ error: "Ticket no encontrado" });
            }
            res.json(ticket);
        }
        catch (error) {
            res.status(500).json({ error: "Error al obtener el ticket" });
        }
    },
    async create(req, res) {
        try {
            const newTicket = await ticket_model_1.TicketModel.create(req.body);
            res.status(201).json(newTicket);
        }
        catch (error) {
            res.status(500).json({ error: "Error al crear el ticket" });
        }
    },
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const updatedTicket = await ticket_model_1.TicketModel.update(id, req.body);
            res.json(updatedTicket);
        }
        catch (error) {
            res.status(500).json({ error: "Error al actualizar el ticket" });
        }
    },
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await ticket_model_1.TicketModel.delete(id);
            res.json({ message: "Ticket eliminado" });
        }
        catch (error) {
            res.status(500).json({ error: "Error al eliminar el ticket" });
        }
    },
    // ⭐ NUEVO: estadísticas para el Dashboard
    async getStats(req, res) {
        try {
            const stats = await ticket_model_1.TicketModel.getStats();
            res.json(stats);
        }
        catch (error) {
            res.status(500).json({ error: "Error al obtener estadísticas" });
        }
    },
};
