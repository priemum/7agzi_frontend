import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import {
	addingSalonGallary,
	cloudinaryUpload1,
	getPreviousAddedGallary,
} from "../apiOwner";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import ImageCard from "./ImageCard";
import { isAuthenticated } from "../../auth";
import { toast } from "react-toastify";

const GallaryMain = ({ language }) => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const [values, setValues] = useState({ gallaryPhotos: [] });
	// eslint-disable-next-line
	const [previousGallary, setPreviousGallary] = useState({});
	const [loading, setLoading] = useState(true);

	const { user, token } = isAuthenticated();

	const gettingAllServices = () => {
		setLoading(true);
		getPreviousAddedGallary(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
				setLoading(true);
			} else {
				var lastAdded = data[data.length - 1];
				setPreviousGallary(lastAdded);
				var adjustingPhotos =
					lastAdded &&
					lastAdded.gallaryPhotos &&
					lastAdded.gallaryPhotos.map((i) => {
						return {
							url: i.url,
							public_id: i.public_id,
						};
					});

				setValues(
					lastAdded &&
						lastAdded.gallaryPhotos &&
						lastAdded.gallaryPhotos.length > 0
						? { gallaryPhotos: adjustingPhotos }
						: { gallaryPhotos: [] }
				);

				setTimeout(() => {
					setLoading(false);
				}, 1000);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, []);

	const fileUploadAndResizeWorkPhotos = (e) => {
		let files = e.target.files;
		let allUploadedFiles = values.gallaryPhotos;

		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 1024 * 1024) {
					// file size is in bytes
					alert("File size should be less than 1024kb");
					continue; // skip this file
				}

				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"AUTO",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setValues({ ...values, gallaryPhotos: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
		}
	};

	const handleImageRemove = (public_id) => {
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				// eslint-disable-next-line
				const { gallaryPhotos } = values.gallaryPhotos;
				let filteredImages = values.gallaryPhotos.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, gallaryPhotos: filteredImages });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const AddNewGallaryToSalon = () => {
		if (values.gallaryPhotos.length === 0) {
			return toast.error("Please Add At Least One Photo");
		}

		if (values.gallaryPhotos.length > 10) {
			return toast.error("Maximum Gallary Photos is 10 Photos");
		}

		addingSalonGallary(user._id, token, {
			gallaryPhotos: values.gallaryPhotos,
			belongsTo: user._id,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Gallary was successfully Updated.");
				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			}
		});
	};

	return (
		<GallaryMainWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='AddGallary'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
						language={language}
					/>
				</div>
				<div>
					{loading ? (
						<div className='container mt-5'>Loading....</div>
					) : (
						<div className='container mt-5'>
							<ImageCard
								addThumbnail={values && values.gallaryPhotos}
								handleImageRemove={handleImageRemove}
								setAddThumbnail={setValues}
								fileUploadAndResizeThumbNail={fileUploadAndResizeWorkPhotos}
								values={values}
								setValues={setValues}
								language={language}
							/>
							<div className='mt-3 mx-auto text-center'>
								<button
									className='btn btn-primary mx-auto w-25'
									onClick={() => {
										AddNewGallaryToSalon();
									}}
								>
									Update Your Gallary
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</GallaryMainWrapper>
	);
};

export default GallaryMain;

const GallaryMainWrapper = styled.div`
	min-height: 1000px;
	.grid-container {
		display: grid;
		grid-template-columns: 13% 87%;
	}

	button {
		font-weight: bold;
		font-size: 1.1rem;
		text-transform: uppercase;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}

		a {
			font-size: 13px !important;
			text-align: center;
		}

		.container > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container {
			margin-left: 0px !important;
			text-align: center;
		}
	}
`;
