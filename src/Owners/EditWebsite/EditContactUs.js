import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {createContact, getContacts} from "../apiOwner";
import {isAuthenticated} from "../../auth";
import {toast} from "react-toastify";

const EditContactUs = () => {
	//Adding Variables
	const [business_hours, setBusinessHours] = useState("");
	const [business_hours_Arabic, setBusinessHours_Arabic] = useState("");
	const [address, setAddress] = useState("");
	const [address_Arabic, setAddress_Arabic] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");

	const [header_1, setHeader1] = useState("");
	const [header_1_Arabic, setHeader1_Arabic] = useState("");
	const [description_1, setDescription1] = useState("");
	const [description_1_Arabic, setDescription1_Arabic] = useState("");
	// eslint-disable-next-line
	const [allContacts, setAllContacts] = useState([]);

	// eslint-disable-next-line
	const {user, token} = isAuthenticated();

	const gettingAllContacts = () => {
		getContacts(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllContacts(data[data.length - 1]);
				setHeader1(data[data.length - 1] && data[data.length - 1].header_1);
				setBusinessHours(
					data[data.length - 1] && data[data.length - 1].business_hours
				);
				setBusinessHours_Arabic(
					data[data.length - 1] && data[data.length - 1].business_hours_Arabic
				);
				setAddress(data[data.length - 1] && data[data.length - 1].address);
				setAddress_Arabic(
					data[data.length - 1] && data[data.length - 1].address_Arabic
				);
				setPhone(data[data.length - 1] && data[data.length - 1].phone);
				setEmail(data[data.length - 1] && data[data.length - 1].email);

				setHeader1_Arabic(
					data[data.length - 1] && data[data.length - 1].header_1_Arabic
				);
				setDescription1(
					data[data.length - 1] && data[data.length - 1].description_1
				);
				setDescription1_Arabic(
					data[data.length - 1] && data[data.length - 1].description_1_Arabic
				);
			}
		});
	};

	useEffect(() => {
		gettingAllContacts();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();

		createContact(user._id, token, {
			address,
			address_Arabic,
			email,
			phone,
			business_hours,
			business_hours_Arabic,
			header_1,
			header_1_Arabic,
			description_1,
			description_1_Arabic,
			belongsTo: user._id,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Contact Us was successfully Added.");

				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const newContactForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='row'>
				<div className='col-md-5 mx-auto'>
					<label className='text-muted'>Add Business Hours</label>
					<input
						type='text'
						className='form-control'
						onChange={(e) => setBusinessHours(e.target.value)}
						value={business_hours}
						placeholder='e.g. (8:00 am to 8:00 pm)/ Closed on (Satudays & Mondays)'
						required
					/>
				</div>
				{/* <div className='col-md-5 mx-auto'>
					<label className='text-muted'>أضف ساعات العمل</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange2}
						value={business_hours_Arabic}
						required
					/>
				</div> */}
				<div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>Add Store Address</label>
					<input
						type='text'
						className='form-control'
						onChange={(e) => setAddress(e.target.value)}
						value={address}
						placeholder='e.g. (123 main street)'
						required
					/>
				</div>
				{/* <div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>أضف عنوان المتجر</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange4}
						value={address_Arabic}
						required
					/>
				</div> */}

				<div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>Phone</label>
					<input
						type='text'
						className='form-control'
						onChange={(e) => setPhone(e.target.value)}
						value={phone}
						placeholder='should be digits only'
						required
					/>
				</div>
				<div className='col-md-5 mx-auto mt-3'>
					<label className='text-muted'>Email</label>
					<input
						type='text'
						className='form-control'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						placeholder='email address'
						required
					/>
				</div>
			</div>
			<div className='form-group mt-4'>
				<label className='text-muted'>Add Header For Contact Us Page</label>
				<input
					type='text'
					className='form-control'
					onChange={(e) => setHeader1(e.target.value)}
					value={header_1}
					placeholder='e.g. (Your queries are important to us)'
					required
				/>
			</div>
			{/* <div className='form-group'>
				<label className='text-muted'>أضف عنوان لصفحة اتصل بنا</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange8}
					value={header_1_Arabic}
					required
				/>
			</div> */}
			<div className='form-group'>
				<label className='text-muted'>Add Description For The Header</label>
				<textarea
					rows='8'
					type='text'
					className='form-control'
					onChange={(e) => setDescription1(e.target.value)}
					value={description_1}
					placeholder='just describe the header you added...'
					required
				/>
			</div>
			{/* <div className='form-group'>
				<label className='text-muted'>أضف وصفًا للعنوان</label>
				<textarea
					rows='8'
					type='text'
					className='form-control'
					onChange={handleChange10}
					value={description_1_Arabic}
					required
				/>
			</div> */}

			<button className='btn btn-outline-primary mb-3'>
				Submit Contact us Changes
			</button>
		</form>
	);

	return (
		<EditContactUsWrapper>
			<div className='col-md-9 mx-auto formWrapper'>{newContactForm()}</div>
		</EditContactUsWrapper>
	);
};

export default EditContactUs;

const EditContactUsWrapper = styled.div`
	overflow: hidden;
	margin-top: 50px;

	.formWrapper {
		background-color: white;
		padding: 15px;
		border-radius: 10px;
	}
`;
