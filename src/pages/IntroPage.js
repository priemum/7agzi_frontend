import React, { useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from "react-helmet";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import { useCartContext } from "../sidebar_context";
// eslint-disable-next-line
import { isAuthenticated } from "../auth";
import BackgroundImage from "../Images/back-empty.png";
import XlookLogo from "../Images/XLookLogo_2.png";
import FirstStep from "../components/IntroPageComp/FirstStep";
import EgyptianFlag from "../Images/Egypt.png";
import AmericanFlag from "../Images/UnitedStates.png";
import SecondStep from "../components/IntroPageComp/SecondStep";
import AlreadyHaveAccount from "../components/IntroPageComp/AlreadyHaveAccount";
import VideoIntro from "../components/IntroPageComp/VideoIntro";

const IntroPage = () => {
	const { chosenLanguageEngish, chosenLanguage, chosenLanguageArabic } =
		useCartContext();
	const [showMainPage, setShowMainPage] = useState(false);
	const [steps, setSteps] = useState(1);
	const [chosenGender, setChosenGender] = useState("");

	const sliderRef = useRef(null);

	const settings = {
		dots: false,
		infinite: false,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};

	const handlePrev = () => {
		sliderRef.current.slickPrev();
	};

	const handleNext = () => {
		sliderRef.current.slickNext();
	};

	console.log(chosenGender, "chosenGender");

	return (
		<IntroPageWrapper
			show={chosenLanguage === "Arabic"}
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
		>
			<Helmet>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>إكس لوك | برنامج الحجز الرسمي</title>
				) : (
					<title>XLOOK | Official Booking Software</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? `إكس لوك هي منصة تضم جميع صالونات الحلاقة ومراكز الجمال والتجميل الموجودة في مصر. المنصة تقدم خدمات لجميع أفراد العائلة، بما في ذلك السيدات، الآنسات، الرجال، والأطفال، مع مجموعة متنوعة من الخدمات المقدمة. منصة إكس لوك تُستخدم لاختيار وحجز موعد في صالون الحلاقة أو مركز التجميل الأقرب أو الأبعد حسب موقعك. الزائرين يمكنهم حجز الخدمات التي تقدمها المنصة من خلال تطبيق خاص مصمم لتسجيل المستخدمين وحجز خدمات التجميل. Powered By https://infinite-apps.com`
							: `XLOOK is a platform that includes all barbershops, ladies' beauty salons, and beauty centers. The platform offers services for all family members, including women, girls, men, and children, with a variety of services provided. The XLOOK platform is used to choose and book a barbershop or beauty center appointment with the closest to the farthest offer according to your location. Visitors can book the services offered by the platform through a special application designed for user registration and booking beauty services. Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						chosenLanguage === "Arabic"
							? `حجز مواقع الويب لصالونات التجميل، تطبيقات لا نهائية، برامج لا نهاية، منصة XLOOK، XLOOK، XLookpro، xlookpro.com، محلات الحلاقة، صالونات التجميل، مراكز التجميل، خدمات العائلة، حجز المواعيد، مواقع ويب مخصصة، مواقع ويب بأسعار معقولة، تطوير المواقع الإلكترونية، بناء المواقع الإلكترونية`
							: `booking websites for salons, infinite apps, infinite erp, XLOOK platform, XLOOK, XLookpro, xlookpro.com, barbershops, beauty salons, beauty centers, family services, appointment booking, custom websites, affordable websites, website development, website building`
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com' />
				{chosenLanguage === "Arabic" && (
					<html lang='ar' dir='rtl' xmlns='http://www.w3.org/1999/xhtml' />
				)}
			</Helmet>

			<div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
				{!showMainPage ? (
					<VideoIntro onVideoEnd={() => setShowMainPage(true)} />
				) : (
					// Your main page content goes here
					<>
						<div className='container'>
							<div className='flagsWrapper pt-4'>
								<span
									className='languageFlagsPhone'
									style={{ padding: "0px", marginLeft: "" }}
								>
									{chosenLanguage === "English" ? (
										<span className='' onClick={chosenLanguageArabic}>
											{" "}
											<img
												className='flags'
												src={EgyptianFlag}
												style={{
													marginRight: "5px",
													width: "3%",
													cursor: "pointer",
												}}
												alt='Arabic'
											/>
										</span>
									) : (
										<span
											className=' '
											style={{ color: "white" }}
											onClick={chosenLanguageEngish}
										>
											<img
												className='flags'
												src={AmericanFlag}
												alt='English'
												style={{
													marginRight: "5px",
													width: "3%",
													cursor: "pointer",
												}}
											/>{" "}
										</span>
									)}
								</span>
							</div>

							<div className='imageWrapper'>
								<img
									src={XlookLogo}
									style={{ width: "40%" }}
									alt={
										chosenLanguage === "Arabic"
											? "أفضل تطبيق حجز لمحلات الحلاقة وصالونات الحلاقة ومراكز التجميل"
											: "The best booking app for barber shops, hair salons and beauty centers"
									}
								/>
							</div>
							{chosenGender === "AlreadyHaveAccount" ? (
								<AlreadyHaveAccount chosenLanguage={chosenLanguage} />
							) : null}

							{chosenGender === "AlreadyHaveAccount" ? (
								<div
									className='haveAnAccount mt-5'
									onClick={() => {
										setChosenGender("BackToRegister");
									}}
								>
									{chosenLanguage === "Arabic" ? (
										<p className='arabicP'>
											{" "}
											<strong>تسجيل حساب جديد</strong>{" "}
										</p>
									) : (
										<p>
											{" "}
											<strong>REGISTER NOW</strong>{" "}
										</p>
									)}
								</div>
							) : (
								<div
									className='haveAnAccount mt-2'
									onClick={() => {
										setChosenGender("AlreadyHaveAccount");
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									{chosenLanguage === "Arabic" ? (
										<p
											className='arabicP'
											style={{
												color: "white",
												textAlign: "center",
											}}
										>
											{" "}
											<strong>إذا كان لديك حساب، اضغط هنا...</strong>{" "}
										</p>
									) : (
										<p>
											{" "}
											<strong>
												Already Have An Account, Click Here...
											</strong>{" "}
										</p>
									)}
								</div>
							)}

							{chosenGender !== "AlreadyHaveAccount" ? (
								<>
									{chosenLanguage === "Arabic" ? (
										<Slider ref={sliderRef} {...settings}>
											<div>
												<SecondStep
													chosenLanguage={chosenLanguage}
													setSteps={setSteps}
													steps={steps}
													handlePrev={handlePrev}
													handleNext={handleNext}
													chosenGender={chosenGender}
												/>
											</div>
											<div>
												<FirstStep
													chosenLanguage={chosenLanguage}
													setSteps={setSteps}
													steps={steps}
													setChosenGender={setChosenGender}
													chosenGender={chosenGender}
													handlePrev={handlePrev}
													handleNext={handleNext}
												/>
											</div>
										</Slider>
									) : (
										<Slider ref={sliderRef} {...settings}>
											<div>
												<FirstStep
													chosenLanguage={chosenLanguage}
													setSteps={setSteps}
													steps={steps}
													setChosenGender={setChosenGender}
													chosenGender={chosenGender}
													handlePrev={handlePrev}
													handleNext={handleNext}
												/>
											</div>
											<div>
												<SecondStep
													chosenLanguage={chosenLanguage}
													setSteps={setSteps}
													steps={steps}
													handlePrev={handlePrev}
													handleNext={handleNext}
												/>
											</div>
										</Slider>
									)}
								</>
							) : null}
						</div>
					</>
				)}
			</div>

			{/* {isAuthenticated() &&
			isAuthenticated().user &&
			isAuthenticated().user.role === 2000 ? (
				<Redirect to='/agent/dashboard' />
			) : null}
			{isAuthenticated() &&
			isAuthenticated().user &&
			isAuthenticated().user.role === 1000 ? (
				<Redirect to='/store/admin/dashboard' />
			) : null}

			{isAuthenticated() &&
			isAuthenticated().user &&
			isAuthenticated().user.role === 10000
				? null
				: null}

			{!isAuthenticated() && !isAuthenticated().user ? (
				<Redirect to='/about?ar' />
			) : null} */}

			{isAuthenticated() && isAuthenticated().user ? (
				<Redirect to='/home' />
			) : null}
		</IntroPageWrapper>
	);
};

export default IntroPage;

const IntroPageWrapper = styled.div`
	min-height: 1300px;
	background-image: url(${BackgroundImage});
	background-size: cover; // this will make sure the image covers the entire container
	background-repeat: no-repeat;
	background-position: center; // this will center the background image
	min-height: 100vh; // this will make the div take up at least the full height of the viewport
	width: 100%; // this will make the div take up the full width of the viewport
	overflow: hidden;

	.imageWrapper {
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.textWrapper {
		text-align: center;
		color: white;
		font-size: 2rem;
		text-transform: uppercase;
		margin-top: 30px;
	}

	.textTitle {
		text-align: center;
		color: white;
		font-size: 1.5rem;
		text-transform: uppercase;
		margin-top: 30px;
	}

	.choices > div {
		color: white;
		font-size: 1.5rem;
		text-transform: uppercase;
		border-radius: 5px;
		padding: 10px 20px;
		background: ${(props) =>
			props.show
				? "linear-gradient(to left, #676767, black)"
				: "linear-gradient(to right, #676767, black)"};

		cursor: pointer;
	}

	.menDiv {
		width: 40%;
		margin-right: ${(props) => (props.show ? "25%" : "")};
		margin-left: ${(props) => (props.show ? "" : "25%")};
		padding: 13px 20px;
	}

	.haveAnAccount {
		color: white;
		font-size: 1.3rem;
		text-decoration: underline;
		cursor: pointer;
		text-align: center;
	}

	@media (max-width: 1200px) {
		.imageWrapper > img {
			width: 90% !important;
		}

		.textWrapper {
			margin-top: 20px;
			font-size: 1.7rem;
		}

		.textTitle {
			margin-top: 20px;
			font-size: 1.3rem;
		}

		.letterX {
			width: 10% !important;
			object-fit: cover;
		}

		.menDiv {
			width: 80%;
			margin: 10px 0px !important;
		}

		.flags {
			width: 7% !important;
		}
	}
`;
