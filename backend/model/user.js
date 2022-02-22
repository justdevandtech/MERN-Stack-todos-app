import mongoose from "mongoose";

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    }
});


const usersModel = mongoose.model("usersModel", userSchema);
export default usersModel;