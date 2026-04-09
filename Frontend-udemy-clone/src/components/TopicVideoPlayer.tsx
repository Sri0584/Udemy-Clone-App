import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useStore } from "../store/store";

interface TopicVideoPlayerProps {
	savedTime: number;
	handleTimeEnded: () => void;
	handleTimeUpdate: (currentTime: number) => void;
}
const TopicVideoPlayer = ({
	savedTime,
	handleTimeEnded,
	handleTimeUpdate,
}: TopicVideoPlayerProps) => {
	const currentVideoUrl = useStore((s) => s.currentVideoUrl);
	const [play, setPlay] = useState(false);

	if (!currentVideoUrl) return null;
	if (!play) {
		return (
			<div
				className='flex-[3] relative cursor-pointer'
				onClick={() => setPlay(true)}
			>
				<img
					src={`https://img.youtube.com/vi/${currentVideoUrl}/hqdefault.jpg`}
					className='w-full rounded'
					alt='Video thumbnail'
					loading='lazy'
				/>
				<div className='absolute inset-0 flex items-center justify-center height-full'>
					▶️
				</div>
			</div>
		);
	}
	return (
		<div className='flex-[3]'>
			{currentVideoUrl ?
				<div className='mt-6'>
					<h2 className='text-xl font-bold mb-2'>Current Video</h2>
					<VideoPlayer
						key={currentVideoUrl}
						url={currentVideoUrl}
						startTime={savedTime > 0 ? savedTime : undefined}
						onEnded={handleTimeEnded}
						onTimeUpdate={handleTimeUpdate}
					/>
				</div>
			:	<div>Select a topic to start learning!</div>}
		</div>
	);
};

export default TopicVideoPlayer;
