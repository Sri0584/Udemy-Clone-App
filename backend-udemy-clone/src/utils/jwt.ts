import express from "express";
import jwt from "jsonwebtoken";

export interface User {
	email: string;
	password: string;
	refreshToken: string | null;
	role: string;
	isAdmin?: boolean;
}
export const generateToken = (userId: string): string => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: "1h",
	});
	return token;
};

export const setRefreshCookie = (
	res: express.Response,
	refreshToken: string,
) => {
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "lax",
		secure: false, // Disable secure for development (HTTP)
		path: "/", // Allow cookie for all routes
		maxAge: 7 * 24 * 60 * 60 * 1000,
		domain: process.env.NODE_ENV === "production" ? undefined : "localhost", // Set domain for localhost in development
	});
};

export const clearRefreshCookie = (res: express.Response) => {
	res.clearCookie("refreshToken", {
		httpOnly: true,
		sameSite: "lax",
		secure: false, // Disable secure for development (HTTP)
		path: "/", // Allow cookie for all routes
		maxAge: 7 * 24 * 60 * 60 * 1000,
		domain: process.env.NODE_ENV === "production" ? undefined : "localhost", // Set domain for localhost in development
	});
};

const resolveUserRole = (user: User) => {
	if (user.role) {
		return user.role;
	}

	return user.isAdmin ? "admin" : "support";
};

const buildTokenPayload = (user: User) => {
	const role = resolveUserRole(user);

	return {
		email: user.email,
		password: user.password,
		role,
		isAdmin: role === "admin",
		refreshToken: user.refreshToken,
	};
};

export const signAccessToken = (user: User) =>
	jwt.sign(
		buildTokenPayload(user),
		process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET!,
		{
			expiresIn: "15m",
		},
	);

export const signRefreshToken = (user: User) =>
	jwt.sign(
		buildTokenPayload(user),
		process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET!,
		{
			expiresIn: "7d",
		},
	);
