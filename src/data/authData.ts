import { db } from '../database/database';
import { IUser } from '../interfaces/userInterface';

export class AuthData {
    async findUserByEmail(email: string): Promise<IUser | null> {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0] || null;
    }
}

export const authData = new AuthData();