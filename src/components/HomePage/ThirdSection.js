import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ThirdSectionCard from "./ThirdSectionCard";
import AdSense from "../AdSense";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const ThirdSection = ({
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
					<Spin size='large' tip='Loading...' />
				</div>
			) : (
				<div className='carousel thirdSection'>
					<div className='container-fluid'>
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

					<div className='row quickLinks'>
						<div className='col-3 mx-auto'>Favourites</div>
						<div className='col-3 mx-auto'>Closest</div>
						<div className='col-3 mx-auto'>Last Visit</div>
						<div
							className='col-3 mx-auto'
							onClick={() => {
								window.location.href = `/schedule`;
							}}
						>
							See All
						</div>
					</div>
					<div
						onClick={() => {
							ReactGA.event("Ads_Clicked_From_Home", {
								event_category: "Ads_Clicked_From_Home",
								event_label: "Ads_Clicked_From_Home",
								value: 1, // Optional extra parameters
							});

							ReactPixel.track("Ads_Clicked_From_Home", {
								content_name: "Ads_Clicked_From_Home",
								content_category: "Ads_Clicked_From_Home",
								value: "",
								currency: "",
							});
						}}
					>
						<AdSense adSlot='5842698744' />
					</div>
				</div>
			)}
		</ThirdSectionWrapper>
	);
};

export default ThirdSection;

const ThirdSectionWrapper = styled.div`
	.thirdSection {
		padding: 10px 100px;
		background-color: #141414;
	}

	.slick-dots {
		display: none !important;
	}

	.quickLinks {
		text-align: center;
		margin: 10px 5px;
		font-weight: bolder;
		text-transform: uppercase;
		text-decoration: underline;
	}

	@media (max-width: 1100px) {
		.thirdSection {
			padding: 10px 0px;
		}

		.slick-dots {
			display: none !important;
		}

		.quickLinks {
			font-size: 12px;
			text-align: center;
			margin-top: 10px;
		}
	}
`;
