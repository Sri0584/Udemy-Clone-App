import React, { useEffect } from "react";
import type { Section } from "../store/store";

const useProgressWorker = (
	section: Section,
	progress: Record<string, Record<string, boolean>>,
	courseId: string,
) => {
	const workerRef = React.useRef<Worker | null>(null);
	const [percentage, setPercentage] = React.useState(0);

	useEffect(() => {
		if (!workerRef.current) {
			workerRef.current = new Worker(
				new URL("./progressWorker.ts", import.meta.url),
				{ type: "module" },
			);
		}
		workerRef.current.onmessage = (event: MessageEvent) => {
			//Listen for Worker Response and then updates state with the percentage value
			setPercentage(event.data.percentage);
		};
		return () => {
			if (workerRef.current) {
				workerRef.current.terminate();
				workerRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (workerRef.current) {
			workerRef.current.postMessage({ section, progress, courseId });
		}
	}, [section, progress, courseId]);

	return percentage;
};

export default useProgressWorker;
