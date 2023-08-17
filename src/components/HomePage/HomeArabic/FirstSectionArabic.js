import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa"; // I'm using react-icons for the search icon. You need to install it.

const FirstSectionArabic = ({ language, handleInputChange, searchValue }) => {
	return (
		<FirstSectionWrapper>
			<div>
				<div className='row firstSection'>
					<div
						onClick={() => {
							window.location.href = `/schedule?barber shop`;
						}}
						className='col-3'
						style={{
							background: "#001427",
							padding: "4px",
							textAlign: "center",
							cursor: "pointer",
						}}
					>
						رجالي
					</div>
					<div
						onClick={() => {
							window.location.href = `/schedule?hair salon`;
						}}
						className='col-3'
						style={{
							background: "#270000",
							padding: "4px",
							textAlign: "center",
							cursor: "pointer",
						}}
					>
						سيدات
					</div>
					<div className='col-6 search-col my-auto'>
						<input
							type='text'
							value={searchValue}
							onChange={handleInputChange}
							placeholder='بحث'
						/>
						<FaSearch className='search-icon' />
					</div>
				</div>
			</div>
		</FirstSectionWrapper>
	);
};

export default FirstSectionArabic;

const FirstSectionWrapper = styled.div`
	margin-right: 100px;
	margin-left: 100px;
	text-align: center;

	.search-col {
		position: relative;
		padding-left: 40px; // Adjusting for the icon's space

		input {
			width: 100%;
			border: 1px solid #ffd8b1; // Info color of Bootstrap
			padding-left: 30px; // Padding to prevent text overlap with the icon
			z-index: 1000;
			background-color: black; // Setting the background color of the input

			&::placeholder {
				// This targets the placeholder text
				color: white;
				padding: 3px;
			}
		}

		.search-icon {
			position: absolute;
			left: 45px;
			top: 50%;
			transform: translateY(-50%);
			color: darkgrey;
			pointer-events: none; // Ensures the icon doesn't interfere with input interactions
		}
	}

	@media (max-width: 1100px) {
		margin: 0px 4px;

		.search-col {
			position: relative;
			padding-left: 40px; // Adjusting for the icon's space

			input {
				width: 100%;
				border: 1px solid #ffd8b1; // Info color of Bootstrap
				padding-left: 30px; // Padding to prevent text overlap with the icon
				z-index: 1000;
				background-color: black; // Setting the background color of the input

				&::placeholder {
					// This targets the placeholder text
					color: white;
				}
			}

			.search-icon {
				position: absolute;
				left: 45px;
				top: 50%;
				transform: translateY(-50%);
				color: darkgrey;
				pointer-events: none; // Ensures the icon doesn't interfere with input interactions
			}
		}
	}
`;
