/** @format */

// eslint-disable-next-line
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import { createCategory, cloudinaryUpload1, getCategories } from "../apiAdmin";
import { isAuthenticated } from "../../auth";
import ImageCard from "./ImageCard";
import Resizer from "react-image-file-resizer";
import { Link } from "react-router-dom";
import UpdateCategory from "./UpdateCategory";

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
			fontSize: "1.2rem",
			fontWeight: "bold",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const AddCategory = ({ chosenLanguage, categoryMenu, setCategoryMenu }) => {
	const [categoryName, setCategoryName] = useState("");
	const [categoryName_Arabic, setCategoryName_Arabic] = useState("");
	// eslint-disable-next-line
	const [loading, setLoading] = useState("");
	// eslint-disable-next-line
	const [categorySlug, setCategorySlug] = useState("");
	const [categorySlug_Arabic, setCategorySlug_Arabic] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [addThumbnail, setAddThumbnail] = useState([]);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setCategoryName(e.target.value);
		setCategorySlug(e.target.value.split(" ").join("-"));
	};

	const handleChange3 = (e) => {
		setError("");
		setCategoryName_Arabic(e.target.value);
		setCategorySlug_Arabic(e.target.value.split(" ").join("-"));
	};

	const gettingAllCategories = () => {
		getCategories(token, user._id).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllCategories(
					data.map(
						(category) =>
							category.categoryName.toLowerCase().replace(/\s/g, "") &&
							category.categoryName
								.toLowerCase()
								.replace(/\s/g, "")
								.concat(category.categoryId)
					)
				);
			}
		});
	};

	useEffect(() => {
		gettingAllCategories();
		// eslint-disable-next-line
	}, [categoryName, categorySlug]);

	let matchingCategory =
		allCategories.indexOf(categoryName.toLowerCase().replace(/\s/g, "")) !== -1;
	// console.log(matchingCategory, "El Logic");

	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingCategory) {
			return toast.error("This Category was added before.");
		}

		if (addThumbnail.length === 0) {
			return toast.error("Please add a thumbnail for this Category.");
		}

		if (!categoryName) {
			return toast.error("Please add a category name before creating.");
		}

		setError("");
		setSuccess(false);
		// make request to api to create Category
		createCategory(user._id, token, {
			categoryName,
			categoryName_Arabic,
			categorySlug,
			categorySlug_Arabic,
			thumbnail: addThumbnail && addThumbnail.images,
			belongsTo: user._id,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Category was successfully Added.");
				setError("");
				setTimeout(function () {
					setCategoryName("");
					setCategoryName_Arabic("");
					setCategorySlug("");
					setCategorySlug_Arabic("");
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

	const newCategoryForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "15px" }}
				>
					Category Name (English)
				</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange1}
					value={categoryName}
					required
				/>
			</div>

			<div className='form-group'>
				<label
					className='text-muted'
					style={{ fontWeight: "bold", fontSize: "15px" }}
				>
					اسم الفئة{" "}
				</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange3}
					value={categoryName_Arabic}
					required
				/>
			</div>

			<button className='btn btn-outline-primary mb-3'>Add Category</button>
		</form>
	);

	// eslint-disable-next-line
	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{categoryName} is created</h3>;
		}
	};

	return (
		<AddCategoryWrapper>
			<div className='grid-container'>
				<div className=''>
					<div
						style={isActive(categoryMenu, "AddCategory")}
						className='mx-auto menuItems'
						onClick={() => setCategoryMenu("AddCategory")}
					>
						<Link
							// style={isActive(categoryMenu, "AddCategory")}
							onClick={() => setCategoryMenu("AddCategory")}
							style={{
								color: categoryMenu === "AddCategory" ? "white" : "",
							}}
							to='#'
						>
							<i className='fa-solid fa-list mx-1 '></i>
							{chosenLanguage === "Arabic"
								? "إضافة فئة جديدة"
								: "Add a new Category"}
						</Link>
					</div>

					<div
						style={isActive(categoryMenu, "UpdateCategory")}
						className='mx-auto menuItems my-3'
						onClick={() => setCategoryMenu("UpdateCategory")}
					>
						<Link
							// style={isActive(categoryMenu, "UpdateCategory")}
							style={{
								color: categoryMenu === "UpdateCategory" ? "white" : "",
							}}
							onClick={() => setCategoryMenu("UpdateCategory")}
							to='#'
						>
							<i className='fa-solid fa-list mx-1'></i>
							{chosenLanguage === "Arabic" ? "تعديل فئة" : "Update a Category"}
						</Link>
					</div>
				</div>
				{categoryMenu === "AddCategory" ? (
					<div className='container-wrapper'>
						<h3
							style={{ color: "#009ef7", fontWeight: "bold" }}
							className='mt-1 mb-3 text-center'
						>
							{chosenLanguage === "Arabic"
								? "إضافة فئة جديدة"
								: "Add A New Category"}
						</h3>
						<div className='row'>
							<div className='col-md-4 mx-auto'>
								<div className=''>{FileUploadThumbnail()}</div>
							</div>

							<div className='col-md-8 mx-auto my-auto'>
								{newCategoryForm()}
							</div>
						</div>
					</div>
				) : (
					<>
						{categoryMenu === "UpdateCategory" ? (
							<UpdateCategory
								chosenLanguage={chosenLanguage}
								categoryMenu={categoryMenu}
								setCategoryMenu={setCategoryMenu}
							/>
						) : null}
					</>
				)}
			</div>
		</AddCategoryWrapper>
	);
};

export default AddCategory;

const AddCategoryWrapper = styled.div`
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

	.container-wrapper {
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
