import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import myBackGroundImage from "../../Images/AgentGuideBanner.jpg";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const AgentGuideComp = ({ language }) => {
	const [offsetY, setOffsetY] = useState(0);

	const handleScroll = () => setOffsetY(window.scrollY);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<AgentGuideCompWrapper
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
						<div className='line1Arabic'>هل ترغب في أن تكون مدير حسابات؟</div>
						<div className='line2Arabic'>هل لديك الطموح والشغف؟</div>
						<div className='line3Arabic'>إذا كنت جادًا وتحب العمل</div>
						<div className='line4Arabic'>
							ولكنك لم تجد مكان العمل الذي سيقدرك
						</div>
						<div className='thebtnArabic'>
							<Link to='/agents-signup-form' className='btn btn-info'>
								<strong> سجِّل الآن</strong>
							</Link>
						</div>
					</div>
				) : (
					<div className='contentWrapperEnglish'>
						<div className='line1'>Do you want to be an accounts manager?</div>
						<div className='line2'>Do you have the ambition and passion?</div>
						<div className='line3'>
							If you are actually serious and love working
						</div>
						<div className='line4'>
							But you didn't find the workplace that will appreciate you
						</div>
						<div className='thebtnEnglish'>
							<Link to='/agents-signup-form' className='btn btn-info'>
								<strong>REGISTER NOW!</strong>
							</Link>
						</div>
					</div>
				)}
			</Animated>
		</AgentGuideCompWrapper>
	);
};

export default AgentGuideComp;

const AgentGuideCompWrapper = styled.div`
	::before {
		background-color: rgba(22, 25, 56, 0.3);
		content: "";
		display: block;
		height: 100%;
		position: absolute;
		width: 100%;
	}

	.contentWrapperEnglish {
		position: absolute;
		height: 160px;
		width: 50%;
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
		margin-top: 18px;
		text-align: right !important;
	}

	.thebtnEnglish > a {
		font-size: 1.1rem;
		width: 40%;
	}

	.thebtnArabic {
		text-align: left !important;
	}

	.thebtnArabic > a {
		font-size: 1.2rem;
		width: 40%;
	}

	.line2 {
		font-size: 1.8rem !important;
	}

	.line2Arabic {
		font-size: 2.1rem !important;
	}

	@media (max-width: 1300px) {
		.contentWrapperEnglish {
			position: absolute;
			height: 270px;
			width: 90%;
			background-color: rgba(0, 0, 0, 0.4);
			margin-top: 100px;
			margin-right: 0px;
			margin-left: 0px;
		}

		.contentWrapperArabic {
			position: absolute;
			height: 200px;
			width: 90%;
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
	}
`;
