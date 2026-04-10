import { Router } from "express";
import { getCourseById, getCourses } from "../controllers/courseController.js";

const router = Router();

// Define course-related routes here
router.get("/", getCourses);
router.get("/:id", getCourseById);

export default router;
