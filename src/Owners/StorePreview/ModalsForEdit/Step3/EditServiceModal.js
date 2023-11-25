/** @format */

import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { updateService } from "../../../apiOwner";
import { isAuthenticated } from "../../../../auth";
import { toast } from "react-toastify";

const EditServiceModal = ({
	modalVisible,
	setModalVisible,
	language,
	pickedService,
	setPickedService,
}) => {
	const { user, token } = isAuthenticated();

	const updateRequiredService = () => {
		if (pickedService.activeService === false) {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Service?"
				)
			) {
				updateService(pickedService._id, user._id, token, pickedService).then(
					(data) => {
						if (data.error) {
							console.log(data.error);
						} else {
							toast.success("Service was successfully Updated.");
							setTimeout(function () {
								setModalVisible(false);
								window.location.reload(false);
							}, 2000);
						}
					}
				);
			}
		} else {
			updateService(pickedService._id, user._id, token, pickedService).then(
				(data) => {
					if (data.error) {
						console.log(data.error);
					} else {
						toast.success("Service was successfully Updated.");
						setTimeout(function () {
							setModalVisible(false);
							window.location.reload(false);
						}, 2000);
					}
				}
			);
		}
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
						{language === "Arabic" ? "ضبط الخدمة" : `Update Service`}
					</div>
				}
				open={modalVisible}
				onOk={() => {
					setModalVisible(false);
				}}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => {
					setModalVisible(false);
				}}
			>
				<div dir={language === "Arabic" ? "rtl" : "ltr"}>
					{language === "Arabic" ? (
						<div style={{ textAlign: "right", fontSize: "1.1rem" }}>
							<div>الخدمة: {pickedService.serviceNameOtherLanguage}</div>

							<div className='my-3'>
								<label>سعر الخدمة</label>
								<input
									type='number'
									className='form-control'
									value={pickedService.servicePriceDiscount}
									placeholder='سعر الخدمة'
									onChange={(e) => {
										setPickedService({
											...pickedService,
											servicePrice: Number(e.target.value),
											servicePriceDiscount: Number(e.target.value),
										});
									}}
								/>
							</div>
							<div className='my-3'>
								<label>وقت تقدير الخدمة</label>
								<input
									type='number'
									value={pickedService.serviceTime}
									className='form-control'
									placeholder='وقت التقدير'
									onChange={(e) => {
										setPickedService({
											...pickedService,
											serviceTime: Number(e.target.value),
										});
									}}
								/>
							</div>

							<div className='my-3'>
								<label>إلغاء تنشيط الخدمة</label>{" "}
								<select
									className='form-control'
									onChange={(e) => {
										setPickedService({
											...pickedService,
											activeService:
												Number(e.target.value) === 0 ? false : true,
										});
									}}
								>
									<option value=''>يرجى الاختيار</option>
									<option value='1'>تفعيل الخدمة</option>
									<option value='0'>إلغاء تنشيط الخدمة</option>
								</select>
							</div>
						</div>
					) : (
						<div>
							<div style={{ textTransform: "capitalize" }}>
								Service: <strong>{pickedService.serviceName}</strong>
							</div>

							<div className='mt-3'>
								<label>Service Price</label>
								<input
									type='number'
									className='form-control'
									placeholder='Service price'
									value={pickedService.servicePrice}
									onChange={(e) => {
										setPickedService({
											...pickedService,
											servicePrice: Number(e.target.value),
											servicePriceDiscount: Number(e.target.value),
										});
									}}
								/>
							</div>
							<div className='mt-3'>
								<label>Service Esitmated Time</label>
								<input
									type='number'
									className='form-control'
									placeholder='Estimated Time'
									value={pickedService.serviceTime}
									onChange={(e) => {
										setPickedService({
											...pickedService,
											serviceTime: Number(e.target.value),
										});
									}}
								/>
							</div>

							<div className='mt-3'>
								<label>Deativate Service</label>
								<select
									className='form-control'
									onChange={(e) => {
										setPickedService({
											...pickedService,
											activeService:
												Number(e.target.value) === 0 ? false : true,
										});
									}}
								>
									<option value=''>Please Select</option>
									<option value='1'>Active Service</option>
									<option value='0'>Inactive Service</option>
								</select>
							</div>
						</div>
					)}

					<div className='my-3 mx-auto text-center'>
						<button
							className='btn btn-info w-50'
							onClick={updateRequiredService}
						>
							{language === "Arabic" ? "تعديل الخدمة" : "Update Service"}
						</button>
					</div>
				</div>
			</Modal>
		</EditBannerWrapper>
	);
};

export default EditServiceModal;

const EditBannerWrapper = styled.div`
	z-index: 19000 !important;
`;
