import { pool } from "../db";

export interface Ticket {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at?: Date;
}

export const TicketModel = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM tickets");
    return rows;
  },

  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM tickets WHERE id = ?", [id]);
    return rows;
  },

  async create(ticket: Ticket) {
    const { title, description, status, priority } = ticket;
    const [result]: any = await pool.query(
      "INSERT INTO tickets (title, description, status, priority) VALUES (?, ?, ?, ?)",
      [title, description, status, priority]
    );
    return { id: result.insertId, ...ticket };
  },

  async update(id: number, ticket: Ticket) {
    const { title, description, status, priority } = ticket;
    await pool.query(
      "UPDATE tickets SET title=?, description=?, status=?, priority=? WHERE id=?",
      [title, description, status, priority, id]
    );
    return { id, ...ticket };
  },

  async delete(id: number) {
    await pool.query("DELETE FROM tickets WHERE id = ?", [id]);
    return true;
  },
};
