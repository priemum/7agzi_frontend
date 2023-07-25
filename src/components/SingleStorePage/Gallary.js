/** @format */

import React from "react";
import styled from "styled-components";

const Gallary = ({ filteredResults }) => {
	return (
		<GalleryStyling>
			<div className='row mt-4 text-center'>
				{filteredResults &&
					filteredResults.gallaryPhotos &&
					filteredResults.gallaryPhotos.map((item, i) => {
						return (
							<div key={i} className='col-lg-4 col-md-6 mx-auto my-3'>
								<img
									style={{
										height: "500px",
										width: "500px",
										borderRadius: "15px",
									}}
									src={item.url}
									alt='Powered By infinite-apps.com'
								/>
							</div>
						);
					})}
			</div>
		</GalleryStyling>
	);
};

export default Gallary;

const GalleryStyling = styled.div`
	overflow: hidden;
	margin-bottom: 100px;

	@media (max-width: 1000px) {
		img {
			height: 420px !important;
			width: 420px !important;
		}
	}
`;
