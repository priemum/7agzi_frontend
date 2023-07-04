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

const AddEmpSection2 = ({ values, setValues, handleChange, language }) => {
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
		setValues({ ...values, description: html });
	}

	return (
		<AddEmpSection2Wrapper>
			<div>
				<div className='row'>
					<div className='form-group col-md-6 mx-auto mt-5'>
						<div>
							<label className=''>
								{language === "Arabic" ? "عنوان الموظف" : "Employee Address"}
							</label>
							<input
								onChange={handleChange("employeeAddress")}
								type='text'
								className='form-control'
								value={values.employeeAddress}
								placeholder={
									language === "Arabic"
										? "اختياري - عنوان المصفف"
										: "Optional - Stylist address"
								}
							/>
						</div>

						<div className='form-group mt-3'>
							<label className=''>
								{language === "Arabic"
									? "موقع عمل الموظف"
									: "Employee Working Location"}
							</label>
							<input
								onChange={handleChange("employeeWorkingAt")}
								type='text'
								className='form-control'
								value={values.employeeWorkingAt}
								placeholder={
									language === "Arabic"
										? "اختياري - عنوان مكان عمل المصفف"
										: "Optional - Stylist working address"
								}
							/>
						</div>

						<div className='form-group mt-3'>
							<label className=''>
								{language === "Arabic" ? "الموظف نشط؟" : "Active Employee?"}
							</label>
							<select
								onChange={handleChange("activeEmployee")}
								className='form-control'
							>
								<option>
									{language === "Arabic"
										? "الرجاء الاختيار / إجباري*"
										: "Please select / Required*"}
								</option>
								<option value='0'>{language === "Arabic" ? "لا" : "No"}</option>
								<option value='1'>
									{language === "Arabic" ? "نعم" : "Yes"}
								</option>
							</select>
						</div>
					</div>

					<div className='form-group col-md-6 mx-auto'>
						<p style={{ fontWeight: "bolder" }}>
							<span style={{ fontSize: "13.5px" }}>
								{language === "Arabic"
									? "اكتب قليلاً عن الموظف (على سبيل المثال: الشهادات، الهوايات، عدد سنوات الخبرة)."
									: "Write a little bit about the employee (e.g. certificates, hobbies, how many years of experience)."}
							</span>
							<br />
							{language === "Arabic"
								? "هذا الوصف سيكون مرئيًا للعملاء."
								: "This description will be visible to clients."}
						</p>

						<>
							<ReactQuill
								value={values.description}
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
			</div>
		</AddEmpSection2Wrapper>
	);
};

export default AddEmpSection2;

const AddEmpSection2Wrapper = styled.div`
	.row {
		background-color: white;
		padding: 10px;
	}

	.ql-container {
		border: 1px solid lightgrey;
		min-height: 300px;
	}

	.toolbarClassName,
	.editorClassName {
		padding: 10px;
	}

	.rdw-dropdown-wrapper {
		display: none;
	}
`;
