import pool from './db.js';

export const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

export const agregarPost = async (titulo, img, descripcion) => {
  const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  // Según los lineamientos, inicializamos likes en 0
  const valores = [titulo, img, descripcion, 0];
  const { rows } = await pool.query(consulta, valores);
  return rows;
};

// Requerimiento 1: Lógica para modificar (Likes)
export const darLike = async (id) => {
  // Esta consulta aumenta el contador de likes en 1 basado en el ID
  const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(consulta, [id]);
  return rows[0];
};

// Requerimiento 2: Lógica para eliminar
export const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(consulta, [id]);
  return rows[0];
};