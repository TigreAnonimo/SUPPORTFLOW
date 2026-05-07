import { pool } from "../db";

export const TicketModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM tickets");
    return rows;
  },

  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM tickets WHERE id = ?", [id]);
    return rows;
  },

  async create(ticket: any) {
    const { title, description, status, priority } = ticket;

    const [result]: any = await pool.query(
      "INSERT INTO tickets (title, description, status, priority) VALUES (?, ?, ?, ?)",
      [title, description, status, priority]
    );

    return { id: result.insertId, ...ticket };
  },

  async update(id: number, ticket: any) {
    const { title, description, status, priority } = ticket;

    await pool.query(
      "UPDATE tickets SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?",
      [title, description, status, priority, id]
    );

    return { id, ...ticket };
  },

  async delete(id: number) {
    await pool.query("DELETE FROM tickets WHERE id = ?", [id]);
  },

  // ⭐ NUEVO: estadísticas para el Dashboard
  async getStats() {
    const [rows]: any = await pool.query(`
      SELECT 
        SUM(status = 'open') AS open,
        SUM(status = 'closed') AS closed,
        SUM(status = 'pending') AS pending
      FROM tickets
    `);

    return rows[0];
  },
};
