/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../auth";
import {
	updateProduct,
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	["bold", "italic", "underline", "strike", { color: [] }],
	[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
	["link", "image", "video"],
	["clean"],
];

const { Option } = Select;

const UpdateProduct = ({ chosenLanguage }) => {
	const [values, setValues] = useState({
		productName: "",
		productName_Arabic: "",
		productSKU: "",
		slug: "",
		slug_Arabic: "",
		description1: "",
		description1_Arabic: "",
		description2: "",
		description2_Arabic: "",
		description3: "",
		price: "",
		price_unit: "",
		priceAfterDiscount: "",
		loyaltyPoints: "",
		gender: "all",
		category: "",
		subcategory: [],
		quantity: "",
		images: [],
		relatedProducts: [],
		shipping: "",
		activeProduct: "",
		featuredProduct: "",
		workPhotos: [],
	});
	// eslint-disable-next-line
	const [allCategories, setAllCategories] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [subsOptions, setSubsOptions] = useState([]);
	// eslint-disable-next-line
	const [allSubcategories, setAllSubcategories] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [productSelected, setProductSelected] = useState(false);
	const { user, token } = isAuthenticated();

	const gettingAllProducts = () => {
		getProducts(user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var finalValues = {};
				setAllProducts(data);

				setValues(finalValues);
			}
		});
	};

	// const allProductsName =
	// 	allProducts && allProducts[0] && allProducts.map((i) => i.productName);

	// const productNameAlreadyAdded =
	// 	allProductsName && allProductsName.indexOf(values.productName) >= 0;

	const handleSubmit = (e) => {
		e.preventDefault();

		setValues({ ...values, slug: values.productName.split(" ").join("-") });
		setValues({
			...values,
			slug_Arabic: values.productName_Arabic.split(" ").join("-"),
		});

		setValues({
			...values,
			relatedProducts: values.relatedProducts.map((i) => i._id),
		});
		updateProduct(values._id, user._id, token, {
			product: values,
		}).then((data) => {
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
			setValues({
				...values,
				slug_Arabic: value.split(" ").join("-"),
				[name]: value,
			});
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

	console.log(values.relatedProducts, "relatedProducts");

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
	}, [loading]);

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
						fontSize: "0.95rem",
						textAlign: "center",
					}}
				>
					Upload Product Images
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

	function handlePaste(e) {
		const clipboardData = e.clipboardData || window.clipboardData;
		if (clipboardData && clipboardData.getData) {
			const content = clipboardData.getData("text/html");
			const div = document.createElement("div");
			div.innerHTML = content;
			document.execCommand("insertHTML", false, div.innerHTML);
			e.preventDefault();
		}
	}

	function handleEditorChange(content, delta, source, editor) {
		const html = editor.getHTML();
		setValues({ ...values, description1: html });
	}

	function handleEditorChangeArabic(content, delta, source, editor) {
		const html = editor.getHTML();
		setValues({ ...values, description1_Arabic: html });
	}

	return (
		<>
			<ToastContainer />
			{!productSelected ? (
				<div
					className='mt-3 mx-auto'
					style={{
						borderRadius: "20px",
						marginBottom: "343px",
					}}
				>
					<div className='row'>
						<ul className='list-group col-11'>
							<h3 className='text-center mt-5'>
								All {allProducts && allProducts.length} Products in your shop
							</h3>
							<p className='mt-2 text-center'>
								Please Select Which <strong>Product</strong> You Would Like To
								Update...
							</p>
							{allProducts &&
								allProducts[0] &&
								allProducts.map((e, i) => (
									<Link
										key={i}
										to={`#`}
										onClick={() => {
											setValues(e);
											setProductSelected(!productSelected);
										}}
									>
										<div className='container ml-1 my-1'>
											<div className='row'>
												<li
													className='list-group-item d-flex my-1 py-3 justify-content-between align-items-center col-md-9'
													style={{ fontSize: "1.1rem" }}
												>
													<strong>{e.productName}</strong>
												</li>
												{!e.activeProduct && (
													<li
														className='list-group-item d-flex my-1 py-3 justify-content-between align-items-center col-md-3'
														style={{
															fontSize: "0.7rem",
															color: "red",
															fontWeight: "bold",
														}}
													>
														<strong>Inactive</strong>
													</li>
												)}
											</div>
										</div>
									</Link>
								))}
						</ul>
					</div>
				</div>
			) : (
				<>
					<div
						className='col-md-11 mx-auto mt-2'
						style={{ border: "1px black solid", borderRadius: "20px" }}
					>
						<div
							className='text-center my-2'
							onClick={() => {
								setProductSelected(!productSelected);
							}}
						>
							<h4
								style={{
									fontWeight: "bold",
									textDecoration: "underline",
									textTransform: "uppercase",
									cursor: "pointer",
								}}
							>
								Back To Products List...
							</h4>
						</div>
						<h3 className='my-3 text-center'>
							Update Product ({values.productName})
						</h3>

						<form onSubmit={handleSubmit}>
							<div style={{ textAlign: "center" }}>
								{values.images &&
									values.images.map((image, i) => {
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
							<div className='row'>
								<div className='form-group col-md-5 mx-auto '>
									<label>Category</label>
									<select
										name='category'
										className='form-control'
										onChange={handleCategoryChange}
									>
										<option>Please select</option>
										{allCategories &&
											allCategories.length > 0 &&
											allCategories.map((c) => (
												<option key={c._id} value={c._id}>
													{c.categoryName}
												</option>
											))}
									</select>
								</div>
								{subsOptions && subsOptions.length > 0 && (
									<div className='form-group col-md-5 mx-auto '>
										<label>Sub Category</label>
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
								<div className='form-group col-md-4'>
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

								<div className='form-group col-md-4'>
									<label className=''>Can Be Shipped?</label>
									<select
										onChange={handleChange("shipping")}
										className='form-control'
									>
										<option>Please select / Required*</option>
										<option value='0'>No</option>
										<option value='1'>Yes</option>
									</select>
								</div>
							</div>
							<div className='row'>
								<div className='form-group col-md-5 mx-auto my-5 '>
									<label className=''>
										Loyalty Points For Purchasing 1 Item
									</label>
									<input
										onChange={handleChange("loyaltyPoints")}
										type='number'
										className='form-control'
										value={values.loyaltyPoints}
										placeholder='Required'
										required
									/>
								</div>
								{allProducts && allProducts.length > 0 && (
									<div className='form-group col-md-5 mx-auto my-5 '>
										<label>Related Products</label>
										<Select
											mode='multiple'
											style={{ width: "100%" }}
											placeholder='Please Select Related Products'
											value={values.relatedProducts}
											onChange={(value) =>
												setValues({ ...values, relatedProducts: value })
											}
										>
											{allProducts &&
												allProducts.map((product, i) => {
													return (
														<Option key={i} value={product._id}>
															{product.productName}
														</Option>
													);
												})}
										</Select>
									</div>
								)}
							</div>

							<div className='row'>
								<div className='col-md-6'>
									<div className='form-group' dir='ltr'>
										<label className=''>
											Add Description (Required In English)
										</label>
										<>
											<ReactQuill
												value={values.description1}
												onChange={handleEditorChange}
												modules={{
													toolbar: { container: toolbarOptions },
													clipboard: { matchVisual: false },
												}}
												onPaste={handlePaste}
											/>
										</>
									</div>
								</div>

								<div className='col-md-6'>
									<div className='form-group' dir='ltr'>
										<label className=''>إضافة الوصف (مطلوب)</label>
										<>
											<ReactQuill
												value={values.description1_Arabic}
												onChange={handleEditorChangeArabic}
												modules={{
													toolbar: { container: toolbarOptions },
													clipboard: { matchVisual: false },
												}}
												onPaste={handlePaste}
											/>
										</>
									</div>
								</div>
							</div>

							<hr />

							<button
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								className='btn btn-outline-primary mt-3 mb-3'
							>
								Update Product
							</button>
						</form>
					</div>
				</>
			)}
		</>
	);
};

export default UpdateProduct;
