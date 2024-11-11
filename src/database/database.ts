import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env["DATABASE_URL"];

if (!connectionString) {
    throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

console.log('Intentando conectar con:', connectionString.replace(/:[^:]*@/, ':****@')); // Oculta la contraseña en el log

export const db = new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
});

db.connect()
    .then(() => console.log('Conectado a la base de datos exitosamente'))
    .catch(err => {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1);
    });