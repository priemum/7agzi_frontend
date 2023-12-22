import React, { useEffect } from "react";
import styled from "styled-components";
import LandingPageImage from "../Images/LandingPageImage.png";
import AppStoreImage from "../Images/AppStoreImage.png";
import GooglePlayImage from "../Images/GooglePlayImage.png";
import { Helmet } from "react-helmet";
import { useCartContext } from "../sidebar_context";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const AppsLandingPage = () => {
	const { chosenLanguage } = useCartContext();

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	const redirectToStore = (url) => {
		console.log("User Agent:", navigator.userAgent); // This will log the user agent string

		if (/Android/i.test(navigator.userAgent)) {
			ReactGA.event("ANDROID_DOWNLOAD", {
				event_category: "ANDROID_DOWNLOAD",
				event_label: "ANDROID_DOWNLOAD",
				value: 1, // Optional extra parameters
			});

			ReactPixel.track("ANDROID_DOWNLOAD", {
				content_name: "ANDROID_DOWNLOAD",
				content_category: "ANDROID_DOWNLOAD",
				value: "",
				currency: "",
			});

			console.log("Redirecting to Android app store...");
			window.location.href = `market://details?id=com.infiniteapps.xlookproapp`;
		} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			ReactGA.event("APPLE_STORE_DOWNLOAD", {
				event_category: "APPLE_STORE_DOWNLOAD",
				event_label: "APPLE_STORE_DOWNLOAD",
				value: 1, // Optional extra parameters
			});

			ReactPixel.track("APPLE_STORE_DOWNLOAD", {
				content_name: "APPLE_STORE_DOWNLOAD",
				content_category: "APPLE_STORE_DOWNLOAD",
				value: "",
				currency: "",
			});

			console.log("Redirecting to Apple app store...");
			window.location.href = `itms-apps://apps.apple.com/us/app/xlookpro/id6466922817`;
		} else {
			// This block should be executed on a Windows PC.
			ReactGA.event("CLICKED_NO_DOWNLOAD_ERROR", {
				event_category: "CLICKED_NO_DOWNLOAD_ERROR",
				event_label: "CLICKED_NO_DOWNLOAD_ERROR",
				value: 1, // Optional extra parameters
			});

			ReactPixel.track("CLICKED_NO_DOWNLOAD_ERROR_APP", {
				content_name: "CLICKED_NO_DOWNLOAD_ERROR_APP",
				content_category: "CLICKED_NO_DOWNLOAD_ERROR_APP",
				value: "",
				currency: "",
			});

			console.log("Redirecting to:", url);
			window.open(url, "_blank").focus();
		}
	};

	return (
		<AppsLandingPageWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			{window.location.pathname === "/" ? null : (
				<Helmet>
					<meta charSet='utf-8' />
					<title>XLOOK | Our Play Store And App Store Applications</title>
					<meta
						name='description'
						content={
							chosenLanguage === "Arabic"
								? `إكس لوك هي منصة تضم جميع صالونات الحلاقة ومراكز الجمال والتجميل الموجودة في مصر. المنصة تقدم خدمات لجميع أفراد العائلة، بما في ذلك السيدات، الآنسات، الرجال، والأطفال، مع مجموعة متنوعة من الخدمات المقدمة. منصة إكس لوك تُستخدم لاختيار وحجز موعد في صالون الحلاقة أو مركز التجميل الأقرب أو الأبعد حسب موقعك. الزائرين يمكنهم حجز الخدمات التي تقدمها المنصة من خلال تطبيق خاص مصمم لتسجيل المستخدمين وحجز خدمات التجميل. Powered By https://infinite-apps.com`
								: `Free Barbershops & hair salons booking systems. XLOOK is a platform that includes all barbershops, ladies' beauty salons, and beauty centers. The platform offers services for all family members, including women, girls, men, and children, with a variety of services provided. The XLOOK platform is used to choose and book a barbershop or beauty center appointment with the closest to the farthest offer according to your location. Visitors can book the services offered by the platform through a special application designed for user registration and booking beauty services. Powered By https://infinite-apps.com`
						}
					/>
					<meta
						name='keywords'
						content={
							chosenLanguage === "Arabic"
								? `حجز مواقع الويب لصالونات التجميل، تطبيقات لا نهائية، برامج لا نهاية، منصة XLOOK، XLOOK، XLookpro، xlookpro.com، محلات الحلاقة، صالونات التجميل، مراكز التجميل، خدمات العائلة، حجز المواعيد، مواقع ويب مخصصة، مواقع ويب بأسعار معقولة، تطوير المواقع الإلكترونية، بناء المواقع الإلكترونية`
								: `booking websites for salons, infinite apps, infinite erp, XLOOK platform, XLOOK, XLookpro, xlookpro.com, barbershops, beauty salons, beauty centers, family services, appointment booking, custom websites, affordable websites, website development, website building, Apple Store application, Play Store Application`
						}
					/>
					<link rel='canonical' href='https://xlookpro.com/xlookpro-apps' />
					{chosenLanguage === "Arabic" && (
						<html lang='ar' dir='rtl' xmlns='http://www.w3.org/1999/xhtml' />
					)}
				</Helmet>
			)}

			<div className='bannerImage'>
				<img src={LandingPageImage} alt='powered by infinite-apps.com' />
			</div>

			<div className='contentWrapper'>
				{chosenLanguage === "Arabic" ? (
					<div className='textData' style={{ textAlign: "right" }}>
						<h1>إكس لوك</h1>
						<p>
							أول منصة تضم جميع مراكز التجميل وصالونات الحلاقة في مصر
							<br />
							<br />
							فبمجرد تنزيل التطبيق، ستتمكن من استكشاف جميع صالونات التجميل
						</p>
					</div>
				) : (
					<div className='textData' style={{ textAlign: "left" }}>
						<h1>X Look</h1>
						<p>
							The first platform that includes all beauty centers and barber
							shops in Egypt
							<br />
							<br />
							Once you download the app, you will be able to explore all the
							beauty salons
						</p>
					</div>
				)}

				{chosenLanguage === "Arabic" ? (
					<h2>متوفر في جميع منصات التحميل</h2>
				) : (
					<h2>Available on all download platforms</h2>
				)}

				<div className='row'>
					<div
						className='col-6 mx-auto text-center appleImage'
						onClick={() => {
							redirectToStore(
								`itms-apps://apps.apple.com/us/app/xlookpro/id6466922817`,
								"https://apps.apple.com/us/app/xlookpro/id6466922817",
								"App Store"
							);
						}}
					>
						<img src={AppStoreImage} alt='powered by infinite-apps.com' />
					</div>
					<div
						className='col-6 mx-auto androidImage'
						onClick={() => {
							redirectToStore(
								`market://details?id=com.infiniteapps.xlookproapp`,
								"https://play.google.com/store/apps/details?id=com.infiniteapps.xlookproapp",
								"Play Store"
							);
						}}
					>
						<img src={GooglePlayImage} alt='powered by infinite-apps.com' />
					</div>
				</div>
			</div>
		</AppsLandingPageWrapper>
	);
};

export default AppsLandingPage;

const AppsLandingPageWrapper = styled.div`
	background-color: black;
	min-height: 900px;
	overflow: hidden;
	text-align: center;

	.contentWrapper {
		padding: 10px;
	}

	h1 {
		font-weight: bolder;
		color: white;
		margin-right: 10px;
		margin-left: 10px;
		margin-top: 20px;
		font-size: 3rem;
	}

	h2 {
		font-weight: bolder;
		color: white;
		font-size: 2.9rem;
		text-align: center;
		margin: auto;
		padding: 20px;
	}

	p {
		font-weight: bolder;
		color: white;
		margin-right: 10px;
		margin-left: 10px;
		font-size: 1.75rem;
	}

	.bannerImage {
		background-color: darkgrey;
	}

	.bannerImage > img {
		height: 50%;
		width: 50%;
	}

	.androidImage > img {
		height: 100%;
		width: 50%;
		object-fit: cover;
	}

	.appleImage > img {
		height: 100%;
		width: 50%;
		object-fit: cover;
	}
	@media (max-width: 1000px) {
		h1 {
			font-weight: bolder;
			color: white;
			margin-right: 10px;
			margin-left: 10px;
			margin-top: 20px;
			font-size: 2rem;
		}

		h2 {
			font-weight: bolder;
			color: white;
			font-size: 0.9rem;
			text-align: center;
			margin: auto;
			padding: 20px;
		}

		p {
			font-weight: bolder;
			color: white;
			margin-right: 10px;
			margin-left: 10px;
			font-size: 0.7rem;
		}

		.bannerImage {
			background-color: darkgrey;
		}

		.bannerImage > img {
			height: 100%;
			width: 100%;
		}

		.androidImage > img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}

		.appleImage > img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
`;
