/** @format */

import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import {
	createProduct,
	cloudinaryUpload1,
	getCategories,
	getProducts,
	getSubCategories,
	getListOfSubs,
} from "../../apiAdmin";
// eslint-disable-next-line
import { ToastContainer, toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Select } from "antd";
import UpdateProduct from "../UpdatingProduct/UpdateProduct";
import StockReport from "./StockReport";

const { Option } = Select;

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "0.9rem",
			textAlign: "center",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",
		};
	} else {
		return {
			backgroundColor: "white",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const AddProduct = ({ chosenLanguage }) => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		productName: "",
		productName_Arabic: "",
		productSKU: "",
		slug: "",
		slug_Arabic: "",
		description1: "",
		description1_Arabic: "",
		price: "",
		price_unit: "",
		priceAfterDiscount: "",
		gender: "all",
		category: "",
		subcategory: [],
		subcategories: [],
		quantity: "",
		loyaltyPoints: 10,
		images: [],
		shipping: true,
		activeProduct: true,
		featuredProduct: false,
		workPhotos: [],
		belongsTo: user._id,
	});
	// eslint-disable-next-line
	const [allCategories, setAllCategories] = useState([]);
	const [productMenu, setProductMenu] = useState("AddProduct");
	const [subsOptions, setSubsOptions] = useState([]);
	// eslint-disable-next-line
	const [allSubcategories, setAllSubcategories] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [allProducts, setAllProducts] = useState(true);

	const gettingAllProducts = () => {
		getProducts(user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllProducts(data);
			}
		});
	};
	const allProductsName =
		allProducts && allProducts[0] && allProducts.map((i) => i.productName);

	const productNameAlreadyAdded =
		allProductsName && allProductsName.indexOf(values.productName) >= 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (productNameAlreadyAdded) {
			return toast.error("Product was added before.");
		}
		if (values && values.images && values.images.length === 0) {
			return toast.error("Please add at least 1 product photo");
		}

		const valuesUpdate = {
			...values,
			slug: values.productName.split(" ").join("-"),
			slug_Arabic: values.productName_Arabic.split(" ").join("-"),
		};

		createProduct(user._id, token, valuesUpdate).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Product Was Successfully Added");
				setTimeout(function () {
					window.location.reload(false);
				}, 3000);
			}
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

	const handleCategoryChange = (e) => {
		setValues({ ...values, subcategory: [], category: e.target.value });

		getListOfSubs(e.target.value).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSubsOptions(data);
			}
		});
	};

	// console.log(subsOptions, "------ SubsOptions");

	const gettingAllCategories = () => {
		getCategories(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllCategories(data.filter((c) => c.categoryStatus === true));
			}
		});
	};

	const gettingAllSubcategories = () => {
		getSubCategories(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllSubcategories(data.filter((c) => c.subCategoryStatus === true));
			}
		});
	};

	useEffect(() => {
		gettingAllProducts();
		gettingAllCategories();
		gettingAllSubcategories();
		// eslint-disable-next-line
	}, []);

	// console.log(AllWorkingHours, "allWorkingHours");

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

	return (
		<>
			<ToastContainer />

			<div
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
				className='mt-3 p-3 col-11'
				style={{
					border: "1px #d3d3d3 solid",
					borderRadius: "20px",
					marginBottom: "100px",
				}}
			>
				<div className='row'>
					<div
						className='col-md-4 mx-auto'
						style={isActive(productMenu, "AddProduct")}
						onClick={() => setProductMenu("AddProduct")}
					>
						{chosenLanguage === "Arabic" ? "إضافة منتج " : "Add Product"}
					</div>
					<div
						className='col-md-4 mx-auto'
						style={isActive(productMenu, "UpdateProduct")}
						onClick={() => setProductMenu("UpdateProduct")}
					>
						{chosenLanguage === "Arabic" ? "تعديل منتج" : "Update Product"}
					</div>

					<div
						className='col-md-4 mx-auto'
						style={isActive(productMenu, "StockReport")}
						onClick={() => setProductMenu("StockReport")}
					>
						{chosenLanguage === "Arabic" ? "تقرير المخزونات" : "Stock Report"}
					</div>
				</div>
				{productMenu === "AddProduct" ? (
					<>
						{chosenLanguage === "Arabic" ? (
							<h3 className='my-3 text-center'>إضافة منتج </h3>
						) : (
							<h3 className='my-3 text-center'>Add a Product</h3>
						)}

						<form
							onSubmit={handleSubmit}
							dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
						>
							<div
								style={{ textAlign: "center" }}
								dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
							>
								{values.images &&
									values.images.map((image) => {
										return (
											<>
												<img
													src={image.url}
													alt='Img Not Found'
													style={{
														width: "80px",
														height: "80px",
														boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														textAlign: "center",
													}}
													className='mx-1 mt-3 '
													key={image.public_id}
												/>
												<button
													type='button'
													onClick={() => {
														handleImageRemove(image.public_id);

														var array = values.images.filter(function (s) {
															return s !== image;
														});
														setValues({ ...values, images: array });
													}}
													style={{
														transform: "translate(55%, -150%)",
														color: "white",
														background: "black",
														fontSize: "15px",
														padding: "0px",
														borderRadius: "50%",
													}}
													aria-label='Close'
												>
													<span aria-hidden='true'>&times;</span>
												</button>
											</>
										);
									})}

								<div className='my-3 p-3' style={{ textAlign: "center" }}>
									{FileUploadImages()}
								</div>
							</div>
							<div
								className='row'
								dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
							>
								<div
									className='form-group col-md-6 mx-auto '
									dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
								>
									<label className=''>Product Name (English)</label>
									<input
										onChange={handleChange("productName")}
										type='text'
										className='form-control'
										value={values.productName}
										placeholder='Required'
										required
									/>
								</div>
								<div
									className='form-group col-md-6 mx-auto '
									dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
								>
									<label className=''>اسم المنتج</label>
									<input
										onChange={handleChange("productName_Arabic")}
										type='text'
										className='form-control'
										value={values.productName_Arabic}
										placeholder='Required'
										required
									/>
								</div>
							</div>

							<div className='row '>
								<div className='form-group col-md-3 mx-auto'>
									<label className=''>Product SKU</label>
									<input
										onChange={handleChange("productSKU")}
										type='text'
										className='form-control'
										value={values.productSKU}
										placeholder='Required'
										required
									/>
								</div>
								<div className='form-group col-md-2 mx-auto'>
									<label className=''>
										{chosenLanguage === "Arabic"
											? "كمية المخزون"
											: "Stock Level"}
									</label>
									<input
										onChange={handleChange("quantity")}
										type='number'
										className='form-control'
										value={values.quantity}
										placeholder='Required'
										required
									/>
								</div>
								<div className='form-group col-md-2 mx-auto'>
									<label className=''>
										{chosenLanguage === "Arabic" ? "سعر المنتج" : "Price"}
									</label>
									<input
										onChange={handleChange("price")}
										type='number'
										className='form-control'
										value={values.price}
										placeholder='Required'
										required
									/>
								</div>
								<div className='form-group col-md-2 mx-auto'>
									<label className=''>
										{chosenLanguage === "Arabic"
											? "سعر المنتج بعد الخصم"
											: "Price After Discount"}
									</label>
									<input
										onChange={handleChange("priceAfterDiscount")}
										type='number'
										className='form-control'
										value={values.priceAfterDiscount}
										placeholder='Required'
										required
									/>
								</div>
								<div className='form-group col-md-2 mx-auto '>
									<label>
										{chosenLanguage === "Arabic" ? "العملة" : "Currency"}
									</label>
									<select
										name='category'
										className='form-control'
										onChange={handleChange("price_unit")}
									>
										<option>Please select</option>
										<option value='EGP'>EGP</option>
										<option value='Kuwaiti Dinar'>Kuwaiti Dinar</option>
										<option value='US Dollar'>US Dollar</option>
									</select>
								</div>
							</div>
							<br />
							<div className='row'>
								<div className='form-group col-md-5 mx-auto '>
									<label>
										{chosenLanguage === "Arabic" ? "فئة المنتج" : "Category"}
									</label>
									<select
										name='category'
										className='form-control'
										onChange={handleCategoryChange}
									>
										<option>Please select</option>
										{allCategories.length > 0 &&
											allCategories.map((c) => (
												<option key={c._id} value={c._id}>
													{c.categoryName}
												</option>
											))}
									</select>
								</div>
								{subsOptions && subsOptions.length > 0 && (
									<div className='form-group col-md-5 mx-auto '>
										<label>
											{chosenLanguage === "Arabic"
												? "الفئة الفرعية للمنتج"
												: "Subcategory"}
										</label>
										<Select
											mode='multiple'
											style={{ width: "100%" }}
											placeholder='Please Select a subcategory'
											value={values.subcategory}
											onChange={(value) =>
												setValues({ ...values, subcategory: value })
											}
										>
											{subsOptions &&
												subsOptions.map((sub, i) => {
													return (
														<Option key={i} value={sub._id}>
															{sub.SubcategoryName}
														</Option>
													);
												})}
										</Select>
									</div>
								)}
							</div>

							<br />
							<div className='row'>
								<div className='form-group col-md-3'>
									<div className='form-group'>
										<label className='text-muted'>Gender</label>
										<select
											onChange={(e) =>
												setValues({ ...values, gender: e.target.value })
											}
											className='form-control'
										>
											<option value=''>Please select a gender</option>
											<option value='men'>For Men</option>
											<option value='women'>For Women</option>
											<option value='all'>For All Genders</option>
										</select>
									</div>
								</div>
								<div className='form-group col-md-3'>
									<label className=''>Activate Product</label>
									<select
										onChange={handleChange("activeProduct")}
										className='form-control'
									>
										<option>Please select / Required*</option>
										<option value='0'>No</option>
										<option value='1'>Yes</option>
									</select>
								</div>

								<div className='form-group col-md-3'>
									<label className=''>
										{chosenLanguage === "Arabic"
											? "هل يمكن شحنها؟"
											: "Can Be Shipped?"}
									</label>
									<select
										onChange={handleChange("shipping")}
										className='form-control'
									>
										<option>Please select / Required*</option>
										<option value='0'>No</option>
										<option value='1'>Yes</option>
									</select>
								</div>
								<div className='form-group col-md-3'>
									<label className=''>
										{chosenLanguage === "Arabic"
											? "نقاط الولاء لشراء عدد واحد"
											: "Loyalty Points For Purchasing 1 Item"}
									</label>
									<input
										onChange={handleChange("loyaltyPoints")}
										type='number'
										className='form-control'
										value={values.loyaltyPoints}
										placeholder='Required'
									/>
								</div>
							</div>

							<div className='form-group'>
								<label className=''>
									Add Description (Required In English)
								</label>
								<textarea
									rows='5'
									onChange={handleChange("description1")}
									className='form-control'
									value={values.description1}
									placeholder='Required*  write a little bit about the product'
									required
								/>
							</div>
							<div className='form-group'>
								<label className=''>إضافة الوصف (مطلوب)</label>
								<textarea
									rows='5'
									onChange={handleChange("description1_Arabic")}
									className='form-control'
									value={values.description1_Arabic}
									placeholder='مطلوب * اكتب قليلا عن المنتج'
									required
								/>
							</div>

							<hr />

							<div className='mx-auto text-center col-md-6'>
								<button
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									className='btn btn-outline-primary mt-3 text-center btn-block'
								>
									Add Product
								</button>
							</div>
						</form>
					</>
				) : (
					<>
						{productMenu === "UpdateProduct" ? (
							<UpdateProduct chosenLanguage={chosenLanguage} />
						) : (
							<StockReport
								chosenLanguage={chosenLanguage}
								allProducts={allProducts}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default AddProduct;
