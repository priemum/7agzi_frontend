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
	language,
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
						language={language}
					/>
				</div>
				<div className='col-md-6 pt-5'>
					<div>
						<label>
							{language === "Arabic" ? "اسم الموظف" : "Employee Name"}
						</label>
						<input
							className='form-control'
							type='text'
							placeholder={
								language === "Arabic"
									? "أدخل اسم الموظف بالكامل"
									: "Fill In Stylist Full Name"
							}
							value={values.employeeName}
							onChange={(e) => {
								setValues({ ...values, employeeName: e.target.value });
							}}
						/>
					</div>
					<div>
						<label>
							{language === "Arabic"
								? "اسم الموظف بالعربية"
								: "Employee Name (Arabic)"}
						</label>
						<input
							className='form-control'
							type='text'
							placeholder={
								language === "Arabic"
									? "أدخل اسم الموظف بالكامل بالعربية"
									: "Fill In Stylist Full Name In Arabic"
							}
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
						<label>
							{language === "Arabic" ? "رقم هاتف الموظف" : "Employee Phone #"}
						</label>
						<input
							className='form-control'
							type='number'
							placeholder={
								language === "Arabic"
									? "أدخل رقم هاتف الموظف (أرقام فقط)"
									: "Fill In Stylist Phone # (Numbers Only)"
							}
							value={values.employeePhone}
							onChange={(e) => {
								setValues({ ...values, employeePhone: e.target.value });
							}}
						/>
					</div>
					<div className='mt-4'>
						<label>Employee Gender</label>
						<select
							className='form-control'
							value={values.employeeGender}
							onChange={(e) => {
								setValues({ ...values, employeeGender: e.target.value });
							}}
						>
							<option value=''>Select Gender</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</select>
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
