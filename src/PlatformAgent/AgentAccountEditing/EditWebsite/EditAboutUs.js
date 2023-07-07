import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../../auth";
import { cloudinaryUpload1, createAbout, getAbouts } from "../apiOwner";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import ImageCard from "./ImageCard";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	["bold", "italic", "underline", "strike", { color: [] }],
	[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
	["link", "image", "video"],
	["clean"],
];

const EditAboutUs = ({ ownerId }) => {
	//Adding Variables
	const [header_1, setHeader1] = useState("");
	const [header_1_OtherLanguage, setHeader1_OtherLanguage] = useState("");
	const [description_1, setDescription1] = useState("");
	const [description_1_OtherLanguage, setDescription1_OtherLanguage] =
		useState("");
	const [allAbouts, setAllAbouts] = useState([]);
	const [addThumbnail, setAddThumbnail] = useState([]);

	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	const gettingAllAbouts = () => {
		getAbouts(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data, "data");
				setAllAbouts(data[data.length - 1]);
				setHeader1(data[data.length - 1] && data[data.length - 1].header_1);
				setHeader1_OtherLanguage(
					data[data.length - 1] && data[data.length - 1].header_1_OtherLanguage
				);
				setDescription1(
					data[data.length - 1] && data[data.length - 1].description_1
				);
				setDescription1_OtherLanguage(
					data[data.length - 1] &&
						data[data.length - 1].description_1_OtherLanguage
				);

				setAddThumbnail(
					data && data[data.length - 1]
						? {
								images: data[data.length - 1].thumbnail,
						  }
						: []
				);
			}
		});
	};

	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addThumbnail;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 300 * 1024) {
					// file size is in bytes
					alert("File size should be less than 300kb");
					continue; // skip this file
				}
				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(ownerId, token, { image: uri })
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
				const { images } = addThumbnail;
				setAddThumbnail([]);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {}, 1000);
			});
	};

	useEffect(() => {
		gettingAllAbouts();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = () => {
		if (!header_1) {
			return toast.error("Please add a header");
		}
		if (!description_1) {
			return toast.error("Please add a description for the header");
		}

		if (addThumbnail.length === 0) {
			return toast.error("Please add a thumbnail image");
		}

		createAbout(ownerId, token, {
			header_1,
			header_1_OtherLanguage,
			description_1,
			description_1_OtherLanguage,
			thumbnail:
				addThumbnail && addThumbnail.images !== undefined
					? addThumbnail && addThumbnail.images
					: allAbouts && allAbouts.thumbnail,

			belongsTo: ownerId,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("About Us was successfully Added.");
				setTimeout(function () {
					setAddThumbnail([]);
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	function handleEditorChange(content, delta, source, editor) {
		const html = editor.getHTML();
		setDescription1(html);
	}

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

	return (
		<EditAboutUsWrapper>
			<div className='row col-md-9'>
				<div className='col-md-6'>
					<ImageCard
						addThumbnail={addThumbnail}
						handleImageRemove={handleImageRemove}
						setAddThumbnail={setAddThumbnail}
						fileUploadAndResizeThumbNail={fileUploadAndResizeThumbNail}
					/>
				</div>
				<div className='col-md-6 pt-5'>
					<div>
						<label>"About us" Header</label>
						<input
							className='form-control'
							type='text'
							placeholder='Fill In Your Main Header'
							value={header_1}
							onChange={(e) => {
								setHeader1(e.target.value);
							}}
						/>
					</div>

					<div className='mt-4'>
						<label>"About us" Description</label>
						<ReactQuill
							value={description_1}
							placeholder='Fill in a description about your business'
							onChange={handleEditorChange}
							modules={{
								toolbar: { container: toolbarOptions },
								clipboard: { matchVisual: false },
							}}
							onPaste={handlePaste}
						/>
					</div>
				</div>
				<div className='col-md-6 mx-auto'>
					<button
						className='btn btn-outline-success my-3 btn-block'
						onClick={clickSubmit}
						style={{ fontWeight: "bold", fontSize: "1.2rem" }}
					>
						Submit About us changes
					</button>
				</div>
			</div>
		</EditAboutUsWrapper>
	);
};

export default EditAboutUs;

const EditAboutUsWrapper = styled.div`
	overflow: hidden;
	margin-left: 230px;
	margin-top: 50px;

	.row {
		background-color: white;
		min-height: 600px;
		padding: 10px;
	}

	label {
		font-weight: bolder;
		font-size: 1.1rem;
	}

	.ql-container {
		border: 1px solid lightgrey;
		min-height: 200px;
	}
`;
