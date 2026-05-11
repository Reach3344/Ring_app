const mysql = require('mysql2/promise');
const env = require('../src/config/env');

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: env.db.connectionLimit,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  namedPlaceholders: true,
  charset: 'utf8mb4',
  timezone: '+00:00',
});

async function testConnection() {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.ping();

    const [rows] = await connection.query('SELECT VERSION() AS version');

    console.log('Database connected successfully');
    console.log(`   Host: ${env.db.host}:${env.db.port}`);
    console.log(`   Database: ${env.db.database}`);
    console.log(`   Version: ${rows[0]?.version || 'unknown'}`);

    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  pool,
  testConnection,
};
