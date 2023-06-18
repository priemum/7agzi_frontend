import React from "react";
import styled from "styled-components";

const FormStep2 = ({
	pickedEmployee,
	chosenDate,
	chosenTime,
	ServiceTime_Duration,
	chosenService,
	chosenServicePrice,
	chosenTips,
	chosenTipOtherAmount,
	handleChosenTipOtherAmount,
	handleChosenTips,
	TipsAmountFinal,
	appointmentRange,
	onlineServices,
	TipsValues,
	phone,
	setPhone,
	scheduledByUserName,
	setScheduledByUserName,
}) => {
	return (
		<FormStep2Wrapper>
			<React.Fragment>
				<div className='row'>
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
											textTransform: "capitalize",
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
										${chosenServicePrice.servicePriceDiscount}
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
											${Number(onlineServices) * 1}
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
										$
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
										${Number(chosenTipOtherAmount) * 1}
									</span>
								</React.Fragment>
							)}
					</div>

					<div className='col-md-5 mx-auto'>
						<div className='mt-4'>
							<label
								className='textResizeMain2'
								style={{
									fontWeight: "bold",
									fontSize: "1rem",
									color: "",
								}}
							>
								Client Phone
							</label>

							<input
								type='number'
								className='form-control '
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder='Please fill in client phone (**Required - DIGITS ONLY)'
								required
								minLength={9}
							/>
						</div>
						<div className='mt-4'>
							<label
								className='textResizeMain2'
								style={{
									fontWeight: "bold",
									fontSize: "1rem",
									color: "",
								}}
							>
								Client Name
							</label>

							<input
								type='text'
								className='form-control '
								value={scheduledByUserName}
								onChange={(e) => setScheduledByUserName(e.target.value)}
								placeholder='Please fill in your client name'
							/>
						</div>

						<div className='mt-4'>
							<label
								className='dataPointsReview'
								style={{
									fontWeight: "bold",
									fontSize: "1.05rem",
									color: "#32322b",
								}}
							>
								***Optional... Tips
							</label>
							<br />

							<select
								onChange={handleChosenTips}
								placeholder='Select a Tip'
								className='inputFields'
								style={{
									paddingTop: "12px",
									paddingBottom: "12px",
									paddingRight: "100px",
									// textAlign: "center",
									border: "#cfcfcf solid 1px",
									borderRadius: "10px",
									width: "75%",
									fontSize: "0.9rem",
									boxShadow: "1px 1px 1px 1px rgb(0,0,0,0.2)",
								}}
							>
								{TipsAmountFinal &&
								TipsAmountFinal !== "Select a Tip" &&
								chosenTips !== "Select a Tip" ? (
									<option className='items text-muted'>
										${TipsAmountFinal}
									</option>
								) : (
									<option className='items text-muted'>Select a Tip</option>
								)}
								{chosenService && chosenService !== "Select a Service" ? (
									<React.Fragment>
										{TipsValues.map((t, i) => (
											<option key={i} value={t} className='items'>
												{t}%
											</option>
										))}
										<option className='items text-muted'>Other amount</option>
									</React.Fragment>
								) : (
									<option className='items text-muted'>
										Please Select A Service First
									</option>
								)}
							</select>
							{chosenTips === "Other amount" &&
								chosenService !== "Select a Service" && (
									<div className='mt-3'>
										<label
											className='mr-3'
											style={{
												fontWeight: "lighter",
												fontSize: "0.8rem",
												color: "#660000",
												textShadow: "1px 2px 4px",
											}}
										>
											Please select desired $ amount
										</label>
										<input
											type='number'
											onChange={handleChosenTipOtherAmount}
											value={chosenTipOtherAmount}
											style={{borderRadius: "10px", textAlign: "center"}}
										/>
									</div>
								)}
						</div>
					</div>
				</div>
			</React.Fragment>
		</FormStep2Wrapper>
	);
};

export default FormStep2;

const FormStep2Wrapper = styled.div``;
