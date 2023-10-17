import React from "react";
import styled from "styled-components";

const FourthSection = () => {
	return (
		<FourthSectionWrapper>
			<div className='grid-container'>
				<span
					className='closest'
					onClick={() => {
						window.location.href = `/schedule`;
					}}
				>
					CLOSEST SALONS...
				</span>
				<span
					className='offers'
					onClick={() => {
						window.location.href = `/schedule/50-EGP-Offer`;
					}}
				>
					50 EGP OFFER...
				</span>
			</div>
		</FourthSectionWrapper>
	);
};

export default FourthSection;

const FourthSectionWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%; // Adjust as necessary
	margin-right: 10px;
	margin-left: 10px;

	.grid-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 4px;
		width: 100%;
		/* border: 1px white solid; */
		text-align: center;
		margin: auto;
		padding: 13px 10px;

		span {
			padding: 13px 10px;
			font-weight: bolder;
			width: 100%;
		}
	}

	.closest {
		background-color: #001e1e;
	}

	.closest:hover {
		cursor: pointer;
	}

	.offers {
		background-color: #270000;
	}

	.offers:hover {
		cursor: pointer;
	}
`;
