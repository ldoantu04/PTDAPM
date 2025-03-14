import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false,
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
});

const staffModel = mongoose.models.staff || mongoose.model("staffs", staffSchema);
export default staffModel