import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;