import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

// eslint-disable-next-line
import { allStoresSorted, allStoresSorted2 } from "../apiCore";
import { useJsApiLoader } from "@react-google-maps/api";
import FirstSection from "../components/HomePage/FirstSection";
import SecondSection from "../components/HomePage/SecondSection";
import ThirdSection from "../components/HomePage/ThirdSection";
import FourthSection from "../components/HomePage/FourthSection";
import FifthSection from "../components/HomePage/FifthSection";
import SixthSection from "../components/HomePage/SixthSection";
import SeventhSection from "../components/HomePage/SeventhSection";
import FirstSectionArabic from "../components/HomePage/HomeArabic/FirstSectionArabic";
import SecondSectionArabic from "../components/HomePage/HomeArabic/SecondSectionArabic";
import ThirdSectionArabic from "../components/HomePage/HomeArabic/ThirdSectionArabic";
import FourthSectionArabic from "../components/HomePage/HomeArabic/FourthSectionArabic";
import FifthSectionArabic from "../components/HomePage/HomeArabic/FifthSectionArabic";
import SixthSectionArabic from "../components/HomePage/HomeArabic/SixthSectionArabic";
import SeventhSectionArabic from "../components/HomePage/HomeArabic/SeventhSectionArabic";
import { useCartContext } from "../sidebar_context";

const Home = ({ language, setLanguage }) => {
	const { chosenLanguage } = useCartContext();

	const [stores, setStores] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState(null);
	// eslint-disable-next-line
	const [itemsPerPage, setItemPerPage] = useState(20);

	const handleInputChange = (event) => {
		setSearchValue(event.target.value);
	};

	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
	});
	const getLocation = useCallback(() => {
		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				// lat, long
				// 31.123883, 29.775421 examples
				// eslint-disable-next-line
				const { latitude: lat, longitude: lon } = position.coords;

				allStoresSorted2(
					lat,
					lon,
					"egypt",
					undefined,
					undefined,
					undefined,
					undefined,
					itemsPerPage,
					currentPage
				)
					.then((data) => {
						if (data.error) {
							setError(data.error);
						} else {
							var uniqueStoresWithLatestDates = data.stores;

							setStores(uniqueStoresWithLatestDates);
							setLoading(false);
						}
					})
					.catch((err) => setError(err));
			},
			() => setError("Could not get location")
		);
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		if (!isLoaded) return;
		getLocation();

		// eslint-disable-next-line
	}, [isLoaded, currentPage, , getLocation]);

	const handleRetryClick = () => {
		window.location.reload();
	};

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

	// console.log(stores, "stores");

	return (
		<HomeWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
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

			<div className=''>
				{chosenLanguage === "Arabic" ? (
					<FirstSectionArabic
						language={chosenLanguage}
						handleInputChange={handleInputChange}
						searchValue={searchValue}
					/>
				) : (
					<FirstSection
						language={chosenLanguage}
						handleInputChange={handleInputChange}
						searchValue={searchValue}
					/>
				)}

				{chosenLanguage === "Arabic" ? (
					<SecondSectionArabic language={chosenLanguage} />
				) : (
					<SecondSection language={chosenLanguage} />
				)}

				{chosenLanguage === "Arabic" ? (
					<ThirdSectionArabic
						language={chosenLanguage}
						stores={stores}
						loading={loading}
						handleRetryClick={handleRetryClick}
						loadError={loadError}
						searchValue={searchValue}
						error={error}
					/>
				) : (
					<ThirdSection
						language={chosenLanguage}
						stores={stores}
						loading={loading}
						handleRetryClick={handleRetryClick}
						loadError={loadError}
						searchValue={searchValue}
						error={error}
					/>
				)}

				{chosenLanguage === "Arabic" ? (
					<FourthSectionArabic language={chosenLanguage} />
				) : (
					<FourthSection language={chosenLanguage} />
				)}

				{chosenLanguage === "Arabic" ? (
					<FifthSectionArabic language={chosenLanguage} />
				) : (
					<FifthSection language={chosenLanguage} />
				)}

				{chosenLanguage === "Arabic" ? (
					<SixthSectionArabic language={chosenLanguage} />
				) : (
					<SixthSection language={chosenLanguage} />
				)}

				{chosenLanguage === "Arabic" ? (
					<SeventhSectionArabic language={chosenLanguage} />
				) : (
					<SeventhSection language={chosenLanguage} />
				)}
			</div>
		</HomeWrapper>
	);
};

export default Home;

const HomeWrapper = styled.div`
	min-height: 1000px;
	overflow-x: hidden !important;
	color: white;
	padding-top: 10px;
	background-color: black;

	.firstSection {
		margin-top: 10px;
	}

	.seventhSection {
		margin-top: 30px;
		margin-bottom: 60px;
		min-height: 150px;
		border: 1px white solid;
	}
`;
