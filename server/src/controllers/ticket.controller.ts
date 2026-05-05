import { Request, Response } from "express";
import { TicketModel } from "../models/ticket.model";

export const TicketController = {
  async getAll(req: Request, res: Response) {
    try {
      const tickets = await TicketModel.getAll();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los tickets" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ticket = await TicketModel.getById(id);

      if (!ticket || (Array.isArray(ticket) && ticket.length === 0)) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el ticket" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const newTicket = await TicketModel.create(req.body);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el ticket" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updatedTicket = await TicketModel.update(id, req.body);
      res.json(updatedTicket);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el ticket" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await TicketModel.delete(id);
      res.json({ message: "Ticket eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el ticket" });
    }
  },
};
