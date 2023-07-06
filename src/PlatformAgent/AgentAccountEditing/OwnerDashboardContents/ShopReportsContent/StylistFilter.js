import React from "react";
import {Modal} from "antd";
import styled from "styled-components";

const StylistFilter = ({
	modalVisible,
	setModalVisible,
	orders,
	setFilteredStylistName,
	filteredStylistName,
}) => {
	const handleOk = () => {
		setModalVisible(false);
		// Add your logic for handling the filter here
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	const StylistsNames =
		orders && orders.map((i) => i.employees[0].employeeName);

	const uniqueStylists = [...new Set(StylistsNames)].sort((a, b) =>
		a.localeCompare(b)
	);

	const handleStylistChange = (e) => {
		setFilteredStylistName(e.target.value);
	};

	return (
		<StylistFilterWrapper>
			<Modal
				title='Stylist Filter'
				className='custom-modal'
				visible={modalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<label htmlFor='stylistSelect'>
					{" "}
					<strong>Select a Stylist:</strong>{" "}
				</label>
				<br />
				<select
					className='form-control'
					id='stylistSelect'
					onChange={handleStylistChange}
					value={filteredStylistName}
					style={{fontSize: "14px"}}
				>
					<option value=''>Select All</option>
					{uniqueStylists.map((stylist, index) => (
						<option key={index} value={stylist}>
							{stylist}
						</option>
					))}
				</select>
			</Modal>
		</StylistFilterWrapper>
	);
};

export default StylistFilter;

const StylistFilterWrapper = styled.div`
	.custom-modal {
		width: 60%;

		@media (max-width: 1200px) {
			width: 90%;
		}
	}
	label {
		font-weight: bold !important;
	}
`;
