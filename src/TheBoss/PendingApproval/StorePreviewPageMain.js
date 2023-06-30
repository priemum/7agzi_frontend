import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { allLoyaltyPointsAndStoreStatusByPhoneAndStore } from "../apiBoss";
import {
	getAbouts,
	getContacts,
	getAllHeros,
	getServices,
	getEmployees,
} from "../../apiCore";
import HeroComponent from "../../components/SingleStorePage/HeroComponent";
import EmployeesList from "../../components/SingleStorePage/EmployeeList";
import ContactUs from "../../components/SingleStorePage/ContactUs";
import AboutUs from "../../components/SingleStorePage/AboutUs";

const StorePreviewPageMain = () => {
	let { storeName } = useParams();
	let { phone } = useParams();

	const [chosenStore, setChosenStore] = useState("");
	const [aboutus, setAboutUs] = useState({});
	const [contact, setContact] = useState({});
	const [hero1, setHero1] = useState("");
	// eslint-disable-next-line
	const [hero2, setHero2] = useState("");
	const [allEmployees, setAllEmployees] = useState([]);
	const [AllServices, setAllServices] = useState([]);
	const [allCustomerType, setAllCustomerType] = useState([]);
	const [chosenCustomerType, setChosenCustomerType] = useState("");
	const [chosenDate, setChosenDate] = useState("");
	const [chosenService, setChosenService] = useState("");
	const [loading, setLoading] = useState(true);

	const gettingChosenStore = () => {
		setLoading(true);
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data) => {
			if (data.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data[data.length - 1];
				setChosenStore({
					...pickedStoreRendered,
					storeId:
						pickedStoreRendered.belongsTo &&
						pickedStoreRendered.belongsTo &&
						pickedStoreRendered.belongsTo._id,
					storeCreatedAt:
						pickedStoreRendered.belongsTo &&
						pickedStoreRendered.belongsTo &&
						pickedStoreRendered.belongsTo.createdAt,
				});
			}
		});
	};

	const gettingAllAbouts = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log(" rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getAbouts("asdasd", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAboutUs(data[data.length - 1]);
					}
				});
			}
		});
	};

	const gettingAllContacts = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log(" rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getContacts("asdasd", pickedStoreRendered.belongsTo._id).then(
					(data) => {
						if (data.error) {
							console.log(data.error);
						} else {
							setContact(data[data.length - 1]);
						}
					}
				);
			}
		});
	};

	const gettingAllHeroes = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getAllHeros("token", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
					} else {
						const lastAddedHeros = data[data.length - 1];
						if (lastAddedHeros && data.length > 0) {
							setHero1(
								data[data.length - 1].thumbnail[0]
									? data[data.length - 1].thumbnail[0]
									: []
							);
							setHero2(
								data[data.length - 1].thumbnail2[0]
									? data[data.length - 1].thumbnail2[0]
									: []
							);
						} else {
							setHero1([]);
							setHero2([]);
						}

						// setHyperLink(data[data.length - 1].hyper_link);
						// setHyperLink2(data[data.length - 1].hyper_link2);
						// setHyperLink3(data[data.length - 1].hyper_link3);
					}
				});
			}
		});
	};

	const gettingAllEmployees = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getEmployees(pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAllEmployees(data);
						setLoading(false);
					}
				});
			}
		});
	};

	const getAllService = (ownerId) => {
		allLoyaltyPointsAndStoreStatusByPhoneAndStore(
			"token",
			storeName.split("-").join(" "),
			phone
		).then((data2) => {
			if (data2.error) {
				console.log("error rendering store data");
			} else {
				var pickedStoreRendered = data2[data2.length - 1];
				getServices("token", pickedStoreRendered.belongsTo._id).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						setAllCustomerType([
							...new Set(data && data.map((i) => i.customerType)),
						]);

						if (chosenCustomerType) {
							setAllServices(
								data.filter((i) => i.activeService === true) &&
									data
										.filter((i) => i.activeService === true)
										.map((ii) => ii) &&
									data
										.filter((i) => i.activeService === true)
										.map((ii) => ii)
										.filter((iv) => iv.customerType === chosenCustomerType)
							);
						}
					}
				});
			}
		});
	};

	useEffect(() => {
		gettingChosenStore();
		// eslint-disable-next-line
	}, [phone, storeName]);

	useEffect(() => {
		if (chosenStore && chosenStore.belongsTo) {
			getAllService();
			gettingAllAbouts();
			gettingAllContacts();
			gettingAllHeroes();
			gettingAllEmployees();
		}
		// eslint-disable-next-line
	}, [chosenDate, chosenCustomerType, chosenService]);

	const handleChosenCustomerType = (event) => {
		setChosenCustomerType(event.target.value);
	};

	return (
		<SingleStorePageWrapper>
			{loading && !chosenStore && !chosenStore.belongsTo ? (
				<div>Loading.....</div>
			) : (
				<React.Fragment>
					<HeroComponent
						hero1={hero1}
						onlineStoreName={chosenStore}
						allEmployees={allEmployees}
						AllServices={AllServices}
						contact={contact}
						allCustomerType={allCustomerType}
						setChosenCustomerType={setChosenCustomerType}
						chosenCustomerType={chosenCustomerType}
						chosenDate={chosenDate}
						setChosenDate={setChosenDate}
						setChosenService={setChosenService}
						chosenService={chosenService}
						handleChosenCustomerType={handleChosenCustomerType}
						fromLocalStore={chosenStore}
					/>

					<div>
						<EmployeesList
							storeProperties={chosenStore}
							contact={contact}
							filteredResults={allEmployees}
						/>
					</div>

					<div>
						<ContactUs contact={contact} />
					</div>

					<div>
						<AboutUs aboutus={aboutus} />
					</div>
				</React.Fragment>
			)}
		</SingleStorePageWrapper>
	);
};

export default StorePreviewPageMain;

const SingleStorePageWrapper = styled.div`
	min-height: 900px;
`;
