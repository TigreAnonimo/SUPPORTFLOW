import { pool } from "../db";

export const UserModel = {
  async create(email: string, password: string) {
    const [result]: any = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );

    return { id: result.insertId, email };
  },

  async findByEmail(email: string) {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0];
  }
};
