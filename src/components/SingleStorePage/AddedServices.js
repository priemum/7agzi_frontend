/** @format */

import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {getServices} from "../../apiCore";
import {Collapse} from "antd";

const {Panel} = Collapse;

const AddedServices = ({chosenCustomerType, ownerId}) => {
	const [AllServices, setAllServices] = useState([]);

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
			<Collapse>
				{AllServices &&
					AllServices.map((s, i) => {
						return (
							<Panel
								key={i}
								header={
									<span>
										{" "}
										{s.serviceName}{" "}
										<span className='ml-2' style={{color: "#6eaee9"}}>
											({s.serviceTime} mins)
										</span>
									</span>
								}
								style={{
									textTransform: "capitalize",
								}}
							>
								<div>
									{AllServices &&
										AllServices[i] &&
										AllServices[i].serviceDescription.map((d, ii) => {
											return (
												<li
													key={ii + 10}
													style={{
														textTransform: "capitalize",
														listStyle: "outside",
														fontSize: "12px",
													}}
												>
													{d}
												</li>
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
			<h5 className='ServiceDescription'>Our Services' Description:</h5>
			{allLists()}
		</AddedServicesStyling>
	);
};

export default AddedServices;

const AddedServicesStyling = styled.div`
	[data-theme="compact"] p,
	p {
		margin: 0;
	}

	.ant-collapse-header {
		font-size: 13px;
		font-weight: bold;
		background: white !important;
	}

	.ServiceDescription {
		font-size: 1rem;
		font-weight: bold;
		color: white;
		margin-left: 5px;
	}

	@media (max-width: 1000px) {
		width: 80%;
		margin-left: 10%;
		.ant-collapse-header {
			font-size: 12px;
		}
	}
`;
