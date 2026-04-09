import { useRef, useEffect } from "react";

interface UseYouTubePlayerProps {
	videoId: string;
	onEnded?: () => void;
	onTimeUpdate?: (currentTime: number) => void;
	startTime?: number;
}

// const PLAYER_ID = "youtube-player-container";

const loadYouTubeAPI = () => {
	return new Promise<void>((resolve) => {
		if (window.YT && window.YT.Player) {
			resolve();
			return;
		} else {
			window.onYouTubeIframeAPIReady = () => resolve();
			if (
				!document.querySelector(
					'script[src="https://www.youtube.com/iframe_api"]',
				)
			) {
				const script = document.createElement("script");
				script.src = "https://www.youtube.com/iframe_api";
				document.body.appendChild(script);
			}
		}
	});
};

const useYoutubePlayer = ({
	videoId,
	onEnded,
	onTimeUpdate,
	startTime,
}: UseYouTubePlayerProps) => {
	const playerRef = useRef<Window["YT"]["Player"] | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const lastSavedTime = useRef<number>(0);
	const onEndedRef = useRef(onEnded);
	const onTimeUpdateRef = useRef(onTimeUpdate);
	const initialStartTimeRef = useRef(startTime);

	// Update refs when callbacks change in parent component
	useEffect(() => {
		onEndedRef.current = onEnded;
	}, [onEnded]);

	useEffect(() => {
		onTimeUpdateRef.current = onTimeUpdate;
	}, [onTimeUpdate]);

	useEffect(() => {
		let destroyed = false;

		const initPlayer = async () => {
			await loadYouTubeAPI();
			if (destroyed) return;
			if (playerRef.current) {
				playerRef.current.destroy();
				playerRef.current = null;
			}

			playerRef.current = new window.YT.Player(containerRef.current, {
				height: "100%",
				width: "100%",
				videoId,
				playerVars: {
					autoplay: 0,
					start:
						initialStartTimeRef.current ?
							Math.floor(initialStartTimeRef.current)
						:	0,
					modestBranding: 1,
					rel: 0,
				},
				events: {
					onReady: (event: { target: Window["YT"]["Player"] }) => {
						if (startTime) {
							event.target.seekTo(startTime, true);
						}
					},
					onStateChange: (event: { data: number }) => {
						if (event.data === window.YT.PlayerState.ENDED) {
							if (onEndedRef.current) {
								onEndedRef.current();
							}
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
							}
						}
						if (event.data === window.YT.PlayerState.PLAYING) {
							if (intervalRef.current) clearInterval(intervalRef.current);
							intervalRef.current = setInterval(() => {
								const currentTime = playerRef.current?.getCurrentTime() || 0;
								// Only call onTimeUpdate if time changed by more than 10 seconds
								if (Math.abs(currentTime - lastSavedTime.current) >= 10) {
									lastSavedTime.current = currentTime;
									onTimeUpdateRef.current?.(currentTime);
								}
							}, 10000); // Update every 10 seconds
						}
						if (
							event.data === window.YT.PlayerState.PAUSED ||
							event.data === window.YT.PlayerState.BUFFERING
						) {
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
							}
						}
					},
				},
			});
		};

		const stopTracking = () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};

		initPlayer();

		return () => {
			destroyed = true;
			stopTracking();
		};
	}, [videoId]);

	return { containerRef };
};

export default useYoutubePlayer;
