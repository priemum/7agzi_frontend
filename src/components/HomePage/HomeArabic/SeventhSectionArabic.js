import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ThirdSectionCard from "../ThirdSectionCard";

const SeventhSectionArabic = ({
	language,
	stores,
	loading,
	handleRetryClick,
	loadError,
	error,
}) => {
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: 1.5,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	if (loadError || error) {
		return (
			<div className='spinner-container'>
				<Spin size='large' tip='Loading...' />
				<div>
					This app requires access to your location. Please enable it in your
					browser settings, or{" "}
					<Link href='#' onClick={handleRetryClick}>
						click here
					</Link>{" "}
					to retry.
				</div>
			</div>
		);
	}

	return (
		<ThirdSectionWrapper>
			{loading ? (
				<div style={{ textAlign: "center", margin: "auto" }}>
					<Spin size='large' tip='جاري التحميل...' />
				</div>
			) : (
				<div className='carousel thirdSection'>
					<div className='container-fluid'>
						<div className='topPerf'>أفضل المؤدين:</div>
						<div className='topRated'>الأعلى تقييمًا:</div>
						<Slider {...settings}>
							{stores.map((salon, i) => (
								<div
									className='img-fluid images'
									key={i}
									onClick={() => {
										localStorage.setItem("chosenStore", JSON.stringify(salon));
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<ThirdSectionCard
										i={i}
										salon={salon}
										key={i}
										language={language}
									/>
								</div>
							))}
						</Slider>
					</div>
				</div>
			)}
		</ThirdSectionWrapper>
	);
};

export default SeventhSectionArabic;

const ThirdSectionWrapper = styled.div`
	padding: 30px 0px;

	.thirdSection {
		padding: 10px 100px;
		background-color: #141414;
	}

	.slick-dots {
		display: none !important;
	}

	.topPerf {
		font-weight: bolder;
		margin-bottom: 5px;
		text-decoration: underline;
	}

	.topRated {
		text-align: right;
		font-weight: bolder;
		margin-bottom: 5px;
		text-decoration: underline;
		font-size: 10px;
	}

	@media (max-width: 1100px) {
		.thirdSection {
			padding: 10px 0px;
		}

		.slick-dots {
			display: none !important;
		}
	}
`;
