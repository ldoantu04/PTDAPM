import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parent_id: {
        type: String,
        required: false,
    }
});

const categorieModel = mongoose.models.categorie || mongoose.model("categories", categorieSchema);
export default categorieModel