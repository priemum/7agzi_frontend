import React from "react";
import styled from "styled-components";

const StoreFilter = ({
	availableCountries,
	availableGovernorates,
	availableDistricts,
	selectedCountry,
	setSelectedCountry,
	selectedGovernorate,
	setSelectedGovernorate,
	selectedDistrict,
	setSelectedDistrict,
}) => {
	return (
		<StoreFilterWrapper className='container'>
			<div className='row'>
				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label htmlFor='country'>Country:</label>
						<select
							className='form-control'
							id='country'
							value={selectedCountry}
							style={{ textTransform: "capitalize" }}
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
							style={{ textTransform: "capitalize" }}
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
							style={{ textTransform: "capitalize" }}
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

					{selectedCountry || selectedDistrict || selectedGovernorate ? (
						<div
							className='mx-auto mt-2'
							style={{
								color: "white",
								textDecoration: "underline",
								textAlign: "center",
								padding: "5px",
								cursor: "pointer",
							}}
							onClick={() => {
								setSelectedCountry("");
								setSelectedDistrict("");
								setSelectedGovernorate("");
							}}
						>
							Reset Filters
						</div>
					) : null}
				</div>
			</div>
		</StoreFilterWrapper>
	);
};

export default StoreFilter;

const StoreFilterWrapper = styled.div`
	background-color: #363636;
	padding: 10px;
	border-radius: 10px;

	label {
		font-weight: bolder;
		color: white;
	}
`;
