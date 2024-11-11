import { Request, Response } from 'express';
import { authService } from '../services/authService';

export class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const { email, password } = req.body;
            const result = await authService.validateCredentials(email, password);

            if (!result.success) {
                res.status(401).json({ message: 'Credenciales inválidas' });
                return;
            }

            res.json({ token: result.token });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor' + error });
        }
    }
}

export const authController = new AuthController();