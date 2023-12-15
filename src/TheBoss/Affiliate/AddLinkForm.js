import React from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	["bold", "italic", "underline", "strike", { color: [] }],
	[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
	["link", "image", "video"],
	["clean"],
];

const AddLinkForm = ({
	handleSubmit,
	chosenLanguage,
	FileUploadImages,
	values,
	setValues,
	handleImageRemove,
	handleChange,
}) => {
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

	return (
		<AddLinkFormWrapper>
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
				<div className='row'>
					<div className='form-group col-md-6 mx-auto '>
						<label className=''>Product Name</label>
						<input
							onChange={handleChange("productName")}
							type='text'
							className='form-control'
							value={values.productName}
							placeholder='Required'
							required
						/>
					</div>

					<div className='form-group col-md-6 mx-auto '>
						<label className=''>Category</label>
						<input
							onChange={handleChange("category")}
							type='text'
							className='form-control'
							value={values.category}
							placeholder='Required'
							required
						/>
					</div>

					<div className='form-group col-md-6 mx-auto mt-4'>
						<label className=''>Price</label>
						<input
							onChange={handleChange("price")}
							type='text'
							className='form-control'
							value={values.price}
							placeholder='Required'
							required
						/>
					</div>
					<div className='form-group col-md-6 mx-auto mt-4'>
						<label className=''>Affiliate Link</label>
						<input
							onChange={handleChange("affiliateLink")}
							type='text'
							className='form-control'
							value={values.affiliateLink}
							placeholder='Required'
							required
						/>
					</div>
				</div>

				<div className='row'>
					<div className='form-group col-md-2 mt-3'>
						<div className='form-group'>
							<label className='text-muted'>Gender</label>
							<select
								onChange={(e) =>
									setValues({ ...values, gender: e.target.value })
								}
								className='form-control'
							>
								<option value=''>Select a gender</option>
								<option value='men'>For Men</option>
								<option value='women'>For Women</option>
								<option value='all'>For All Genders</option>
							</select>
						</div>
					</div>
					<div className='form-group col-md-2 mt-3'>
						<label className=''>Activate Product</label>
						<select
							onChange={handleChange("activeProduct")}
							className='form-control'
						>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>

					<div className='form-group col-md-2 mt-3'>
						<label className=''>Can Be Shipped?</label>
						<select
							onChange={handleChange("shipping")}
							className='form-control'
						>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>

					<div className='form-group col-md-2 mt-3'>
						<label className=''>Currency</label>
						<select
							onChange={handleChange("currency")}
							className='form-control'
						>
							<option>Please select</option>
							<option value='USD'>USD</option>
							<option value='EGP'>EGP</option>
						</select>
					</div>

					<div className='form-group col-md-2 mt-3'>
						<label className=''>Country</label>
						<select onChange={handleChange("country")} className='form-control'>
							<option>Please select</option>
							<option value='USA'>USA</option>
							<option value='Egypt'>Egypt</option>
						</select>
					</div>

					<div className='form-group col-md-2 mt-3'>
						<label className=''>Source</label>
						<select onChange={handleChange("source")} className='form-control'>
							<option>Please select</option>
							<option value='Amazon'>Amazon</option>
							<option value='AliBaba'>Ali Baba</option>
						</select>
					</div>
				</div>
				<div className=''>
					<div className='form-group'>
						<label className=''>Add Description</label>
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

				<div className='mx-auto text-center col-md-6'>
					<button
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className='btn btn-outline-primary mt-3 text-center btn-block'
					>
						Add Affiliate Product
					</button>
				</div>
			</form>
		</AddLinkFormWrapper>
	);
};

export default AddLinkForm;

const AddLinkFormWrapper = styled.div`
	select {
		font-size: 13px;
	}
`;
