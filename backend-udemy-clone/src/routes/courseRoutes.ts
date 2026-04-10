import { Router } from "express";
import { getCourseById, getCourses } from "../controllers/courseController.ts";

const router = Router();

// Define course-related routes here
router.get("/", getCourses);
router.get("/:id", getCourseById);

export default router;
