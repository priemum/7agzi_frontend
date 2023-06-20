import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const FormStep3 = ({
	isAuthenticated,
	updatedUser,
	NumberOfPointsForAwarding,
	applyPoints,
	alreadySetLoyaltyPointsManagement,
	chosenService,
	chosenDate,
	chosenServicePrice,
	chosenTipOtherAmount,
	chosenTips,
	chosenTime,
	pickedEmployee,
	ServiceTime_Duration,
	appointmentRange,
	FileUploadComments,
	setPhone,
	phone,
	scheduleComment,
	handleScheduleComment,
	onlineServices,
	TipsAmountFinal,
	discountedAmountFromLoyaltyPoints,
	email_phone_Check,
	handlePhone,
	setApplyPoints,
	setAddingNewPhone,
	email,
}) => {
	return (
		<FormStep3Wrapper>
			<div className='mx-auto mb-3 '>
				<span
					className='textResizeMain'
					style={{
						fontWeight: "lighter",
						fontSize: "1.3rem",
						color: "#32322b",
					}}
				>
					Please review your booking info before scheduling
				</span>
			</div>
			<div className='row' style={{textAlign: "left"}}>
				<div className=' col-md-5 my-auto  ml-3'>
					<div className='mb-2 '>
						<span
							className='dataPointsReview '
							style={{fontSize: "1.1rem", color: "black"}}
						>
							{" "}
							<strong> Stylist Name:</strong>{" "}
						</span>{" "}
						<span
							className='dataPointsReview'
							style={{
								color: "#00407f",
								fontSize: "1.1rem",
								fontWeight: "bold",
							}}
						>
							{pickedEmployee.employeeName}
						</span>
					</div>
					<div className='mb-2'>
						{chosenDate && (
							<React.Fragment>
								<span
									className='dataPointsReview'
									style={{fontSize: "1rem", color: "black"}}
								>
									{" "}
									<strong> Appointment Scheduled On Date:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview'
									style={{
										color: "#00407f",
										fontSize: "1rem",
										fontWeight: "bold",
									}}
								>
									{new Date(chosenDate).toLocaleDateString()}
								</span>
							</React.Fragment>
						)}
					</div>
					<div className='mb-2'>
						{chosenTime && (
							<React.Fragment>
								<span
									className='dataPointsReview'
									style={{fontSize: "1rem", color: "black"}}
								>
									{" "}
									<strong> Appointment Scheduled:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview'
									style={{
										color: "#00407f",
										fontSize: "1rem",
										fontWeight: "bold",
									}}
								>
									From {appointmentRange()} (
									{ServiceTime_Duration && ServiceTime_Duration.serviceTime}{" "}
									mins)
								</span>
							</React.Fragment>
						)}
					</div>

					<div className='mb-2'>
						{chosenService && chosenService !== "Select a Service" && (
							<React.Fragment>
								<span
									className='dataPointsReview'
									style={{fontSize: "1rem", color: "black"}}
								>
									{" "}
									<strong>Scheduled Service:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview'
									style={{
										color: "#00407f",
										fontSize: "1rem",
										fontWeight: "bold",
										extTransform: "capitalize !important",
									}}
								>
									{chosenService}
								</span>
							</React.Fragment>
						)}
					</div>
					<div className='mb-2'>
						{chosenServicePrice && (
							<React.Fragment>
								<span
									className='dataPointsReview'
									style={{fontSize: "1rem", color: "black"}}
								>
									{" "}
									<strong>Scheduled Service Price:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview'
									style={{
										color: "#00407f",
										fontSize: "1rem",
										fontWeight: "bold",
									}}
								>
									EGP {chosenServicePrice.servicePriceDiscount}
								</span>
							</React.Fragment>
						)}
					</div>

					<div className='mb-2'>
						{chosenService !== "Select a Service" &&
							chosenTips !== "Select a Tip" &&
							chosenDate &&
							chosenTime && (
								<React.Fragment>
									<span
										className='dataPointsReview'
										style={{fontSize: "1rem", color: "black"}}
									>
										{" "}
										<strong>Online Services:</strong>{" "}
									</span>{" "}
									<span
										className='dataPointsReview'
										style={{
											color: "#00407f",
											fontSize: "1rem",
											fontWeight: "bold",
										}}
									>
										EGP {Number(onlineServices) * 1}
									</span>
								</React.Fragment>
							)}
					</div>

					{chosenTips &&
						chosenTips !== "Please Select A Service First" &&
						chosenTips !== "Select a Tip" &&
						chosenTips !== "Other amount" &&
						chosenService !== "Select a Service" && (
							<React.Fragment>
								<span
									className='dataPointsReview'
									style={{fontSize: "1rem", color: "black"}}
								>
									{" "}
									<strong>Added Tip:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview'
									style={{
										color: "#00407f",
										fontSize: "1rem",
										fontWeight: "bold",
									}}
								>
									EGP{" "}
									{Number(
										Number(chosenTips / 100).toFixed(2) *
											Number(chosenServicePrice.servicePriceDiscount / 1)
									).toFixed(2)}
								</span>
							</React.Fragment>
						)}
					{chosenTipOtherAmount &&
						chosenService !== "Select a Service" &&
						chosenTips !== "Select a Tip" &&
						chosenTips === "Other amount" && (
							<React.Fragment>
								<span
									className='dataPointsReview'
									style={{fontSize: "1rem", color: "black"}}
								>
									{" "}
									<strong>Added Tip:</strong>{" "}
								</span>{" "}
								<span
									className='dataPointsReview'
									style={{
										color: "#00407f",
										fontSize: "1rem",
										fontWeight: "bold",
									}}
								>
									EGP {Number(chosenTipOtherAmount) * 1}
								</span>
							</React.Fragment>
						)}
					<hr />
					<div className='my-1'>
						{TipsAmountFinal >= 0 &&
							chosenService !== "Select a Service" &&
							chosenService &&
							chosenDate &&
							chosenTime && (
								<div>
									<span style={{fontSize: "1.2rem", color: "black"}}>
										{" "}
										<strong>Total:</strong>{" "}
									</span>{" "}
									{applyPoints && (
										<span
											style={{
												color: "#00407f",
												fontSize: "1.2rem",
												fontWeight: "bold",
											}}
										>
											<s
												style={{
													color: "red",
													marginRight: "20px",
													fontSize: "1.1rem",
												}}
											>
												EGP{" "}
												{Number(TipsAmountFinal) +
													Number(chosenServicePrice.servicePriceDiscount) +
													Number(onlineServices)}
												{"     "}
											</s>
											EGP{" "}
											{(
												(Number(TipsAmountFinal) +
													Number(chosenServicePrice.servicePriceDiscount) +
													Number(onlineServices)) *
												discountedAmountFromLoyaltyPoints
											).toFixed(2)}
										</span>
									)}
									{!applyPoints && (
										<span
											style={{
												color: "#00407f",
												fontSize: "1.2rem",
												fontWeight: "bold",
											}}
										>
											EGP{" "}
											{(
												Number(TipsAmountFinal) +
												Number(chosenServicePrice.servicePriceDiscount) +
												Number(onlineServices)
											).toFixed(2)}
										</span>
									)}
								</div>
							)}
					</div>
				</div>
				<div className='col-md-5 ml-3 mt-3'>
					{email_phone_Check() === "Phone" && (
						<div className='my-3'>
							<span style={{fontSize: "0.9rem", color: "black"}}>
								{" "}
								<strong>Your phone is:</strong>{" "}
							</span>{" "}
							<span
								style={{
									color: "#00407f",
									fontSize: "0.9rem",
									fontWeight: "bold",
								}}
							>
								{email}
							</span>
							<div style={{color: "grey", fontSize: "12px"}}>
								Would you like to change your phone?{" "}
								<Link
									to='#'
									onClick={() => {
										setAddingNewPhone(true);
										setPhone("");
									}}
								>
									"Click here"
								</Link>
							</div>
						</div>
					)}
					<div>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								color: "#00407f",
							}}
						>
							*Optional: Write a comment or upload a haircut photo.
						</label>
						<div className='mb-3'>{FileUploadComments()}</div>

						<textarea
							type='text'
							className='form-control '
							value={scheduleComment}
							onChange={handleScheduleComment}
							placeholder='If you have any further comments, Please add them here...'
							// autoFocus
							required
						/>
					</div>

					<div className='mt-2'>
						{email_phone_Check() === "Email" && (
							<React.Fragment>
								<label
									className='textResizeMain2'
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										color: "#00407f",
									}}
								>
									Phone
								</label>

								<input
									type='text'
									className='form-control '
									value={phone}
									onChange={handlePhone}
									placeholder='Please fill in your phone (**Required - DIGITS ONLY)'
									required
									minLength={9}
								/>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</FormStep3Wrapper>
	);
};

export default FormStep3;

const FormStep3Wrapper = styled.div``;
