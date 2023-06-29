import React from "react";
import styled from "styled-components";
import ImageCard from "./ImageCard";

const AddEmpSection1 = ({
	addThumbnail,
	handleImageRemove,
	setAddThumbnail,
	fileUploadAndResizeThumbNail,
	values,
	setValues,
}) => {
	return (
		<AddEmpSection1Wrapper>
			<div className='row mx-auto'>
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
						<label>Employee Name</label>
						<input
							className='form-control'
							type='text'
							placeholder='Fill In Stylist Full Name'
							value={values.employeeName}
							onChange={(e) => {
								setValues({ ...values, employeeName: e.target.value });
							}}
						/>
					</div>
					<div className='mt-3'>
						<label>Employee Name (Arabic)</label>
						<input
							className='form-control'
							type='text'
							placeholder='Fill In Stylist Full Name In Arabic'
							value={values.employeeNameOtherLanguage}
							onChange={(e) => {
								setValues({
									...values,
									employeeNameOtherLanguage: e.target.value,
								});
							}}
						/>
					</div>
					<div className='mt-4'>
						<label>Employee Phone #</label>
						<input
							className='form-control'
							type='number'
							placeholder='Fill In Stylist Phone # (Numbers Only)'
							value={values.employeePhone}
							onChange={(e) => {
								setValues({ ...values, employeePhone: e.target.value });
							}}
						/>
					</div>
				</div>
			</div>
		</AddEmpSection1Wrapper>
	);
};

export default AddEmpSection1;

const AddEmpSection1Wrapper = styled.div`
	overflow: hidden;

	.row {
		background-color: white;
		padding: 10px;
	}

	label {
		font-weight: bolder;
		font-size: 1.1rem;
	}

	.btn {
		margin-left: 350px;
		cursor: pointer;
	}
`;
