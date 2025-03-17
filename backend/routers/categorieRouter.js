import express from 'express';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../controllers/categorieController.js';

const categorieRouter = express.Router();

// Route quản lý danh mục
categorieRouter.get('/categories', getCategories);
categorieRouter.post('/categories', addCategory);
categorieRouter.put('/categories/:id', updateCategory);
categorieRouter.delete('/categories/:id', deleteCategory);
// Bạn có thể thêm route để lấy danh mục theo ID nếu cần
// categorieRouter.get('/categories/:id', getCategoryById);

export default categorieRouter;