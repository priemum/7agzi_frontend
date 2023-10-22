import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myBackGroundImage from "./Images/WhyUsMain.png";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const ShopHero = ({ language }) => {
	const [offsetY, setOffsetY] = useState(0);

	const handleScroll = () => setOffsetY(window.scrollY);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.gtag("event", "page_view", {
			page_path: window.location.pathname,
		});

		// eslint-disable-next-line
	}, []);

	return (
		<ShopHeroWrapper
			style={{
				background: `url(
                ${myBackGroundImage}
            )`,
				backgroundRepeat: "no-repeat",
				width: window.innerWidth < 768 ? "100%" : "1380px",
				backgroundSize: "cover",
				position: "relative",
				height: window.innerWidth < 768 ? "380px" : "650px",
				margin: "auto",
				objectFit: "cover",
				backgroundPosition: `center ${offsetY * 0.5}px`,
			}}
		></ShopHeroWrapper>
	);
};

export default ShopHero;

const ShopHeroWrapper = styled.div`
	::before {
		background-color: rgba(22, 25, 56, 0.7);
		content: "";
		display: block;
		height: 100%;
		position: absolute;
		width: 100%;
	}

	strong {
		position: absolute;
		margin-top: 310px;
		border-radius: 5px;
		color: white;
		font-weight: bolder;
		/* border: 1px solid black; */
		width: 90%;
		left: 40%;
		font-size: 6rem;
	}

	h1 {
		position: absolute;
		margin-top: 350px;
		border-radius: 5px;
		color: white;
		font-weight: bolder;
		/* border: 1px solid black; */
		width: 40%;
		left: 0%;
		background-color: rgba(0, 0, 0, 0.65) !important;
		padding: 20px 0px;
		font-size: 1.3rem;
		/* transform: translate(-30%, -30%); */
	}

	.btnWrapperArabic > a {
		margin-top: 460px;
		position: absolute;
		right: 20%;
		padding: 20px;
		font-size: 1.5rem;
		font-weight: bolder;
	}

	.btnWrapperEnglish > a {
		margin-top: 450px;
		position: absolute;
		left: 20%;
		padding: 20px;
		font-size: 1.5rem;
		font-weight: bolder;
	}

	@media (max-width: 1300px) {
		strong {
			position: absolute;
			margin-top: 110px;
			border-radius: 5px;
			color: white;
			font-weight: bolder;
			/* border: 1px solid black; */
			width: 90%;
			left: 10% !important;
			font-size: 6rem;
		}

		h1 {
			position: absolute;
			margin-top: 150px;
			border-radius: 5px;
			color: white;
			font-weight: bolder;
			/* border: 1px solid black; */
			width: 98%;
			left: 0% !important;
			background-color: rgba(0, 0, 0, 0.65) !important;
			padding: 7px 0px;
			font-size: 1.3rem;
			/* transform: translate(-30%, -30%); */
		}

		.btnWrapperArabic > a {
			margin-top: 280px;
			position: absolute;
			right: 30%;
			padding: 10px;
			font-size: 1.5rem;
			font-weight: bolder;
		}

		.btnWrapperEnglish > a {
			margin-top: 240px;
			position: absolute;
			left: 30%;
			padding: 10px;
			font-size: 1.5rem;
			font-weight: bolder;
		}
	}
`;
