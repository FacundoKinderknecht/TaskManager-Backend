import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import verifyToken from "../middleware/authmiddleware.js";



const router = express.Router();

router.post("/auth/register", async (req, res) => {
  const { username, email, telefono, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "El nombre de usuario ya está en uso" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: "El email ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      telefono,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/edit-task/:id", verifyToken, async (req, res) => {
  try {
      const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
      if (!task) {
          return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.json(task);
  } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error });
  }
});


export default router;
