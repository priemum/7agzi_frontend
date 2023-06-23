import React from "react";
import styled from "styled-components";
import { updateAgentByBoss } from "../apiBoss";
import { toast } from "react-toastify";

const AgentMoreDetails = ({
	values,
	showMoreDetails,
	setShowMoreDetails,
	user,
	token,
	setSelectedAgent,
	setValues,
}) => {
	console.log(values, "values AgentMoreDetails");

	const handleSubmit = (e) => {
		e.preventDefault();
		updateAgentByBoss(user._id, values._id, token, {
			name: values.name,
			password: values.password,
			email: values.email,
			phone: values.phone,
			agentOtherData: values.agentOtherData,
			activeAgent: values.activeAgent,
			agentPaid: values.agentPaid ? true : false,
			agentPaidPro: values.agentPaidPro ? true : false,
		}).then((data) => {
			if (data.error) {
				// console.log(data.error);
				alert(data.error);
			} else {
				toast.success("Agent Successfully Updated");
				setSelectedAgent("");
				setShowMoreDetails(false);
				setValues("");
				setTimeout(() => {
					window.location.reload(false);
				}, 1500);
			}
		});
	};
	return (
		<AgentMoreDetailsWrapper>
			{!showMoreDetails ? (
				<div
					onClick={() => {
						setShowMoreDetails(true);
					}}
					className='showMoreDetails'
				>
					{" "}
					<strong>Show More Details....</strong>{" "}
				</div>
			) : (
				<div
					onClick={() => {
						setShowMoreDetails(false);
					}}
					className='showMoreDetails'
				>
					{" "}
					<strong>Back....</strong>{" "}
				</div>
			)}

			{showMoreDetails ? (
				<div className=' mt-3'>
					<div className='row'>
						{values &&
						values.agentOtherData &&
						values.agentOtherData.idImage &&
						values.agentOtherData.idImage[0] &&
						values.agentOtherData.idImage[0].url ? (
							<div className='col-md-6 mx-auto my-2'>
								<label style={{ fontWeight: "bold", fontSize: "20px" }}>
									Agent <strong>{values.name}</strong> ID Image
								</label>
								<br />
								<img
									src={
										values.agentOtherData &&
										values.agentOtherData.idImage[0].url
									}
									alt='NoIdImage'
									width='50%'
									style={{ objectFit: "cover" }}
								/>
							</div>
						) : null}

						{values &&
						values.agentOtherData &&
						values.agentOtherData.personalImage &&
						values.agentOtherData.personalImage[0] &&
						values.agentOtherData.personalImage[0].url ? (
							<div className='col-md-6 mx-auto my-2'>
								<label style={{ fontWeight: "bold", fontSize: "20px" }}>
									Agent <strong>{values.name}</strong> Personal Photo
								</label>
								<br />
								<img
									src={
										values.agentOtherData &&
										values.agentOtherData.personalImage[0].url
									}
									alt='NoIdImage'
									width='50%'
									style={{ objectFit: "cover" }}
								/>
							</div>
						) : null}

						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>Country</label>
							<input
								type='text'
								name='storeAddress'
								value={
									values.agentOtherData && values.agentOtherData.agentCountry
								}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											agentCountry: e.target.value,
										},
									});
								}}
								required
								placeholder='Agent Country'
							/>
						</div>
						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>Governorate</label>
							<input
								type='text'
								name='storeAddress'
								value={
									values.agentOtherData &&
									values.agentOtherData.agentGovernorate
								}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											agentGovernorate: e.target.value,
										},
									});
								}}
								required
								placeholder='Agent Governorate'
							/>
						</div>
						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>District</label>
							<input
								type='text'
								name='storeAddress'
								value={
									values.agentOtherData && values.agentOtherData.agentDistrict
								}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											agentDistrict: e.target.value,
										},
									});
								}}
								required
								placeholder='Agent District'
							/>
						</div>
						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>Address</label>
							<input
								type='text'
								name='storeAddress'
								value={
									values.agentOtherData && values.agentOtherData.agentAddress
								}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											agentAddress: e.target.value,
										},
									});
								}}
								required
								placeholder='Agent Address'
							/>
						</div>

						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>ID/ Passport #</label>
							<input
								type='text'
								name='storeAddress'
								value={
									values.agentOtherData &&
									values.agentOtherData.agentNationalIdNumber
								}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											agentNationalIdNumber: e.target.value,
										},
									});
								}}
								required
								placeholder='Agent National ID #'
							/>
						</div>

						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>Phone # 2</label>
							<input
								type='text'
								name='storeAddress'
								value={values.agentOtherData && values.agentOtherData.phone2}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											phone2: e.target.value,
										},
									});
								}}
								required
								placeholder='Optional... Phone 2'
							/>
						</div>

						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>
								Facebook Link (Optional)
							</label>
							<input
								type='text'
								name='storeAddress'
								value={values.agentOtherData && values.agentOtherData.fbLink}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											fbLink: e.target.value,
										},
									});
								}}
								required
								placeholder='Your Facebook Profile Link'
							/>
						</div>

						<div className='col-md-3 my-2'>
							<label style={{ fontWeight: "bold" }}>
								Instagram Profile Link (Optional)
							</label>
							<input
								type='text'
								name='storeAddress'
								value={
									values.agentOtherData && values.agentOtherData.instagramLink
								}
								onChange={(e) => {
									setValues({
										...values,
										agentOtherData: {
											...values.agentOtherData,
											instagramLink: e.target.value,
										},
									});
								}}
								required
								placeholder='Your Instagram Profile Link'
							/>
						</div>
					</div>
					<div className='my-2'>
						<label style={{ fontWeight: "bold" }}>
							Activate Agent? (
							{values.activeAgent ? (
								<span style={{ color: "green", fontWeight: "bolder" }}>
									ACTIVE AGENT
								</span>
							) : (
								<span style={{ color: "red", fontWeight: "bolder" }}>
									INACTIVE AGENT
								</span>
							)}
							)
						</label>

						<select
							onChange={(e) => {
								setValues({ ...values, activeAgent: e.target.value });
							}}
						>
							<option value='Please Select'>Please Select </option>
							<option value={true}>Activate Agent</option>
							<option value={false}>Deactivate Agent</option>
						</select>
					</div>

					<div className='ml-5 mt-5 mb-5'>
						<button className='btn btn-primary' onClick={handleSubmit}>
							Update Agent's Profile
						</button>
					</div>
				</div>
			) : null}
		</AgentMoreDetailsWrapper>
	);
};

export default AgentMoreDetails;

const AgentMoreDetailsWrapper = styled.div`
	.showMoreDetails {
		font-weight: bolder;
		text-transform: uppercase;
		font-size: 1rem;
		text-decoration: underline;
		cursor: pointer;
	}
`;
