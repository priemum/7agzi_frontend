import React from "react";
import styled from "styled-components";
import EgyptianFlag from "../../Images/Egypt.png";
import AmericanFlag from "../../Images/UnitedStates.png";
import { useCartContext } from "../../sidebar_context";

const NavbarPOS = ({ onlineStoreName, language, setLanguage }) => {
	const { chosenLanguageEngish, chosenLanguage, chosenLanguageArabic } =
		useCartContext();

	return (
		<NavbarPOSWrapper>
			<div className='left'>
				<span className='languageFlagsPhone'>
					{chosenLanguage === "English" ? (
						<span className='' onClick={chosenLanguageArabic}>
							{" "}
							<img
								className='flags'
								src={EgyptianFlag}
								style={{ marginRight: "5px" }}
								alt='Arabic'
							/>
						</span>
					) : (
						<span
							className=' '
							style={{ color: "white" }}
							onClick={chosenLanguageEngish}
						>
							<img className='flags' src={AmericanFlag} alt='English' />{" "}
						</span>
					)}
				</span>
			</div>
			<div className='center'>
				{onlineStoreName &&
				onlineStoreName.addStoreLogo &&
				onlineStoreName.addStoreLogo[0] ? (
					<img src={onlineStoreName.addStoreLogo[0].url} alt='logo' />
				) : null}
			</div>
			<div className='right'>
				<span>{onlineStoreName && onlineStoreName.addStoreNameArabic}</span>
			</div>
		</NavbarPOSWrapper>
	);
};

export default NavbarPOS;

const NavbarPOSWrapper = styled.div`
	background-color: black;
	color: white;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.left {
		flex: 1;
		display: flex;
		justify-content: flex-start;
	}

	.center {
		flex: 2;
		display: flex;
		justify-content: center;

		img {
			width: 8%; /* Adjust the image size according to your preference */
		}
	}

	.right {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
	@media (max-width: 1200px) {
		.center {
			flex: 2;
			display: flex;
			justify-content: center;

			img {
				width: 30%; /* Adjust the image size according to your preference */
			}
		}
	}
`;
