/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import imageImage from "../../../../Images/UploadImageImage.jpg";
import ImageCard2 from "./ImageCard2";
import { Spin } from "antd";
import { isAuthenticated } from "../../../../auth";
import { cloudinaryUpload1 } from "../../../apiOwner";

const ImageCardHero = ({
	thumbnail,
	setThumbnail,
	handleImageRemove,
	language,
	handleImageRemove2,
	storeThumbnail,
	setStoreThumbnail,
	setLoading3,
	loading3,
}) => {
	const [loading, setLoading] = useState(false);

	const { user, token } = isAuthenticated();

	const fileUploadAndResizeThumbNail = (e) => {
		setLoading(true);

		let files = e.target.files;
		let allUploadedFiles =
			thumbnail &&
			thumbnail.images &&
			thumbnail.images[0] &&
			thumbnail.images[0].url
				? [...thumbnail.images]
				: [];

		if (files) {
			for (let i = 0; i < files.length; i++) {
				let reader = new FileReader();
				reader.readAsDataURL(files[i]);
				reader.onload = (event) => {
					cloudinaryUpload1(user._id, token, { image: event.target.result })
						.then((data) => {
							allUploadedFiles.push(data);

							setThumbnail({
								...thumbnail,
								images: allUploadedFiles,
							});
						})
						.catch((err) => {
							setLoading(false);
							console.log("CLOUDINARY UPLOAD ERR", err);
						});
				};
			}

			setTimeout(() => {
				setLoading(false);
			}, 1500);
		}
	};

	return (
		<ImageCardHeroWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<div className='row'>
				<div className='col-md-4 mx-auto'>
					<div className='card card-flush py-4'>
						<div className=''>
							<div className=' p-3'>
								<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
									SALON BANNER{" "}
									<strong style={{ color: "darkred" }}>(REQUIRED*)</strong>
								</h5>
							</div>
						</div>
						<div className='card-body text-center pt-0'>
							<div
								className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
								data-kt-image-input='true'
							>
								<div className='image-input-wrapper w-180px h-180px'></div>
								<div className='col-12'>
									{thumbnail &&
										thumbnail.images &&
										thumbnail.images.map((image) => {
											return (
												<div className='m-3 col-6 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove(image.public_id);
															setThumbnail([]);
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
								<>
									{loading ? (
										<div
											style={{
												textAlign: "center",
												marginTop: "10%",
												marginBottom: "10%",
											}}
										>
											<Spin size='large' />
										</div>
									) : (
										<>
											{!thumbnail.images ? (
												<label
													className=''
													style={{ cursor: "pointer", fontSize: "0.95rem" }}
												>
													<img src={imageImage} alt='imageUpload' width='60%' />
													<input
														type='file'
														hidden
														accept='image/*'
														onChange={fileUploadAndResizeThumbNail}
														required
													/>
												</label>
											) : null}
										</>
									)}
								</>
							</div>
							{language === "Arabic" ? (
								<div className='text-muted fs-7'>
									<strong style={{ color: "black" }}>
										الصورة يجب أن تكون حجمها 500 كيلوبايت أو أقل...
									</strong>
									اجعل الصورة الرئيسية للصفحة الرئيسية بحجم مصغر 1. يتم قبول
									ملفات الصور بامتداد *.png و *.jpg و *.jpeg فقط
								</div>
							) : (
								<div className='text-muted fs-7'>
									<strong style={{ color: "black" }}>
										Image Should be 500 kb or less...
									</strong>
									Set the Home Page Main thumbnail image 1. Only *.png, *.jpg
									and *.jpeg image files are accepted
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='col-md-4 mx-auto'>
					{loading3 ? (
						<div
							style={{
								textAlign: "center",
								marginTop: "10%",
								marginBottom: "10%",
							}}
						>
							<Spin size='large' />
						</div>
					) : (
						<div className='card card-flush py-4'>
							<ImageCard2
								addThumbnail={storeThumbnail}
								handleImageRemove={handleImageRemove2}
								setAddThumbnail={setStoreThumbnail}
								language={language}
								setLoading={setLoading3}
								loading={loading3}
							/>
						</div>
					)}
				</div>
			</div>
		</ImageCardHeroWrapper>
	);
};

export default ImageCardHero;

const ImageCardHeroWrapper = styled.div`
	.card {
		border: 1px #f6f6f6 solid !important;
	}
`;
