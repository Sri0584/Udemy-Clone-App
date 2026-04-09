import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.ts";
import { validateToken } from "../middleware/auth.ts";

const router = Router();
router.post("/register", registerUser);
router.post("/login", validateToken, loginUser);
export default router;
