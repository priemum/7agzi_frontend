/** @format */

import React, { useState, Fragment, useEffect } from "react";
// import { Link } from "react-router-dom";
import { createService, getServices } from "../apiOwner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuthenticated } from "../../auth";
import styled from "styled-components";

const AddService = () => {
	const [serviceName, setServiceName] = useState("");
	const [customerType, setCustomerType] = useState("");
	const [serviceType, setServiceType] = useState("Package Service");
	const [servicePrice, setServicePrice] = useState("");
	const [servicePriceDiscount, setServicePriceDiscount] = useState("");
	const [serviceTime, setServiceTime] = useState("");
	const [serviceLoyaltyPoints, setServiceLoyaltyPoints] = useState("");
	const [allServices, setAllServices] = useState([]);
	const [serviceDescription, setServiceDescription] = useState("");
	const [catchyPhrase, setCatchyPhrase] = useState("");
	const [serviceDescriptionCombined, setServiceDescriptionCombined] = useState(
		[]
	);

	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setServiceName(e.target.value);
	};
	const handleChange2 = (e) => {
		setError("");
		setServicePrice(e.target.value);
	};

	const handleChange3 = (e) => {
		setError("");
		setServiceTime(e.target.value);
	};
	const handleChange4 = (e) => {
		setError("");
		setServiceLoyaltyPoints(e.target.value);
	};

	const handleChange5 = (e) => {
		setError("");
		setCustomerType(e.target.value);
	};

	const handleChange8 = (e) => {
		setError("");
		setServiceDescription(e.target.value);
	};

	const handleChange9 = (e) => {
		setError("");
		setServicePriceDiscount(e.target.value);
	};

	const handleChange10 = (e) => {
		setError("");
		setCatchyPhrase(e.target.value);
	};

	const pushToServiceDescription = (e) => {
		e.preventDefault();
		setServiceDescriptionCombined([
			...serviceDescriptionCombined,
			serviceDescription,
		]);
		setServiceDescription("");
	};

	const gettingAllServices = () => {
		getServices(token, user._id).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllServices(
					data.map(
						(serviceNames) =>
							serviceNames.serviceName.toLowerCase() +
							serviceNames.customerType.toLowerCase()
					)
				);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, [servicePrice, serviceName, serviceLoyaltyPoints]);

	let matchingServiceName =
		allServices.indexOf(
			serviceName.toLowerCase() + customerType.toLowerCase()
		) !== -1;

	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingServiceName) {
			return toast.error("This service was added before.");
		}

		if (Number(servicePrice) < Number(servicePriceDiscount)) {
			return toast.error("Please make sure to adjust the prices properly");
		}

		if (catchyPhrase.length >= 11) {
			return toast.error("Catchy Phrase Should be 10 words or less.");
		}

		setError("");
		setSuccess(false);
		// make request to api to create service
		createService(user._id, token, {
			serviceName,
			customerType,
			servicePrice,
			servicePriceDiscount,
			serviceTime,
			serviceLoyaltyPoints,
			serviceType,
			serviceDescription: serviceDescriptionCombined,
			belongsTo: user._id,
			catchyPhrase: catchyPhrase,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				toast.success("Service was successfully Added.");
				setError("");
				setTimeout(function () {
					setServicePrice("");
					setServicePriceDiscount("");
					setServiceTime("");
					setServiceLoyaltyPoints("");
					setCatchyPhrase("");
					setServiceDescription([]);
					setServiceDescriptionCombined([]);
				}, 2000);
			}
		});
	};

	const newServiceForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='row'>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Customer Type</label>
					<select className='form-control' onChange={handleChange5}>
						<option value='Please Select'>Please Select</option>
						<option value='Male'>Male</option>
						<option value='Female'>Female</option>
						<option value='Boys'>Boys (Client 12 Years Old or Younger)</option>
						<option value='Girls'>
							Girls (Client 12 Years Old or Younger)
						</option>
					</select>
				</div>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Service Name</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange1}
						value={serviceName}
						required
						placeholder='Haircut, Color, Wash, etc...'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Service Price</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange2}
						value={servicePrice}
						placeholder='Should be digits only'
						required
					/>
				</div>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Service Price After Discount</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange9}
						value={servicePriceDiscount}
						placeholder='Should be digits only'
						required
					/>
				</div>
				<div className='form-group col-md-8 mx-auto'>
					<label className='text-muted'>
						Catchy Phrase For This Service (10 words)
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange10}
						value={catchyPhrase}
						placeholder='e.g. For the first, 20% off your haircut today!'
						required
					/>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 mx-auto'>
					<div>
						{serviceDescriptionCombined &&
							serviceDescriptionCombined.length > 0 && (
								<Fragment>
									Added Descriptions:
									<ul>
										{serviceDescriptionCombined &&
											serviceDescriptionCombined.map((i, e) => (
												<li
													style={{
														listStyle: "none",
														marginLeft: "20px",
														fontSize: "12px",
													}}
													key={e}
												>
													<button
														type='button'
														onClick={() => {
															var array =
																serviceDescriptionCombined &&
																serviceDescriptionCombined.filter(function (s) {
																	return s !== i;
																});
															setServiceDescriptionCombined(array);
														}}
														style={{
															color: "white",
															background: "black",
															fontSize: "15px",
															borderRadius: "15px",
															marginRight: "10px",
														}}
														aria-label='Close'
													>
														<span aria-hidden='true'>&times;</span>
													</button>
													{i}
												</li>
											))}
									</ul>
								</Fragment>
							)}
					</div>
					<label className='text-muted'>
						Add set of services connected to{" "}
						<span style={{ color: "blue", fontWeight: "bold" }}>
							"{serviceName}"
						</span>
					</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange8}
						value={serviceDescription}
						placeholder='Describtion of the service'
					/>
					<div className='row'>
						<button
							style={{ fontSize: "12px" }}
							onClick={pushToServiceDescription}
							className='btn btn-outline-info col-md-5  text-center mx-auto my-2'
						>
							Add Service Description.
						</button>
						<button
							style={{ fontSize: "12px" }}
							onClick={() => {
								setServiceDescriptionCombined([]);
								setServiceType("Please select / Required*");
							}}
							className='btn btn-outline-danger col-md-5  text-center mx-auto my-2'
						>
							Clear Set Of Descriptions
						</button>
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Service Estimated Time</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange3}
						value={serviceTime}
						required
						placeholder='Please add a numerical value (minutes)'
					/>
				</div>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Loyalty Points</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange4}
						value={serviceLoyaltyPoints}
						required
						placeholder='Please Add Loyalty Points Can Be Gained By Customer (Digits Only)'
					/>
				</div>
			</div>

			<button className='btn btn-outline-primary mb-3'>Add a Service</button>
		</form>
	);

	return (
		<AddServiceWrapper>
			<div
				className='col-md-8 col-sm-6  mt-5 p-3'
				style={{
					border: "2px #0f377e solid",
					borderRadius: "20px",
					marginBottom: "200px",
					marginLeft: "130px",
				}}
			>
				<h3 className='mt-1 mb-3 text-center'>Add Service</h3>
				<ToastContainer />
				{newServiceForm()}
			</div>
		</AddServiceWrapper>
	);
};

export default AddService;

const AddServiceWrapper = styled.div`
	h3 {
		font-weight: bold;
		color: goldenrod;
	}
`;
