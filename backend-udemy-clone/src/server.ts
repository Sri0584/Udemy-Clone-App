import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);
app.use(express.json());
import authRoutes from "./routes/authRoutes";
import courseRoutes from "./routes/courseRoutes";
// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
