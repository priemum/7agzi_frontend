import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getServices, updateService} from "../apiOwner";
import {isAuthenticated} from "../../auth";
import {toast} from "react-toastify";

const UpdateService = () => {
	const [allServices, setAllServices] = useState([]);
	const [serviceClicked, setServiceClicked] = useState("");
	const [chosenService, setChosenService] = useState("");

	//elements for updating services
	const [serviceName, setServiceName] = useState("");
	const [customerType, setCustomerType] = useState("");
	const [serviceType, setServiceType] = useState("Package Service");
	const [servicePrice, setServicePrice] = useState("");
	const [servicePriceDiscount, setServicePriceDiscount] = useState("");
	const [serviceTime, setServiceTime] = useState("");
	const [serviceLoyaltyPoints, setServiceLoyaltyPoints] = useState("");
	const [serviceDescription, setServiceDescription] = useState("");
	const [serviceDescriptionCombined, setServiceDescriptionCombined] = useState(
		[]
	);
	const [activeService, setActiveService] = useState("1");

	// eslint-disable-next-line
	const {user, token} = isAuthenticated();

	const gettingAllServices = () => {
		getServices(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllServices(data);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, [serviceClicked]);

	useEffect(() => {
		if (chosenService && chosenService._id) {
			setServiceName(chosenService.serviceName);
			setCustomerType(chosenService.customerType);
			setServicePrice(chosenService.servicePrice);
			setServicePriceDiscount(chosenService.servicePriceDiscount);
			setServiceTime(chosenService.serviceTime);
			setServiceLoyaltyPoints(chosenService.serviceLoyaltyPoints);
			setServiceDescription(chosenService.serviceDescription);
			setServiceDescriptionCombined(chosenService.serviceDescription);
			setActiveService(chosenService.activeService);
		}
		// eslint-disable-next-line
	}, [serviceClicked]);

	const clickSubmit = (e) => {
		e.preventDefault();
		if (Number(servicePrice) < Number(servicePriceDiscount)) {
			return toast.error("Please make sure to adjust the prices properly");
		}

		if (activeService === "0") {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Service?"
				)
			) {
				updateService(chosenService._id, user._id, token, {
					serviceName,
					customerType,
					servicePrice,
					servicePriceDiscount,
					serviceTime,
					serviceLoyaltyPoints,
					activeService,
					serviceDescription: serviceDescriptionCombined,
					serviceType: serviceType,
					belongsTo: user._id,
				}).then((data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						toast.success("Service was successfully Updated.");
						setTimeout(function () {
							setServiceClicked(false);
						}, 2000);
					}
				});
			}
		} else {
			updateService(chosenService._id, user._id, token, {
				serviceName,
				customerType,
				servicePrice,
				servicePriceDiscount,
				serviceTime,
				serviceLoyaltyPoints,
				activeService,
				serviceDescription: serviceDescriptionCombined,
				serviceType: serviceType,
				belongsTo: user._id,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					toast.success("Service was successfully Updated.");
					setTimeout(function () {
						setServiceClicked(false);
					}, 2000);
				}
			});
		}
	};

	const handleChange1 = (e) => {
		setServiceName(e.target.value);
	};
	const handleChange2 = (e) => {
		setServicePrice(e.target.value);
	};

	const handleChange3 = (e) => {
		setServiceTime(e.target.value);
	};
	const handleChange4 = (e) => {
		setServiceLoyaltyPoints(e.target.value);
	};

	const handleChange5 = (e) => {
		setCustomerType(e.target.value);
	};

	const handleChange8 = (e) => {
		setServiceDescription(e.target.value);
	};

	const handleChange9 = (e) => {
		setServicePriceDiscount(e.target.value);
	};

	const pushToServiceDescription = (e) => {
		e.preventDefault();
		setServiceDescriptionCombined([
			...serviceDescriptionCombined,
			serviceDescription,
		]);
		setServiceDescription("");
	};

	const handleChange10 = (e) => {
		setActiveService(e.target.value);
	};

	const newServiceForm = () => (
		<form onSubmit={clickSubmit} className='col-md-10'>
			<div className='row'>
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Customer Type</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange5}
						value={customerType}
						required
						placeholder='Boys, Girls, Adult Female, Adult Male, etc...'
					/>
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
			</div>
			<div className='row'>
				<div className='col-md-6 mx-auto'>
					<div>
						{serviceDescriptionCombined &&
							serviceDescriptionCombined.length > 0 && (
								<React.Fragment>
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
								</React.Fragment>
							)}
					</div>
					<label className='text-muted'>
						Add set of services connected to{" "}
						<span style={{color: "blue", fontWeight: "bold"}}>
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
							style={{fontSize: "12px"}}
							onClick={pushToServiceDescription}
							className='btn btn-outline-info col-md-5  text-center mx-auto my-2'
						>
							Add Service Description.
						</button>
						<button
							style={{fontSize: "12px"}}
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
				<div className='form-group col-md-6 mx-auto'>
					<label className='text-muted'>Active Service?</label>
					<select
						onChange={handleChange10}
						className='form-control'
						style={{fontSize: "0.80rem"}}
					>
						<option>Please select / Required*</option>
						<option value='0'>Deactivate Service</option>
						<option value='1'>Activate Service</option>
					</select>
				</div>
			</div>

			<button className='btn btn-outline-primary mb-3'>Update Service</button>
		</form>
	);

	return (
		<UpdateServiceWrapper>
			{!serviceClicked ? (
				<h3 className='mt-5'>
					Total of {allServices.length} Added Services (Click To Update)
				</h3>
			) : null}

			{!serviceClicked ? (
				<ul className='list-group col-md-10 mx-auto'>
					{allServices.map((s, i) => (
						<div
							style={{textTransform: "capitalize", cursor: "pointer"}}
							key={i}
						>
							<div
								className='row'
								onClick={() => {
									setServiceClicked(true);
									setChosenService(s);
									window.scrollTo({top: 150, behavior: "smooth"});
								}}
							>
								<li
									className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-6'
									style={{fontSize: "0.75rem"}}
								>
									<strong>{s.serviceName}</strong>
									<strong>
										{" "}
										Service For:{" "}
										<span
											style={{color: "darkred", textTransform: "capitalize"}}
										>
											{s.customerType}
										</span>
									</strong>{" "}
								</li>
								<li
									className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-2'
									style={{fontSize: "0.75rem"}}
								>
									<strong>${s.servicePrice}</strong>,
									<strong style={{color: "green"}}>
										${s.servicePriceDiscount}
									</strong>
								</li>
								{!s.activeService && (
									<li
										className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-3'
										style={{
											fontSize: "0.7rem",
											color: "red",
											fontWeight: "bold",
										}}
									>
										<strong>Deactivated</strong>
									</li>
								)}
							</div>
						</div>
					))}
				</ul>
			) : null}

			{serviceClicked ? (
				<div>
					<h5
						className='mt-5'
						style={{cursor: "pointer"}}
						onClick={() => {
							setServiceClicked(false);
							window.scrollTo({top: 0, behavior: "smooth"});
						}}
					>
						<i className='fa-sharp fa-solid fa-arrow-left mr-2'></i>
						Back to Services List...
					</h5>
					<h3 className='mt-3'>
						Update Service ({chosenService && chosenService.serviceName})
					</h3>
					<div
						className='col-md-8 col-sm-6  mt-5 p-3'
						style={{
							border: "2px #0f377e solid",
							borderRadius: "20px",
							marginBottom: "200px",
							marginLeft: "50px",
						}}
					>
						{newServiceForm()}
					</div>
				</div>
			) : null}
		</UpdateServiceWrapper>
	);
};

export default UpdateService;

const UpdateServiceWrapper = styled.div`
	margin-left: 200px;

	h3 {
		margin-left: 150px;
		font-weight: bold;
		color: goldenrod;
		text-transform: capitalize;
		font-size: 1.3rem;
	}

	h5 {
		margin-left: 150px;
		font-weight: bolder;
		color: black;
		font-size: 1.1rem;
		text-decoration: underline;
	}
`;
