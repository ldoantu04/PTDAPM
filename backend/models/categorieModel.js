import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId, // Dùng ObjectId thay vì String
        ref: "categories", // Tham chiếu đến bảng categories
        default: null, // Mặc định là null nếu không có danh mục cha
    }
});

// Đảm bảo tên model và collection thống nhất
const categorieModel = mongoose.models.categories || mongoose.model("categories", categorieSchema);

export default categorieModel;