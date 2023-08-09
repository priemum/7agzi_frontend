import React from "react";
import styled from "styled-components";

const FourthSectionArabic = () => {
	return (
		<FourthSectionWrapper>
			<div className='grid-container'>
				<span
					className='closest'
					onClick={() => {
						window.location.href = `/schedule`;
					}}
				>
					أقرب صالونات...
				</span>
				<span
					className='offers'
					onClick={() => {
						window.location.href = `/schedule?50`;
					}}
				>
					عرض 50 جنيه ...
				</span>
			</div>
		</FourthSectionWrapper>
	);
};

export default FourthSectionArabic;

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

	.offers {
		background-color: #270000;
	}
`;
