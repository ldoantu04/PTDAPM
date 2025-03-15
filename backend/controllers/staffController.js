import mongoose from 'mongoose';
import staffModel from '../models/staffModel.js';
import { cloudinary } from '../config/cloudinary.js';

// Lấy danh sách nhân sự
const getStaffs = async (req, res) => {
    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Staff = db.model('staffs', staffModel.schema);
        
        const staffs = await Staff.find({});
        res.status(200).json(staffs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm nhân sự mới
const addStaff = async (req, res) => {
    const { name, degree, status, department, position, email, phone, bio } = req.body;
    
    // Validate input
    if (!name || !degree || !status || !department || !position || !email) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
    }

    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Staff = db.model('staffs', staffModel.schema);
        
        // Kiểm tra email đã tồn tại chưa
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống' });
        }
        let thumbnailUrl = '';
        if (req.file) {
            try {
                console.log("Uploading file:", req.file.path);
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: 'image',
                    folder: 'staff_thumbnails'
                });
                console.log("Upload successful, result:", result);
                thumbnailUrl = result.secure_url;
            } catch (uploadError) {
                console.error("Upload error:", uploadError);
                return res.status(400).json({ message: 'Lỗi khi tải ảnh lên: ' + uploadError.message });
            }
        }

        
        // Tạo nhân sự mới
        const newStaff = new Staff({
            name,
            degree,
            status,
            department,
            position,
            email,
            phone,
            bio,
            thumbnail: thumbnailUrl
        });
        
        await newStaff.save();
        res.status(201).json({ message: 'Thêm nhân sự thành công', staff: newStaff });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật nhân sự
const updateStaff = async (req, res) => {
    // Implement later
    res.status(200).json({ message: 'Update staff functionality will be implemented later' });
};

// Lấy thông tin chi tiết nhân sự
const getStaffById = async (req, res) => {
    // Implement later
    res.status(200).json({ message: 'Get staff by ID functionality will be implemented later' });
};

export { getStaffs, addStaff, updateStaff, getStaffById };