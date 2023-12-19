import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import myBackGroundImage from "../../Images/WhyUsMain.png";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const AboutHeroComp = ({ language }) => {
	const [offsetY, setOffsetY] = useState(0);
	const handleScroll = () => setOffsetY(window.pageYOffset);

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
		<AboutHeroCompWrapper
			style={{
				background: `url(
                ${myBackGroundImage}
            )`,
				backgroundRepeat: "no-repeat",
				width: window.innerWidth < 768 ? "100%" : "1380px",
				backgroundSize: "cover",
				position: "relative",
				height: window.innerWidth < 768 ? "480px" : "650px",
				margin: "auto",
				objectFit: "cover",
				backgroundPosition: `center ${offsetY * 0.5}px`,
			}}
		>
			<div className='col-12 mx-auto '>
				<Animated
					animationIn='bounceInLeft'
					animationOut='zoomOut'
					animationInDuration={2000}
					animationInDelay={0}
					animationOutDuration={1000}
					isVisible={true}
				>
					{language === "Arabic" ? (
						<div className='contentWrapperArabic' dir='rtl'>
							<div className='line1Arabic'>
								{" "}
								لأصحاب الصالونات ومراكز التجميل
							</div>
							<div className='line2Arabic'>
								{" "}
								أنشئ مركز تجميل عبر الإنترنت في أقل من دقيقة
							</div>
							<div className='line3Arabic'>
								سجّل الآن ولا تفوّت الفرصة للظهور أمام مئات الآلاف من الأشخاص
								حول مركز التجميل الخاص بك.
							</div>

							<div className='thebtnArabic'>
								<Link to='/signup' className='btn btn-danger'>
									<strong> سجِّل الآن </strong>
								</Link>
							</div>
						</div>
					) : (
						<div className='contentWrapperEnglish'>
							<div className='line1'>For Salon Owners & Beauty Centers</div>
							<div className='line2'>
								{" "}
								Create an online presence in less than a minute
							</div>
							<div className='line3'>
								Register now and don't miss the opportunity to appear in front
								of thousands of people around your business.
							</div>

							<div className='thebtnEnglish'>
								<Link
									to='/signup'
									className='btn btn-danger'
									onClick={() => {
										ReactGA.event("Account_Clicked_Register_Now", {
											event_category: "Account_Clicked_Register_Now",
											event_label: "Account_Clicked_Register_Now",
											value: 1, // Optional extra parameters
										});

										ReactPixel.track("Account_Clicked_Register_Now", {
											content_name: "Account_Clicked_Register_Now",
											content_category: "Account_Clicked_Register_Now",
											value: "",
											currency: "",
										});

										if (window.ttq) {
											window.ttq.track("Account_Clicked_Register_Now", {
												content_name: "Account_Clicked_Register_Now",
												content_category: "Account_Clicked_Register_Now",
												value: 1,
												currency: "USD", // Change the currency if needed
											});
										}
									}}
								>
									<strong>REGISTER NOW!</strong>
								</Link>
							</div>
						</div>
					)}
				</Animated>
			</div>
		</AboutHeroCompWrapper>
	);
};

export default AboutHeroComp;

const AboutHeroCompWrapper = styled.div`
	::before {
		background-color: rgba(22, 25, 56, 0.7);
		content: "";
		display: block;
		height: 100%;
		position: absolute;
		width: 100%;
	}

	.contentWrapperEnglish {
		position: absolute;
		height: 160px;
		width: 58%;
		background-color: rgba(0, 0, 0, 0.4);
		margin-top: 200px;
		padding: 10px;
		margin-right: 20px;
		margin-left: 20px;
	}

	.contentWrapperArabic {
		position: absolute;
		height: 160px;
		width: 50%;
		background-color: rgba(0, 0, 0, 0.4);
		margin-top: 200px;
		padding: 10px;
		margin-left: 45%;
		text-align: right;
	}

	.contentWrapperArabic > div {
		color: white;
		font-weight: bolder;
		font-size: 1.2rem;
	}

	.contentWrapperEnglish > div {
		color: white;
		font-weight: bolder;
		font-size: 1rem;
	}

	.thebtnEnglish {
		text-align: right !important;
		margin-top: 25px;
	}

	.thebtnEnglish > a {
		font-size: 1.1rem;
		width: 40%;
	}

	.thebtnArabic {
		text-align: left !important;
		margin-top: 50px;
	}

	.thebtnArabic > a {
		font-size: 1.2rem;
		width: 40%;
	}

	.line2 {
		font-size: 1.9rem !important;
	}

	.line2Arabic {
		font-size: 2.2rem !important;
	}

	@media (max-width: 1300px) {
		.contentWrapperEnglish {
			position: absolute;
			height: 270px;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			margin-top: 100px;
			margin-right: 0px;
			margin-left: 0px;
		}

		.contentWrapperArabic {
			position: absolute;
			height: 230px;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			margin-top: 100px;
			margin-right: 0px;
			margin-left: 8%;
		}

		.line1Arabic {
			font-size: 1rem !important;
		}

		.line3Arabic {
			font-size: 1rem !important;
		}

		.line4Arabic {
			font-size: 1rem !important;
		}

		.thebtnArabic {
			margin-top: 35px;
		}

		.thebtnEnglish > a {
			font-size: 1.1rem;
			width: 55%;
		}

		.line2 {
			font-size: 1.9rem !important;
			line-height: 1.2;
		}

		.line2Arabic {
			font-size: 1.9rem !important;
		}
	}
`;
