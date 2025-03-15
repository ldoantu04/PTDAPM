import mongoose from 'mongoose';
import accountModel from '../models/accountModel.js';

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Sử dụng cơ sở dữ liệu mặc định hoặc xác định cơ sở dữ liệu dựa trên logic của bạn
        const dbName = 'cse_tlu_website'; // Thay thế bằng tên cơ sở dữ liệu mặc định của bạn
        const db = mongoose.connection.useDb(dbName);
        const Account = db.model('accounts', accountModel.schema);

        const account = await Account.findOne({ username: username });

        if (account && account.password === password) {
            res.status(200).json({ role: account.role, message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    login
};