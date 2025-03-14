import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parent_id: {
        type: String,
        required: true
    }
});

const categorieModel = mongoose.models.categorie || mongoose.model("categories", categorieSchema);
export default categorieModel