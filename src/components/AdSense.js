/** @format */

import React, { Component } from "react";
import styled from "styled-components";

class AdSense extends Component {
	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	render() {
		return (
			<AdsenseWrapper style={{ textAlign: "center" }}>
				<ins
					className='adsbygoogle'
					style={{
						display: "inline-block",
						// width: "728px",
						// height: "90px",
						// margin: "auto",
						textAlign: "center",
						position: "relative",
					}}
					data-ad-client='ca-pub-2490851164394283'
					data-ad-slot='5842698744'
					data-ad-format='auto'
					data-full-width-responsive='true'
				></ins>
			</AdsenseWrapper>
		);
	}
}

export default AdSense;

const AdsenseWrapper = styled.div`
	text-align: center;
	position: relative;

	.adsbygoogle {
		width: 320px !important;
		height: 100px !important;
	}
	@media (min-width: 500px) {
		.adsbygoogle {
			width: 468px !important;
			height: 60px !important;
		}
	}
	@media (min-width: 800px) {
		.adsbygoogle {
			width: 728px !important;
			height: 90px !important;
		}
	}
`;
