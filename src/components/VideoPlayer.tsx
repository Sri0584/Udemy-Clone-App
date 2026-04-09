import { memo } from "react";
import useYoutubePlayer from "./useYoutubePlayer";

const getYouTubeVideoId = (url: string) => {
	try {
		return new URL(url).searchParams.get("v") ?? "";
	} catch {
		return "";
	}
};

interface VideoPlayerProps {
	url: string;
	startTime?: number;
	onEnded?: () => void;
	onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayer = memo(
	({ url, startTime, onEnded, onTimeUpdate }: VideoPlayerProps) => {
		const videoId = getYouTubeVideoId(url);

		const { containerRef } = useYoutubePlayer({
			videoId,
			startTime,
			onEnded,
			onTimeUpdate,
		});
		if (!videoId) return <p className='text-red-500'>Invalid video URL</p>;

		return (
			<div className='w-full aspect-video'>
				<div ref={containerRef} className='w-full h-full' />
			</div>
		);
	},
);

export default VideoPlayer;
