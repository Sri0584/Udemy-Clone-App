import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
	email: string;
	password: string;
	refreshToken: string | null;
	role: string;
	isAdmin?: boolean;
}

const UserSchema = new Schema<IUser>({
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

export default mongoose.model<IUser>("User", UserSchema);
