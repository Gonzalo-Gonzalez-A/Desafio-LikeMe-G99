import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_password',
  database: 'likeme',
  port: 5432,
  allowExitOnIdle: true
});

export default pool;