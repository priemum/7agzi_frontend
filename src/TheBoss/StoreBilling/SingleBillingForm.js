import React, { useState } from "react";
import styled from "styled-components";
import { retriggerPayment } from "../../apiCore";
import { toast } from "react-toastify";
import StoredCardInfo from "../../Owners/Billing/StoredCardInfo";
import { updateSharePaidStatus } from "../apiBoss";

const SingleBillingForm = ({
	store,
	data,
	setData,
	token,
	user,
	allAppointmentsNotPaid,
	setChosenStore,
	detailsSchedules,
}) => {
	const [customizeClicked, setCustomizeClicked] = useState(null);
	const [customizedAmount, setCustomizedAmount] = useState("");

	var theIndexOfAppointmentsNotPaid =
		allAppointmentsNotPaid &&
		allAppointmentsNotPaid.map((ii) => ii._id).indexOf(store.belongsTo._id);

	const handleChange = (e) => {
		setCustomizeClicked(e.target.value === "yes");
	};

	var modifiedSchedulesDetails =
		detailsSchedules &&
		detailsSchedules.map((i) => {
			return {
				_id: i._id,
			};
		});

	console.log(modifiedSchedulesDetails, "modifiedSchedulesDetails");

	return (
		<SingleBillingFormWrapper>
			<div className='col-md-8 mx-auto platformShare mt-5'>
				<div onBlur={() => setData({ ...data, error: "" })}>
					{data && data.clientToken ? (
						<div className=' col-md-12'>
							<h3>
								Please be noted that you will instantly charge the owner of{" "}
								<strong>{store.addStoreName}</strong>{" "}
								<strong style={{ color: "red" }}>
									{allAppointmentsNotPaid &&
										allAppointmentsNotPaid[theIndexOfAppointmentsNotPaid] &&
										allAppointmentsNotPaid[theIndexOfAppointmentsNotPaid]
											.totalOnlineServicesFees}{" "}
									EGP
								</strong>{" "}
								which is equivalent to{" "}
								<strong style={{ color: "darkgreen" }}>
									$
									{allAppointmentsNotPaid &&
										allAppointmentsNotPaid[theIndexOfAppointmentsNotPaid] &&
										Number(
											Number(
												allAppointmentsNotPaid[theIndexOfAppointmentsNotPaid]
													.totalOnlineServicesFees
											) / 32
										).toFixed(2)}{" "}
								</strong>
								.
							</h3>

							<h3>
								{" "}
								<strong>Would you like to customize this amount?</strong>{" "}
							</h3>

							<div className='form-check form-check-inline'>
								<input
									className='form-check-input'
									type='radio'
									name='customize'
									id='yes'
									value='yes'
									checked={customizeClicked === true}
									onChange={handleChange}
								/>
								<label className='form-check-label' htmlFor='yes'>
									Yes
								</label>
							</div>

							<div className='form-check form-check-inline'>
								<input
									className='form-check-input'
									type='radio'
									name='customize'
									id='no'
									value='no'
									checked={customizeClicked === false}
									onChange={handleChange}
								/>
								<label className='form-check-label' htmlFor='no'>
									No
								</label>
							</div>

							{customizeClicked ? (
								<div className='col-md-8 my-4'>
									<label>
										Fill In The Desired Amount in{" "}
										<strong style={{ color: "green", fontSize: "1.1rem" }}>
											DOLLAR
										</strong>{" "}
									</label>
									<input
										type='number'
										className='form-control'
										placeholder='amount should be in dollars'
										value={customizedAmount}
										onChange={(e) => setCustomizedAmount(e.target.value)}
									/>
								</div>
							) : null}

							<div className='col-md-6 platformShare mt-5'>
								<div
									className='mt-4'
									style={{
										fontSize: "1.2rem",
										fontWeight: "bolder",
										color: "black",
									}}
								>
									<div>
										<div>
											<StoredCardInfo
												user={store.belongsTo}
												token={token}
												paymentMethodToken={store.belongsTo.platFormShareToken}
											/>
										</div>
									</div>
								</div>
							</div>

							<button
								onClick={() => {
									// Adjust the amount according to your requirement
									const paymentData = {
										amount: !customizeClicked
											? allAppointmentsNotPaid &&
											  allAppointmentsNotPaid[theIndexOfAppointmentsNotPaid] &&
											  Number(
													Number(
														allAppointmentsNotPaid[
															theIndexOfAppointmentsNotPaid
														].totalOnlineServicesFees
													)
											  ).toFixed(2)
											: Number(customizedAmount), // Replace 30 with the amount you want to charge the customer

										paymentMethodToken: "", //Should add payment method token for the user
									};

									retriggerPayment(store.belongsTo._id, token, paymentData)
										.then((response) => {
											if (response.success) {
												toast.success(
													"You have successfully recharged your account!"
												);

												updateSharePaidStatus(
													user._id,
													token,
													modifiedSchedulesDetails
												).then((data) => {
													if (data.error) {
														console.log(data.error);
													} else {
														console.log("Updted");
													}
												});

												setTimeout(() => {
													setChosenStore("");
												}, 3000);
											} else {
												toast.error(
													"Charge Failed. Please check your card details and balance."
												);
											}
										})
										.catch((error) => {
											console.error("Payment error:", error);
											toast.error(
												"There was a problem processing your payment."
											);
										});
								}}
								className='btn btn-info btn-block my-2 col-md-8 mx-auto'
							>
								Charge Store With Amount{" "}
								<strong className='ml-2' style={{ fontSize: "1.5rem" }}>
									$
									{!customizeClicked
										? allAppointmentsNotPaid &&
										  allAppointmentsNotPaid[theIndexOfAppointmentsNotPaid] &&
										  Number(
												Number(
													allAppointmentsNotPaid[theIndexOfAppointmentsNotPaid]
														.totalOnlineServicesFees
												) / 32
										  ).toFixed(2)
										: Number(customizedAmount)}
								</strong>
							</button>
						</div>
					) : null}
				</div>
			</div>
		</SingleBillingFormWrapper>
	);
};

export default SingleBillingForm;

const SingleBillingFormWrapper = styled.div``;
