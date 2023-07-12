import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import MainHeroComp from "../components/HomePage/MainHeroComp";
import MainOverallServices from "../components/HomePage/MainOverallServices";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { isAuthenticated } from "../auth";

const Home = ({ language, setLanguage }) => {
	useEffect(() => {
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("pickedPetSizeFirstAvailable");
		localStorage.removeItem("pickedPetTypeFirstAvailable");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("CustomerType");
		localStorage.removeItem("chosenStylistUpdate");

		// eslint-disable-next-line
	}, []);
	return (
		<HomeWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				{language === "Arabic" ? (
					<title dir='rtl'>إكس لوك | برنامج الحجز الرسمي</title>
				) : (
					<title>XLOOK | Official Booking Software</title>
				)}
				<meta
					name='description'
					content={
						language === "Arabic"
							? `إكس لوك هي منصة تضم جميع صالونات الحلاقة ومراكز الجمال والتجميل الموجودة في مصر. المنصة تقدم خدمات لجميع أفراد العائلة، بما في ذلك السيدات، الآنسات، الرجال، والأطفال، مع مجموعة متنوعة من الخدمات المقدمة. منصة إكس لوك تُستخدم لاختيار وحجز موعد في صالون الحلاقة أو مركز التجميل الأقرب أو الأبعد حسب موقعك. الزائرين يمكنهم حجز الخدمات التي تقدمها المنصة من خلال تطبيق خاص مصمم لتسجيل المستخدمين وحجز خدمات التجميل. Powered By https://infinite-apps.com`
							: `XLOOK is a platform that includes all barbershops, ladies' beauty salons, and beauty centers located in Egypt. The platform offers services for all family members, including women, girls, men, and children, with a variety of services provided. The XLOOK platform is used to choose and book a barbershop or beauty center appointment with the closest to the farthest offer according to your location. Visitors can book the services offered by the platform through a special application designed for user registration and booking beauty services. Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						language === "Arabic"
							? `حجز مواقع الويب لصالونات التجميل، تطبيقات لا نهائية، برامج لا نهاية، منصة XLOOK، XLOOK، XLookpro، xlookpro.com، محلات الحلاقة، صالونات التجميل، مراكز التجميل، خدمات العائلة، حجز المواعيد، مواقع ويب مخصصة، مواقع ويب بأسعار معقولة، تطوير المواقع الإلكترونية، بناء المواقع الإلكترونية`
							: `booking websites for salons, infinite apps, infinite erp, XLOOK platform, XLOOK, XLookpro, xlookpro.com, barbershops, beauty salons, beauty centers, family services, appointment booking, custom websites, affordable websites, website development, website building`
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com' />
				{language === "Arabic" && (
					<html lang='ar' dir='rtl' xmlns='http://www.w3.org/1999/xhtml' />
				)}
			</Helmet>

			{isAuthenticated() &&
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
			) : null}

			<MainHeroComp language={language} />
			<MainOverallServices language={language} />
		</HomeWrapper>
	);
};

export default Home;

const HomeWrapper = styled.div`
	min-height: 800px;
	overflow-x: hidden !important;

	background-color: black;
`;
