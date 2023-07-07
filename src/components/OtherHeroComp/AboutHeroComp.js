import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import myBackGroundImage from "../../Images/WhyUsMain.png";
import { Link } from "react-router-dom";

const AboutHeroComp = ({ language }) => {
	const [offsetY, setOffsetY] = useState(0);
	const handleScroll = () => setOffsetY(window.pageYOffset);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
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
			<div className='col-12 mx-auto text-center'>
				<Animated
					animationIn='bounceInLeft'
					animationOut='zoomOut'
					animationInDuration={2000}
					animationInDelay={0}
					animationOutDuration={1000}
					isVisible={true}
				>
					<div className='content'>
						{language === "Arabic" ? (
							<h1 dir='rtl'>
								{" "}
								<strong>لأصحاب الصالونات ومراكز التجميل</strong>
							</h1>
						) : (
							<h1>
								{" "}
								<strong>For Salon Owners & Beauty Centers</strong>
							</h1>
						)}

						{language === "Arabic" ? (
							<h2 className='' dir='rtl'>
								<strong style={{ color: "white", fontSize: "1.4rem" }}>
									أنشئ مركز تجميل عبر الإنترنت في أقل من دقيقة
								</strong>
							</h2>
						) : (
							<h2 className=''>
								<strong>
									Create an online beauty center in less than a minute
								</strong>
							</h2>
						)}
						{language === "Arabic" ? (
							<h3 className='' dir='rtl'>
								<strong style={{ color: "white", fontSize: "1.4rem" }}>
									سجّل الآن ولا تفوّت الفرصة للظهور أمام مئات الآلاف من الأشخاص
									حول مركز التجميل الخاص بك.
								</strong>
							</h3>
						) : (
							<h3 className=''>
								<strong>
									Register now and don't miss the opportunity to appear in front
									of hundreds of thousands of people around your beauty center.
								</strong>
							</h3>
						)}

						{language === "Arabic" ? (
							<button
								className='btn btn-info'
								sty
								dir='rtl'
								style={{
									color: "white",
									background: "#a9082a",
									border: "#a9082a solid 1px",
								}}
							>
								<Link
									to='/signup'
									style={{ color: "white", background: "#a9082a" }}
								>
									إشترك الآن
								</Link>
							</button>
						) : (
							<button
								className='btn btn-info'
								style={{
									color: "white",
									background: "#a9082a",
									border: "#a9082a solid 1px",
								}}
							>
								<Link
									to='/signup'
									style={{ color: "white", background: "#a9082a" }}
								>
									REGISTER NOW!
								</Link>
							</button>
						)}
					</div>
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

	.content > h1 {
		position: absolute;
		margin-top: 300px;
		border-radius: 5px;
		color: white;
		font-weight: bolder;
		/* border: 1px solid black; */
		width: 40%;
		left: 60%;
		background-color: rgba(0, 0, 0, 0.65) !important;
		padding: 20px;
		font-size: 1.5rem;
		/* transform: translate(-30%, -30%); */
	}

	.content > h2 {
		position: absolute;
		margin-top: 370px;
		border-radius: 5px;
		color: white;
		font-weight: bolder;
		padding: 8px 5px;
		left: 60.75%;
		width: 38.5%;
		background-color: rgba(0, 0, 0, 0.65);
		font-size: 1.1rem;
	}

	.content > h3 {
		position: absolute;
		margin-top: 408px;
		border-radius: 5px;
		color: white;
		font-weight: bolder;
		font-size: 0.9rem;
		text-decoration: underline;
		padding: 5px;
		left: 60.75%;
		width: 38.5%;
		background-color: rgba(0, 0, 0, 0.65);
	}

	.content > .btn {
		position: absolute;
		margin-top: 470px;
		color: white;
		font-weight: bolder;
		font-size: 1.5rem;
		top: 20%;
		left: 62%;
	}

	.content > .scheduleNowButton {
		position: absolute;
		margin-top: 500px;
		color: white;
		font-weight: bolder;
		padding: 5px;
		font-size: 1rem;
		top: 20%;
		left: 50%;
		background-color: #363636;
		border-radius: 5px;
		color: white;
	}

	.content > .scheduleNowButton > .btn {
		font-size: 2rem;
		font-weight: bolder;
		color: white;
	}

	@media (max-width: 1300px) {
		.content > h1 {
			position: absolute;
			margin-top: 230px;
			color: white;
			font-weight: bolder;
			/* border: 1px solid black; */
			width: 105%;
			left: -2.5%;
			background-color: rgba(0, 0, 0, 0.65);
			padding: 10px 2px;
			font-size: 1.1rem;
			/* transform: translate(-30%, -30%); */
		}

		.content > h2 {
			position: absolute;
			margin-top: 272px;
			color: white;
			font-weight: bolder;
			font-size: 1.2rem;
			width: 105%;
			left: -2.5%;
			background-color: rgba(0, 0, 0, 0.65);
			padding: 10px 2px;
			font-size: 1rem;
		}

		.content > h3 {
			position: absolute;
			margin-top: 332px;
			color: white;
			font-weight: bolder;
			font-size: 0.9rem;
			text-decoration: underline;
			width: 105%;
			left: -2.5%;
			background-color: rgba(0, 0, 0, 0.65);
			padding: 10px 2px;
			font-size: 0.9rem !important;
		}

		.content > .btn {
			position: absolute;
			margin-top: 420px;
			color: white;
			font-weight: bolder;
			font-size: 1.5rem;
			left: 0%;
		}

		.content > .scheduleNowButton {
			position: absolute;
			margin-top: 500px;
			color: white;
			font-weight: bolder;
			padding: 5px;
			font-size: 1rem;
			top: 20%;
			background-color: #363636;
			border-radius: 5px;
			color: white;
		}
	}
`;
