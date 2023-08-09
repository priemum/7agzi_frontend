/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../../Images/UploadImageImage.jpg";

const ImageCard = ({
	setAddThumbnail,
	handleImageRemove,
	addThumbnail,
	fileUploadAndResizeThumbNail,
	language,
}) => {
	return (
		<ImageCardWrapper>
			<div className='card card-flush py-4'>
				<div className=''>
					<div className=' p-2'>
						<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
							{language === "Arabic" ? "معرض الصور " : "Salon Gallary Photos"}
						</h5>
					</div>
				</div>
				<div className='card-body text-center pt-0'>
					<div
						className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
						data-kt-image-input='true'
					>
						<div className='image-input-wrapper'></div>
						<div className='col-12'>
							<div className='row'>
								{addThumbnail &&
									addThumbnail.map((image, i) => {
										return (
											<div className='col-md-4 mb-3' key={i}>
												<div className=' col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove(image.public_id);
															// setAddThumbnail([]);
														}}
														style={{
															color: "white",
															background: "black",
															fontSize: "20px",
														}}
														aria-label='Close'
													>
														<span aria-hidden='true'>&times;</span>
													</button>
													<img
														src={image.url}
														alt='Img Not Found'
														style={{
															width: "150px",
															height: "150px",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											</div>
										);
									})}
							</div>
						</div>
						{!addThumbnail.images || addThumbnail.images.length <= 0 ? (
							<label
								className=''
								style={{ cursor: "pointer", fontSize: "0.95rem" }}
							>
								<img
									src={imageImage}
									alt='imageUpload'
									style={{
										width: "200px",
										height: "200px",
									}}
								/>
								<input
									type='file'
									multiple
									hidden
									accept='image/*'
									onChange={fileUploadAndResizeThumbNail}
									required
								/>
							</label>
						) : null}
					</div>
					<div className='text-muted fs-7'>
						Width: 800px, Height: 954px;{" "}
						<span style={{ fontWeight: "bolder", textTransform: "uppercase" }}>
							Up to 10 photos.
						</span>
						<br />
						<strong style={{ color: "black" }}>
							Image Should be 700 kb or less...
						</strong>
						<br />
						Set the Salon Gallary images. Only *.png, *.jpg and *.jpeg image
						files are accepted
					</div>
				</div>
			</div>
		</ImageCardWrapper>
	);
};

export default ImageCard;

const ImageCardWrapper = styled.div`
	text-align: center;

	.card {
		border: 1px #f6f6f6 solid !important;
		margin: auto;
		text-align: center;
	}
`;
