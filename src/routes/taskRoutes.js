import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskControllers.js";
import  verifyToken  from "../middleware/authmiddleware.js"; //Importamos el middleware de autenticación
import Task from "../models/Task.js";
const router = express.Router();


router.get("/", verifyToken, getTasks); 
router.post("/", verifyToken, createTask);  
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

// Obtener una tarea por ID (Solo si pertenece al usuario autenticado)
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea" });
    }
});

export default router;
