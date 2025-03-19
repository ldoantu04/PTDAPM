import mongoose from 'mongoose';
import accountModel from '../models/accountModel.js';

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Sử dụng cơ sở dữ liệu mặc định hoặc xác định cơ sở dữ liệu dựa trên logic của bạn
        const dbName = 'cse_tlu_website'; // Thay thế bằng tên cơ sở dữ liệu mặc định của bạn
        const db = mongoose.connection.useDb(dbName);
        const Account = db.model('accounts', accountModel.schema);

        const account = await Account.findOne({ username: username.trim() });

        if (account && account.password === password) {
            res.status(200).json({ role: account.role, message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh sách tài khoản
const getAccounts = async (req, res) => {
    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Account = db.model('accounts', accountModel.schema);
        
        const accounts = await Account.find({});
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm tài khoản mới
const addAccount = async (req, res) => {
    const { username, password, role } = req.body;
    
    // Validate input
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin' });
    }

    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Account = db.model('accounts', accountModel.schema);
        
        // Kiểm tra username đã tồn tại chưa
        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ message: 'Tên tài khoản đã tồn tại' });
        }
        
        // Hash mật khẩu trước khi lưu (nếu có bcrypt)
        // const hashedPassword = await bcrypt.hash(password, 10);
        
        // Tạo tài khoản mới
        const newAccount = new Account({
            username: username.trim(),
            password: password.trim(), // hoặc hashedPassword nếu dùng bcrypt
            role
        });
        
        await newAccount.save();
        res.status(201).json({ message: 'Tài khoản đã được tạo thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật tài khoản
const updateAccount = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    
    if (!username) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên tài khoản' });
    }

    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Account = db.model('accounts', accountModel.schema);
        
        // Kiểm tra tài khoản có tồn tại không
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }
        
        // Update thông tin
        account.username = username;
        
        // Nếu có mật khẩu mới, cập nhật mật khẩu
        if (password) {
            // Nếu dùng bcrypt, hash mật khẩu mới
            // account.password = await bcrypt.hash(password, 10);
            account.password = password;
        }
        
        await account.save();
        res.status(200).json({ message: 'Cập nhật tài khoản thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa tài khoản
const deleteAccount = async (req, res) => {
    const { id } = req.params;
    
    try {
        const dbName = 'cse_tlu_website';
        const db = mongoose.connection.useDb(dbName);
        const Account = db.model('accounts', accountModel.schema);
        
        // Kiểm tra tài khoản có tồn tại không
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
        }
        
        // Xóa tài khoản từ database
        await Account.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Xóa tài khoản thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {login,getAccounts,addAccount,updateAccount, deleteAccount};