"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const db_1 = require("../db");
exports.UserModel = {
    async create(email, password) {
        const [result] = await db_1.pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
        return { id: result.insertId, email };
    },
    async findByEmail(email) {
        const [rows] = await db_1.pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }
};
