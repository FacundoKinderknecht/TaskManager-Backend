import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import connectDB from './config/db.js';

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
const corsOptions = {
  origin: ["https://facundokinderknecht.github.io"], // Permitir GitHub Pages
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/tasks', taskRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('API TaskManager funcionando');
});

// Servidor corriendo
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
