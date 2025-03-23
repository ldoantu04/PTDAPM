import express from 'express';
import { getPosts, getPostById, getPostsByCategory, addPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Các endpoints API cho bài viết
router.get('/', getPosts);
router.get('/category/:category_id', getPostsByCategory);
router.get('/:id', getPostById);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;