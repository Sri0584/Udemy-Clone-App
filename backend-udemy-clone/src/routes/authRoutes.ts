import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { validateToken } from "../middleware/auth.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", validateToken, loginUser);
export default router;
