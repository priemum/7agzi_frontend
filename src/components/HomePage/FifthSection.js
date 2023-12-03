import React, { useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const FifthSection = () => {
	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);
	return (
		<FifthSectionWrapper>
			<div className='bannerAd fifthSection'>
				<img
					src='https://res.cloudinary.com/infiniteapps/image/upload/v1689014644/GQ_B2B/1689014644113.jpg'
					alt='infinite-apps. The right choice to develop you application'
					onClick={() => {
						window.open("https://infinite-apps.com", "_blank");

						ReactGA.event("Campaign_Nextdayegy.com_clicked", {
							event_category: "Campaign_Nextdayegy.com_clicked",
							event_label: "Campaign_Nextdayegy.com_clicked",
							value: 1, // Optional extra parameters
						});

						ReactPixel.track("Campaign_Nextdayegy.com_clicked", {
							content_name: "Campaign_Nextdayegy.com_clicked",
							content_category: "Campaign_Nextdayegy.com_clicked",
							value: "",
							currency: "",
						});
					}}
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
		align-items: center;
		text-align: center;
	}

	img {
		width: 40%;
	}

	@media (max-width: 1100px) {
		img {
			width: 100%;
		}
	}
`;
