import express from 'express';

const router = express.Router();

// Ruta de prueba
router.get('/', (req, res) => {
  res.send('Rutas de tareas funcionando correctamente');
});

export default router;
