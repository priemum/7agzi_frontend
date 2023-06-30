import React from "react";
import styled from "styled-components";

const GettingMap = ({ storeProperties }) => {
	const { latitude, longitude } = storeProperties || {};

	const imgUrlClose = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=350x300&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`;
	const imgUrlFar = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=9&size=350x300&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`;

	return (
		<GettingMapWrapper>
			{latitude && longitude ? (
				<div className='my-5'>
					<a
						href={`comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=driving`}
						target='_blank'
						rel='noopener noreferrer'
					>
						<h3>Click To Get Directions</h3>
					</a>
					<div className='mb-2 col-12'>
						<img src={imgUrlFar} alt='developed by infinite-apps.com' />
					</div>
					<div className='my-5 col-12 mx-auto'>
						Latitude: {latitude}
						<br />
						Longitude: {longitude}
					</div>
					<div className='my-5 col-12 mx-auto'>
						<img src={imgUrlClose} alt='developed by infinite-apps.com' />
					</div>
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
