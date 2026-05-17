"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const db_1 = require("../db");
exports.TicketModel = {
    async getAll() {
        const [rows] = await db_1.pool.query("SELECT * FROM tickets");
        return rows;
    },
    async getById(id) {
        const [rows] = await db_1.pool.query("SELECT * FROM tickets WHERE id = ?", [id]);
        return rows;
    },
    async create(ticket) {
        const { title, description, status, priority } = ticket;
        const [result] = await db_1.pool.query("INSERT INTO tickets (title, description, status, priority) VALUES (?, ?, ?, ?)", [title, description, status, priority]);
        return { id: result.insertId, ...ticket };
    },
    async update(id, ticket) {
        const { title, description, status, priority } = ticket;
        await db_1.pool.query("UPDATE tickets SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?", [title, description, status, priority, id]);
        return { id, ...ticket };
    },
    async delete(id) {
        await db_1.pool.query("DELETE FROM tickets WHERE id = ?", [id]);
    },
    // ⭐ NUEVO: estadísticas para el Dashboard
    async getStats() {
        const [rows] = await db_1.pool.query(`
      SELECT 
        SUM(status = 'open') AS open,
        SUM(status = 'closed') AS closed,
        SUM(status = 'pending') AS pending
      FROM tickets
    `);
        return rows[0];
    },
};
