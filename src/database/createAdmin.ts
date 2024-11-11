import { db } from './database';
import { AuthService } from '../services/authService';
import dotenv from 'dotenv';

dotenv.config();

async function createAdminUser() {
    try {
        const hashedPassword = await AuthService.hashPassword('admin123');

        await db.query(
            'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
            ['Admin', 'admin@example.com', 'admin', hashedPassword]
        );

        console.log('Usuario admin creado exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('Error creando usuario admin:', error);
        process.exit(1);
    }
}

createAdminUser();