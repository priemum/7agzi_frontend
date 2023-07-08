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
			style={{
				background: `url(
                ${myBackGroundImage}
            )`,
				backgroundRepeat: "no-repeat",
				width: window.innerWidth < 768 ? "100%" : "1580px",
				backgroundSize: "cover",
				position: "relative",
				height: window.innerWidth < 768 ? "570px" : "1050px",
				margin: "auto",
				objectFit: "cover",
				backgroundPosition: `center`,
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
						<Link className='link4' to='/steps'>
							تحقق من خطوات التسجيل
						</Link>
					</div>
				) : (
					<div className='pageLinks'>
						<Link className='link1' to='/signup'>
							REGISTER NOW
						</Link>
						<Link to='/steps' className='link2'>
							CHECK REGISTERATION STEPS
						</Link>
					</div>
				)}
			</div>
		</AboutHeroCompWrapper>
	);
};

export default AboutHeroFooter;

const AboutHeroCompWrapper = styled.div`
	margin: 0px !important;
	::before {
		background-color: rgba(22, 25, 56, 0);
		content: "";
		display: block;
		height: 110%;
		position: absolute;
		width: 100%;
	}

	.content > h1 {
		position: absolute;
		margin-top: 12px;
		left: 25%;
		color: white;
		font-weight: bolder;
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
		margin-top: 529px;
		margin-left: 10px;
		position: absolute;
		color: white;
		font-weight: bolder;
		font-size: 13px;
		width: 200px;
		text-align: left;
	}

	.pageLinks > .link2 {
		margin-top: 529px;
		margin-left: 190px;
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
		margin-right: 200px;
		position: absolute;
		color: white;
		font-weight: bolder;
		font-size: 1.2rem;
		width: 200px;
		text-align: right;
	}

	.pageLinks > .link4 {
		margin-top: 525px;
		margin-right: 10px;
		position: absolute;
		color: white;
		font-weight: bolder;
		text-decoration: underline;
		font-size: 1.1rem;
		width: 210px;
		text-align: right;
	}

	@media (max-width: 1300px) {
		.content > h1 {
			position: absolute;
			margin-top: 12px;
			left: 25%;
			color: white;
			font-weight: bolder;
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
			margin-top: 529px;
			margin-left: 10px;
			position: absolute;
			color: white;
			font-weight: bolder;
			font-size: 13px;
			width: 200px;
			text-align: left;
		}

		.pageLinks > .link2 {
			margin-top: 529px;
			margin-left: 190px;
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
			margin-right: 200px;
			position: absolute;
			color: white;
			font-weight: bolder;
			font-size: 1.2rem;
			width: 200px;
			text-align: right;
		}

		.pageLinks > .link4 {
			margin-top: 525px;
			margin-right: 10px;
			position: absolute;
			color: white;
			font-weight: bolder;
			text-decoration: underline;
			font-size: 1.1rem;
			width: 210px;
			text-align: right;
		}
	}
`;
