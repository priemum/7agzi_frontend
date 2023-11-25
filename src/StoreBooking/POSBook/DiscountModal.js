import React from "react";
import { Modal } from "antd";

const DiscountModal = ({
	modalVisible,
	setModalVisible,
	discountCash,
	setDiscountCash,
}) => {
	const handleOk = () => {
		// Here you would typically handle the form submission,
		// maybe using something like Formik or the Form component from Antd
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	return (
		<div dir='rtl'>
			<Modal
				title='Discount'
				open={modalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div>
					<label>Discount Addition (1 means $1 to be deducted)</label>
					<div>
						<input
							type='number'
							className='form-control '
							value={discountCash}
							onChange={(e) => setDiscountCash(e.target.value)}
							placeholder='Add a discount'
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DiscountModal;
