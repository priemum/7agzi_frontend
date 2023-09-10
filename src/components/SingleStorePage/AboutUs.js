/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPreviousScheduledHours } from "../../Owners/apiOwner";

const AboutUs = ({ aboutus, storeProperties }) => {
	const [previousAddedHours, setPreviousAddedHours] = useState([]);

	const PreviousAddedAppointmentHours = () => {
		getPreviousScheduledHours(storeProperties.belongsTo._id, "token").then(
			(data) => {
				if (data.error) {
					console.log(data.error, "Retrieving Previous Working Hours");
				} else {
					let previousAddedHours = data[data.length - 1].hoursCanBeScheduled;

					previousAddedHours = previousAddedHours.map((time) => {
						const [hours, minutes] = time.split(":");
						return `${hours.padStart(2, "0")}:${minutes}`;
					});

					previousAddedHours.sort();
					setPreviousAddedHours(previousAddedHours);
				}
			}
		);
	};

	var weekDays = [
		{ abbr: "SUN", full: "Sunday" },
		{ abbr: "MON", full: "Monday" },
		{ abbr: "TUES", full: "Tuesday" },
		{ abbr: "WED", full: "Wednesday" },
		{ abbr: "THURS", full: "Thursday" },
		{ abbr: "FRI", full: "Friday" },
		{ abbr: "SAT", full: "Saturday" },
	];

	function findDayIndex(weekDays, chosenDay) {
		// Ensure chosenDay is trimmed and converted to the proper case.
		var modifiedChosenDay = chosenDay.trim();

		// Find the index of the day object in the weekDays array.
		return weekDays.findIndex(
			(day) =>
				day.abbr.toUpperCase() === modifiedChosenDay.toUpperCase() ||
				day.full.toUpperCase() === modifiedChosenDay.toUpperCase()
		);
	}

	const chosenDays =
		storeProperties &&
		storeProperties.daysStoreClosed &&
		storeProperties.daysStoreClosed.length > 0
			? storeProperties.daysStoreClosed
			: ["Nothing"];
	const indices = chosenDays.map((chosenDay) =>
		findDayIndex(weekDays, chosenDay)
	);

	useEffect(() => {
		if (
			storeProperties &&
			storeProperties.belongsTo &&
			storeProperties.belongsTo._id
		) {
			PreviousAddedAppointmentHours();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<AboutPageWrapper>
			<div className=' my-2'>
				<div className='firstSection'>
					<h1>{storeProperties && storeProperties.addStoreName}</h1>
					<div className='row'>
						<div className='col-7'>
							<div
								className='row'
								style={{ fontSize: "11px", fontWeight: "bolder" }}
							>
								<div className='col-4 text-center'>
									BRANCHES
									<div className='text-center'>
										{storeProperties && storeProperties.branchesCount}
									</div>
								</div>
								<div className='col-4 text-center'>
									STYLISTS{" "}
									<div className='text-center'>
										{storeProperties && storeProperties.stylistsCount}
									</div>
								</div>
								<div className='col-4 text-center'>
									CHAIRS{" "}
									<div className='text-center'>
										{storeProperties && storeProperties.chairsCount}
									</div>
								</div>
							</div>
						</div>

						<div className='col-5'>
							<div className='row'>
								<div className='col-6 text-center' style={{ fontSize: "10px" }}>
									GOVERNORATE
									<div
										className='text-center mx-auto my-auto'
										style={{
											textTransform: "uppercase",
											fontWeight: "bolder",
											color: "#b1d8ff",
											textAlign: "center",
										}}
									>
										{storeProperties &&
											storeProperties.belongsTo &&
											storeProperties.belongsTo.storeGovernorate}
									</div>
								</div>
								<div className='col-6 text-center' style={{ fontSize: "10px" }}>
									DISTRICT
									<div
										className='text-center mx-auto my-auto'
										style={{
											textTransform: "uppercase",
											fontWeight: "bolder",
											color: "#b1d8ff",
											textAlign: "center",
										}}
									>
										{storeProperties &&
											storeProperties.belongsTo &&
											storeProperties.belongsTo.storeDistrict}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<h2 className='mt-3 mb-1'>WHO WE ARE?</h2>

				<div className='secondSection'>
					<div className='row'>
						<div className='col-md-6 about-us'>
							<p className='about-title'>{aboutus && aboutus.header_1}</p>

							<div
								className='ml-3'
								dangerouslySetInnerHTML={{
									__html: aboutus && aboutus.description_1,
								}}
							/>
						</div>
						{/* {aboutus ? (
							<div className='col-md-6 imgdiv  my-5'>
								<img
									src={
										aboutus &&
										aboutus.thumbnail &&
										aboutus.thumbnail[0] &&
										aboutus.thumbnail[0].url
									}
									className='img-fluid'
									alt='Infinite-Apps'
								/>
							</div>
						) : null} */}
					</div>
				</div>

				<h2 className='mt-3 mb-1'>WORKING TIME</h2>

				<div className='thirdSection'>
					<div>
						Open Days:{" "}
						{weekDays.map((d, i) => {
							return (
								<span
									key={i}
									className='ml-2'
									style={{
										fontSize: "11px",
										fontWeight: "bolder",
										color: indices.indexOf(i) !== -1 ? "#ffb1b1" : "#b1ffd8",
									}}
								>
									{d.abbr}
								</span>
							);
						})}
					</div>

					<div className='my-2 row'>
						<div className='col-2' style={{ fontSize: "10px" }}>
							WORKING HOURS:
						</div>
						<div className='col-6' style={{ fontSize: "11px" }}>
							<div className='row'>
								<div className='col-3'>
									FROM:
									<br />
									TO:
								</div>

								<div className='col-3'>
									{previousAddedHours[0]}
									<br />
									{previousAddedHours[previousAddedHours.length - 1]}
								</div>
							</div>
						</div>

						<div
							className='col-11'
							style={{
								color: "#ffb1b1",
								fontWeight: "bolder",
								fontSize: "13px",
								textAlign: "right",
								textTransform: "uppercase",
							}}
						>
							{storeProperties && storeProperties.daysStoreClosed}s ARE OFF
						</div>
					</div>
				</div>

				<h2 className='mt-3 mb-1'>MORE INFO</h2>

				<div className='forthSection'>
					<div className='row'>
						<div className='col-6'>
							<h2
								className='mt-3 mb-1'
								style={{ fontSize: "0.9rem", textAlign: "center" }}
							>
								PAYMENT METHODS
							</h2>
							<div className='row' style={{ fontSize: "11px" }}>
								<div className='col-5 text-center'>
									CASH
									<br />
									{storeProperties && storeProperties.cashPayment
										? "YES"
										: "NO"}
								</div>

								<div className='col-7 text-center'>
									VISA PAYMENT
									<br />
									{storeProperties && storeProperties.visaPayment
										? "YES"
										: "NO"}
								</div>
							</div>
						</div>

						<div className='col-6 text-center'>
							<h2
								className='mt-3 mb-1'
								style={{ fontSize: "0.9rem", textAlign: "center" }}
							>
								LUXURY
							</h2>
							<div className='row'>
								<div className='col-7' style={{ fontSize: "11px" }}>
									AIR CONDITION
									<br />
									{storeProperties && storeProperties.airConditioned
										? "YES"
										: "NO"}
								</div>
								<div className='col-5' style={{ fontSize: "11px" }}>
									PARKING
									<br />
									{storeProperties && storeProperties.parking ? "YES" : "NO"}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AboutPageWrapper>
	);
};

export default AboutUs;

const AboutPageWrapper = styled.section`
	background-color: black;
	overflow: hidden;
	color: white;

	.firstSection {
		padding: 20px 5px;
		background-color: #2b2e31;
	}

	.firstSection > h1 {
		font-size: 1.3rem;
		font-weight: bolder;
		color: white;
		text-transform: uppercase;
	}

	.secondSection {
		padding: 20px 5px;
		background-color: #2b2e31;
	}

	h2 {
		font-size: 1.1rem;
		font-weight: bolder;
		color: white;
		text-transform: uppercase;
	}

	.thirdSection {
		padding: 10px 2px;
		background-color: #2b2e31;
	}

	.forthSection {
		padding: 20px 5px;
		background-color: #2b2e31;
	}

	@media (min-width: 1200px) {
		margin-left: 200px;
		margin-right: 200px;
		padding-bottom: 100px;
	}
`;
