import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet";
import { Spin } from "antd";
import { isAuthenticated } from "../../auth";
import AddLinkForm from "./AddLinkForm";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import { useCartContext } from "../../sidebar_context";
import { cloudinaryUpload1 } from "../../ecommerceModule/apiAdmin";
import { toast } from "react-toastify";
import { createAffiliate } from "../apiBoss";

const AffiliateMain = () => {
	const { token, user } = isAuthenticated();

	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [values, setValues] = useState({
		productName: "",
		slug: "",
		description1: "",
		price: "",
		priceAfterDiscount: "",
		gender: "all",
		category: "",
		images: [],
		shipping: true,
		activeProduct: true,
		featuredProduct: false,
		affiliateLink: "",
		source: "",
		country: "",
		currency: "",
	});

	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);

	// eslint-disable-next-line

	const { chosenLanguage } = useCartContext();

	useEffect(() => {
		if (window.location.pathname.includes("/store/admin/dashboard")) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, []);

	const getAllAffiliates = () => {
		// setLoading(true);
		// gettingAllXStores(token, user._id).then((data) => {
		// 	if (data && data.error) {
		// 		console.log(data.error);
		// 	} else {
		// 		setXStoreAccounts(data);
		// 		setLoading(false);
		// 	}
		// });
	};

	useEffect(() => {
		getAllAffiliates();
		// eslint-disable-next-line
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (values.images.length === 0) {
			return toast.error("Please Add At Least 1 Image");
		}

		if (!values.productName) {
			return toast.error("Product Name Is Required");
		}

		if (!values.price) {
			return toast.error("Price Is Required");
		}

		if (!values.affiliateLink) {
			return toast.error("Affiliate Link Is Required");
		}

		if (!values.category) {
			return toast.error("Category Is Required");
		}

		createAffiliate(user._id, token, values).then((data) => {
			if (data.error) {
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Affiliate Product Was Successfully Added");

				setTimeout(function () {
					window.scrollTo({ behavior: "smooth", top: 0 });
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const fileUploadAndResizeimages = (e) => {
		let files = e.target.files;
		// console.log(files[0]);
		let allUploadedFiles = values.images;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setValues({ ...values, images: allUploadedFiles });
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

	const FileUploadImages = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised w-50 '
					style={{
						cursor: "pointer",
						fontSize: "1rem",
						textAlign: "center",
						fontWeight: "bold",
					}}
				>
					{chosenLanguage === "Arabic"
						? "تحميل صور المنتج"
						: "Upload Product Images"}

					<input
						type='file'
						multiple
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeimages}
					/>
				</label>
			</>
		);
	};

	const handleImageRemove = (public_id) => {
		setLoading(true);
		// console.log("remove image", public_id);
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
				setLoading(false);
				const { images } = values;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const handleChange = (name) => (e) => {
		const value = e.target.value;
		console.log(name === "productName");
		if (name === "productName") {
			setValues({ ...values, slug: value.split(" ").join("-"), [name]: value });
		} else {
			setValues({ ...values, [name]: value });
		}
	};

	return (
		<AffiliateMainWrapper show={collapsed}>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK Affiliate Links</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/boss/admin/affiliate-links`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='Affiliate'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "50vh", // adjust as per your requirement
						}}
					>
						<Spin size='large' tip='Loading...' />
					</div>
				) : (
					<div className='mt-3 mx-auto container'>
						<AddLinkForm
							handleSubmit={handleSubmit}
							values={values}
							setValues={setValues}
							chosenLanguage={chosenLanguage}
							handleImageRemove={handleImageRemove}
							FileUploadImages={FileUploadImages}
							handleChange={handleChange}
						/>
					</div>
				)}
			</div>
		</AffiliateMainWrapper>
	);
};

export default AffiliateMain;

const AffiliateMainWrapper = styled.div`
	min-height: 1200px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "2% 100%" : "11% 91%")};
	}

	.container-fluid {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.card-body {
		font-weight: bolder;
	}

	table {
		overflow: auto;
	}

	.tableWrapper {
		display: none;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}

		a {
			font-size: 13px !important;
			text-align: center;
		}

		.container-fluid > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container-fluid {
			margin-left: 0px !important;
			text-align: center;
		}

		.apexcharts-toolbar {
			display: none !important;
		}
	}
`;
