import type { Request, Response } from "express";
import Course from "../models/Course";

const getCourses = async (req: Request, res: Response) => {
	try {
		// Fetch courses from the database (replace with actual DB call)
		const courses = await Course.find();
		res.json(courses);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

const getCourseById = async (req: Request, res: Response) => {
	try {
		const courseId = req.params.id;
		// Fetch course by ID from the database (replace with actual DB call)
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({ message: "Course not found" });
		}
		res.json(course);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export { getCourses, getCourseById };
