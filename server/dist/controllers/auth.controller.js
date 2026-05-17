"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const JWT_SECRET = "supersecretkey123"; // cámbiala luego
exports.AuthController = {
    async register(req, res) {
        const { email, password } = req.body;
        const userExists = await user_model_1.UserModel.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await user_model_1.UserModel.create(email, hashedPassword);
        res.json({ message: "Usuario registrado", user: newUser });
    },
    async login(req, res) {
        const { email, password } = req.body;
        const user = await user_model_1.UserModel.findByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "Correo o contraseña incorrectos" });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Correo o contraseña incorrectos" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ message: "Login exitoso", token });
    }
};
