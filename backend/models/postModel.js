import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },  
    detail: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: false
    },
    category_id: {
        type: String, // Để là String cho đơn giản khi test
        required: true
    },
    account_id: {
        type: String, // Để là String cho đơn giản khi test
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
});

// Thay đổi tên collection từ "posts" thành "post2"
const postModel = mongoose.models.post2 || mongoose.model("posts2", postSchema);
export default postModel;