/** @format */

import React, { useState, useEffect } from "react";
// import ReactGA from "react-ga";
import {
	allLoyaltyPointsAndStoreStatusWithServices,
	getCountriesDistrictsGov,
} from "../apiCore";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import CardForStore from "../components/StoresListComp/CardForStore";
import StoreFilter from "../components/StoreFilter";
import { Spin } from "antd";
import StoreListPhone from "../components/StoresListComp/StoreListPhone";
import SideFilter from "../components/StoresListComp/SideFilter";
// import { Helmet } from "react-helmet";

const StoresList = () => {
	const [loading, setLoading] = useState(true);
	const [storeProperties, setStoreProperties] = useState([]);
	// eslint-disable-next-line
	const [allAvailableFilters, setAllAvailableFilters] = useState([]);
	const [availableCountries, setAvailableCountries] = useState([]);
	const [availableGovernorates, setAvailableGovernorates] = useState([]);
	const [availableDistricts, setAvailableDistricts] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedGovernorate, setSelectedGovernorate] = useState("");
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [allServicesCombined, setAllServicesCombined] = useState([]);
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [filtersClicked, setFiltersClicked] = useState(false);
	const [selectedService, setSelectedService] = useState("");
	const [allSalonTypes, setAllSalonTypes] = useState("");
	const [selectedSalonType, setSelectedSalonType] = useState("");
	const [priceRange, setPriceRange] = useState([]);
	const [servicesInPriceRange, setServicesInPriceRange] = useState([]);

	const { token } = isAuthenticated();

	const getUserCoordinates = (position) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
		return position;
	};

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				getUserCoordinates,
				handleGeoLocationError
			);
			// setButtonClicked(true);
			// ReactGA.event({
			// 	category: "Client Asked For Roadside Assistance",
			// 	action: "Client Aksed For Roadside Assistance in the English page",
			// 	label: "The chosen Service Is" + chosenService,
			// });
		} else {
			console.log("Geolocation is not supported");
		}
	};

	const handleGeoLocationError = (error) => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				alert("You have denied the request for your Geolocation.");
				break;
			case error.POSITION_UNAVAILABLE:
				alert("Location information is unavailable, Please try again later.");
				break;
			case error.TIMEOUT:
				alert("The request has timed out.");
				break;
			case error.UNKNOWN_ERROR:
				alert("An unknown error occurred, Please try again later.");
				break;
			default:
				alert("An unknown error occurred, Please try again later.");
		}
	};

	const getAdress = () => {
		if (latitude && longitude) {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`
			)
				.then((response) => response.json())
				.then((data) => {
					// setUserAddress(data.results[0].formatted_address);
					// setUserAddress2(data.results[1].formatted_address);
					// setUserAddress3(data.results[2].formatted_address);
					// setUserAddress4(data.results[3].formatted_address);
					// setUserAddress5(data.results[4].formatted_address);
					// setUserAddress6(data.results[5].formatted_address);
					// console.log(data, "This is data");
					///////////Creating Calling Order
				})
				.catch((error) => console.log(error, "error"));
		} else {
			return null;
		}
	};

	useEffect(() => {
		getLocation();
		getAdress();
		// eslint-disable-next-line
	}, [longitude, latitude]);

	const getOnlineStoreName = () => {
		setLoading(true);
		allLoyaltyPointsAndStoreStatusWithServices(token).then((data) => {
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

				setStoreProperties(filteredStores);

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

				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		});
	};

	useEffect(() => {
		gettingFilteringCriteria();

		// eslint-disable-next-line
	}, []);

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

	useEffect(
		() => {
			getOnlineStoreName();
			localStorage.removeItem("pickedServiceFirstAvailable");
			localStorage.removeItem("pickedPetSizeFirstAvailable");
			localStorage.removeItem("pickedPetTypeFirstAvailable");
			localStorage.removeItem("chosenDateFromFirstAvailable");
			localStorage.removeItem("barber");
			localStorage.removeItem("chosenStylistId_Store");
			localStorage.removeItem("CustomerType");
			localStorage.removeItem("chosenStylistUpdate");
		},
		// eslint-disable-next-line
		[
			selectedCountry,
			selectedGovernorate,
			selectedDistrict,
			selectedService,
			selectedSalonType,
		]
	);

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	const activeStoresOnly =
		storeProperties && storeProperties.filter((i) => i.activeStore === true);

	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	if (latitude !== undefined && longitude !== undefined) {
		// only sort if user's location is available
		activeStoresOnly &&
			activeStoresOnly.sort((a, b) => {
				let distA = getDistanceFromLatLonInKm(
					latitude,
					longitude,
					a.latitude,
					a.longitude
				);
				let distB = getDistanceFromLatLonInKm(
					latitude,
					longitude,
					b.latitude,
					b.longitude
				);

				return distA - distB; // this will sort in ascending order of distance
			});
	}

	return (
		<StoresListWrapper>
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

			<React.Fragment>
				{loading ? (
					<div
						style={{
							paddingTop: "15%",
							textAlign: "center",
							fontSize: "1.9rem",
							color: "lightcyan",
							fontWeight: "bold",
						}}
					>
						Loading... <Spin size='large' />
					</div>
				) : (
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
								/>
							</div>
							<div className='continueShoppingEmpty mx-auto my-5'>
								The Best Barber Shops and Salons in Egypt
							</div>

							<div className='container'>
								<div className='row'>
									{activeStoresOnly &&
										activeStoresOnly.map((p, i) => {
											return (
												<div
													key={i}
													className='col-md-4'
													onClick={() => {
														localStorage.setItem(
															"chosenStore",
															JSON.stringify(p)
														);
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
						<div>
							<StoreListPhone
								activeStoresOnly={activeStoresOnly}
								allServicesCombined={allServicesCombined}
								filtersClicked={filtersClicked}
								setFiltersClicked={setFiltersClicked}
							/>
						</div>
					</div>
				)}
			</React.Fragment>
		</StoresListWrapper>
	);
};

export default StoresList;

const StoresListWrapper = styled.div`
	min-height: 950px;
	background-color: black;

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
	}
`;
