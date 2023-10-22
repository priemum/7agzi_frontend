/** @format */

// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/index";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
	createSubcategory,
	getSubCategories,
	getCategories,
	cloudinaryUpload1,
} from "../apiAdmin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import ImageCard from "./ImageCard";
import UpdateSubcategory from "./UpdateSubcategory";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1rem",
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
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const AddSubcategory = ({
	chosenLanguage,
	SubcategoryMenu,
	setSubCategoryMenu,
}) => {
	const [SubcategoryName, setSubCategoryName] = useState("");
	const [SubcategoryName_Arabic, setSubCategoryName_Arabic] = useState("");
	// eslint-disable-next-line
	const [loading, setLoading] = useState("");
	// eslint-disable-next-line
	const [SubcategorySlug, setSubCategorySlug] = useState("");
	const [SubcategorySlug_Arabic, setSubCategorySlug_Arabic] = useState("");
	const [categoryId, setSubCategory_CategoryId] = useState("");
	const [allSubcategories, setAllSubCategories] = useState([]);
	const [allCategories, setAllCategories] = useState([]);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [addThumbnail, setAddThumbnail] = useState([]);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setSubCategoryName(e.target.value);
		setSubCategorySlug(e.target.value.split(" ").join("-"));
	};

	const handleChange3 = (e) => {
		setError("");
		setSubCategoryName_Arabic(e.target.value);
		setSubCategorySlug_Arabic(e.target.value.split(" ").join("-"));
	};

	const handleChange2 = (e) => {
		setSubCategory_CategoryId(e.target.value);
	};

	const gettingAllCategories = () => {
		getCategories(token, user._id).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllCategories(data);
			}
		});
	};

	const gettingAllSubcategories = () => {
		getSubCategories(token, user._id).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllSubCategories(
					data.map(
						(subcategory) =>
							subcategory.SubcategoryName.toLowerCase().replace(/\s/g, "") &&
							subcategory.SubcategoryName.toLowerCase()
								.replace(/\s/g, "")
								.concat(subcategory.categoryId)
					)
				);
			}
		});
	};

	useEffect(() => {
		gettingAllCategories();
		gettingAllSubcategories();
		// eslint-disable-next-line
	}, [SubcategoryName, SubcategorySlug]);

	var addedSubCategoryHelper =
		SubcategoryName &&
		categoryId &&
		SubcategoryName.toLowerCase().replace(/\s/g, "") &&
		SubcategoryName.toLowerCase().replace(/\s/g, "").concat(categoryId);

	let matchingSubCategory =
		allSubcategories.indexOf(addedSubCategoryHelper) !== -1;

	// console.log(matchingSubCategory, "El Logic");

	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingSubCategory) {
			return toast.error("This Subcategory and Category were added before.");
		}

		if (addThumbnail.length === 0) {
			return toast.error("Please add a thumbnail for this SubCategory.");
		}

		if (!SubcategoryName) {
			return toast.error("Please add a subcategory before creating.");
		}
		if (!categoryId) {
			return toast.error("Please choose a category");
		}
		setError("");
		setSuccess(false);
		// make request to api to create Category
		createSubcategory(user._id, token, {
			SubcategoryName,
			SubcategoryName_Arabic,
			SubcategorySlug,
			SubcategorySlug_Arabic,
			thumbnail: addThumbnail && addThumbnail.images,
			categoryId,
			belongsTo: user._id,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Subcategory was successfully Added.");
				setError("");
				setTimeout(function () {
					setSubCategoryName("");
					setSubCategoryName_Arabic("");
					setSubCategorySlug("");
					setSubCategorySlug_Arabic("");
					setSubCategory_CategoryId("");
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addThumbnail;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 1.1 * 1024 * 1024) {
					toast.error("The image should be 1 megabytes or less");
					return; // Exit the function early
				}
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

								setAddThumbnail({ ...addThumbnail, images: allUploadedFiles });
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

	const FileUploadThumbnail = () => {
		return (
			<>
				<ImageCard
					addThumbnail={addThumbnail}
					handleImageRemove={handleImageRemove}
					setAddThumbnail={setAddThumbnail}
					fileUploadAndResizeThumbNail={fileUploadAndResizeThumbNail}
				/>
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
				// eslint-disable-next-line
				const { images } = addThumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddThumbnail([]);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const newSubcategoryForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label className='text-muted'>Category Name</label>
				<select onChange={handleChange2} className='form-control'>
					<option>Please select a category</option>
					{allCategories &&
						allCategories.map((c, i) => {
							return (
								<option
									value={c._id}
									key={i}
									style={{ textTransform: "capitalize" }}
								>
									{chosenLanguage === "Arabic"
										? c.categoryName_Arabic
										: c.categoryName}
								</option>
							);
						})}
				</select>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Subcategory Name (English)</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange1}
					value={SubcategoryName}
					required
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>اسم الفئة الفرعية</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange3}
					value={SubcategoryName_Arabic}
					required
				/>
			</div>

			<button className='btn btn-outline-primary mb-3'>Add Subcategory</button>
		</form>
	);

	// eslint-disable-next-line
	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{SubcategoryName} is created</h3>;
		}
	};

	return (
		<AddSubcategoryWrapper>
			<div className='grid-container'>
				<div className=''>
					<div
						style={isActive(SubcategoryMenu, "AddSubCategory")}
						className='mx-auto menuItems'
						onClick={() => setSubCategoryMenu("AddSubCategory")}
					>
						<Link
							// style={isActive(categoryMenu, "AddCategory")}
							onClick={() => setSubCategoryMenu("AddSubCategory")}
							style={{
								color: SubcategoryMenu === "AddSubCategory" ? "white" : "",
							}}
							to={
								user.role === 5000
									? "/ecommerce/admin/dashboard?subcategory"
									: "/store/admin/ecommerce-integration?subcategory"
							}
						>
							<i className='fa-solid fa-sitemap mx-1'></i>
							{chosenLanguage === "Arabic"
								? "إضافة فئة فرعية جديدة"
								: "Add a new Subcategory"}
						</Link>
					</div>

					<div
						style={isActive(SubcategoryMenu, "UpdateSubcategory")}
						className='mx-auto menuItems my-3'
						onClick={() => setSubCategoryMenu("UpdateSubcategory")}
					>
						<Link
							// style={isActive(categoryMenu, "UpdateCategory")}
							style={{
								color: SubcategoryMenu === "UpdateSubcategory" ? "white" : "",
							}}
							onClick={() => setSubCategoryMenu("UpdateSubcategory")}
							to={
								user.role === 5000
									? "/ecommerce/admin/dashboard?update-subcategory"
									: "/store/admin/ecommerce-integration?update-subcategory"
							}
						>
							<i className='fa-solid fa-sitemap mx-1'></i>
							{chosenLanguage === "Arabic"
								? "تعديل فئة"
								: "Update a Subcategory"}
						</Link>
					</div>
				</div>

				{SubcategoryMenu === "AddSubCategory" ? (
					<div className='container-content'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'
						>
							{chosenLanguage === "Arabic"
								? "إضافة فئة فرعية جديدة"
								: "Add A New Subcategory"}
						</h3>
						<div className='row'>
							<div className='col-md-4 mx-auto'>
								<div className=''>{FileUploadThumbnail()}</div>
							</div>

							<div className='col-md-8 mx-auto my-auto'>
								{newSubcategoryForm()}
							</div>
						</div>
					</div>
				) : (
					<>
						<UpdateSubcategory chosenLanguage={chosenLanguage} />
					</>
				)}
			</div>
		</AddSubcategoryWrapper>
	);
};

export default AddSubcategory;

const AddSubcategoryWrapper = styled.div`
	overflow-x: hidden;
	/* background: #ededed; */
	margin-top: 20px;

	.grid-container {
		display: grid;
		grid-template-columns: 15% 75% !important;
		margin: auto;
		/* border: 1px solid red; */
		/* grid-auto-rows: minmax(60px, auto); */
	}

	.container-content {
		border: 2px solid lightgrey;
		padding: 20px;
		border-radius: 20px;
		background: white;
		margin: 0px 10px;
	}

	@media (max-width: 1400px) {
		background: white;
	}
`;
