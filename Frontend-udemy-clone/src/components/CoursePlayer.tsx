import React, { Suspense, useCallback, useState } from "react";
import { useStore, type Section } from "../store/store";
import SectionCourse from "./SectionCourse";
import CoursesHeader from "./CoursesHeader";

const TopicVideoPlayer = React.lazy(() => import("./TopicVideoPlayer"));
const CoursePlayer: React.FC = () => {
	const {
		setCurrentVideo,
		markTopicCompleted,
		saveTimestamp,
		setSelectedCourse,
	} = useStore();
	const selectedCourse = useStore((s) => s.selectedCourse);
	const progress = useStore((s) => s.progress);
	const currentTopicId = useStore((s) => s.currentTopicId);
	const savedTime = useStore(
		(s) =>
			s.savedTimestamps[selectedCourse?._id || ""]?.[currentTopicId || ""] || 0,
	);
	const stableSavedTime = React.useMemo(() => savedTime, [savedTime]); // Ensure stable reference for video player
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleTimeUpdate = useCallback(
		(currentTime: number) => {
			if (currentTopicId && selectedCourse) {
				const courseId = selectedCourse._id;
				saveTimestamp(courseId, currentTopicId, currentTime);
			}
		},
		[selectedCourse, currentTopicId, saveTimestamp],
	);

	const handleTimeEnded = useCallback(() => {
		if (currentTopicId && selectedCourse) {
			const courseId = selectedCourse._id;
			markTopicCompleted(courseId, currentTopicId);
		}
	}, [currentTopicId, selectedCourse, markTopicCompleted]);

	const isTopicCompleted = useCallback(
		(topicId: string) => {
			const courseId = selectedCourse?._id || "";
			const courseProgress = progress[courseId] || {};
			return courseProgress[topicId] || false;
		},
		[progress, selectedCourse],
	);

	const isSectionCompleted = useCallback(
		(section: Section) => {
			return section.topics.every((topic) => isTopicCompleted(topic._id));
		},
		[isTopicCompleted],
	);

	const isTopicUnlocked = useCallback(
		(section: Section, topicIndex: number) => {
			if (Number(topicIndex) === 0) return true; // First section is always unlocked

			const prevTopic = section.topics[topicIndex - 1];
			return isTopicCompleted(prevTopic._id);
		},
		[isTopicCompleted],
	);

	if (!selectedCourse) return <div>Select a Course!</div>;

	return (
		<>
			<CoursesHeader setSelectedCourse={setSelectedCourse} />
			<div
				style={{
					display: "flex",
					gap: "40px",
					padding: "40px",
				}}
			>
				<Suspense
					fallback={
						<div className='animate-pulse h-64 bg-gray-200 rounded'>
							Loading video...
						</div>
					}
				>
					<TopicVideoPlayer
						handleTimeEnded={handleTimeEnded}
						handleTimeUpdate={handleTimeUpdate}
						savedTime={stableSavedTime}
					/>
				</Suspense>
				<div className='min-h-screen  flex-[1] p-6 rounded-xl shadow'>
					<h6 className='text-2xl font-bold mb-4'>{selectedCourse.title}</h6>
					<p className='mb-2 text-sm'>{selectedCourse.description}</p>
					{selectedCourse.sections.map((section, index) => (
						<SectionCourse
							key={section._id}
							section={section}
							progress={progress}
							selectedCourse={selectedCourse}
							setOpenIndex={setOpenIndex}
							openIndex={openIndex}
							index={index}
							isTopicCompleted={isTopicCompleted}
							isTopicUnlocked={isTopicUnlocked}
							setCurrentVideo={setCurrentVideo}
							isSectionCompleted={isSectionCompleted}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default CoursePlayer;
