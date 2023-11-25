/** @format */

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Collapse } from "antd";
import { getServices } from "../apiOwner";
import EditServiceModal from "./ModalsForEdit/Step3/EditServiceModal";

const { Panel } = Collapse;

const drawCircle = keyframes`
  from {
    stroke-dashoffset: 157;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

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
	language,
	chosenCustomerType,
	ownerId,
	overallAddedSettings,
	setModalVisible,
	setModalVisible2,
	modalVisible2,
}) => {
	const [AllServices, setAllServices] = useState([]);
	const [clickedMenu, setClickedMenu] = useState("STANDARD");
	const [pickedService, setPickedService] = useState("");

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
									<div dir={language === "Arabic" ? "rtl" : "ltr"}>
										<div className='row'>
											<div className='col-4'>
												<span
													className=''
													style={{ color: "white", fontSize: "11px" }}
												>
													{language === "Arabic" ? (
														<span> {s.serviceNameOtherLanguage}</span>
													) : (
														<span> {s.serviceName}</span>
													)}{" "}
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
													{s.serviceTime} دقيقة
												</span>
											</div>
											<div
												className='col-2'
												onClick={() => {
													setPickedService(s);
													setModalVisible2(true);
												}}
												style={{
													// background: "#3d6791",
													borderRadius: "5px",
													textAlign: "center",
													fontSize: language === "Arabic" ? "1rem" : "",
												}}
											>
												{language === "Arabic" ? "تعديل" : "Edit"}
												<svg width='50' height='50'>
													<circle cx='20' cy='20' r='20' />
												</svg>
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
			<EditServiceModal
				language={language}
				setModalVisible={setModalVisible2}
				modalVisible={modalVisible2}
				pickedService={pickedService}
				setPickedService={setPickedService}
			/>

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
								<div className='arrow3'>#3 →</div>
							) : null}
						</div>

						<button
							onClick={() => {
								// window.location.href = "/store/admin/services";
								setModalVisible(true);
							}}
							style={{
								border: "3px dotted black",
								borderRadius: "10px",
								fontSize: "12px",
							}}
							type='button'
							className='btn btn-info p-1 float-right'
						>
							{language === "Arabic" ? (
								<span style={{ fontSize: "1rem" }}> أضف الخدمات</span>
							) : (
								"Add Services"
							)}
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

	svg {
		position: absolute;
		top: -30%;
		left: 20%;
	}

	circle {
		fill: none;
		stroke: #3d6791;
		stroke-width: 2;
		stroke-dasharray: 157; /* Approximate value for circle with 25 radius */
		stroke-dashoffset: 157;
		animation: ${drawCircle} 10s forwards; /* 2s is the duration, change as needed */
	}

	.arrow3 {
		position: absolute;
		top: -150px;
		left: 73%;
		animation: moveArrow 1s infinite;
		font-weight: bolder;
		font-size: 2.5rem;
		color: #ff7676;
	}

	@media (max-width: 1000px) {
		width: 100%;
		.ant-collapse-header {
			font-size: 12px;
		}

		.arrow3 {
			position: absolute;
			top: -50px;
			left: 25%;
			animation: moveArrow 1s infinite;
			font-weight: bolder;
			font-size: 2.5rem;
			color: #ff7676;
		}
	}
`;
