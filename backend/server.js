const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Verificar conexión a la base de datos
pool.connect()
    .then(() => console.log('✅ Conectado exitosamente a la base de datos PostgreSQL'))
    .catch(err => console.error('❌ Error de conexión a la base de datos', err.stack));

app.get('/', (req, res) => {
    res.send('API Backend con Base de Datos funcionando 🚀');
});

// Endpoint de ejemplo con DB
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Conexión a DB exitosa', time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error consultando la base de datos' });
    }
});

// Endpoint de Dashboard (Hardcoded por ahora, luego se puede mover a DB)
app.get('/api/stats', (req, res) => {
    res.json({
        totalClients: 1234,
        accountBalance: "$ 46,760.89",
        newSales: 376,
        pendingContacts: 35
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
