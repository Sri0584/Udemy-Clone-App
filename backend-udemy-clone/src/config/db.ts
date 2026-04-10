import mongoose from "mongoose";
import dns from "node:dns/promises";
import { env } from "node:process";
import seed from "../utils/seed.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(env.MONGO_URI ?? "");
		console.log("MongoDB connected");
		await seed();
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
