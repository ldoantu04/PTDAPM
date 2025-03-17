import mongoose from 'mongoose';
import categorieModel from '../models/categorieModel.js'; // Import the updated model

// Lấy danh sách danh mục
const getCategories = async (req, res) => {
    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Category = db.model('categories', categorieModel.schema); // Use the updated model and schema

        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm danh mục mới
const addCategory = async (req, res) => {
    const { name, parent_id } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên danh mục' });
    }

    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Category = db.model('categories', categorieModel.schema);

        // Kiểm tra danh mục lớn nếu có
        let parentCategory = null;
        if (parent_id) {
            parentCategory = await Category.findById(parent_id);
            if (!parentCategory) {
                return res.status(400).json({ message: 'Danh mục lớn không tồn tại' });
            }
        }

        // Tạo tên danh mục theo format yêu cầu
        const formattedName = parentCategory ? `${name}` : name;

        // Kiểm tra danh mục đã tồn tại chưa
        const existingCategory = await Category.findOne({ name: formattedName });
        if (existingCategory) {
            return res.status(400).json({ message: 'Tên danh mục đã tồn tại' });
        }

        // Tạo danh mục mới
        const newCategory = new Category({
            name: formattedName,
            parent_id
        });

        await newCategory.save();
        res.status(201).json({ message: 'Danh mục đã được tạo thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Cập nhật danh mục
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, parent_id } = req.body; // Use the updated field name

    if (!name) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên danh mục' });
    }

    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Category = db.model('categories', categorieModel.schema); // Use the updated model and schema

        // Kiểm tra danh mục có tồn tại không
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }

        // Update thông tin
        category.name = name;
        if (parent_id !== undefined) {
            category.parent_id = parent_id;
        }

        await category.save();
        res.status(200).json({ message: 'Cập nhật danh mục thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Category = db.model('categories', categorieModel.schema);

        // Kiểm tra danh mục có tồn tại không
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }

        // Kiểm tra nếu danh mục có danh mục con
        const subCategories = await Category.find({ parent_id: id });
        if (subCategories.length > 0) {
            return res.status(400).json({ message: 'Không thể xoá danh mục vì có danh mục con' });
        }

        // Xoá danh mục
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Danh mục đã được xoá thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






export { getCategories, addCategory, updateCategory, deleteCategory };