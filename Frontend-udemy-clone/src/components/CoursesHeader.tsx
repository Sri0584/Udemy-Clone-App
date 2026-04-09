import React from "react";
interface CoursesHeaderProps {
	setSelectedCourse: (course: null) => void;
}
const CoursesHeader: React.FC<CoursesHeaderProps> = ({ setSelectedCourse }) => {
	return (
		<div
			onClick={() => setSelectedCourse(null)}
			className='p-4 bg-gray-200 cursor-pointer'
		>
			<h2 className='text-xl font-bold mb-2'>Back to Course List</h2>
		</div>
	);
};

export default CoursesHeader;
