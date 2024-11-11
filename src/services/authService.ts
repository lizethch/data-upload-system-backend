import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';
import { authData } from '../data/authData';

interface ValidationResult {
    success: boolean;
    token?: string;
}

export class AuthService {
    async validateCredentials(email: string, password: string): Promise<ValidationResult> {
        const user = await authData.findUserByEmail(email);

        if (!user?.password) {
            return { success: false };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { success: false };
        }

        const token = generateToken(user.id, user.role);
        return { success: true, token };
    }

    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const authService = new AuthService();