/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Collapse, Checkbox } from "antd";
import { getServices } from "../apiOwner";

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
			color: "white",
		};
	}
};

const AddedServicesPreview = ({
	chosenCustomerType,
	ownerId,
	overallAddedSettings,
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
	}, [chosenCustomerType]);

	const allLists = () => {
		return (
			<Collapse
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
					AllServices.length > 0 &&
					AllServices.map((s, i) => {
						return (
							<Panel
								key={i}
								header={
									<div>
										<div className='row'>
											<div className='col-4'>
												<span
													className=''
													style={{ color: "white", fontSize: "11px" }}
												>
													{s.serviceName}{" "}
												</span>
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
												<span
													className=''
													style={{ color: "white", fontSize: "11px" }}
												>
													{s.serviceTime} mins
												</span>
											</div>
											<div className='col-2'>
												<Checkbox
													checked={checkedService === s._id}
													onChange={() => setCheckedService(s._id)}
												/>
											</div>
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
		<AddedServicesStyling>
			<div className='row my-3 ml-3'>
				<div
					className='col-3'
					style={isActive(clickedMenu, "STANDARD")}
					onClick={() => setClickedMenu("STANDARD")}
				>
					Standard
				</div>
				<div
					className='col-3'
					style={isActive(clickedMenu, "BUNDLE")}
					onClick={() => setClickedMenu("BUNDLE")}
				>
					Bundle
				</div>
				{overallAddedSettings && overallAddedSettings.length >= 2 ? (
					<div className='col-5 position-relative'>
						<div
							style={{
								transform: "rotate(30deg)",
								transformOrigin: "center",
							}}
						>
							{overallAddedSettings &&
							overallAddedSettings.length >= 2 &&
							AllServices &&
							AllServices.length === 0 ? (
								<div
									style={{
										position: "absolute",
										top: "-50px",
										left: "30%",
										animation: "moveArrow 1s infinite",
										fontWeight: "bolder",
										fontSize: "2.5rem",
										color: "#ff7676",
									}}
								>
									#3 →
								</div>
							) : null}
						</div>

						<button
							onClick={() => {
								window.location.href = `/boss/store/admin/services/${ownerId}`;
							}}
							style={{
								border: "3px dotted black",
								borderRadius: "10px",
								fontSize: "12px",
							}}
							type='button'
							className='btn btn-info p-1 float-right'
						>
							Edit Services
						</button>
					</div>
				) : null}
			</div>
			{allLists()}
		</AddedServicesStyling>
	);
};

export default AddedServicesPreview;

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

	.arrow {
		margin: 0 10px;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid #000;
		animation: arrow-animation 2s infinite;
	}

	@keyframes moveArrow {
		0% {
			transform: translateX(-70%);
		}
		50% {
			transform: translateX(-40%);
		}
		100% {
			transform: translateX(-70%);
		}
	}

	@media (max-width: 1000px) {
		width: 100%;
		.ant-collapse-header {
			font-size: 12px;
		}
	}
`;
