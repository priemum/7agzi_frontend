/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../Images/UploadImageImage.jpg";

const ImageCard = ({
	handleImageRemove,
	addThumbnail,
	fileUploadAndResizeThumbNail,
}) => {
	return (
		<ImageCardWrapper>
			<div className='card card-flush  mx-auto'>
				<div className=''>
					<div className=' p-2'>
						<h5 style={{fontWeight: "bold", fontSize: "1.2rem"}}>
							Agent ID Image
						</h5>
					</div>
				</div>
				<div className='card-body text-center pt-0 mx-auto'>
					<div
						className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
						data-kt-image-input='true'
					>
						<div className='image-input-wrapper w-180px h-180px'></div>
						<div className='col-12'>
							{addThumbnail &&
								addThumbnail.map((image, i) => {
									return (
										<div className='m-3 col-6 ' key={i}>
											<button
												type='button'
												className='close'
												onClick={() => {
													handleImageRemove(image.public_id);
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
													width: "130px",
													height: "130px",
													boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
												}}
												key={image.public_id}
											/>
										</div>
									);
								})}
						</div>
						{!addThumbnail.idImage ? (
							<label
								className=''
								style={{cursor: "pointer", fontSize: "0.95rem"}}
							>
								<img src={imageImage} alt='imageUpload' />
								<input
									type='file'
									hidden
									accept='images/*'
									onChange={fileUploadAndResizeThumbNail}
									required
								/>
							</label>
						) : null}
					</div>
					<div className='text-muted fs-7'>
						Width: 800px, Height: 954px; <br />
						Set the ID Image. Only *.png, *.jpg and *.jpeg image files are
						accepted
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
