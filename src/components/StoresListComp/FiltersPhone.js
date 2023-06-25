import React from "react";
import styled from "styled-components";

const FiltersPhone = () => {
	return (
		<FiltersPhoneWrapper>
			<div className='grid-container'>
				<div className='regularStyling'>
					{" "}
					<strong>FILTERS</strong>{" "}
				</div>
				<div className='regularStyling'>
					{" "}
					<strong>TOP 10</strong>{" "}
				</div>
				<div className='regularStyling'>
					{" "}
					<strong>FREELANCERS</strong>{" "}
				</div>
				<div className='specialStyling'>
					{" "}
					<strong>OFFERS</strong>{" "}
				</div>
			</div>
		</FiltersPhoneWrapper>
	);
};

export default FiltersPhone;

const FiltersPhoneWrapper = styled.div`
	.grid-container {
		display: grid;
		grid-template-columns: 22% 22% 40% 10%;
		justify-items: "center"; // This will center your text
		grid-gap: 0; // This will ensure there's no gap between your grid items
		background-color: lightgray;
		padding: 8px 10px;
		font-weight: bolder;
	}
	.regularStyling {
		color: darkgreen;
	}
	.specialStyling {
		color: darkred;
	}
`;
