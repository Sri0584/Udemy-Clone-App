import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { User } from "../utils/jwt.js";

export interface AuthRequest extends Request {
	userId?: { id: string };
}

const normalizeRole = (user: User) => {
	if (user.isAdmin || user.role === "admin") {
		return "admin";
	}

	if (user.role === "manager") {
		return "manager";
	}

	return "support";
};

const resolveUserRole = (user: User) => {
	if (user?.role) {
		return user.role;
	}

	return user?.isAdmin ? "admin" : "support";
};

export const sanitizeUser = (user: User) => {
	const role = resolveUserRole(user);
	const { password, refreshToken, ...safeUser } = user;

	return {
		...safeUser,
		role,
		isAdmin: role === "admin",
	};
};

export const validateToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: "No token provided" });
	}
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		req.userId = decoded as { id: string };
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
