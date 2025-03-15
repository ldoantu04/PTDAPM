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
        type: String,
        required: true
    },
    account_id: {
        type: String,
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

const postModel = mongoose.models.post || mongoose.model("posts", postSchema);
export default postModel