// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import myBackGroundImage from "../../Images/poster-design-xlook.png";
import { Link } from "react-router-dom";

const AboutHeroFooter = ({ language }) => {
	// eslint-disable-next-line
	const [offsetY, setOffsetY] = useState(0);

	// eslint-disable-next-line
	const handleScroll = () => setOffsetY(window.scrollY);

	// useEffect(() => {
	// 	window.addEventListener("scroll", handleScroll);

	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, []);
	return (
		<AboutHeroCompWrapper
			className='col-md-6 mx-auto'
			style={{
				background: `url(
                ${myBackGroundImage}
            )`,
				backgroundRepeat: "no-repeat",
				width: window.innerWidth < 1200 ? "100%" : "100%",
				backgroundSize: "cover",
				position: "relative",
				height: window.innerWidth < 1200 ? "570px" : "155vh",
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
							<h1>مجانًا بنسبة 100٪!</h1>
						) : (
							<h1>100% FREE!</h1>
						)}
						{language === "Arabic" ? (
							<div className='header2'>
								أول منصة مصممة لتقديم خدمات وميزات رائعة لصالونات التجميل ومراكز
								الجمال
							</div>
						) : (
							<div className='header2'>
								The first developed platform to offer the services and amazing
								features of Salons and Beauty Centers
							</div>
						)}
					</div>
				</Animated>

				{language === "Arabic" ? (
					<div className='pageLinks'>
						<Link className='link3' to='/signup'>
							سجّل الآن
						</Link>
						<Link
							className='link4'
							to='/steps'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							تحقق من خطوات التسجيل
						</Link>
					</div>
				) : (
					<div className='pageLinks'>
						<Link className='link1' to='/signup'>
							REGISTER NOW
						</Link>
						<Link
							to='/steps'
							className='link2'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							CHECK REGISTRATION STEPS
						</Link>
					</div>
				)}
			</div>
		</AboutHeroCompWrapper>
	);
};

export default AboutHeroFooter;

const AboutHeroCompWrapper = styled.div`
	::before {
		background-color: rgba(22, 25, 56, 0);
		content: "";
		display: block;
		height: 100%;
		position: absolute;
		width: 100%;
	}

	.content > h1 {
		position: absolute;
		margin-top: 40px;
		left: 35%;
		color: white;
		font-weight: bolder;
		font-size: 3rem;
	}

	.content > .header2 {
		margin-top: 150px;
		position: absolute;
		color: white;
		font-weight: bolder;
		font-size: 1.7rem;
		line-height: 1.2;
	}

	.pageLinks {
		position: absolute;
	}

	.pageLinks > .link1 {
		margin-top: 1390px;
		margin-left: 20px;
		position: absolute;
		color: white;
		font-weight: bolder;
		font-size: 1.5rem;
		width: 200px;
		text-align: left;
	}

	.pageLinks > .link2 {
		margin-top: 1390px;
		margin-left: 550px;
		position: absolute;
		color: white;
		font-weight: bolder;
		text-decoration: underline;
		font-size: 1.3rem;
		width: 340px;
		text-align: left;
	}

	.pageLinks > .link3 {
		margin-top: 1380px;
		margin-right: 550px;
		position: absolute;
		color: white;
		font-weight: bolder;
		font-size: 2rem;
		width: 340px;
		text-align: right;
	}

	.pageLinks > .link4 {
		margin-top: 1390px;
		margin-right: 20px;
		position: absolute;
		color: white;
		font-weight: bolder;
		text-decoration: underline;
		font-size: 1.5rem;
		width: 210px;
		text-align: right;
	}

	@media (max-width: 1300px) {
		.content > h1 {
			position: absolute;
			margin-top: 8px;
			left: -25%;
			width: 500px;
			color: white;
			font-weight: bolder;
			font-size: 2.3rem;
		}

		.content > .header2 {
			margin-top: 55px;
			position: absolute;
			color: white;
			font-weight: bolder;
			font-size: 1.1rem;
			line-height: 1.2;
		}

		.pageLinks {
			position: absolute;
		}

		.pageLinks > .link1 {
			margin-top: 530px;
			margin-left: 10px;
			position: absolute;
			color: white;
			font-weight: bolder;
			font-size: 13px;
			width: 200px;
			text-align: left;
		}

		.pageLinks > .link2 {
			margin-top: 530px;
			margin-left: 187px;
			position: absolute;
			color: white;
			font-weight: bolder;
			text-decoration: underline;
			font-size: 11px;
			width: 210px;
			text-align: left;
		}

		.pageLinks > .link3 {
			margin-top: 525px;
			margin-right: 225px;
			position: absolute;
			color: white;
			font-weight: bolder;
			font-size: 1rem;
			width: 200px;
			text-align: right;
		}

		.pageLinks > .link4 {
			margin-top: 525px;
			margin-right: -10px;
			position: absolute;
			color: white;
			font-weight: bolder;
			text-decoration: underline;
			font-size: 1rem;
			width: 210px;
			text-align: right;
		}
	}
`;
