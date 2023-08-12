import React, { useEffect, useState, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
	// eslint-disable-next-line
	allStoresSorted,
	activeStoresCount,
	getCountriesDistrictsGov,
	// eslint-disable-next-line
	allStoresSorted2,
} from "../apiCore";
import { Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import StoreListPhone from "../components/StoresListComp/StoreListPhone";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import StoreFilter from "../components/StoreFilter";
import CardForStore from "../components/StoresListComp/CardForStore";
import SideFilter from "../components/StoresListComp/SideFilter";
import { useCartContext } from "../sidebar_context";

const MyStoreList = ({ language }) => {
	const { chosenLanguage } = useCartContext();

	// eslint-disable-next-line
	const capturedCountry = JSON.parse(localStorage.getItem("userLocation"));

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
	const [selectedCountry, setSelectedCountry] = useState(undefined);
	const [selectedGovernorate, setSelectedGovernorate] = useState(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState(undefined);
	const [selectedService, setSelectedService] = useState(undefined);

	// eslint-disable-next-line
	const [allSalonTypes, setAllSalonTypes] = useState("");
	const [selectedSalonType, setSelectedSalonType] = useState(undefined);
	const [priceRange, setPriceRange] = useState([]);
	const [servicesInPriceRange, setServicesInPriceRange] = useState([]);

	// eslint-disable-next-line
	const [itemsPerPage, setItemPerPage] = useState(15);
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

				allStoresSorted(
					lat,
					lon,
					"egypt",
					selectedGovernorate,
					selectedDistrict,
					selectedSalonType,
					selectedService,
					itemsPerPage,
					currentPage
				)
					.then((data) => {
						if (data.error) {
							setError(data.error);
						} else {
							let queryString = window.location.search;
							let cleanedString = decodeURIComponent(
								queryString.slice(1)
							).trim();

							var uniqueStoresWithLatestDates =
								cleanedString === "barber shop" ||
								cleanedString === "hair salon"
									? data.stores.filter(
											(i) => i.belongsTo.storeType === cleanedString
									  )
									: cleanedString === "beard shaving" ||
									  cleanedString === "hair cut"
									? data.stores.filter((store) =>
											store.services.some(
												(service) => service.serviceName === cleanedString
											)
									  )
									: cleanedString === "50"
									? data.stores.filter((store) =>
											store.services.some(
												(service) =>
													Number(service.servicePriceDiscount) <=
													Number(cleanedString)
											)
									  )
									: cleanedString === "bundle"
									? data.stores.filter((store) =>
											store.services.some(
												(service) => service.bundleService === true
											)
									  )
									: data.stores;

							// console.log(cleanedString, "cleanedString");
							// console.log(
							// 	uniqueStoresWithLatestDates,
							// 	"uniqueStoresWithLatestDates"
							// );

							if (selectedCountry) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
										(store) =>
											store.belongsTo.storeCountry.toLowerCase() ===
											selectedCountry.toLowerCase()
									);
							}

							if (selectedGovernorate && selectedDistrict) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
										(store) =>
											store.belongsTo.storeGovernorate.toLowerCase() ===
												selectedGovernorate.toLowerCase() &&
											store.belongsTo.storeDistrict.toLowerCase() ===
												selectedDistrict.toLowerCase()
									);
							}

							if (selectedGovernorate) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
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
										gettingUpatedDistrictHelper.map(
											(item) => item.storeDistrict
										)
									),
								];
								setAvailableDistricts(uniqueDistricts);
							}

							if (selectedDistrict) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
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

							//Salon Types
							var allSalonTypesArray =
								uniqueStoresWithLatestDates &&
								uniqueStoresWithLatestDates.map(
									(iii) => iii.belongsTo.storeType
								);
							setAllSalonTypes([...new Set(allSalonTypesArray)]);

							//Services
							const allServices = uniqueStoresWithLatestDates.flatMap(
								(item) => item.services
							);
							const uniqueServices = allServices.reduce(
								(accumulator, service) => {
									const serviceName = service.serviceName;
									const existingService = accumulator.find(
										(s) => s.serviceName === serviceName
									);
									if (!existingService) {
										accumulator.push(service);
									}
									return accumulator;
								},
								[]
							);

							uniqueServices.sort((a, b) =>
								a.serviceName.localeCompare(b.serviceName)
							);

							setAllServicesCombined(uniqueServices);

							setStores(uniqueStoresWithLatestDates);

							setLoading(false);
						}
					})
					.catch((err) => setError(err));
			},
			() => setError("Could not get location")
		);
	}, [
		currentPage,
		selectedSalonType,
		selectedService,
		selectedDistrict,
		selectedCountry,
		selectedGovernorate,
		itemsPerPage,
		allAvailableFilters,
	]);

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

	useEffect(() => {
		activeStoresCount(
			"egypt",
			selectedGovernorate,
			selectedDistrict,
			selectedSalonType,
			selectedService
		)
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
	}, [isLoaded, currentPage, , getLocation]);

	useEffect(() => {
		gettingFilteringCriteria();

		// eslint-disable-next-line
	}, []);

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
		<MyStoreListWrapper showPagination={selectedGovernorate}>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>دور على أقرب مصفف شعر ومركز تجميل ليك</title>
				) : (
					<title>Find Your Closest Stylist And Beauty Center</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? `ابحث عن أقرب مصفف للشعر بالقرب منك باستخدام منصتنا السهلة للحجز. اكتشف خبراء تصفيف الشعر المحترفين وأصحاب صالونات الحلاقة والجمال في منطقتك. احجز موعدك بسهولة واستمتع بخدمات عالية الجودة. احصل على الإطلالة التي ترغب فيها بسهولة. ابدأ رحلتك للحصول على تسريحة شعر رائعة اليوم!. Powered By https://infinite-apps.com`
							: `Find the closest stylist near you with our convenient booking platform. Discover professional hairstylists, barbers, and beauty experts in your area. Book your appointment hassle-free and enjoy quality services. Get the look you desire with ease. Start your journey to a fabulous hairstyle today! Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						chosenLanguage === "Arabic"
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
					language={chosenLanguage}
				/>
			</div>
			<div
				className='mx-auto text-center mt-3 pb-5 pagination'
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
	padding-bottom: 50px;

	img {
		width: 100%;
		min-height: 300px;
	}

	.deskTopVersion {
		display: block;
	}

	@media (max-width: 1000px) {
		.deskTopVersion {
			display: none;
		}

		.pagination {
			display: ${(props) => (props.showPagination ? "none" : "block")};
		}

		img {
			width: 100%;
			min-height: 100%;
		}
	}
`;