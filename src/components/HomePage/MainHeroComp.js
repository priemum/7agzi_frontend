import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Animated} from "react-animated-css";
import myBackGroundImage from "../../Images/HeroImage1.jpg";
import {Link} from "react-router-dom/cjs/react-router-dom.min";

const MainHeroComp = ({language}) => {
	const [offsetY, setOffsetY] = useState(0);
	const handleScroll = () => setOffsetY(window.pageYOffset);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<MainHeroCompWrapper
			style={{
				background: `url(
                ${myBackGroundImage}
            )`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				position: "relative",
				height: "840px",
				width: "100%",
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
								<strong>برامج الحجز والجدولة عبر الإنترنت</strong>
							</h1>
						) : (
							<h1>
								{" "}
								<strong>Online Booking & Scheduling Software</strong>
							</h1>
						)}

						{language === "Arabic" ? (
							<h2 className='' dir='rtl'>
								<strong style={{color: "white", fontSize: "1.4rem"}}>
									باستخدام فرشاة الشعر ، أنت جاهز للتغلب على تحديات الحاضر ،
									وبالتالي إفساح المجال لتصور المستقبل. أنت تتحكم في وتيرتك
									ومسارك. نحن هنا فقط لدعمك في طريقك إلى النجاح.
								</strong>
							</h2>
						) : (
							<h2 className=''>
								<strong>
									With Hair Brush, you're equipped to navigate the challenges of
									the present, thereby making room for envisioning the future.
									You're in control of your pace and trajectory. We're just here
									to support you on your path to success.
								</strong>
							</h2>
						)}

						{language === "Arabic" ? (
							<button className='btn btn-info' sty dir='rtl'>
								<Link to='/signup' style={{color: "white", fontSize: "1.2rem"}}>
									إشترك الآن
								</Link>
							</button>
						) : (
							<button className='btn btn-info'>
								<Link to='/signup' style={{color: "white"}}>
									SIGN ME UP!
								</Link>
							</button>
						)}

						{language === "Arabic" ? (
							<h3 dir='rtl'>
								<strong style={{color: "white", fontSize: "1.2rem"}}>
									استمتع بتجربة مجانية لمدة 40 يومًا!
								</strong>
							</h3>
						) : (
							<h3>
								<strong>Enjoy our 40 day FREE TRIAL!</strong>
							</h3>
						)}
						<h3 className='scheduleNowButton'>
							{" "}
							<Link className='btn' to='/schedule'>
								SCHEDULE NOW!
							</Link>{" "}
						</h3>
					</div>
				</Animated>
			</div>
		</MainHeroCompWrapper>
	);
};

export default MainHeroComp;

const MainHeroCompWrapper = styled.div`
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
		margin-top: 150px;
		color: white;
		font-weight: bolder;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.content > h2 {
		position: absolute;
		margin-top: 250px;
		color: white;
		font-weight: bolder;
		font-size: 1.2rem;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.content > h3 {
		position: absolute;
		margin-top: 380px;
		color: white;
		font-weight: bolder;
		font-size: 0.9rem;
		text-decoration: underline;
		top: 50%;
		left: 36%;
		transform: translate(-50%, -50%);
	}

	.content > .btn {
		position: absolute;
		margin-top: 320px;
		color: white;
		font-weight: bolder;
		font-size: 1rem;
		top: 20%;
		left: 30%;
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
			margin-top: 100px;
			font-size: 2rem;
			top: 0%;
			left: 0%;
			transform: translate(-0%, -0%);
		}

		.content > h2 {
			margin-top: 230px;
			font-size: 1.1rem;
			top: 0%;
			left: 0%;
			transform: translate(-0%, -0%);
		}

		.content > h3 {
			position: absolute;
			margin-top: 470px;
			color: white;
			font-weight: bolder;
			font-size: 0.9rem;
			text-decoration: underline;
			top: 0%;
			left: 10%;
			transform: translate(-0%, -0%);
		}

		.content > .btn {
			position: absolute;
			margin-top: 420px;
			color: white;
			font-weight: bolder;
			font-size: 1rem;
			top: 0%;
			left: 10%;
			transform: translate(-0%, -0%);
		}

		.content > .scheduleNowButton {
			position: absolute;
			margin-top: 580px;
			color: white;
			font-weight: bolder;
			padding: 5px;
			font-size: 1rem;
			top: 20%;
			left: 5%;
			background-color: #363636;
			border-radius: 5px;
			color: white;
		}
	}
`;
