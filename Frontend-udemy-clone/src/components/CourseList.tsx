import React, { useEffect } from "react";
import { useStore } from "../store/store";
import { fetchCourses } from "../store/api";

const CourseList: React.FC = () => {
	const { courses, setCourses, setSelectedCourse } = useStore();

	useEffect(() => {
		// Fetch courses from the API and update the state
		fetchCourses()
			.then((data) => setCourses(data))
			.catch((error) => console.error("Error fetching courses:", error));
	}, [setCourses]);

	return (
		<div className='p-6 grid grid-cols-3 gap-4'>
			<h2 className='text-3xl font-bold mb-6 col-span-3'>Available Courses</h2>
			{courses.length > 0 ?
				courses.map((course) => (
					<div
						key={course.title}
						className='bg-white p-4 rounded-xl shadow cursor-pointer'
						onClick={() => setSelectedCourse(course)}
					>
						<h2 className='font-bold'>{course.title}</h2>
						<p className='text-sm text-gray-500'>{course.description}</p>
					</div>
				))
			:	<p className='col-span-3'>No courses available.</p>}{" "}
		</div>
	);
};

export default CourseList;
