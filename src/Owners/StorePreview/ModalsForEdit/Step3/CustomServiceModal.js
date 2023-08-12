/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";

const CustomServiceModal = ({
	modalVisible,
	setModalVisible,
	language,
	chosenSetServicesBarbers,
	setChosenSetServicesBarbers,
	user,
}) => {
	const [newService, setNewService] = useState({
		serviceName: "",
		serviceNameOtherLanguage: "",
		customerType: "male",
		customerTypeOtherLanguage: "ذكر",
		servicePrice: "",
		servicePriceDiscount: "",
		serviceTime: "",
		serviceLoyaltyPoints: 10,
		serviceType: "package service",
		serviceDescription: "",
		serviceDescriptionOtherLanguage: "",
		belongsTo: user._id, // Assuming user is defined in a parent scope
		catchyPhrase: "",
		catchyPhraseOtherLanguage: "",
		bundleService: false,
		bundleServicesAdded: [],
	});

	const defaultService = {
		serviceName: "",
		serviceNameOtherLanguage: "",
		customerType: "male",
		customerTypeOtherLanguage: "ذكر",
		servicePrice: "",
		servicePriceDiscount: "",
		serviceTime: "",
		serviceLoyaltyPoints: 10,
		serviceType: "package service",
		serviceDescription: "",
		serviceDescriptionOtherLanguage: "",
		belongsTo: user._id, // Assuming user is defined in a parent scope
		catchyPhrase: "",
		catchyPhraseOtherLanguage: "",
		bundleService: false,
		bundleServicesAdded: [],
	};

	function convertToEnglishNumber(input) {
		const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
		let numberString = input.toString();
		arabicNumbers.forEach((num, i) => {
			const regex = new RegExp(num, "g");
			numberString = numberString.replace(regex, i);
		});
		return numberString;
	}

	const handleChangeServiceTime = (e) => {
		const englishNumber = convertToEnglishNumber(e.target.value);
		setNewService({
			...newService,
			serviceTime: englishNumber,
		});
	};

	const handleChangeServicePrice = (e) => {
		const englishNumber = convertToEnglishNumber(e.target.value);
		setNewService({
			...newService,
			servicePrice: englishNumber,
			servicePriceDiscount: englishNumber,
		});
	};

	const addCustomService = () => {
		setChosenSetServicesBarbers([...chosenSetServicesBarbers, newService]);
		setNewService(defaultService);
		setModalVisible(false);
	};

	return (
		<EditBannerWrapper dir={language === "Arabic" ? "rtl" : "ltr"}>
			<Modal
				width='100%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.3rem",
						}}
					>
						{language === "Arabic" ? "أضف خدمة أخرى" : `Add Custom Service`}
					</div>
				}
				open={modalVisible}
				onOk={() => {
					setNewService(defaultService);
					setModalVisible(false);
				}}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setNewService(defaultService);
					setModalVisible(false);
				}}
			>
				<div dir={language === "Arabic" ? "rtl" : "ltr"}>
					{language === "Arabic" ? (
						<div
							className='mb-3'
							style={{
								textAlign: "right",
								fontSize: "1rem",
								fontWeight: "bolder",
							}}
						>
							<div style={{ fontSize: "1.2rem", color: "darkred" }}>
								مهم جداً
							</div>
							<div className='mb-2'>
								سعر الخدمة: يجب أن يكون أرقام فقط، فلا تضف ج.م أو أي شيء آخر،
								فقط الأرقام من فضلك
							</div>
							<div>
								الوقت المتوقع للخدمة: يجب أن يكون أرقام فقط
								<br />
								يجب أن يكون الوقت المتوقع للخدمة بالدقائق (فإذا كانت خدمتك نصف
								ساعة، يجب أن تكتب أدناه "30" فقط والذي سيعني "30 دقيقة")
							</div>
						</div>
					) : (
						<div>
							<div>VERY IMPORTANT</div>
							<div>
								Service Price: should be digits only so don't add EGP or
								anything, just digits please
							</div>
							<div>
								Service Estimated Time: should be digits only
								<br />
								Service Estimated Time should be in minutes (so if your service
								is half an hour, you should type below "30" which will mean "30
								mins")
							</div>
						</div>
					)}
					{language === "Arabic" ? (
						<div style={{ textAlign: "right" }}>
							<div>
								<label>أضف اسم الخدمة</label>
								<br />
								<input
									type='text'
									className='form-control'
									placeholder='أضف اسم الخدمة'
									onChange={(e) => {
										setNewService({
											...newService,
											serviceName: e.target.value,
											serviceNameOtherLanguage: e.target.value,
										});
									}}
								/>
							</div>

							<div className='mt-3'>
								<label>إضافة سعر الخدمة (جنيه)</label>
								<br />
								<input
									type='number'
									className='form-control'
									placeholder='الأرقام فقط'
									onChange={handleChangeServicePrice}
								/>
							</div>

							<div className='mt-3'>
								<label>الوقت المقدر للخدمة (بالدقائق)</label>
								<br />
								<input
									type='number'
									className='form-control'
									placeholder='الوقت المقدر للخدمة (بالدقائق)'
									onChange={handleChangeServiceTime}
								/>
							</div>
						</div>
					) : (
						<div>
							<div>
								<label>Service Name</label>
								<br />
								<input
									type='text'
									className='form-control'
									placeholder='Please add service Name'
									onChange={(e) => {
										setNewService({
											...newService,
											serviceName: e.target.value,
											serviceNameOtherLanguage: e.target.value,
										});
									}}
								/>
							</div>

							<div>
								<label>Service Price</label>
								<br />
								<input
									type='number'
									className='form-control'
									placeholder='add price (Digits Only)'
									onChange={handleChangeServicePrice}
								/>
							</div>

							<div>
								<label>Service Estimated Time</label>
								<br />
								<input
									type='number'
									className='form-control'
									placeholder='Digits Only (Mins)'
									onChange={handleChangeServiceTime}
								/>
							</div>
						</div>
					)}

					<div className='my-3 mx-auto text-center'>
						<button className='btn btn-info w-50' onClick={addCustomService}>
							{language === "Arabic"
								? "أضف الخدمة الجديدة"
								: "Add The New Custom Service"}
						</button>
					</div>
				</div>
			</Modal>
		</EditBannerWrapper>
	);
};

export default CustomServiceModal;

const EditBannerWrapper = styled.div`
	z-index: 19000 !important;
`;
