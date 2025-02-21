import express from 'express';
const router = express.Router();

// Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: "API TaskManager funcionando correctamente" });
});

export default router;
