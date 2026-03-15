import express from 'express';
import cors from 'cors';
import { obtenerPosts, agregarPost, darLike, eliminarPost } from './consultas.js';

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

// Requerimiento 1: Ruta PUT para los likes
// El frontend de apoyo suele llamar a /posts/like/:id
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params; // Capturamos el ID de la URL
    const post = await darLike(id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.send("Like agregado con éxito");
  } catch (error) {
    // Requerimiento 3: Captura de errores con try catch
    res.status(500).json({ error: "Error al procesar el like" });
  }
});

// Requerimiento 2: Ruta DELETE
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await eliminarPost(id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.send("Post eliminado con éxito");
  } catch (error) {
    // Requerimiento 3: Captura de errores con try catch
    res.status(500).json({ error: "Error al eliminar el post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT}`);
});

