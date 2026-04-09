import mongoose from "mongoose";
import dns from "node:dns/promises";
import seed from "../seed.ts";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
		await seed();
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
