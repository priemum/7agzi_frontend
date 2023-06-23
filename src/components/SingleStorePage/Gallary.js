/** @format */

import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Gallary = ({filteredResults}) => {
	return (
		<GalleryStyling>
			{filteredResults &&
				filteredResults.map((item, i) => {
					return (
						<div key={i} className='row mt-4 text-center'>
							{item.workPhotos.map((img, ii) => {
								return (
									<div className='col-lg-4 col-md-6 mx-auto my-3' key={ii}>
										<div className='mx-auto text-center'>
											<span
												style={{
													fontWeight: "bold",
													color: "#e9bdbd",
													fontSize: "1rem",
												}}
											>
												Stylist Name:
											</span>{" "}
											<span
												style={{
													fontWeight: "bold",
													color: "lightblue",
													fontSize: "0.9rem",
												}}
											>
												{item.employeeName}
											</span>
										</div>
										<Link
											to={`/employee/${
												item &&
												item.employeeName &&
												item.employeeName.split(" ").join("-")
											}/${item._id}${item._id}${item._id}`}
										>
											<img
												style={{
													height: "500px",
													width: "500px",
													borderRadius: "15px",
												}}
												src={img.url}
												alt={item.employeeName}
											/>
										</Link>
									</div>
								);
							})}
						</div>
					);
				})}
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
