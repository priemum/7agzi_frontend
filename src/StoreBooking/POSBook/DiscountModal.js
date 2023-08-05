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
				title='إضافة خصم نقدي (جنيه مصري)'
				open={modalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div>
					<label>إضافة خصم نقدي (جنيه مصري)</label>
					<div>
						<input
							type='number'
							className='form-control '
							value={discountCash}
							onChange={(e) => setDiscountCash(e.target.value)}
							placeholder='إضافة خصم نقدي (جنيه مصري)'
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default DiscountModal;
