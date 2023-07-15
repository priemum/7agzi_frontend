import React from "react";
import styled from "styled-components";
import ResponsiveMapComp from "./ResponsiveMapComp";

const GettingMap = ({ storeProperties, loading }) => {
	const { latitude, longitude } = storeProperties || {};

	const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

	const size =
		storeProperties && storeProperties.from === "update"
			? "850x600"
			: isSmallScreen
			? "350x300"
			: "550x400";

	const imgUrlClose = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=${size}&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`;

	// const imgUrlFar = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=10&size=${size}&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`;

	// Parse latitude and longitude values into numbers
	const lat = Number(latitude);
	const lng = Number(longitude);

	// Check if latitude and longitude are available and are numbers
	if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
		// You can render some error message or fallback UI here
		return <div>Invalid latitude or longitude</div>;
	}

	return (
		<GettingMapWrapper className='my-5'>
			{latitude && longitude && !loading ? (
				<div className='my-5'>
					{storeProperties && storeProperties.from === "update" ? null : (
						<a
							href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							<h3>Click To Get Directions</h3>
						</a>
					)}
					<div className='my-5 col-md-5 mx-auto'>
						<img src={imgUrlClose} alt='developed by infinite-apps.com' />
					</div>
					{/* <div className='mb-2 col-md-5 mx-auto'>
						<img src={imgUrlFar} alt='developed by infinite-apps.com' />
					</div> */}
					<ResponsiveMapComp
						storeProperties={storeProperties}
						lat={lat}
						lng={lng}
					/>
				</div>
			) : null}
		</GettingMapWrapper>
	);
};

export default GettingMap;

const GettingMapWrapper = styled.div`
	text-align: center;
	padding-bottom: 100px !important;

	h3 {
		color: white;
		text-align: center;
		font-weight: bolder;
		text-transform: uppercase;
		text-decoration: underline;
		font-size: 1.35rem;
	}

	@media (max-height: 1000px) {
		padding-bottom: 10px !important;
	}
`;
