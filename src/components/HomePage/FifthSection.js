import React from "react";
import styled from "styled-components";

const FifthSection = () => {
	return (
		<FifthSectionWrapper>
			<div className='bannerAd fifthSection'>
				<img
					src='https://res.cloudinary.com/infiniteapps/image/upload/v1689014644/GQ_B2B/1689014644113.jpg'
					alt='Nextdayegy.com campaign offer'
				/>
			</div>
		</FifthSectionWrapper>
	);
};

export default FifthSection;

const FifthSectionWrapper = styled.div`
	.fifthSection {
		margin-top: 30px;
		min-height: 220px;
		border: 1px white solid;
	}

	img {
		width: 100%;
	}
`;
