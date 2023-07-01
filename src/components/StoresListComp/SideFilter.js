import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Slider } from "antd";

const SideFilter = ({
	filtersClicked,
	setFiltersClicked,
	availableCountries,
	availableGovernorates,
	availableDistricts,
	selectedCountry,
	setSelectedCountry,
	selectedGovernorate,
	setSelectedGovernorate,
	selectedDistrict,
	setSelectedDistrict,
	allServicesCombined,
	selectedService,
	setSelectedService,
	priceRange,
	setPriceRange,
	servicesInPriceRange,
	setServicesInPriceRange,
	language,
}) => {
	const [scrollTop, setScrollTop] = useState(0);

	const handleSidebar = () => {
		setFiltersClicked(!filtersClicked);
	};

	useEffect(() => {
		const onScroll = (e) => {
			setScrollTop(e.target.documentElement.scrollTop);
		};
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [scrollTop]);

	const handleChange = (e) => {
		setSelectedService(e.target.value);
	};

	useEffect(() => {
		setServicesInPriceRange(
			allServicesCombined.filter(
				(service) =>
					service.servicePriceDiscount >= priceRange[0] &&
					service.servicePriceDiscount <= priceRange[1]
			)
		);
		// eslint-disable-next-line
	}, [priceRange, allServicesCombined]);

	return (
		<SideFilterWrapper scrollTop={scrollTop} show={filtersClicked}>
			<div
				style={{
					textAlign: "end",
					fontWeight: "bolder",
					color: "darkred",
					marginRight: "5px",
					fontSize: "20px",
				}}
				onClick={handleSidebar}
			>
				<strong>X</strong>
			</div>
			<div className='container'>
				<div className='row'>
					<div className='col-md-3 mx-auto'>
						<div className='form-group'>
							<label htmlFor='country'>Country:</label>
							<select
								className='form-control'
								id='country'
								value={selectedCountry}
								style={{
									width: "100%",
									textTransform: "capitalize",
									fontSize: "14px",
								}}
								onChange={(e) => setSelectedCountry(e.target.value)}
							>
								{availableCountries &&
									availableCountries.map((country, i) => (
										<option key={i} value={country}>
											{country}
										</option>
									))}
							</select>
						</div>
					</div>

					<div className='col-md-3 mx-auto'>
						<div className='form-group'>
							<label htmlFor='governorate'>Governorate:</label>
							<select
								className='form-control'
								id='governorate'
								style={{
									width: "100%",
									textTransform: "capitalize",
									fontSize: "14px",
								}}
								value={selectedGovernorate}
								onChange={(e) => setSelectedGovernorate(e.target.value)}
							>
								<option value='Please Select'>Select governorate</option>
								{availableGovernorates &&
									availableGovernorates.map((gov, i) => (
										<option key={i} value={gov}>
											{gov}
										</option>
									))}
							</select>
						</div>
					</div>

					<div className='col-md-3 mx-auto'>
						<div className='form-group'>
							<label htmlFor='district'>District:</label>
							<select
								className='form-control'
								id='district'
								style={{
									width: "100%",
									textTransform: "capitalize",
									fontSize: "14px",
								}}
								value={selectedDistrict}
								onChange={(e) => setSelectedDistrict(e.target.value)}
							>
								<option value='Please Select'>Select District</option>

								{availableDistricts &&
									availableDistricts.map((d, i) => (
										<option key={i} value={d}>
											{d}
										</option>
									))}
							</select>
						</div>
					</div>

					<div className='col-md-3 mx-auto'>
						<div className='form-group'>
							<label htmlFor='district'>Service:</label>
							<select
								style={{
									width: "100%",
									textTransform: "capitalize",
									fontSize: "14px",
								}}
								className='form-control'
								placeholder='Select a service'
								onChange={handleChange}
								value={selectedService}
							>
								<option value=''>Please Select A Service</option>
								{allServicesCombined.map((service) => (
									<option key={service._id} value={service.serviceName}>
										{service.serviceName}
									</option>
								))}
							</select>
						</div>
					</div>
					{allServicesCombined && allServicesCombined.length > 0 ? (
						<>
							<div className='col-md-3 col-12 mx-auto'>
								<div className='form-group'>
									<label htmlFor='price-range'>Price Range:</label>
									<div className='price-range-section'>
										<span>EGP {priceRange[0]}</span> {/* display min value */}
										<Slider
											id='price-range'
											range
											value={priceRange}
											min={Math.min(
												...allServicesCombined.map(
													(service) => service.servicePriceDiscount
												)
											)}
											max={Math.max(
												...allServicesCombined.map(
													(service) => service.servicePriceDiscount
												)
											)}
											onChange={setPriceRange}
											style={{ flex: 1, width: "100% !important" }} // this allows the slider to take up the available space
										/>
										<span>EGP {priceRange[1]}</span> {/* display max value */}
									</div>
								</div>
							</div>

							{servicesInPriceRange.length > 0 && (
								<div
									className='col-md-3 mx-auto'
									style={{
										textTransform: "capitalize",
										fontSize: "12px",
										color: "darkgrey",
										fontWeight: "bold",
									}}
								>
									<div className='form-group'>
										<label>Services within selected price range:</label>
										<div className='row'>
											{servicesInPriceRange.map((service) => (
												<div className='col-6' key={service._id}>
													{service.serviceName}
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</>
					) : null}

					{selectedCountry || selectedDistrict || selectedGovernorate ? (
						<div
							className='mx-auto mt-2'
							style={{
								color: "black",
								textDecoration: "underline",
								textAlign: "center",
								padding: "5px",
								cursor: "pointer",
							}}
							onClick={() => {
								setSelectedCountry("");
								setSelectedDistrict("");
								setSelectedGovernorate("");
								setSelectedService(null);
							}}
						>
							Reset Filters
						</div>
					) : null}
				</div>
			</div>
		</SideFilterWrapper>
	);
};

export default SideFilter;

const SideFilterWrapper = styled.div`
	position: fixed;
	top: ${(props) => (props.scrollTop > 50 ? "68px" : "107px")};
	left: 0;
	width: 70%;
	height: 100%;
	background: var(--mainGrey);
	color: black;
	z-index: 10000;
	border-right: 3px solid var(--darkGrey);
	transition: 0.5s;
	transform: ${(props) =>
		props.show ? "translateX(0%)" : "translateX(-120%)"};
	/*transform: translateX(-100%);*/ /**this will hide the side bar */

	overflow-y: auto;

	.price-range-section {
		font-weight: bold;
		margin-left: 5%;
		margin-right: 5%;
	}
`;
