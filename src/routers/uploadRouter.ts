import { Router } from 'express';
import { UploadController } from '../controllers/uploadController';
import { authentication } from '../middlewares/authenticationMiddleware';
import { authorize } from '../middlewares/authorizeMiddleware';
import multer from 'multer';

const router = Router();
const uploadController = new UploadController();
const upload = multer({ dest: 'uploads/' });

router.post(
    '/csv',
    authentication,
    authorize('admin'),
    upload.single('file'),
    uploadController.uploadCSV
);

export default router;