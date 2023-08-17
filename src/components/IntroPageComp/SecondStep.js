import React, { useState } from "react";
import styled from "styled-components";
import { useCartContext } from "../../sidebar_context";
import axios from "axios";
import { authenticate, isAuthenticated, signin, signup } from "../../auth";
import { toast } from "react-toastify";

const SecondStep = ({
	chosenLanguage,
	setSteps,
	steps,
	setChosenGender,
	chosenGender,
	handleNext,
	handlePrev,
}) => {
	const { userLocation, capturingUserLocation, chosenLanguageArabic } =
		useCartContext();

	const [showPassword, setShowPassword] = useState(false);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		phone: "",
		error: "",
		storeType: chosenGender ? chosenGender : "no store",
		storeName: "no store",
		storeAddress: "no store",
		storeGovernorate: userLocation.state,
		storeCountry: userLocation.country,
		storeDistrict: "no store",
		agent: { name: "no agent" },
		roleDescription: "client",
		success: false,
		redirectToReferrer: "",
		loading: false,
	});

	const {
		name,
		email,
		password,
		password2,
		// eslint-disable-next-line
		success,
		phone,
		agent,
		storeType,
		storeName,
		storeDistrict,
		storeAddress,
		storeGovernorate,
		storeCountry,
		redirectToReferrer,
		roleDescription,
		loading,
	} = values;

	const togglePasswordVisibility = () => {
		setShowPassword((prevShow) => !prevShow);
	};

	const { user } = isAuthenticated();

	console.log(loading);

	console.log(chosenGender, "chosenGender");

	const clickSubmit = () => {
		const emailFormat = /\S+@\S+\.com$/;

		if (!name) {
			return toast.info("Name is required");
		}
		if (!emailFormat.test(email)) {
			return toast.info("Email is incorrect, please check");
		}
		if (!email) {
			return toast.info("email is required");
		}

		if (!password) {
			return toast.info("password is required");
		}

		if (password !== password2) {
			return toast.info("Passwords Are NOT Matching");
		}

		function containsArabicNumerals(str) {
			// Regular expression to match Arabic numerals
			const arabicNumeralsRegex = /[\u0660-\u0669]/;
			return arabicNumeralsRegex.test(str);
		}

		function removeNonNumericCharacters(str) {
			// Regular expression to remove non-numeric characters
			const numericOnlyRegex = /\D/g;
			return str.replace(numericOnlyRegex, "");
		}

		function convertArabicToEnglishNumerals(arabicNumber) {
			const arabicNumeralsMap = {
				"٠": "0",
				"١": "1",
				"٢": "2",
				"٣": "3",
				"٤": "4",
				"٥": "5",
				"٦": "6",
				"٧": "7",
				"٨": "8",
				"٩": "9",
			};

			// Convert Arabic numerals to English numerals
			return arabicNumber.replace(
				/[\u0660-\u0669]/g,
				(match) => arabicNumeralsMap[match]
			);
		}

		function convertArabicOrNumericToEnglish(arabicNumber) {
			// Remove non-numeric characters (including '+') from the input
			const numericOnly = removeNonNumericCharacters(arabicNumber);

			// Check if the input contains Arabic numerals
			if (containsArabicNumerals(arabicNumber)) {
				// If it contains Arabic numerals, convert to English numerals
				return convertArabicToEnglishNumerals(numericOnly);
			}

			// Return the numericOnly string as is (English numerals)
			return numericOnly;
		}

		setValues({ ...values, error: false });
		signup({
			name,
			email: email
				? email.toLowerCase()
				: convertArabicOrNumericToEnglish(phone),
			phone: convertArabicOrNumericToEnglish(phone),
			password,
			storeType,
			storeName,
			storeAddress,
			storeGovernorate: storeGovernorate ? storeGovernorate : "no store",
			storeCountry,
			storeDistrict,
			agent,
			role: 0,
			roleDescription: roleDescription,
			activeUser: true,
			subscribed: false,
		}).then((data1) => {
			if (data1.error) {
				console.log(data1.error, "data1.error");
				setValues({ ...values, success: false });
				return toast.info(data1.error);
			} else
				signin({ username: email, password }).then((data) => {
					if (data.error) {
						setValues({ ...values, loading: false });
					} else {
						authenticate(data, () => {
							setValues({
								...values,
								redirectToReferrer: true,
							});
						});
					}
				});
		});
	};

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return (window.location.href = "/store/admin/dashboard");
			} else if (user && user.role === 3) {
				return (window.location.href = "/store/book-appointment-from-store");
			} else if (user && user.role === 1000) {
				return (window.location.href = "/store/admin/store-preview");
			} else if (user && user.role === 2) {
				return (window.location.href = "/stylist/dashboard");
			} else if (user && user.role === 10000) {
				return (window.location.href = "/boss/admin/dashboard");
			} else if (user && user.role === 2000) {
				return (window.location.href = "/agent/dashboard");
			} else {
				return (window.location.href = "/home");
			}
		}

		if (isAuthenticated()) {
			return (window.location.href = "/home");
		}
	};

	const [isChecked, setIsChecked] = useState(false);

	const getAddressFromCoordinates = (position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		const apiKey = process.env.REACT_APP_MAPS_API_KEY;
		const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				if (data.results && data.results[0]) {
					let country = "";
					let state = "";

					for (const component of data.results[0].address_components) {
						if (component.types.includes("country")) {
							country = component.long_name; // or use 'short_name' for abbreviated country name
						}
						if (component.types.includes("administrative_area_level_1")) {
							// This usually represents the state
							state = component.long_name;
						}
					}

					const locationDetails = {
						latitude,
						longitude,
						country,
						state,
					};

					capturingUserLocation(
						locationDetails.country,
						locationDetails.state,
						locationDetails.longitude,
						locationDetails.latitude
					);

					localStorage.setItem(
						"locationDetails",
						JSON.stringify(locationDetails)
					);
				}
			})
			.catch((error) => {
				console.error("Error fetching location details:", error);
			});
	};

	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getAddressFromCoordinates);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	const handleCheckboxChange = () => {
		function errorFunction(error) {
			if (error.code === error.PERMISSION_DENIED) {
				const urlParams = new URLSearchParams(window.location.search);
				const isRetryGeo = urlParams.get("retryGeo");

				if (!isRetryGeo) {
					const userAction = window.confirm(
						"To see stores near you, we need your location. You've denied access previously. \n\nClick 'OK' to open a guide on how to enable geolocation."
					);

					if (userAction) {
						// Open a new window with the guide and another attempt to get geolocation
						window.open(`/?retryGeo=true`, "_blank");
					}
				} else {
					alert(
						"Please enable geolocation from browser settings and try again."
					);
				}
			} else {
				console.log(error);
			}
		}

		function successFunction(position) {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;

			axios
				.get(
					`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
				)
				.then((response) => {
					const { address } = response.data;
					const { country, state, city } = address;

					if (country.toLowerCase() === "egypt") {
						chosenLanguageArabic();
					}

					const userLocation = {
						country,
						state,
						city,
					};

					localStorage.setItem("userLocation", JSON.stringify(userLocation));
				})
				.catch((error) => {
					console.log(error);
				});
		}

		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser"); // I changed this to an alert for better user feedback.
		} else if (!isChecked) {
			// If the checkbox is being checked, get the user's location
			navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
		}

		setIsChecked(!isChecked);
		getUserLocation();
	};

	return (
		<SecondStepWrapper
			show={chosenLanguage === "Arabic"}
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
		>
			<div className='textHeader'>
				{chosenLanguage === "Arabic" ? (
					<div className='ArabicHeader'>
						<div>نشكرك ومبروك</div>
						<div className='subHeader'>أنت في الخطوة الأخيرة</div>
					</div>
				) : (
					<div>
						<div>Thank you & Congratulations</div>
						<div className='subHeader'>your are in the last step</div>
					</div>
				)}
			</div>

			{chosenLanguage === "Arabic" ? (
				<div className='formWrapper mt-4 col-md-10 mx-auto'>
					<div className='row'>
						<div className='col-1 my-auto ml-2'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								{" "}
								<strong>الاسم</strong>{" "}
							</label>
						</div>
						<div className='col-10' style={{ textAlign: "right" }}>
							<input
								type='text'
								onChange={(e) => {
									setValues({ ...values, name: e.target.value });
								}}
								value={name}
								className='w-100 custom-input'
								placeholder='يرجى إدخال اسمك الكامل'
							/>
						</div>
						<span className='required-asterisk'>*</span>
					</div>

					<div className='row'>
						<div className='col-1 my-auto ml-2'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								{" "}
								<strong>الهاتف</strong>{" "}
							</label>
						</div>
						<div className='col-10' style={{ textAlign: "right" }}>
							<input
								type='number'
								value={phone}
								onChange={(e) => {
									setValues({ ...values, phone: e.target.value });
								}}
								className='w-100 custom-input'
								placeholder='رقم الهاتف المحمول مطلوب'
							/>
						</div>
						<span className='required-asterisk'>*</span>
					</div>
					<div className='row'>
						<div className='col-1 my-auto ml-2'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								{" "}
								<strong>الإيميل</strong>{" "}
							</label>
						</div>
						<div className='col-10' style={{ textAlign: "right" }}>
							<input
								type='email'
								onChange={(e) => {
									setValues({ ...values, email: e.target.value.toLowerCase() });
								}}
								value={email}
								className='w-100 custom-input'
								placeholder='عنوان البريد الإلكتروني اختياري'
							/>
						</div>
					</div>
				</div>
			) : (
				<div className='formWrapper mt-4 col-md-10 mx-auto'>
					<div className='row'>
						<div className='col-2 my-auto ml-2'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								{" "}
								<strong>Name</strong>{" "}
							</label>
						</div>
						<div className='col-9'>
							<input
								type='text'
								value={name}
								onChange={(e) => {
									setValues({ ...values, name: e.target.value });
								}}
								className='w-100 custom-input'
								placeholder='Your Full Name Is Required'
							/>
						</div>
						<span className='required-asterisk'>*</span>
					</div>

					<div className='row'>
						<div className='col-2 my-auto ml-2'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								{" "}
								<strong>Phone</strong>{" "}
							</label>
						</div>
						<div className='col-9'>
							<input
								type='number'
								value={phone}
								onChange={(e) => {
									setValues({ ...values, phone: e.target.value });
								}}
								className='w-100 custom-input'
								placeholder='Your Cell Phone # Is Required'
							/>
						</div>
						<span className='required-asterisk'>*</span>
					</div>
					<div className='row'>
						<div className='col-2 my-auto ml-2'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								{" "}
								<strong>Email</strong>{" "}
							</label>
						</div>
						<div className='col-9'>
							<input
								type='email'
								onChange={(e) => {
									setValues({ ...values, email: e.target.value });
								}}
								value={email}
								className='w-100 custom-input'
								placeholder='Email Address is Optional'
							/>
						</div>
					</div>
				</div>
			)}

			{chosenLanguage === "Arabic" ? (
				<div className='orderSalons my-4' style={{ textAlign: "right" }}>
					<div
						style={{ fontWeight: "bolder", fontSize: "1rem", color: "white" }}
					>
						ترتيب الصالونات الأقرب إلى الأبعد
						<input
							type='checkbox'
							className='mr-2'
							checked={isChecked}
							onChange={handleCheckboxChange}
						/>
					</div>
				</div>
			) : (
				<div className='my-4'>
					<div
						style={{ fontWeight: "bolder", fontSize: "1rem", color: "white" }}
					>
						Order Salons Based On Your Location
						<input
							type='checkbox'
							checked={isChecked}
							className='ml-2'
							onChange={handleCheckboxChange}
						/>
					</div>
				</div>
			)}

			{chosenLanguage === "Arabic" ? (
				<div className='formWrapper mt-4 col-md-10 mx-auto'>
					<div className='row'>
						<div className='col-3 my-auto'>
							<label style={{ fontWeight: "bolder", fontSize: "0.8rem" }}>
								{" "}
								<strong>كلمة المرور</strong>{" "}
							</label>
						</div>
						<div className='col-8 ml-3'>
							<input
								type={showPassword ? "text" : "password"}
								onChange={(e) => {
									setValues({ ...values, password: e.target.value });
								}}
								value={password}
								className='w-100 custom-input'
								style={{ paddingRight: "15px" }}
								placeholder='كلمة المرور *'
							/>
							<div
								style={{
									position: "absolute",
									right: chosenLanguage === "Arabic" ? "" : "10px",
									left: chosenLanguage === "Arabic" ? "20px" : "",
									top: "50%",
									transform: "translateY(-50%)",
									color: "white",
									background: "#4a4a4a",
								}}
								onClick={(e) => {
									e.preventDefault();
									togglePasswordVisibility();
								}}
							>
								{showPassword ? (
									<i className='fa-solid fa-eye'></i>
								) : (
									<i className='fa-solid fa-eye-slash'></i>
								)}
							</div>
						</div>
						<span className='required-asterisk'>*</span>
					</div>
					<div className='row'>
						<div className='col-3 my-auto'>
							<label style={{ fontWeight: "bolder", fontSize: "1rem" }}>
								{" "}
								<strong>تأكيد</strong>{" "}
							</label>
						</div>
						<div className='col-8 ml-3'>
							<input
								type={showPassword ? "text" : "password"}
								onChange={(e) => {
									setValues({ ...values, password2: e.target.value });
								}}
								value={password2}
								className='w-100 custom-input'
								style={{ paddingRight: "15px" }}
								placeholder='تأكيد كلمة المرور'
							/>
							<div
								style={{
									position: "absolute",
									right: chosenLanguage === "Arabic" ? "" : "10px",
									left: chosenLanguage === "Arabic" ? "20px" : "",
									top: "50%",
									transform: "translateY(-50%)",
									color: "white",
									background: "#4a4a4a",
								}}
								onClick={(e) => {
									e.preventDefault();
									togglePasswordVisibility();
								}}
							>
								{showPassword ? (
									<i className='fa-solid fa-eye'></i>
								) : (
									<i className='fa-solid fa-eye-slash'></i>
								)}
							</div>
						</div>
						<span className='required-asterisk'>*</span>
					</div>
					<div
						className='mt-4 mb-5'
						style={{ color: "white", textAlign: "center" }}
					>
						<button
							style={{ fontWeight: "bolder", fontSize: "1.5rem" }}
							className='btn btn-success'
							onClick={clickSubmit}
						>
							{chosenLanguage === "Arabic" ? "سجل الان" : "REGISTER NOW"}
						</button>
					</div>
					<div
						style={{ color: "white", textAlign: "center", marginTop: "20px" }}
						onClick={handlePrev}
					>
						<button
							className='btn btn-primary'
							style={{ fontWeight: "bolder", fontSize: "1.05rem" }}
						>
							السابق<i className='fa-solid fa-arrow-left mr-2'></i>
						</button>
					</div>
				</div>
			) : (
				<>
					<div className='row'>
						<div className='col-2 my-auto'>
							<label style={{ fontWeight: "bolder", fontSize: "0.8rem" }}>
								{" "}
								<strong>Password</strong>{" "}
							</label>
						</div>
						<div className='col-9 ml-3'>
							<input
								type={showPassword ? "text" : "password"}
								className='w-100 custom-input'
								placeholder='Password *'
								onChange={(e) => {
									setValues({ ...values, password: e.target.value });
								}}
								value={password}
							/>
							<div
								style={{
									position: "absolute",
									right: chosenLanguage === "Arabic" ? "" : "25px",
									left: chosenLanguage === "Arabic" ? "20px" : "",
									top: "50%",
									transform: "translateY(-50%)",
									color: "white",
									background: "#4a4a4a",
								}}
								onClick={(e) => {
									e.preventDefault();
									togglePasswordVisibility();
								}}
							>
								{showPassword ? (
									<i className='fa-solid fa-eye'></i>
								) : (
									<i className='fa-solid fa-eye-slash'></i>
								)}
							</div>
						</div>
						<span className='required-asterisk'>*</span>
					</div>
					<div className='row'>
						<div className='col-2 my-auto'>
							<label style={{ fontWeight: "bolder", fontSize: "0.8rem" }}>
								{" "}
								<strong>Confirm</strong>{" "}
							</label>
						</div>
						<div className='col-9 ml-3'>
							<input
								type={showPassword ? "text" : "password"}
								className='w-100 custom-input'
								placeholder='Confirm Password'
								onChange={(e) => {
									setValues({ ...values, password2: e.target.value });
								}}
								value={password2}
							/>
							<div
								style={{
									position: "absolute",
									right: chosenLanguage === "Arabic" ? "" : "25px",
									left: chosenLanguage === "Arabic" ? "20px" : "",
									top: "50%",
									transform: "translateY(-50%)",
									color: "white",
									background: "#4a4a4a",
								}}
								onClick={(e) => {
									e.preventDefault();
									togglePasswordVisibility();
								}}
							>
								{showPassword ? (
									<i className='fa-solid fa-eye'></i>
								) : (
									<i className='fa-solid fa-eye-slash'></i>
								)}
							</div>
						</div>
						<span className='required-asterisk'>*</span>
					</div>
					<div
						className='mt-3 mb-4'
						style={{ color: "white", textAlign: "center" }}
					>
						<button
							style={{ fontWeight: "bolder" }}
							className='btn btn-success'
							onClick={clickSubmit}
						>
							{chosenLanguage === "Arabic" ? "سجل الان" : "REGISTER NOW"}
						</button>
					</div>
					<div
						style={{ color: "white", textAlign: "center", marginTop: "20px" }}
						onClick={handlePrev}
					>
						<button
							style={{ fontWeight: "bolder" }}
							className='btn btn-primary'
						>
							<i className='fa-solid fa-arrow-left mr-2'></i>Previous
						</button>
					</div>
				</>
			)}
			{redirectUser()}
		</SecondStepWrapper>
	);
};

export default SecondStep;

const SecondStepWrapper = styled.div`
	padding-bottom: 50px;
	padding-top: 50px;

	.textHeader {
		color: white;
		font-size: 1.5rem;
		font-weight: bolder;
		text-align: center;
		text-transform: uppercase;
	}

	.ArabicHeader {
		font-size: 2.5rem;
	}

	.subHeader {
		font-size: 1.3rem;
		margin-top: 10px;
	}

	label {
		color: white;
	}

	.custom-input {
		width: 100%; /* Fill the entire width */
		background-color: #4a4a4a; /* Background color */
		color: white; /* Text color */
		padding: 5px 8px; /* Increase padding for more space */
		border: none; /* Remove any border if you don't want it */
		outline: none; /* Remove focus outline if desired */
		border-radius: 5px;
	}

	.required-asterisk {
		color: #e5c1c1; /* Color of the asterisk, can be changed */
		font-size: 1.5rem; /* Size of the asterisk, can be adjusted */
	}
`;
