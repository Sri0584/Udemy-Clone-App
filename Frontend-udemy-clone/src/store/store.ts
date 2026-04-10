import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Topic {
	_id: string;
	title: string;
	videoUrl: string;
}
export interface Section {
	_id: string;
	title: string;
	topics: Topic[];
}
export interface Course {
	_id: string;
	title: string;
	description: string;
	instructor: string;
	sections: Section[];
}
interface StoreState {
	courses: Course[];
	selectedCourse: Course | null;
	currentVideoUrl: string | null;
	currentTopicId: string | null;
	progress: Record<string, Record<string, boolean>>; // courseId -> topicId -> completed
	savedTimestamps: Record<string, Record<string, number>>; // courseId -> topicId -> time
	setCourses: (courses: Course[]) => void;
	setSelectedCourse: (course: Course | null) => void;
	setCurrentVideo: (videoUrl: string, topicId: string) => void;
	markTopicCompleted: (courseId: string, topicId: string) => void;
	saveTimestamp: (courseId: string, topicId: string, time: number) => void;
}
export const useStore = create<StoreState>()(
	persist(
		(set) => ({
			courses: [],
			selectedCourse: null,
			currentVideoUrl: null,
			currentTopicId: null,
			progress: {},
			savedTimestamps: {},

			setCourses: (courses) => set({ courses }),

			setSelectedCourse: (course) =>
				set((state) => {
					if (!course) {
						return {
							selectedCourse: null,
							currentVideoUrl: null,
							currentTopicId: null,
						};
					}

					const currentVideoUrl =
						state.courses.find((c) => c._id === course._id)?.sections[0]
							?.topics[0]?.videoUrl || null;
					const currentTopicId =
						state.courses.find((c) => c._id === course._id)?.sections[0]
							?.topics[0]?._id || null;

					return {
						selectedCourse: course,
						currentVideoUrl,
						currentTopicId,
					};
				}),

			setCurrentVideo: (videoUrl, topicId) =>
				set({ currentVideoUrl: videoUrl, currentTopicId: topicId }),

			markTopicCompleted: (courseId, topicId) =>
				set((state) => ({
					progress: {
						...state.progress,
						[courseId]: {
							...state.progress[courseId],
							[topicId]: true,
						},
					},
				})),

			saveTimestamp: (courseId, topicId, time) =>
				set((state) => ({
					savedTimestamps: {
						...state.savedTimestamps,
						[courseId]: {
							...state.savedTimestamps[courseId],
							[topicId]: time,
						},
					},
				})),
		}),
		{
			name: "course-progress-storage",
			partialize: (state) => ({
				progress: state.progress,
				currentVideoUrl: state.currentVideoUrl,
				currentTopicId: state.currentTopicId,
				savedTimestamps: state.savedTimestamps,
			}),
		},
	),
);
