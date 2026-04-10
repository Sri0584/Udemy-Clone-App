import User from "../models/User.js";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
	setRefreshCookie,
	signAccessToken,
	signRefreshToken,
} from "../utils/jwt";
import { sanitizeUser } from "../middleware/auth";

const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, password, role, isAdmin } = req.body;
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		// Create new user
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = new User({
			email,
			password: hashedPassword,
			role,
			isAdmin,
		});
		await newUser.save();
		res.json({
			accessToken: signAccessToken(newUser),
			refreshToken: signRefreshToken(newUser),
			message: "User registered successfully",
		});
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).select("+refreshToken");
		if (!user) {
			return res.status(401).json("User not found!");
		}

		const validPwd = await bcrypt.compare(password, user.password);

		if (!validPwd) {
			return res.status(401).json("Wrong password!");
		}

		const accessToken = signAccessToken(user);
		const refreshToken = signRefreshToken(user);

		user.refreshToken = await bcrypt.hash(refreshToken, 10);
		await user.save();
		setRefreshCookie(res, refreshToken);
		res.status(200).json({
			...sanitizeUser(user),
			accessToken,
		});
	} catch (error: any) {
		res.status(500).json(error.message);
	}
};

export { registerUser, loginUser };
