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