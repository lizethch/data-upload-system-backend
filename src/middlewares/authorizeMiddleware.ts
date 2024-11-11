import { Response, NextFunction, RequestHandler } from "express";
import { AuthRequest } from "./authenticationMiddleware";

export function authorize(...allowedRoles: string[]): RequestHandler {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        const user = req.user;

        if (!user || !user.id) {
            res.status(401).json({
                success: false,
                message: "No autorizado",
                error: "Se requiere autenticación"
            });
            return;
        }

        if (!user.role) {
            res.status(401).json({
                success: false,
                message: "No autorizado",
                error: "Rol no definido"
            });
            return;
        }

        if (allowedRoles.includes(user.role)) {
            next();
            return;
        }

        res.status(403).json({
            success: false,
            message: "Acceso denegado",
            error: "No tiene los permisos necesarios"
        });
    };
}