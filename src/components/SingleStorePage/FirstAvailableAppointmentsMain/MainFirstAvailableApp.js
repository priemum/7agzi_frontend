/** @format */

import React, { useState, useEffect } from "react";

import { Animated } from "react-animated-css";
import styled from "styled-components";
import { gettingFirstAppointmentFromBackend } from "../../../apiCore";
import FirstAvailableAppointmentClientArabic from "./FirstAvailableAppointmentClientArabic";
import FirstAvailableAppointmentClient from "./FirstAvailableAppointmentClient";

const MainFirstAvailableApp = ({
	language,
	chosenDate,
	setChosenDate,
	allCustomerType,
	allActiveServices,
	chosenCustomerType,
	setChosenCustomerType,
	chosenService,
	setChosenService,
	onlineStoreName,
	loading,
	allEmployees,
	setLoading,
	serviceDetailsArray,
	setServiceDetailsArray,
}) => {
	const [appointmentFirst, setAppointmentFirst] = useState({
		firstAvailableTime: null,
	});

	var userBelongsToModified = onlineStoreName.belongsTo._id;

	const firstAppointmentAvailable = () => {
		if (
			chosenDate &&
			chosenCustomerType &&
			chosenService &&
			chosenService.length > 0
		) {
			setLoading(true);
			let allPickedServices =
				serviceDetailsArray && serviceDetailsArray.map((i) => i.serviceName);

			// Format date to "MM-DD-YYYY"
			const date = new Date(chosenDate);
			const formattedDate = `${
				date.getMonth() + 1
			}-${date.getDate()}-${date.getFullYear()}`;

			gettingFirstAppointmentFromBackend(
				allPickedServices.join(","),
				chosenCustomerType,
				formattedDate,
				"Egypt",
				userBelongsToModified
			).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setAppointmentFirst(data);
					setLoading(false);
				}
			});
		}
	};

	useEffect(() => {
		firstAppointmentAvailable();
		// eslint-disable-next-line
	}, [chosenCustomerType, chosenService, chosenDate]);

	useEffect(() => {
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("CustomerType");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("chosenStylistUpdate");
		localStorage.removeItem("pickedPetSizeFirstAvailable");
		localStorage.removeItem("pickedPetTypeFirstAvailable");
		// eslint-disable-next-line
	}, []);

	return (
		<BookFromStoreWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<div className='grid-container'>
				<div className=''>
					<Animated
						animationIn='bounceInLeft'
						animationOut='zoomOut'
						animationInDuration={2000}
						animationInDelay={0}
						animationOutDuration={1000}
						isVisible={true}
					>
						{language === "Arabic" ? (
							<FirstAvailableAppointmentClientArabic
								language={language}
								chosenDate={chosenDate}
								setChosenDate={setChosenDate}
								allCustomerType={allCustomerType}
								allActiveServices={allActiveServices}
								chosenCustomerType={chosenCustomerType}
								setChosenCustomerType={setChosenCustomerType}
								chosenService={chosenService}
								setChosenService={setChosenService}
								appointmentFirst={appointmentFirst}
								loading={loading}
								setServiceDetailsArray={setServiceDetailsArray}
								serviceDetailsArray={serviceDetailsArray}
							/>
						) : (
							<FirstAvailableAppointmentClient
								language={language}
								chosenDate={chosenDate}
								setChosenDate={setChosenDate}
								allCustomerType={allCustomerType}
								allActiveServices={allActiveServices}
								chosenCustomerType={chosenCustomerType}
								setChosenCustomerType={setChosenCustomerType}
								chosenService={chosenService}
								setChosenService={setChosenService}
								appointmentFirst={appointmentFirst}
								loading={loading}
								setServiceDetailsArray={setServiceDetailsArray}
								serviceDetailsArray={serviceDetailsArray}
							/>
						)}
					</Animated>
				</div>
			</div>
		</BookFromStoreWrapper>
	);
};

export default MainFirstAvailableApp;

const BookFromStoreWrapper = styled.div``;
