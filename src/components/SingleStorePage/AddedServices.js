/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getServices } from "../../apiCore";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "grey",
			fontWeight: "bolder",
			padding: "5px 0px 5px 0px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			marginRight: "5px",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			fontSize: "11.5px",

			// textDecoration: "underline",
		};
	} else {
		return {
			fontWeight: "bolder",
			padding: "5px 0px 5px 0px",
			border: "lightgrey 1px solid",
			textAlign: "center",
			borderRadius: "5px",
			marginRight: "5px",
			marginLeft: "3px",
			fontSize: "11.5px",
			cursor: "pointer",
		};
	}
};

const AddedServices = ({
	chosenCustomerType,
	ownerId,
	language,
	fromPage,
	chosenService,
	setChosenService,
	setServiceDetailsArray,
	serviceDetailsArray,
}) => {
	const [AllServices, setAllServices] = useState([]);
	const [clickedMenu, setClickedMenu] = useState("STANDARD");
	const [checkedService, setCheckedService] = useState(null);

	const getAllService = (chosenCustomerTypeFromFirstAvailable) => {
		getServices("Token", ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var servicesTrial = data.filter((i) =>
					i.activeService === true &&
					i.serviceType === "package service" &&
					chosenCustomerTypeFromFirstAvailable
						? i.customerType === chosenCustomerTypeFromFirstAvailable
						: null
				);
				function removeDuplicates() {
					// Declare a new array
					let newArray = [];

					// Declare an empty object
					let uniqueObject = {};

					// Loop for the array elements
					for (let i in servicesTrial) {
						// Extract the title
						var objTitle = servicesTrial[i]["serviceName"];

						// Use the title as the index
						uniqueObject[objTitle] = servicesTrial[i];
					}

					// Loop to push unique object into array
					for (let i in uniqueObject) {
						newArray.push(uniqueObject[i]);
					}

					if (clickedMenu === "BUNDLE") {
						newArray = newArray.filter((i) => i.bundleService === true);
					}

					// Display the unique objects
					setAllServices(newArray);
				}
				removeDuplicates();
			}
		});
	};

	useEffect(() => {
		const chosenCustomerTypeFromFirstAvailable = chosenCustomerType;
		getAllService(chosenCustomerTypeFromFirstAvailable);
		// eslint-disable-next-line
	}, [chosenCustomerType, clickedMenu]);

	const allLists = () => {
		return (
			<Collapse
				dir={language === "Arabic" ? "rtl" : "ltr"}
				expandIconPosition='right'
				accordion
				className='my-custom-collapse'
				style={{
					backgroundColor: "black",
					color: "white",
					width: "100%",
					border: "none",
				}}
			>
				{AllServices &&
					AllServices.map((s, i) => {
						return (
							<Panel
								key={i}
								header={
									<div>
										<div className='row'>
											<div className='col-4'>
												{language === "Arabic" ? (
													<span
														className=''
														style={{ color: "white", fontSize: "11px" }}
													>
														{s.serviceNameOtherLanguage}{" "}
													</span>
												) : (
													<span
														className=''
														style={{ color: "white", fontSize: "11px" }}
													>
														{s.serviceName}{" "}
													</span>
												)}
											</div>
											<div className='col-3'>
												<span
													className=''
													style={{ color: "white", fontSize: "11px" }}
												>
													{s.servicePriceDiscount} EGP
												</span>
											</div>
											<div className='col-3'>
												{language === "Arabic" ? (
													<span
														className=''
														style={{ color: "white", fontSize: "11px" }}
													>
														{s.serviceTime} دقيقة
													</span>
												) : (
													<span
														className=''
														style={{ color: "white", fontSize: "11px" }}
													>
														{s.serviceTime} mins
													</span>
												)}
											</div>
											{fromPage === "SingleStore" ? (
												<div className='col-2'>
													<Checkbox
														checked={
															checkedService && s && s._id
																? checkedService.includes(s._id)
																: false
														}
														onChange={(e) => {
															if (e.target.checked) {
																setCheckedService((prevChecked) =>
																	Array.isArray(prevChecked)
																		? [...prevChecked, s._id]
																		: [s._id]
																);
															} else {
																setCheckedService((prevChecked) =>
																	Array.isArray(prevChecked)
																		? prevChecked.filter((id) => id !== s._id)
																		: []
																);
															}
															// After setting checked services, let's update the selected services
															const newCheckedService = e.target.checked
																? Array.isArray(checkedService)
																	? [...checkedService, s._id]
																	: [s._id]
																: Array.isArray(checkedService)
																? checkedService.filter((id) => id !== s._id)
																: [];

															const selectedServices = AllServices
																? AllServices.filter(
																		(service) =>
																			service &&
																			newCheckedService.includes(service._id)
																  )
																: [];

															setServiceDetailsArray(selectedServices);
															setChosenService(
																selectedServices &&
																	selectedServices.map((service) =>
																		service ? service.serviceName : null
																	)
															);
														}}
													/>
												</div>
											) : null}
										</div>
									</div>
								}
								style={{
									textTransform: "capitalize",
									backgroundColor: "black",
									color: "white",
									border: "none",
								}}
							>
								<div>
									{AllServices &&
										AllServices[i] &&
										AllServices[i].serviceDescription.map((d, ii) => {
											return (
												<p
													key={ii + 10}
													style={{
														textTransform: "capitalize",
														listStyle: "none",
														fontSize: "12px",
														color: "white",
													}}
												>
													{d}
												</p>
											);
										})}
								</div>
							</Panel>
						);
					})}
			</Collapse>
		);
	};

	return (
		<AddedServicesStyling dir={language === "Arabic" ? "rtl" : "ltr"}>
			<div className='row my-3 ml-3'>
				{language === "Arabic" ? (
					<div
						className='col-4 ArabicStyling'
						style={isActive(clickedMenu, "STANDARD")}
						onClick={() => setClickedMenu("STANDARD")}
					>
						الخدمات الفردية
					</div>
				) : (
					<div
						className='col-3'
						style={isActive(clickedMenu, "STANDARD")}
						onClick={() => setClickedMenu("STANDARD")}
					>
						Standard
					</div>
				)}

				{language === "Arabic" ? (
					<div
						className='col-5 ArabicStyling'
						style={isActive(clickedMenu, "BUNDLE")}
						onClick={() => setClickedMenu("BUNDLE")}
					>
						الخدمات المجمعة (العروض)
					</div>
				) : (
					<div
						className='col-3'
						style={isActive(clickedMenu, "BUNDLE")}
						onClick={() => setClickedMenu("BUNDLE")}
					>
						Bundle
					</div>
				)}
			</div>
			{allLists()}
		</AddedServicesStyling>
	);
};

export default AddedServices;

const AddedServicesStyling = styled.div`
	.ant-collapse-header {
		font-size: 13px;
		font-weight: bold;
	}

	.ServiceDescription {
		font-size: 1rem;
		font-weight: bold;
		color: white;
		margin-left: 5px;
	}

	.my-custom-collapse .ant-collapse-item > .ant-collapse-header {
		background: #1e1e1e !important;
		color: white !important;
		border-radius: 8px;
		margin-top: 5px !important;
	}

	.my-custom-collapse .ant-collapse-content > .ant-collapse-content-box {
		background: #1e1e1e !important;
		color: white !important;
	}

	.ArabicStyling {
		font-size: 0.9rem !important;
	}

	@media (max-width: 1000px) {
		width: 100%;
		.ant-collapse-header {
			font-size: 12px;
		}
	}
`;
