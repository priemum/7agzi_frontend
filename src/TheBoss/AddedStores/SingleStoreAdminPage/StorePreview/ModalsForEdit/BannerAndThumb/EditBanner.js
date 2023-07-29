/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import {
	LoyaltyPointsAndStoreStatus,
	cloudinaryUpload1,
	createHero,
	getAllHeros,
} from "../../../apiOwner";
import { isAuthenticated } from "../../../../../../auth";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import ImageCardHero from "./ImageCardHero";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const EditBanner = ({
	modalVisible,
	setModalVisible,
	language,
	setLoading,
	storeThumbnail,
	setStoreThumbnail,
	lastSettings,
	ownerId,
	hero1,
}) => {
	const [thumbnail, setThumbnail] = useState([]);
	// eslint-disable-next-line
	const [loading2, setLoading2] = useState(false);
	const [loading3, setLoading3] = useState(false);

	const { user, token } = isAuthenticated();

	const gettingAllHeroes = () => {
		getAllHeros(token, ownerId).then((data) => {
			if (data.error) {
			} else {
				var lastHeroComp = data[data.length - 1];
				setThumbnail(
					lastHeroComp && lastHeroComp.thumbnail && lastHeroComp.thumbnail[0]
						? lastHeroComp.thumbnail[0]
						: []
				);
			}
		});
	};

	useEffect(() => {
		gettingAllHeroes();
		// eslint-disable-next-line
	}, []);

	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		setLoading2(true);
		let files = e.target.files;
		let allUploadedFiles = thumbnail;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 1024 * 1024) {
					setLoading2(true);
					// file size is in bytes
					alert("File size should be less than 500kb");
					continue; // skip this file
				}
				Resizer.imageFileResizer(
					files[i],
					1920,
					809,
					"AUTO",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(ownerId, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setThumbnail({ ...thumbnail, images: allUploadedFiles });
								setLoading2(false);
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
								setLoading2(false);
							});
					},
					"base64"
				);
			}
		}
	};

	const handleImageRemove = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${ownerId}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				// eslint-disable-next-line
				const { images } = thumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setThumbnail([]);
				setTimeout(function () {}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {}, 1000);
			});
	};

	const handleImageRemove2 = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${ownerId}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setStoreThumbnail([]);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const clickSubmit = () => {
		setLoading(true);
		if (
			storeThumbnail &&
			storeThumbnail.images &&
			storeThumbnail.images.length === 0
		) {
			return toast.error("Please Add Salon Thumbnail");
		}
		if (storeThumbnail && storeThumbnail.length === 0) {
			return toast.error("Please Add Salon Thumbnail");
		}

		if (thumbnail && thumbnail.images && thumbnail.images.length === 0) {
			return toast.error("Please Add Salon Banner");
		}
		if (thumbnail && thumbnail.length === 0) {
			return toast.error("Please Add Salon Banner");
		}

		createHero(ownerId, token, {
			thumbnail,
			heroComponentStatus: true,
			belongsTo: ownerId,
		}).then((data) => {
			if (data.error) {
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				console.log("Success");
			}
		});

		LoyaltyPointsAndStoreStatus(ownerId, token, {
			loyaltyPointsAward:
				lastSettings && lastSettings.loyaltyPointsAward
					? lastSettings.loyaltyPointsAward
					: 100,
			discountPercentage:
				lastSettings && lastSettings.discountPercentage
					? lastSettings.discountPercentage
					: 15,
			datesStoreClosed:
				lastSettings && lastSettings.datesStoreClosed
					? lastSettings.datesStoreClosed
					: [],
			daysStoreClosed:
				lastSettings && lastSettings.daysStoreClosed
					? lastSettings.daysStoreClosed
					: ["Monday"],
			onlineServicesFees:
				lastSettings && lastSettings.onlineServicesFees
					? lastSettings.onlineServicesFees
					: 5,

			addStoreLogo:
				lastSettings && lastSettings.addStoreLogo
					? lastSettings.addStoreLogo
					: storeThumbnail.images,
			storeThumbnail: storeThumbnail.images,
			ownerIdPhoto:
				lastSettings && lastSettings.ownerIdPhoto
					? lastSettings.ownerIdPhoto
					: [],
			addStoreName:
				lastSettings && lastSettings.addStoreName
					? lastSettings.addStoreName
					: user && user.storeName,
			addStoreNameArabic:
				lastSettings && lastSettings.addStoreNameArabic
					? lastSettings.addStoreNameArabic
					: user && user.storeName,
			longitude:
				lastSettings && lastSettings.longitude ? lastSettings.longitude : "",
			latitude:
				lastSettings && lastSettings.latitude ? lastSettings.latitude : "",
			activeOnlineBooking:
				lastSettings && lastSettings.activeOnlineBooking
					? lastSettings.activeOnlineBooking
					: true,
			activeWhatsAppNotification:
				lastSettings && lastSettings.activeWhatsAppNotification
					? lastSettings.activeWhatsAppNotification
					: true,
			storePhone:
				lastSettings && lastSettings.storePhone
					? lastSettings.storePhone
					: user.phone,
			branchesCount:
				lastSettings && lastSettings.branchesCount
					? lastSettings.branchesCount
					: 1,
			stylistsCount:
				lastSettings && lastSettings.stylistsCount
					? lastSettings.stylistsCount
					: 3,
			chairsCount:
				lastSettings && lastSettings.chairsCount ? lastSettings.chairsCount : 4,
			cashPayment:
				lastSettings && lastSettings.cashPayment
					? lastSettings.cashPayment
					: true,
			visaPayment:
				lastSettings && lastSettings.visaPayment
					? lastSettings.visaPayment
					: false,
			airConditioned:
				lastSettings && lastSettings.airConditioned
					? lastSettings.airConditioned
					: false,
			parking:
				lastSettings && lastSettings.parking ? lastSettings.parking : true,
			belongsTo: ownerId,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setModalVisible(false);

				setTimeout(function () {
					window.location.reload(false);
				}, 2000);
			}
		});
	};

	return (
		<EditBannerWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<Modal
				width='90%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}
					>
						{language === "Arabic"
							? "تعديل الصورة الرئيسية للصالون"
							: `EDIT SALON BANNER`}
					</div>
				}
				open={modalVisible}
				onOk={() => {
					setModalVisible(false);
				}}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible(false);
				}}
			>
				<>
					<ImageCardHero
						thumbnail={thumbnail}
						setThumbnail={setThumbnail}
						handleImageRemove={handleImageRemove}
						fileUploadAndResizeThumbNail={fileUploadAndResizeThumbNail}
						language={language}
						handleImageRemove2={handleImageRemove2}
						storeThumbnail={storeThumbnail}
						setStoreThumbnail={setStoreThumbnail}
						setLoading2={setLoading2}
						loading2={loading2}
						setLoading3={setLoading3}
						loading3={loading3}
					/>

					<div
						className='mx-auto text-center'
						onClick={() => {
							clickSubmit();
						}}
					>
						<button className='btn-success btn w-50'>SUBMIT IMAGES</button>
					</div>
				</>
			</Modal>
		</EditBannerWrapper>
	);
};

export default EditBanner;

const EditBannerWrapper = styled.div`
	z-index: 18000 !important;
`;
