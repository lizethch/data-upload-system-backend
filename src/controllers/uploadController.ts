import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticationMiddleware';
import { uploadService } from '../services/uploadService';

export class UploadController {
    async uploadCSV(req: AuthRequest, res: Response): Promise<void> {
        if (!req.file) {
            res.status(400).json({ message: 'No se proporcionó ningún archivo' });
            return;
        }

        try {
            const results = await uploadService.processCSVFile(req.file.path);
            res.json({ ok: true, data: results });
        } catch (error) {
            res.status(500).json({ message: 'Error al procesar el archivo' });
        }
    }
}

export const uploadController = new UploadController();