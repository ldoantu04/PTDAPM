import mongoose from 'mongoose';
import postModel from '../models/postModel.js';
import categorieModel from '../models/categorieModel.js';

// Lấy tất cả bài viết
const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        res.status(500).json({ message: error.message });
    }
};

// Lấy bài viết theo ID
const getPostById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài viết:", error);
        res.status(500).json({ message: error.message });
    }
};

// Lấy bài viết theo danh mục
const getPostsByCategory = async (req, res) => {
    const { category_id } = req.params;
    
    try {
        // Tìm danh mục con
        const childCategories = await categorieModel.find({ parent_id: category_id });
        const childCategoryIds = childCategories.map(cat => cat._id.toString());
        
        // Tìm bài viết trong danh mục chính và các danh mục con
        const categoryIds = [category_id, ...childCategoryIds];
        const posts = await postModel.find({ category_id: { $in: categoryIds } });
        
        res.status(200).json(posts);
    } catch (error) {
        console.error("Lỗi khi lấy bài viết theo danh mục:", error);
        res.status(500).json({ message: error.message });
    }
};

// Thêm bài viết mới
const addPost = async (req, res) => {
    const { title, thumbnail, detail, images, category_id, account_id } = req.body;

    if (!title || !detail || !category_id || !account_id) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bài viết' });
    }

    try {
        // Tạo bài viết mới
        const newPost = new postModel({
            title,
            thumbnail,
            detail,
            images: images || [],
            category_id,
            account_id,
            created_at: new Date(),
            updated_at: new Date()
        });

        const savedPost = await newPost.save();
        console.log("Đã lưu bài viết thành công:", savedPost);
        
        res.status(201).json({ 
            message: 'Bài viết đã được tạo thành công', 
            post: savedPost
        });
    } catch (error) {
        console.error("Lỗi khi lưu bài viết:", error);
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật bài viết
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, thumbnail, detail, images, category_id } = req.body;

    try {
        // Kiểm tra bài viết có tồn tại không
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }

        // Cập nhật thông tin
        const updatedPost = await postModel.findByIdAndUpdate(
            id, 
            {
                title,
                thumbnail,
                detail,
                images,
                category_id,
                updated_at: new Date()
            },
            { new: true } // Trả về dữ liệu sau khi cập nhật
        );

        res.status(200).json({ 
            message: 'Cập nhật bài viết thành công',
            post: updatedPost
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật bài viết:", error);
        res.status(500).json({ message: error.message });
    }
};

// Xóa bài viết
const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        // Kiểm tra bài viết có tồn tại không
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }

        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Bài viết đã được xóa thành công' });
    } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
        res.status(500).json({ message: error.message });
    }
};

export { getPosts, getPostById, getPostsByCategory, addPost, updatePost, deletePost };