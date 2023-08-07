import React from "react";
import styled from "styled-components";
import Brides from "./HomeImages/wedding-section-arabic.png";
import XWomen from "./HomeImages/xwomen.png";

const SixthSection = () => {
	return (
		<SixthSectionWrapper>
			<div className='sixthSection'>
				<div className='img1'>
					<img src={Brides} alt='For Groomers. It is your night with XLOOK' />
				</div>
				<div className='img2'>
					<img
						src={XWomen}
						alt='For Brides and Women. It is your night with XLOOK'
					/>
				</div>
			</div>
		</SixthSectionWrapper>
	);
};

export default SixthSection;

const SixthSectionWrapper = styled.div`
	.sixthSection {
		margin-top: 30px;
	}

	.img1,
	.img2 {
		margin: 10px auto;
	}

	img {
		width: 100%;
	}
`;
