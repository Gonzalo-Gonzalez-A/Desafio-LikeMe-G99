import express from 'express';
import cors from 'cors';
import { obtenerPosts, agregarPost } from './consultas.js';

const app = express();
const PORT = 3000;

// Requerimiento 1: Habilitar CORS
app.use(cors());
app.use(express.json());

// Requerimiento 3: Ruta GET
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts" });
  }
});

// Requerimiento 4: Ruta POST
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body; 
    // Nota: El front de apoyo envía 'url' para la imagen
    await agregarPost(titulo, url, descripcion);
    res.status(201).send("Post creado con éxito");
  } catch (error) {
    res.status(500).json({ error: "Error al crear el post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT}`);
});