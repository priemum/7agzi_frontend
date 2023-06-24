/** @format */

import React, { useState, useEffect } from "react";
// import ReactGA from "react-ga";
import {
	allLoyaltyPointsAndStoreStatus,
	getCountriesDistrictsGov,
} from "../apiCore";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import CardForStore from "../components/EmployeeList/CardForStore";
import StoreFilter from "../components/StoreFilter";
import { Spin } from "antd";
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

	const { token } = isAuthenticated();

	const getOnlineStoreName = () => {
		setLoading(true);
		allLoyaltyPointsAndStoreStatus(token).then((data) => {
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

				if (selectedCountry) {
					uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
						(store) =>
							store.belongsTo.storeCountry.toLowerCase() ===
							selectedCountry.toLowerCase()
					);
				}

				if (selectedGovernorate && selectedDistrict) {
					uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
						(store) =>
							store.belongsTo.storeGovernorate.toLowerCase() ===
								selectedGovernorate.toLowerCase() &&
							store.belongsTo.storeDistrict.toLowerCase() ===
								selectedDistrict.toLowerCase()
					);
				}

				if (selectedGovernorate) {
					uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
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
					uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
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

				setStoreProperties(uniqueStoresWithLatestDates);

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

	useEffect(() => {
		getOnlineStoreName();
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("pickedPetSizeFirstAvailable");
		localStorage.removeItem("pickedPetTypeFirstAvailable");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("CustomerType");
		localStorage.removeItem("chosenStylistUpdate");

		// eslint-disable-next-line
	}, [selectedCountry, selectedGovernorate, selectedDistrict]);

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	const activeStoresOnly =
		storeProperties && storeProperties.filter((i) => i.activeStore === true);

	return (
		<StoresListWrapper>
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
					<React.Fragment>
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
					</React.Fragment>
				)}
			</React.Fragment>
			<br />
			<br />
		</StoresListWrapper>
	);
};

export default StoresList;

const StoresListWrapper = styled.div`
	min-height: 800px;
	background-color: black;

	img {
		width: 100%;
		min-height: 300px;
	}
`;
