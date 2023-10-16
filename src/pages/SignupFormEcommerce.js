/** @format */

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import {
	signup,
	authenticate,
	isAuthenticated,
	signin,
	// eslint-disable-next-line
	authenticate2,
} from "../auth/index";
// import Google from "../auth/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getAllAgents } from "../apiCore";
import { Helmet } from "react-helmet";
import { ShipToData } from "../Utils";
import { useCartContext } from "../sidebar_context";
import SignupFormCompShop from "../components/SignupComp/SignupFormCompShop";

const SignupFormEcommerce = () => {
	const { chosenLanguage } = useCartContext();

	const [nextClicked, setNextClicked] = useState(0);
	const [allAgents, setAllAgents] = useState("");
	const [allDistricts, setAllDistricts] = useState("");
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		phone: "",
		error: "",
		storeType: "",
		storeName: "",
		storeAddress: "",
		storeGovernorate: "",
		storeCountry: "",
		storeDistrict: "",
		agent: "",
		roleDescription: "agent",
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
		storeName,
		storeDistrict,
		storeAddress,
		storeGovernorate,
		storeCountry,
		redirectToReferrer,
		roleDescription,
		loading,
	} = values;

	const { user } = isAuthenticated();
	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value,
		});
	};

	console.log(loading);

	// const informParent = (response) => {
	// 	setValues({ ...values, error: false, loading: true });
	// 	if (response.error) {
	// 		setValues({ ...values, error: response.error, loading: false });
	// 		toast.error(response.error);
	// 	} else {
	// 		authenticate2(response, () => {
	// 			setValues({
	// 				...values,
	// 				redirectToReferrer: true,
	// 			});
	// 		});
	// 	}
	// };

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
		if (!storeAddress) {
			return toast.info("Store Address is required");
		}

		if (!storeGovernorate) {
			return toast.info("Store Governorate is required");
		}

		if (!storeName) {
			return toast.info("Store Name is required");
		}

		if (!storeCountry) {
			return toast.info("Store Country Is Required");
		}

		if (!storeDistrict) {
			return toast.info("District is Required");
		}

		if (!agent) {
			return toast.info("Agent is Required");
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
			email,
			phone: convertArabicOrNumericToEnglish(phone),
			password,
			storeType: "Ecommerce",
			storeName,
			storeAddress,
			storeGovernorate,
			storeCountry,
			storeDistrict,
			agent,
			role: 5000,
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
			if (user && user.role === 10000) {
				return <Redirect to='/boss/admin/dashboard' />;
			} else if (user && user.role === 1000) {
				return <Redirect to='/store/admin/store-preview' />;
			} else if (user && user.role === 5000) {
				return <Redirect to='/ecommerce/admin/dashboard' />;
			} else {
				return <Redirect to='/schedule' />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	const gettingAllPlatformAgents = () => {
		getAllAgents().then((data) => {
			if (data.error) {
				console.log("Error Getting Agents");
			} else {
				setAllAgents(data.filter((i) => i.activeAgent));
			}
		});
	};

	useEffect(() => {
		gettingAllPlatformAgents();
	}, []);

	const countryList = ["Egypt", "Kuwait", "UAE", "United States"];

	let distinctGovernorates = [
		...new Set(ShipToData.map((item) => item.GovernorateEn)),
	];

	const signUpForm = () => (
		<SignupFormCompShop
			values={values}
			setValues={setValues}
			clickSubmit={clickSubmit}
			handleChange={handleChange}
			countryList={countryList}
			name={name}
			email={email}
			phone={phone}
			storeName={storeName}
			storeGovernorate={storeGovernorate}
			storeAddress={storeAddress}
			password={password}
			password2={password2}
			nextClicked={nextClicked}
			setNextClicked={setNextClicked}
			language={chosenLanguage}
			allAgents={allAgents}
			setAllAgents={setAllAgents}
			allDistricts={allDistricts}
			setAllDistricts={setAllDistricts}
			EgyptGovernorate={distinctGovernorates}
		/>
	);

	return (
		<WholeSignup>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>إكس لوك | تسجيل متجرك الإلكتروني</title>
				) : (
					<title>XLOOK | Signup Your Ecommerce Store</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? `سارع بالتسجيل الآن! لا تفوت الفرصة لعرض نفسك ببراعة أمام مئات الآلاف من الأفراد حول مركز التجميل الخاص بك. إكس لوك، خطوات التسجيل، حجز المواعيد، خدمات التجميل`
							: `Hurry up and register now! Don't miss the opportunity to showcase yourself brilliantly in front of hundreds of thousands of individuals around your beauty center. XLOOK, Registration Steps, Appointment Booking, Beauty Services`
					}
				/>
				<meta
					name='keywords'
					content={
						chosenLanguage === "Arabic"
							? `كن شريكنا ، إكس لوك، خطوات التسجيل، حجز المواعيد، خدمات التجميل، التسجيل في موقع إكس لوك`
							: `XLOOK, Registration, Be Our Partner, Appointment Booking, Beauty Services, Register on XLOOK Website`
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com/signup' />
				{chosenLanguage === "Arabic" && (
					<html lang='ar' dir='rtl' xmlns='http://www.w3.org/1999/xhtml' />
				)}
			</Helmet>

			<ToastContainer />
			{signUpForm()}
			{redirectUser()}
		</WholeSignup>
	);
};

export default SignupFormEcommerce;

const WholeSignup = styled.div`
	overflow: hidden;
`;
