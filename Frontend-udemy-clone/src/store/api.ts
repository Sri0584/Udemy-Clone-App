import type { Course } from "./store";

export const fetchCourses = async (): Promise<Course[]> => {
	const response = await fetch(
		"https://udemy-clone-backend-z54q.onrender.com/api/courses",
	);
	if (!response.ok) {
		throw new Error("Failed to fetch courses");
	}
	return response.json();
};

export const fetchProgress = async (
	courseId: number,
): Promise<Record<string, boolean>> => {
	const response = await fetch(
		`https://udemy-clone-backend-z54q.onrender.com/api/progress/${courseId}`,
	);
	if (!response.ok) {
		throw new Error("Failed to fetch progress");
	}
	return response.json();
};
