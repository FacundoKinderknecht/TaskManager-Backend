import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registrar un nuevo usuario
export const register = async (req, res) => {
  try {
    const { username, email, telefono, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      telefono,
      password: hashedPassword,
    });

    await newUser.save();

    // Generar token JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Usuario registrado correctamente", token });
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario por nombre de usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("❌ Error en el login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
