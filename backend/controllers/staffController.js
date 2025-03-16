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
    const { id } = req.params;
    const { name, degree, status, department, position, email, phone, bio } = req.body;
    
    // Validate input
    if (!name || !degree || !status || !department || !position || !email) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc' });
    }

    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Staff = db.model('staffs', staffModel.schema);
        
        // Kiểm tra nhân sự có tồn tại không
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ message: 'Không tìm thấy nhân sự' });
        }
        
        // Nếu email thay đổi, kiểm tra email mới đã tồn tại chưa
        if (email !== staff.email) {
            const existingStaff = await Staff.findOne({ email, _id: { $ne: id } });
            if (existingStaff) {
                return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống' });
            }
        }
        
        // Xử lý upload ảnh mới nếu có
        let thumbnailUrl = staff.thumbnail || '';
        if (req.file) {
            try {
                // Nếu đã có ảnh cũ và có public_id, xóa ảnh cũ trên cloudinary
                if (staff.thumbnail && staff.public_id) {
                    await cloudinary.uploader.destroy(staff.public_id);
                }
                
                // Upload ảnh mới
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: 'image',
                    folder: 'staff_thumbnails'
                });
                thumbnailUrl = result.secure_url;
                staff.public_id = result.public_id;
            } catch (uploadError) {
                console.error("Upload error:", uploadError);
                return res.status(400).json({ message: 'Lỗi khi tải ảnh lên: ' + uploadError.message });
            }
        }
        
        // Cập nhật thông tin
        staff.name = name;
        staff.degree = degree;
        staff.status = status;
        staff.department = department;
        staff.position = position;
        staff.email = email;
        staff.phone = phone;
        staff.bio = bio;
        if (thumbnailUrl) {
            staff.thumbnail = thumbnailUrl;
        }
        
        await staff.save();
        res.status(200).json({ message: 'Cập nhật thông tin nhân sự thành công', staff });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Also implement the getStaffById function
const getStaffById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Staff = db.model('staffs', staffModel.schema);
        
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ message: 'Không tìm thấy nhân sự' });
        }
        
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa nhân sự
const deleteStaff = async (req, res) => {
    const { id } = req.params;
    
    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Staff = db.model('staffs', staffModel.schema);
        
        // Tìm nhân sự để lấy thông tin thumbnail
        const staff = await Staff.findById(id);
        
        if (!staff) {
            return res.status(404).json({ message: 'Không tìm thấy nhân sự' });
        }
        
        // Nếu có ảnh trên cloudinary, xóa ảnh
        if (staff.public_id) {
            try {
                await cloudinary.uploader.destroy(staff.public_id);
            } catch (cloudinaryError) {
                console.error("Error deleting image from Cloudinary:", cloudinaryError);
                // Vẫn tiếp tục xóa nhân sự trong DB ngay cả khi không xóa được ảnh
            }
        }
        
        // Xóa nhân sự từ database
        await Staff.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Xóa nhân sự thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getStaffs, addStaff, updateStaff, getStaffById, deleteStaff };