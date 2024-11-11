import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}

export const authentication = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Token no proporcionado' });
            return;
        }

        const decoded = verifyToken(token) as { id: number; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};