import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";

const JWT_SECRET = "supersecretkey123"; // cámbiala luego

export const AuthController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await UserModel.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create(email, hashedPassword);

    res.json({ message: "Usuario registrado", user: newUser });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login exitoso", token });
  }
};
