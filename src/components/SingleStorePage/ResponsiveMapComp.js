import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ResponsiveMapComp = ({ storeProperties, lat, lng }) => {
	const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

	const size =
		storeProperties && storeProperties.from === "update"
			? "90%"
			: isSmallScreen
			? "100%"
			: "90%";

	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
			<GoogleMap
				mapContainerStyle={{ width: size, height: "500px" }}
				center={{ lat, lng }}
				zoom={16}
			>
				<Marker position={{ lat, lng }} title='Your Location' />
			</GoogleMap>
		</LoadScript>
	);
};

export default ResponsiveMapComp;
