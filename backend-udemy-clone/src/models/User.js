import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["admin", "manager", "support"],
        default: "support",
    },
    refreshToken: { type: String, default: null, select: false },
});
export default mongoose.model("User", UserSchema);
