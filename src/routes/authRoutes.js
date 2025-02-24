import express from "express";
import { register, login } from "../controllers/AuthControllers.js";

const router = express.Router();

// Ruta para registrar usuario
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);

export default router;
