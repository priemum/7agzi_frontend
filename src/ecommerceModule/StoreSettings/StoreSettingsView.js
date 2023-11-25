/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../auth/index";
// import { Link } from "react-router-dom";
import {
	LoyaltyPointsAndStoreStatus2,
	allLoyaltyPointsAndStoreStatus2,
	cloudinaryUpload1,
} from "../apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// eslint-disable-next-line
import Resizer from "react-image-file-resizer";

const StoreSettingsView = () => {
	const [loyaltyPointsAward, setLoyaltyPointsAward] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState("");
	// eslint-disable-next-line
	const [onlineServicesFees, setOnlineServicesFees] = useState(0);
	const [shippingFees, setShippingFees] = useState(0);
	// eslint-disable-next-line
	const [transactionFeePercentage, setTransactionFeePercentage] = useState(0);
	// eslint-disable-next-line
	const [purchaseTaxes, setPurchaseTaxes] = useState(0);
	const [freeShippingLimit, setFreeShippingLimit] = useState("");
	const [discountOnFirstPurchase, setDiscountOnFirstPurchase] = useState("");
	const [addDiscountFirstPurch, setAddDiscountFirstPurch] = useState(false);
	const [activatePayOnDelivery, setActivatePayOnDelivery] = useState(false);
	const [activatePickupInStore, setActivatePickupInStore] = useState(false);
	const [activeEcomStore, setActiveEcomStore] = useState(false);
	const [activatePayOnline, setActivatePayOnline] = useState(false);
	const [daysStoreClosed, setDaysStoreClosed] = useState([]);
	const [addStoreLogo, setAddStoreLogo] = useState([]);
	const [addStoreName, setAddStoreName] = useState([]);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");
	const [query, setQuery] = useState([]);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setLoyaltyPointsAward(e.target.value);
	};
	const handleChange2 = (e) => {
		setError("");
		setDiscountPercentage(e.target.value);
	};

	const handleChange6 = (e) => {
		setError("");
		setFreeShippingLimit(e.target.value);
	};
	const handleChange7 = (e) => {
		setError("");
		setDiscountOnFirstPurchase(e.target.value);
	};

	const handleChange8 = (e) => {
		setError("");
		setAddDiscountFirstPurch(e.target.value);
	};
	const handleChange9 = (e) => {
		setError("");
		setAddStoreName(e.target.value);
	};

	const handleChange10 = (e) => {
		setError("");
		setActivatePayOnDelivery(e.target.value);
	};

	const handleChange11 = (e) => {
		setError("");
		setActivatePickupInStore(e.target.value);
	};

	const handleChange12 = (e) => {
		setError("");
		setActivatePayOnline(e.target.value);
	};

	const handleChange13 = (e) => {
		setError("");
		setShippingFees(e.target.value);
	};

	const fileUploadAndResizeLogo = (e) => {
		let files = e.target.files;
		let allUploadedFiles = addStoreLogo;

		const MAX_SIZE = 1.5 * 1024 * 1024; // 1.5 MB in bytes

		if (files) {
			for (let i = 0; i < files.length; i++) {
				// Check file size
				if (files[i].size > MAX_SIZE) {
					console.error("The image should be 1.5 megabytes or less");
					continue; // Skip this file and go to the next
				}

				// Convert file to base64 for uploading
				let reader = new FileReader();
				reader.readAsDataURL(files[i]);
				reader.onload = () => {
					cloudinaryUpload1(user._id, token, { image: reader.result })
						.then((data) => {
							allUploadedFiles.push(data);
							setAddStoreLogo({ ...addStoreLogo, images: allUploadedFiles });
						})
						.catch((err) => {
							console.log("CLOUDINARY UPLOAD ERR", err);
						});
				};
				reader.onerror = (error) => {
					console.log("Error: ", error);
				};
			}
		}
	};

	const FileUploadStoreLogo = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised btn-block'
					style={{ cursor: "pointer", fontSize: "0.95rem" }}
				>
					Add Store Logo
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeLogo}
					/>
				</label>
			</>
		);
	};

	const handleImageRemove = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				// eslint-disable-next-line
				const { images } = addThumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddStoreLogo([]);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		}

		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
	};

	useEffect(() => {
		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		// eslint-disable-next-line
	}, [query]);

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus2(token, user._id).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				var lastAdded =
					data && data[data.length - 1] ? data[data.length - 1] : {};
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
				setLoyaltyPointsAward(lastAdded.loyaltyPointsAward);
				setDiscountPercentage(lastAdded.discountPercentage);
				setOnlineServicesFees(lastAdded.onlineServicesFees);
				setTransactionFeePercentage(lastAdded.transactionFeePercentage);
				setFreeShippingLimit(lastAdded.freeShippingLimit);
				setDiscountOnFirstPurchase(lastAdded.discountOnFirstPurchase);
				setAddStoreLogo(
					lastAdded && lastAdded.addStoreLogo ? lastAdded.addStoreLogo : []
				);
				setActivatePayOnDelivery(lastAdded.activatePayOnDelivery);
				setActiveEcomStore(lastAdded.activeEcomStore);
				setAddStoreName(lastAdded.addStoreName);
				setShippingFees(lastAdded.shippingFees);
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		LoyaltyPointsAndStoreStatus2(user._id, token, {
			loyaltyPointsAward,
			discountPercentage,
			daysStoreClosed: daysStoreClosed.daysStoreClosed,
			onlineServicesFees: onlineServicesFees,
			transactionFeePercentage: transactionFeePercentage,
			purchaseTaxes: purchaseTaxes,
			freeShippingLimit: freeShippingLimit,
			discountOnFirstPurchase: discountOnFirstPurchase,
			addStoreLogo: addStoreLogo.images,
			addStoreName: addStoreName,
			activatePayOnDelivery: activatePayOnDelivery,
			activatePickupInStore: activatePickupInStore,
			activatePayOnline: activatePayOnline,
			shippingFees: shippingFees,
			belongsTo: user._id,
			activeEcomStore: activeEcomStore,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				toast.success(
					"Loyalty Points and Store Status were successfully Added."
				);
				setError("");
				setTimeout(function () {
					setLoyaltyPointsAward("");
					setDiscountPercentage("");
					setDaysStoreClosed([]);
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};
	// console.log(alreadySetLoyaltyPointsManagement);

	const LoyaltyPointsAndStoreStatusForm = () => (
		<form onSubmit={clickSubmit} dir='ltr' style={{ textAlign: "left" }}>
			<div className='m-3 col-4'>
				<div className='col-12'>
					{addStoreLogo &&
						addStoreLogo.images &&
						addStoreLogo.images.map((image) => {
							return (
								<div className='m-3 col-6 '>
									<button
										type='button'
										className='close'
										onClick={() => {
											handleImageRemove(image.public_id);
											setAddStoreLogo([]);
										}}
										style={{
											color: "white",
											background: "black",
											fontSize: "20px",
										}}
										aria-label='Close'
									>
										<span aria-hidden='true'>&times;</span>
									</button>
									<img
										src={image.url}
										alt='Img Not Found'
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
										}}
										key={image.public_id}
									/>
								</div>
							);
						})}
				</div>

				{FileUploadStoreLogo()}

				<div
					className='mt-2'
					style={{ color: "red", fontWeight: "bolder", fontSize: "11px" }}
				>
					Logo image should have dimensions (Width: 666px, Height: 315px, Ext:
					.png)
				</div>
			</div>

			<div className='row'>
				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label className='text-muted'>Brand Name</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange9}
							value={addStoreName}
							placeholder='Store Name or Brand Name'
							autoFocus
							required
						/>
					</div>
				</div>

				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label className='text-muted'>
							Shipping Fees (In{" "}
							{user && user.storyCountry === "egypt" ? "EGP" : "USD"})
						</label>
						<input
							type='number'
							className='form-control'
							onChange={handleChange13}
							value={shippingFees}
							placeholder='Shipping Fee'
						/>
					</div>
				</div>

				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label className='text-muted'>Loyalty Points To Award</label>
						<input
							type='number'
							className='form-control'
							onChange={handleChange1}
							value={loyaltyPointsAward}
							placeholder='Number of points so you can award the customer with a specific %'
							required
						/>
					</div>
				</div>
				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label className='text-muted'>
							Loyalty Points Discount Percentage
						</label>
						<input
							type='number'
							className='form-control'
							onChange={handleChange2}
							value={discountPercentage}
							placeholder='Percentage to be discounted from the user total if reached to the required points e.g. 10% will be added as 10'
							required
						/>
					</div>
				</div>
				<div className='col-md-5 mx-auto'>
					<div className='form-group'>
						<label className='text-muted'>
							Total {user && user.storyCountry === "egypt" ? "EGP" : "USD"}{" "}
							Value Limit To get Free Shipping
						</label>
						<input
							type='number'
							className='form-control'
							onChange={handleChange6}
							value={freeShippingLimit}
							placeholder={`Min ${
								user && user.storyCountry === "egypt" ? "EGP" : "USD"
							} value purchase to get free shipping (e.g. 100 ${
								user && user.storyCountry === "egypt" ? "EGP" : "USD"
							} will be added as 100)`}
						/>
					</div>
				</div>
				<div className='col-md-5 mx-auto'>
					<div className='form-group'>
						<label className='text-muted'>
							Do you want to add discount from user's first purchase?
						</label>
						<div className='form-group'>
							<select onChange={handleChange8} className='form-control'>
								<option>Please select / Required*</option>
								<option value='0'>No</option>
								<option value='1'>Yes</option>
							</select>
						</div>
						{addDiscountFirstPurch === "1" ? (
							<>
								<label
									className=''
									style={{
										fontSize: "0.8rem",
										fontWeight: "bold",
										color: "black ",
									}}
								>
									What % would you like the customer to get off his/her first
									purchase?
								</label>
								<input
									type='number'
									className='form-control'
									onChange={handleChange7}
									value={discountOnFirstPurchase}
									placeholder='Discount off first purchase percentage (e.g. 10 precent off will be added as 10)'
								/>
							</>
						) : null}
					</div>
				</div>
			</div>

			<div className='w-100'>
				<label>Store Closed on days:</label>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					<label htmlFor='one' className='block '>
						<input
							type='checkbox'
							id='one'
							onChange={handleQueryChange}
							value='Saturday'
							className='m-3'
						/>
						Saturday
					</label>
					<label htmlFor='two' className='block'>
						<input
							type='checkbox'
							id='two'
							onChange={handleQueryChange}
							value='Sunday'
							className='m-3'
						/>
						Sunday
					</label>
					<label htmlFor='three' className='block'>
						<input
							type='checkbox'
							id='three'
							onChange={handleQueryChange}
							value='Monday'
							className='m-3'
						/>
						Monday
					</label>
					<label htmlFor='four' className='block'>
						<input
							type='checkbox'
							id='four'
							onChange={handleQueryChange}
							value='Tuesday'
							className='m-3'
						/>
						Tuesday
					</label>
					<label htmlFor='five' className='block'>
						<input
							type='checkbox'
							id='five'
							onChange={handleQueryChange}
							value='Wednesday'
							className='m-3'
						/>
						Wednesday
					</label>
					<label htmlFor='six' className='block'>
						<input
							type='checkbox'
							id='six'
							onChange={handleQueryChange}
							value='Thursday'
							className='m-3'
						/>
						Thursday
					</label>
					<label htmlFor='seven' className='block'>
						<input
							type='checkbox'
							id='seven'
							onChange={handleQueryChange}
							value='Friday'
							className='m-3'
						/>
						Friday
					</label>
				</div>
			</div>
			<div className='row my-2'>
				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label> Activate Pay On Delivery:</label>

						<select onChange={handleChange10} className='form-control'>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>
				</div>

				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label> Activate Pickup in Store:</label>

						<select onChange={handleChange11} className='form-control'>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>
				</div>

				<div className='col-md-3 mx-auto'>
					<div className='form-group'>
						<label> Activate Pay Online:</label>

						<select onChange={handleChange12} className='form-control'>
							<option>Please select</option>
							<option value='0'>No</option>
							<option value='1'>Yes</option>
						</select>
					</div>
				</div>
			</div>

			<button className='btn btn-outline-primary my-3'>
				Add To Management Table
			</button>
		</form>
	);

	return (
		<Fragment dir='ltr'>
			<div
				dir='ltr'
				className='col-md-10 col-sm-6 offset-md-2 mt-5 mx-auto p-3'
				style={{
					border: "1px black solid",
					borderRadius: "20px",
					marginBottom: "20px",
				}}
			>
				<h3 className='mt-1 mb-3 text-center'>Store Management</h3>
				<ToastContainer />
				<div
					className='mb-3 mx-auto'
					style={{
						backgroundColor: "#f2e7e7",
						borderRadius: "10px",
						marginBottom: "20px",
						boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.5)",
					}}
				>
					<hr />
					<div
						style={{
							fontSize: "1.2rem",
							textAlign: "center",
							fontWeight: "bold",
							margin: "3px",
							color: "#660000",
							textShadow: "1px 2px 4px",
						}}
					>
						Your Latest Store Management Info:
					</div>
					<div className='row mx-auto' style={{ fontWeight: "bold" }}>
						{alreadySetLoyaltyPointsManagement && (
							<>
								<div
									className='mx-auto col-md-5'
									style={{ width: "50px", height: "50px" }}
								>
									Store Logo:{" "}
									<img
										src={
											alreadySetLoyaltyPointsManagement.addStoreLogo &&
											alreadySetLoyaltyPointsManagement.addStoreLogo[0] &&
											alreadySetLoyaltyPointsManagement.addStoreLogo[0].url
										}
										alt={alreadySetLoyaltyPointsManagement.addStoreName}
										style={{
											width: "25%",
											height: "100%",
											objectFit: "cover",
											boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
										}}
									/>
								</div>
								<div className='mx-auto col-md-5 my-auto'>
									Store Name:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.addStoreName}
								</div>
								<div className='mx-auto col-md-5 mt-2'>
									Latest Loyalty Points Award:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.loyaltyPointsAward}{" "}
									Points.
								</div>
								<div className='mx-auto col-md-5 mt-2'>
									Latest Loyalty Points Percentage:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.discountPercentage}
									% off.
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									Online Services Fee:
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.onlineServicesFees}{" "}
									{user && user.storyCountry === "egypt" ? "EGP" : "USD"}
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									Transaction Fee:
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.transactionFeePercentage}
									%
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									Purchase Taxes:
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.purchaseTaxes}
									%
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									Minimum{" "}
									{user && user.storyCountry === "egypt" ? "EGP" : "USD"} to get
									free Shipping:
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.freeShippingLimit}{" "}
									{user && user.storyCountry === "egypt" ? "EGP" : "USD"}
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									First Purchase Percentage Discount:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.discountOnFirstPurchase}
									%
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									Store Closed On:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.daysStoreClosed.map(
											(i) => (
												<span key={i} className='my-1 mx-2'>
													{i}
												</span>
											)
										)}
								</div>

								<div className='mx-auto col-md-5 mt-3'>
									Pay On Delivery:{" "}
									{alreadySetLoyaltyPointsManagement &&
									alreadySetLoyaltyPointsManagement.activatePayOnDelivery
										? "Yes"
										: "No"}
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									Pick up in Store:{" "}
									{alreadySetLoyaltyPointsManagement &&
									alreadySetLoyaltyPointsManagement.activatePickupInStore
										? "Yes"
										: "No"}
								</div>
								<div className='mx-auto col-md-5 mt-3'>
									Pay Online:{" "}
									{alreadySetLoyaltyPointsManagement &&
									alreadySetLoyaltyPointsManagement.activatePayOnline
										? "Yes"
										: "No"}
								</div>
							</>
						)}
					</div>
				</div>
				<br />
				{LoyaltyPointsAndStoreStatusForm()}
			</div>
		</Fragment>
	);
};

export default StoreSettingsView;
