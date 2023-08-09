import React from "react";
import styled from "styled-components";
import HairCutImg from "../HomeImages/hair-dressr-ara1.png";
import BeardImg from "../HomeImages/Beard-Shave-ara.png";
import GroomImg from "../HomeImages/groo-ara.png";
// eslint-disable-next-line
import BrideImg from "../HomeImages/bride-eng.png";
import BundleImg from "../HomeImages/Bundels-ara.png";
import OffersImg from "../HomeImages/offers.png";
import WhatsAppImg from "../HomeImages/kalemna-wats.png";

const SecondSectionArabic = () => {
	return (
		<SecondSectionWrapper>
			<div className='grid-container'>
				<img
					src={HairCutImg}
					alt='احجز موعدك مع إكسلوك للحصول على حلاقة شعر'
					onClick={() => {
						window.location.href = `/schedule?haircut`;
					}}
				/>
				<img
					src={BeardImg}
					alt='احجز موعدك مع إكسلوك للحصول على حلاقة لحية'
					onClick={() => {
						window.location.href = `/schedule?beard shaving`;
					}}
				/>
				<img
					src={BundleImg}
					alt=' احجز موعدك مع إكسلوك للحصول على أحدث عروضنا الحصرية'
					onClick={() => {
						window.location.href = `/schedule?bundle`;
					}}
				/>
				<img
					src={GroomImg}
					alt='إذا كنت عريسًا، تحقق من عروضنا للعرسان اليوم'
					onClick={() => {
						window.location.href = `/schedule?groom`;
					}}
				/>
				<img
					src={OffersImg}
					alt=' احجز موعدك مع إكسلوك للحصول على أحدث عروضنا الحصرية'
				/>
				<img
					src={WhatsAppImg}
					alt='عملاؤنا هم أولويتنا الأولى، راسلنا على واتساب وسنكون سعداء جدًا بمساعدتك'
					onClick={() => {
						window.open(
							"https://api.whatsapp.com/send?phone=+201098168674",
							"_blank"
						);
					}}
				/>
			</div>
		</SecondSectionWrapper>
	);
};

export default SecondSectionArabic;

const SecondSectionWrapper = styled.div`
	margin: 30px auto;
	text-align: center;

	.grid-container {
		display: grid;
		grid-template-columns: repeat(6, 1fr); // 6 columns
		text-align: center;
		/* gap: 3px; */

		img {
			width: 50%;
		}
	}

	@media (max-width: 1100px) {
		margin-top: 30px;

		.grid-container {
			display: grid;
			grid-template-columns: repeat(6, 1fr); // 6 columns
			/* gap: 3px; */

			img {
				width: 100%;
			}
		}
	}
`;
