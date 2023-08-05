import React from "react";
import { Modal } from "antd";

const UpdateChosenStylist = ({
	modalVisible,
	setModalVisible,
	allEmployees,
	newChosenEmployee,
	setNewChosenEmployee,
}) => {
	const handleOk = () => {
		// Here you would typically handle the form submission,
		// maybe using something like Formik or the Form component from Antd
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	console.log(newChosenEmployee, "newChosenEmployee");
	return (
		<div>
			<Modal
				title='Update Chosen Stylist'
				open={modalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div>
					<label>Update Stylist</label>
					<div>
						<select
							onChange={(e) => {
								setNewChosenEmployee(allEmployees[e.target.value]);
							}}
							// other props
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								paddingRight: "5px",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "90%",
								textTransform: "capitalize",
								fontSize: "0.9rem",
								boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}
						>
							{newChosenEmployee && newChosenEmployee.employeeName ? (
								<option className='items text-muted'>
									{newChosenEmployee.employeeName}
								</option>
							) : (
								<option className='items text-muted'>Please Select</option>
							)}
							{allEmployees &&
								allEmployees.map((emp, i) => {
									return (
										<option key={i} value={i} className='items'>
											{emp.employeeName}
										</option>
									);
								})}
						</select>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default UpdateChosenStylist;
