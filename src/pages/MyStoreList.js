import React, { useEffect, useState, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
	allStoresSorted,
	activeStoresCount,
	getCountriesDistrictsGov,
	allLoyaltyPointsAndStoreStatusWithServices,
} from "../apiCore";
import { Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import StoreListPhone from "../components/StoresListComp/StoreListPhone";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import StoreFilter from "../components/StoreFilter";
import CardForStore from "../components/StoresListComp/CardForStore";
import SideFilter from "../components/StoresListComp/SideFilter";

const MyStoreList = ({ language }) => {
	const [stores, setStores] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [filtersClicked, setFiltersClicked] = useState(false);
	// eslint-disable-next-line
	const [allServicesCombined, setAllServicesCombined] = useState([]);
	const [allAvailableFilters, setAllAvailableFilters] = useState([]);
	const [availableCountries, setAvailableCountries] = useState([]);
	const [availableGovernorates, setAvailableGovernorates] = useState([]);
	const [availableDistricts, setAvailableDistricts] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedGovernorate, setSelectedGovernorate] = useState("");
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [selectedService, setSelectedService] = useState("");

	// eslint-disable-next-line
	const [allSalonTypes, setAllSalonTypes] = useState("");
	const [selectedSalonType, setSelectedSalonType] = useState("");
	const [priceRange, setPriceRange] = useState([]);
	const [servicesInPriceRange, setServicesInPriceRange] = useState([]);

	const itemsPerPage = 20;
	const [currentPage, setCurrentPage] = useState(1);

	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
	});

	const getLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				// lat, long
				// 31.123883, 29.775421 examples
				// eslint-disable-next-line
				const { latitude: lat, longitude: lon } = position.coords;
				allStoresSorted(lat, lon, itemsPerPage, currentPage)
					.then((data) => {
						if (data.error) {
							setError(data.error);
						} else {
							setStores(data.stores);

							setLoading(false);
						}
					})
					.catch((err) => setError(err));
			},
			() => setError("Could not get location")
		);
	}, [currentPage]);

	const gettingFilteringCriteria = () => {
		getCountriesDistrictsGov().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAvailableFilters(data);

				// Get unique countries
				const uniqueCountries = [
					...new Set(data.map((item) => item.storeCountry)),
				];
				setAvailableCountries(uniqueCountries);

				// Get unique governorates
				const uniqueGovernorates = [
					...new Set(data.map((item) => item.storeGovernorate)),
				];
				setAvailableGovernorates(uniqueGovernorates);

				// Get unique districts
				const uniqueDistricts = [
					...new Set(data.map((item) => item.storeDistrict)),
				];
				setAvailableDistricts(uniqueDistricts);
			}
		});
	};

	const getOnlineStoreName = () => {
		allLoyaltyPointsAndStoreStatusWithServices("token").then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var dataModified = data.map((i) => {
					return {
						...i,
						storeId: i.belongsTo._id,
						storeCreatedAt: i.belongsTo.createdAt,
					};
				});

				dataModified.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				// Then, use reduce to construct an object where the keys are storeNames and the values are the corresponding items with the latest date
				var result = dataModified.reduce((acc, item) => {
					if (
						!acc[item.storeId] ||
						new Date(item.createdAt) > new Date(acc[item.storeId].createdAt)
					) {
						acc[item.storeId] = item;
					}
					return acc;
				}, {});

				// Finally, extract the values from the resulting object to get an array of items
				var uniqueStoresWithLatestDates = Object.values(result);
				uniqueStoresWithLatestDates.sort(
					(a, b) => new Date(a.storeCreatedAt) - new Date(b.storeCreatedAt)
				);

				var filteredStoresSalonType = selectedSalonType
					? uniqueStoresWithLatestDates &&
					  uniqueStoresWithLatestDates.filter(
							(store) =>
								store.belongsTo.storeType.toLowerCase() ===
								selectedSalonType.toLowerCase()
					  )
					: uniqueStoresWithLatestDates;

				var filteredStores = selectedService
					? filteredStoresSalonType &&
					  filteredStoresSalonType.filter((store) =>
							store.services.some(
								(service) =>
									service.serviceName.toLowerCase() ===
									selectedService.toLowerCase()
							)
					  )
					: filteredStoresSalonType;

				//Salon Types
				var allSalonTypesArray =
					filteredStores &&
					filteredStores.map((iii) => iii.belongsTo.storeType);

				setAllSalonTypes([...new Set(allSalonTypesArray)]);

				if (selectedCountry) {
					filteredStores = filteredStores.filter(
						(store) =>
							store.belongsTo.storeCountry.toLowerCase() ===
							selectedCountry.toLowerCase()
					);
				}

				if (selectedGovernorate && selectedDistrict) {
					filteredStores = filteredStores.filter(
						(store) =>
							store.belongsTo.storeGovernorate.toLowerCase() ===
								selectedGovernorate.toLowerCase() &&
							store.belongsTo.storeDistrict.toLowerCase() ===
								selectedDistrict.toLowerCase()
					);
				}

				if (selectedGovernorate) {
					filteredStores = filteredStores.filter(
						(store) =>
							store.belongsTo.storeGovernorate.toLowerCase() ===
							selectedGovernorate.toLowerCase()
					);

					const gettingUpatedDistrictHelper =
						allAvailableFilters &&
						allAvailableFilters.filter(
							(item) =>
								item.storeGovernorate.toLowerCase() ===
								selectedGovernorate.toLowerCase()
						);

					const uniqueDistricts = [
						...new Set(
							gettingUpatedDistrictHelper.map((item) => item.storeDistrict)
						),
					];
					setAvailableDistricts(uniqueDistricts);
				}

				if (selectedDistrict) {
					filteredStores = filteredStores.filter(
						(store) =>
							store.belongsTo.storeDistrict.toLowerCase() ===
							selectedDistrict.toLowerCase()
					);
					const gettingUpatedGovernorateHelper =
						allAvailableFilters &&
						allAvailableFilters.filter(
							(item) =>
								item.storeDistrict.toLowerCase() ===
								selectedDistrict.toLowerCase()
						);

					const uniqueGovernorates = [
						...new Set(
							gettingUpatedGovernorateHelper.map(
								(item) => item.storeGovernorate
							)
						),
					];
					setAvailableGovernorates(uniqueGovernorates);
				}

				const allServices = data.flatMap((item) => item.services);
				const uniqueServices = allServices.reduce((accumulator, service) => {
					const serviceName = service.serviceName;
					const existingService = accumulator.find(
						(s) => s.serviceName === serviceName
					);
					if (!existingService) {
						accumulator.push(service);
					}
					return accumulator;
				}, []);

				uniqueServices.sort((a, b) =>
					a.serviceName.localeCompare(b.serviceName)
				);
				setAllServicesCombined(uniqueServices);

				const allServicesPrices = data.flatMap((item) =>
					item.services.map((service) => service.servicePriceDiscount)
				);
				const minPrice =
					allServicesPrices.length > 0 ? Math.min(...allServicesPrices) : 0;
				const maxPrice =
					allServicesPrices.length > 0 ? Math.max(...allServicesPrices) : 0;

				setPriceRange([minPrice, maxPrice]);
			}
		});
	};

	useEffect(() => {
		gettingFilteringCriteria();
		getOnlineStoreName();
		activeStoresCount()
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setTotalItems(data.total);
				}
			})
			.catch((err) => setError(err));

		if (!isLoaded) return;
		getLocation();

		// eslint-disable-next-line
	}, [isLoaded, currentPage, getLocation]);

	const handleRetryClick = () => {
		window.location.reload();
	};

	if (loading && isLoaded) {
		return (
			<div className='spinner-container'>
				<Spin size='large' tip='Loading...' />
			</div>
		);
	}

	if (loadError || error) {
		return (
			<div className='spinner-container'>
				<Spin size='large' tip='Loading...' />
				<div>
					This app requires access to your location. Please enable it in your
					browser settings, or{" "}
					<Link href='#' onClick={handleRetryClick}>
						click here
					</Link>{" "}
					to retry.
				</div>
			</div>
		);
	}

	return (
		<MyStoreListWrapper>
			<Helmet dir={language === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{language === "Arabic" ? (
					<title dir='rtl'>دور على أقرب مصفف شعر ومركز تجميل ليك</title>
				) : (
					<title>Find Your Closest Stylist And Beauty Center</title>
				)}
				<meta
					name='description'
					content={
						language === "Arabic"
							? `ابحث عن أقرب مصفف للشعر بالقرب منك باستخدام منصتنا السهلة للحجز. اكتشف خبراء تصفيف الشعر المحترفين وأصحاب صالونات الحلاقة والجمال في منطقتك. احجز موعدك بسهولة واستمتع بخدمات عالية الجودة. احصل على الإطلالة التي ترغب فيها بسهولة. ابدأ رحلتك للحصول على تسريحة شعر رائعة اليوم!. Powered By https://infinite-apps.com`
							: `Find the closest stylist near you with our convenient booking platform. Discover professional hairstylists, barbers, and beauty experts in your area. Book your appointment hassle-free and enjoy quality services. Get the look you desire with ease. Start your journey to a fabulous hairstyle today! Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						language === "Arabic"
							? `إكس لوك، مصفف شعر، صالونات حلاقة، خدمات تجميل , ${
									allServicesCombined &&
									allServicesCombined.map((i) => i.serviceNameOtherLanguage)
							  }`
							: `XLOOK, hairstylist, barbershops, beauty services, ${
									allServicesCombined &&
									allServicesCombined.map((i) => i.serviceName)
							  }`
					}
				/>

				<link rel='canonical' href='https://www.xlookpro.com/schedule' />
			</Helmet>
			<SideFilter
				filtersClicked={filtersClicked}
				setFiltersClicked={setFiltersClicked}
				availableCountries={availableCountries}
				availableGovernorates={availableGovernorates}
				availableDistricts={availableDistricts}
				selectedCountry={selectedCountry}
				setSelectedCountry={setSelectedCountry}
				selectedGovernorate={selectedGovernorate}
				setSelectedGovernorate={setSelectedGovernorate}
				selectedDistrict={selectedDistrict}
				setSelectedDistrict={setSelectedDistrict}
				allServicesCombined={allServicesCombined}
				selectedService={selectedService}
				setSelectedService={setSelectedService}
				priceRange={priceRange}
				setPriceRange={setPriceRange}
				servicesInPriceRange={servicesInPriceRange}
				setServicesInPriceRange={setServicesInPriceRange}
				allSalonTypes={allSalonTypes}
				selectedSalonType={selectedSalonType}
				setSelectedSalonType={setSelectedSalonType}
			/>
			<div>
				<div className='deskTopVersion'>
					<div className='pt-5'>
						<StoreFilter
							availableCountries={availableCountries}
							availableGovernorates={availableGovernorates}
							availableDistricts={availableDistricts}
							selectedCountry={selectedCountry}
							setSelectedCountry={setSelectedCountry}
							selectedGovernorate={selectedGovernorate}
							setSelectedGovernorate={setSelectedGovernorate}
							selectedDistrict={selectedDistrict}
							setSelectedDistrict={setSelectedDistrict}
							allAvailableFilters={allAvailableFilters}
						/>
					</div>
					<div className='continueShoppingEmpty mx-auto my-5'>
						The Best Barber Shops and Salons in Egypt
					</div>

					<div className='container'>
						<div className='row'>
							{stores &&
								stores.map((p, i) => {
									return (
										<div
											key={i}
											className='col-md-4'
											onClick={() => {
												localStorage.setItem("chosenStore", JSON.stringify(p));
												window.scrollTo({ top: 0, behavior: "smooth" });
											}}
										>
											<CardForStore store={p} />
										</div>
									);
								})}
						</div>
					</div>
				</div>
				<StoreListPhone
					activeStoresOnly={stores}
					allServicesCombined={allServicesCombined}
					filtersClicked={filtersClicked}
					setFiltersClicked={setFiltersClicked}
				/>
			</div>
			<div
				className='mx-auto text-center mt-3 pb-5'
				onClick={() => {
					window.scrollTo({ top: 10, behavior: "smooth" });
				}}
			>
				<Pagination
					current={currentPage}
					total={totalItems}
					pageSize={itemsPerPage}
					onChange={(page) => {
						setCurrentPage(page);
						window.scrollTo({ top: 10, behavior: "smooth" });
					}}
				/>
			</div>
		</MyStoreListWrapper>
	);
};

export default MyStoreList;

const MyStoreListWrapper = styled.div`
	min-height: 1100px;
	background-color: black;

	img {
		width: 100%;
		min-height: 300px;
	}

	.deskTopVersion {
		display: block;
	}

	@media (max-width: 1000px) {
		padding-top: 40px;

		.deskTopVersion {
			display: none;
		}

		img {
			width: 100%;
			min-height: 100%;
		}
	}
`;
