import { db } from '../database/database';
import { IUser } from '../interfaces/userInterface';
import { ICSVRow } from '../interfaces/csvRowInterface';

export class UploadData {
    async createUser(userData: ICSVRow): Promise<IUser> {
        const { name, email, age } = userData;
        const result = await db.query(
            'INSERT INTO users (name, email, age, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, age ? parseInt(age) : null, 'user']
        );
        return result.rows[0];
    }
}

export const uploadData = new UploadData();
