import type { Topic } from "../store/store";

self.onmessage = (event: MessageEvent) => {
	const { section, progress, courseId } = event.data;

	const totalTopics = section.topics.length;
	const completedTopics = section.topics.filter(
		(topic: Topic) => progress[courseId]?.[topic._id],
	).length;
	const percentage = Math.round((completedTopics / totalTopics) * 100);
	self.postMessage({ percentage });
};
