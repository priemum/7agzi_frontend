// src/components/AdSense.js
import React, { useEffect } from "react";

const AdSense = ({ adSlot, adFormat = "auto" }) => {
	useEffect(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (err) {
			console.error("AdSense error:", err);
		}
	}, []);

	return (
		<ins
			className='adsbygoogle'
			style={{ display: "block" }}
			data-ad-client='ca-pub-2490851164394283'
			data-ad-slot={adSlot}
			data-ad-format={adFormat}
		></ins>
	);
};

export default AdSense;
