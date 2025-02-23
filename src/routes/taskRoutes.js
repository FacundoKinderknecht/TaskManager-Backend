import express from 'express';
import { verifyToken } from '../middleware/authmiddleware.js';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskControllers.js';

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
