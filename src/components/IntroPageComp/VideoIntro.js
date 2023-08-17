import React, { useEffect, useState } from "react";
import TheVideo from "../../Images/IntroXlookproVideo.mp4";
import styled from "styled-components";

const VideoIntro = ({ onVideoEnd }) => {
	const [videoEnded, setVideoEnded] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		// Start the fade-out effect a little before the video ends
		const fadeOutTimer = setTimeout(() => {
			setFadeOut(true);
		}, 3400); // Start fade out 0.5 seconds before video ends

		const endTimer = setTimeout(() => {
			setVideoEnded(true);
			onVideoEnd();
		}, 4300);

		return () => {
			clearTimeout(fadeOutTimer);
			clearTimeout(endTimer);
		};
	}, [onVideoEnd]);

	return (
		<VideoIntroWrapper className={fadeOut ? "fade-out" : ""}>
			{!videoEnded && (
				<video
					width='100%'
					height='200%'
					autoPlay
					muted
					onEnded={() => setVideoEnded(true)}
				>
					<source src={TheVideo} type='video/mp4' />
				</video>
			)}
		</VideoIntroWrapper>
	);
};
export default VideoIntro;

const VideoIntroWrapper = styled.div`
	opacity: 1;
	transition: opacity 1s ease-out;

	&.fade-out {
		opacity: 0;
	}
`;
