import React from "react";
import "./App.css";
import CourseList from "./components/CourseList";
import { useStore } from "./store/store";
const CoursePlayer = React.lazy(() => import("./components/CoursePlayer"));

function App() {
	const { selectedCourse } = useStore();

	return (
		<main className='container mx-auto p-4'>
			{selectedCourse ?
				<CoursePlayer />
			:	<CourseList />}
		</main>
	);
}

export default App;
