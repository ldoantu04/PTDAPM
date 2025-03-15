import express from 'express';
import {login,getAccounts,addAccount,updateAccount} from '../controllers/accountController.js';

const accountRouter = express.Router();

// Route đăng nhập
accountRouter.post('/login', login);

// Route quản lý tài khoản (chỉ admin mới có quyền truy cập)
accountRouter.get('/account', getAccounts);
accountRouter.post('/account', addAccount);
accountRouter.put('/account/:id', updateAccount);

export default accountRouter;