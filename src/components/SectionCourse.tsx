import { useMemo } from "react";

import { type Course, type Section, type Topic } from "../store/store";
import useProgressWorker from "./useProgressWorker";
interface SectionCourseProps {
	section: Section;
	progress: Record<string, Record<string, boolean>>;
	selectedCourse: Course | null;
	setOpenIndex: (index: number | null) => void;
	openIndex: number | null;
	index: number;
	isTopicCompleted: (topicId: string) => boolean;
	isTopicUnlocked: (section: Section, topicIndex: number) => boolean;
	setCurrentVideo: (videoUrl: string, topicId: string) => void;
	isSectionCompleted: (section: Section) => boolean;
}

const SectionCourse = ({
	section,
	progress,
	selectedCourse,
	setOpenIndex,
	openIndex,
	isTopicCompleted,
	isTopicUnlocked,
	setCurrentVideo,
	isSectionCompleted,
	index,
}: SectionCourseProps) => {
	const stableProgress = useMemo(() => progress, [progress]); // Ensure stable reference for worker
	const percentage = useProgressWorker(
		section,
		stableProgress,
		selectedCourse?._id || "",
	);

	return (
		<div key={section._id} className='mb-4 bg-gray-100 p-4 rounded'>
			<button
				className='flex justify-between items-center bg-gray-200 p-3 rounded cursor-pointer'
				onClick={() => setOpenIndex(openIndex === index ? null : index)}
			>
				<h6 className='text-medium font-semibold'>{section.title}</h6>
				<span className='bg-blue-500 text-white px-2 py-1 rounded-full'>
					{percentage}%
				</span>
			</button>

			{section.topics.map((topic: Topic, index: number) => {
				const { _id, videoUrl, title } = topic;
				const completed = isTopicCompleted(_id);
				const unlocked = isTopicUnlocked(section, index);

				return (
					<div
						key={_id}
						className={`flex items-center justify-between p-2 rounded cursor-pointer ${
							completed ? "bg-green-100"
							: unlocked ? "bg-gray-100 hover:bg-gray-200 cursor-pointer"
							: "bg-gray-300 cursor-not-allowed"
						}`}
						onClick={() => (unlocked ? setCurrentVideo(videoUrl, _id) : null)}
					>
						<span className='text-sm font-small'>{title}</span>
						{completed && <span>✔️</span>}
						{!unlocked && <span>🔒</span>}
					</div>
				);
			})}
			{isSectionCompleted(section) && (
				<div className='mt-2 text-green-600 font-semibold'>
					✅Section Completed!
				</div>
			)}
		</div>
	);
};

export default SectionCourse;
