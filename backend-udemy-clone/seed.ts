// seed.ts
import Course from "./models/Course.ts"; // your existing model

const courses = [
	{
		title: "The Complete Web Development Bootcamp",
		description:
			"Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
		price: 14.99,
		instructor: "Angela Yu",
		sections: [
			{
				title: "Introduction to HTML",
				topics: [
					{
						title: "What is HTML?",
						videoUrl: "https://example.com/html-intro.mp4",
					},
					{
						title: "HTML Document Structure",
						videoUrl: "https://example.com/html-structure.mp4",
					},
					{
						title: "Headings and Paragraphs",
						videoUrl: "https://example.com/html-headings.mp4",
					},
				],
			},
			{
				title: "CSS Fundamentals",
				topics: [
					{
						title: "Introduction to CSS",
						videoUrl: "https://example.com/css-intro.mp4",
					},
					{
						title: "Selectors and Properties",
						videoUrl: "https://example.com/css-selectors.mp4",
					},
					{
						title: "The Box Model",
						videoUrl: "https://example.com/css-box-model.mp4",
					},
				],
			},
		],
	},
	{
		title: "React - The Complete Guide",
		description:
			"Dive in and learn React from scratch! Learn React, Hooks, Redux, React Router, and more.",
		price: 19.99,
		instructor: "Maximilian Schwarzmüller",
		sections: [
			{
				title: "Getting Started with React",
				topics: [
					{
						title: "What is React?",
						videoUrl: "https://www.youtube.com/watch?v=N3AkSS5hXMA",
					},
					{
						title: "Creating Your First App",
						videoUrl: "https://www.youtube.com/watch?v=hd3Y8rPWbjU",
					},
					{
						title: "JSX In Depth",
						videoUrl: "https://www.youtube.com/watch?v=7fPXI_MnBOY",
					},
				],
			},
			{
				title: "React Hooks",
				topics: [
					{
						title: "useState Hook",
						videoUrl: "https://www.youtube.com/watch?v=V9i3cGD-mts",
					},
					{
						title: "useEffect Hook",
						videoUrl: "https://www.youtube.com/watch?v=-4XpG5_Lj_o",
					},
					{
						title: "Custom Hooks",
						videoUrl: "https://www.youtube.com/watch?v=6ThXsUwLWvc",
					},
				],
			},
		],
	},
	{
		title: "Python for Data Science and Machine Learning",
		description:
			"Learn how to use Python for Data Science and Machine Learning, including NumPy, Pandas, and Scikit-Learn.",
		price: 17.99,
		instructor: "Jose Portilla",
		sections: [
			{
				title: "Python Crash Course",
				topics: [
					{
						title: "Python Basics",
						videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
					},
					{
						title: "Lists and Dictionaries",
						videoUrl: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
					},
					{
						title: "Functions and OOP",
						videoUrl: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
					},
				],
			},
			{
				title: "NumPy and Pandas",
				topics: [
					{
						title: "Introduction to NumPy",
						videoUrl: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
					},
					{
						title: "Pandas DataFrames",
						videoUrl: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
					},
					{
						title: "Data Cleaning",
						videoUrl: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
					},
				],
			},
		],
	},
];

const seed = async () => {
	// await mongoose.connect("mongodb://localhost:27017/udemy-clone");

	await Course.deleteMany({});
	await Course.insertMany(courses);

	console.log("✅ Courses seeded successfully!");
	// await mongoose.disconnect();
};

seed().catch(console.error);
export default seed;
