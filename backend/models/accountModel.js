import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const accountModel = mongoose.models.account || mongoose.model("accounts", accountSchema);
export default accountModel