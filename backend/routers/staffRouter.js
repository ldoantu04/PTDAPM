import express from 'express';
import { getStaffs, addStaff, updateStaff, getStaffById } from '../controllers/staffController.js';
import upload from '../middleware/multer.js';

const staffRouter = express.Router();

// Route quản lý nhân sự
staffRouter.get('/staff', getStaffs);
staffRouter.post('/staff', upload.single('thumbnail'), addStaff);
staffRouter.get('/staff/:id', getStaffById);
staffRouter.put('/staff/:id', upload.single('thumbnail'), updateStaff);

export default staffRouter;