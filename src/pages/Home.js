import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import {
	// eslint-disable-next-line
	allStoresSorted,
	allStoresSorted2,
	allStoresSortedGraded,
} from "../apiCore";
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
import axios from "axios";
import AppsLandingPage from "./AppsLandingPage";

const Home = ({ language, setLanguage }) => {
	const [stores, setStores] = useState([]);
	const [stores2, setStores2] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [chosenSalonType, setChosenSalonType] = useState(undefined);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState(null);
	// eslint-disable-next-line
	const [itemsPerPage, setItemPerPage] = useState(25);
	const { chosenLanguage } = useCartContext();

	const handleInputChange = (event) => {
		setSearchValue(event.target.value);
	};

	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
	});

	const getLocation = useCallback(() => {
		setLoading(true);
		const salonTypeStored = localStorage.getItem("salonTypeStored");
		const userLocation = JSON.parse(localStorage.getItem("userLocation"));

		allStoresSorted2(
			34.052235,
			-118.243683,
			undefined, //storeCountry
			undefined,
			undefined,
			salonTypeStored ? salonTypeStored : chosenSalonType,
			undefined,
			itemsPerPage,
			currentPage
		)
			.then((data) => {
				if (data.error) {
					setLoading(false);
					setError(data.error);
				} else {
					var uniqueStoresWithLatestDates = data.stores;

					setStores(uniqueStoresWithLatestDates);
					setLoading(false);
				}
			})
			.catch((err) => setError(err));

		allStoresSortedGraded(
			34.052235,
			-118.243683,
			undefined, //storeCountry
			undefined,
			undefined,
			salonTypeStored ? salonTypeStored : chosenSalonType,
			undefined,
			itemsPerPage,
			currentPage
		)
			.then((data) => {
				if (data.error) {
					setError(data.error);
					setLoading(false);
				} else {
					var uniqueStoresWithLatestDates = data.stores;

					setStores2(uniqueStoresWithLatestDates);
					setLoading(false);
				}
			})
			.catch((err) => setError(err));

		navigator.geolocation.getCurrentPosition(
			(position) => {
				// lat, long
				// 31.123883, 29.775421 examples
				// eslint-disable-next-line
				const { latitude: lat, longitude: lon } = position.coords;
				allStoresSorted2(
					lat,
					lon,
					userLocation.country.toLowerCase(),
					undefined,
					undefined,
					salonTypeStored ? salonTypeStored : chosenSalonType,
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

				allStoresSortedGraded(
					lat,
					lon,
					userLocation.country.toLowerCase(),
					undefined,
					undefined,
					salonTypeStored ? salonTypeStored : chosenSalonType,
					undefined,
					itemsPerPage,
					currentPage
				)
					.then((data) => {
						if (data.error) {
							setError(data.error);
						} else {
							var uniqueStoresWithLatestDates = data.stores;

							setStores2(uniqueStoresWithLatestDates);
							setLoading(false);
						}
					})
					.catch((err) => setError(err));
			},
			() => {
				setError("Could not get location");
			}
		);
	}, [currentPage, itemsPerPage, chosenSalonType]);

	useEffect(() => {
		if (!isLoaded) return;
		getLocation();

		// eslint-disable-next-line
	}, [isLoaded, currentPage, , getLocation, chosenLanguage]);

	const handleRetryClick = () => {
		window.location.reload();
	};

	// console.log(stores, "stores");

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

	useEffect(() => {
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by your browser");
			setDefaultLocation();
		} else {
			navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		}

		function successFunction(position) {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			axios
				.get(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
				)
				.then((response) => {
					const { address } = response.data;
					const { country, state, city } = address;

					const userLocation = {
						country,
						state,
						city,
					};

					localStorage.setItem("userLocation", JSON.stringify(userLocation));
				})
				.catch((error) => {
					console.log(error);
					setDefaultLocation();
				});
		}

		function errorFunction(error) {
			console.error("Error while fetching geolocation:", error);
			setDefaultLocation();
		}

		function setDefaultLocation() {
			const defaultLocation = {
				country: "egypt",
				state: "Default State",
				city: "Default City",
			};

			localStorage.setItem("userLocation", JSON.stringify(defaultLocation));
		}
	}, []);

	// console.log(stores, "salons");
	return (
		<HomeWrapper dir='ltr'>
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

				<link rel='canonical' href='https://www.xlookpro.com/' />
				{chosenLanguage === "Arabic" && (
					<html lang='ar' dir='rtl' xmlns='http://www.w3.org/1999/xhtml' />
				)}
			</Helmet>

			<div className='containerWrapper'>
				{chosenLanguage === "Arabic" ? (
					<FirstSectionArabic
						language={chosenLanguage}
						handleInputChange={handleInputChange}
						searchValue={searchValue}
						setChosenSalonType={setChosenSalonType}
					/>
				) : (
					<FirstSection
						language={chosenLanguage}
						handleInputChange={handleInputChange}
						searchValue={searchValue}
						setChosenSalonType={setChosenSalonType}
					/>
				)}

				{chosenLanguage === "Arabic" ? (
					<SecondSectionArabic language={chosenLanguage} />
				) : (
					<SecondSection language={chosenLanguage} />
				)}
				{stores && stores.length > 0 && stores2 && stores2.length > 0 ? (
					<>
						{chosenLanguage === "Arabic" ? (
							<ThirdSectionArabic
								language={chosenLanguage}
								stores={stores2}
								loading={loading}
								handleRetryClick={handleRetryClick}
								loadError={loadError}
								searchValue={searchValue}
								error={error}
							/>
						) : (
							<ThirdSection
								language={chosenLanguage}
								stores={stores2}
								loading={loading}
								handleRetryClick={handleRetryClick}
								loadError={loadError}
								searchValue={searchValue}
								error={error}
							/>
						)}
					</>
				) : null}

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

				{stores && stores.length > 0 && stores2 && stores2.length > 0 ? (
					<>
						{chosenLanguage === "Arabic" ? (
							<SeventhSectionArabic
								language={chosenLanguage}
								stores={stores}
								loading={loading}
								handleRetryClick={handleRetryClick}
								loadError={loadError}
								searchValue={searchValue}
								error={error}
							/>
						) : (
							<SeventhSection
								language={chosenLanguage}
								stores={stores}
								loading={loading}
								handleRetryClick={handleRetryClick}
								loadError={loadError}
								searchValue={searchValue}
								error={error}
							/>
						)}
					</>
				) : null}
			</div>
			<AppsLandingPage />
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

	.containerWrapper {
		margin: auto 200px;
	}

	.firstSection {
		margin-top: 10px;
	}

	.seventhSection {
		margin-top: 30px;
		margin-bottom: 60px;
		min-height: 150px;
		border: 1px white solid;
	}

	@media (max-width: 1100px) {
		.containerWrapper {
			margin: auto;
		}
	}
`;
