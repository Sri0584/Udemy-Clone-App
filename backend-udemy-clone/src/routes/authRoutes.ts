import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { validateToken } from "../middleware/auth";

const router = Router();
router.post("/register", registerUser);
router.post("/login", validateToken, loginUser);
export default router;
