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
import SignupFormComp from "../components/SignupComp/SignupFormComp";
import { getAllAgents } from "../apiCore";

const SignupForm = ({ language }) => {
	const [nextClicked, setNextClicked] = useState(0);
	const [allAgents, setAllAgents] = useState("");
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

	const clickSubmit = (event) => {
		event.preventDefault();

		if (!name) {
			return toast.info("Name is required");
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

		if (!storeType) {
			return toast.info("Store Type is required");
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

		setValues({ ...values, error: false });
		signup({
			name,
			email,
			phone,
			password,
			storeType,
			storeName,
			storeAddress,
			storeGovernorate,
			storeCountry,
			storeDistrict,
			agent,
			role: 1000,
			roleDescription: roleDescription,
			activeUser: true,
			subscribed: false,
		}).then((data1) => {
			if (data1.error) {
				console.log(data1.error, "data1.error");
				setValues({ ...values, success: false });
			} else
				signin({ email, password }).then((data) => {
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
				return <Redirect to='/admin/dashboard' />;
			} else if (user && user.role === 1000) {
				return <Redirect to='/store/admin/dashboard' />;
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

	const EgyptGovernorate = [
		"Alexandria",
		"Aswan",
		"Asyut",
		"Beheira",
		"Beni Suef",
		"Cairo",
		"Dakahlia",
		"Damietta",
		"Faiyum",
		"Gharbia",
		"Giza",
		"Ismailia",
		"Kafr El Sheikh",
		"Luxor",
		"Matruh",
		"Minya",
		"Monufia",
		"New Valley",
		"North Sinai",
		"Port Said",
		"Qalyubia",
		"Qena",
		"Red Sea",
		"Sharqia",
		"Sohag",
		"South Sinai",
		"Suez",
	];

	let alexandriaDistricts = [
		"Al Nasr (Victoria)",
		"Al Seyouf",
		"Sidi Beshr",
		"Al Saraya",
		"Laurent Louran",
		"Tharwat",
		"San Stefano",
		"Gianaclis",
		"Schutz (Shods)",
		"Safar",
		"Abou Shabana aka Baccos",
		"Al Karnak",
		"Al Wezara (The Ministry)",
		"Isis Bolkly (Bulkeley)",
		"Roushdy",
		"Mohammed Mahfouz",
		"Mustafa Kamil",
		"Sidi Gaber Al Sheikh (Bus & Railway Station)",
		"Cleopatra Hammamat (Cleopatra Baths)",
		"Cleopatra Al Soghra",
		"Al Reyada Al Kobra (Sporting Al Kobra)",
		"Al Reyada Al Soghra (Sporting Al Soghra)",
		"Al Ibrahimiyya",
		"Al Moaskar (Camp Caesar)",
		"Al Gamaa (The University)",
		"Al Shatby",
		"Al Shobban Al Moslemin",
		"Al Shahid Moustafa Ziean",
		"Hassan Rasim (Azarita)",
		"Gamea' Ibrahim (Mosque of Ibrahim)",
		"Mahattet Al Ramleh (Ramlh Station)",
		"Kasr Al Safa (Al Safa Palace) (Zizini)",
		"Al Fonoun Al Gamella (The Fine Arts)",
		"Ramsis (Glym or Gleem) (Glymenopoulo)",
		"Al Bostan (Saba Pasha)",
		"Al Hedaya (The Guidance)",
		"Sidi Gaber Al Mahata",
		"Cleopatra (Zananere)",
		"Abu2eer",
		"Al Mandara",
		"Al Manshya",
		"Bahary",
		"Al Bitash",
		"Al Hanoveel",
		"Muhammed Naguib",
		"Al 3asafra",
	];

	alexandriaDistricts = [...new Set(alexandriaDistricts)]; // remove duplicates
	alexandriaDistricts.sort(); // sort the array

	let cairoDistricts = [
		"Helwan",
		"Ain Helwan",
		"Helwan University",
		"Wadi Hof",
		"Hadayek Helwan",
		"El-Maasara",
		"Tora El-Asmant",
		"Kozzika",
		"Tora El-Balad",
		"Sakanat El-Maadi",
		"Maadi",
		"Hadayek El-Maadi",
		"Dar El-Salam",
		"El-Zahraa'",
		"Mar Girgis[a]",
		"El-Malek El-Saleh",
		"Al-Sayeda Zeinab",
		"Saad Zaghloul",
		"Sadat",
		"Nasser",
		"Orabi",
		"Al-Shohadaa[b]",
		"Ghamra",
		"El-Demerdash",
		"Manshiet El-Sadr",
		"Kobri El-Qobba",
		"Hammamat El-Qobba",
		"Saray El-Qobba",
		"Hadayeq El-Zaitoun",
		"Helmeyet El-Zaitoun",
		"El-Matareyya",
		"Ain Shams",
		"Ezbet El-Nakhl",
		"El-Marg",
		"New El-Marg",
		"El-Mounib",
		"Sakiat Mekky",
		"Omm El-Masryeen[c]",
		"El Giza",
		"Faisal",
		"Cairo University",
		"El Bohoth",
		"Dokki",
		"Opera",
		"Sadat",
		"Mohamed Naguib",
		"Attaba",
		"Al-Shohadaa[b]",
		"Masarra",
		"Road El-Farag",
		"St. Teresa",
		"Khalafawy",
		"Mezallat",
		"Kolleyyet El-Zeraa",
		"Shubra El-Kheima",
		"Airport",
		"Ahmed Galal",
		"Adly Mansour",
		"El Haykestep",
		"Omar Ibn El-Khattab",
		"Qobaa",
		"Hesham Barakat",
		"El-Nozha",
		"Nadi El-Shams",
		"Alf Maskan",
		"Heliopolis Square",
		"Haroun",
		"Al-Ahram",
		"Koleyet El-Banat",
		"Stadium",
		"Fair Zone",
		"Abbassia",
		"Abdou Pasha",
		"El Geish",
		"Bab El Shaaria",
		"Attaba",
		"Nasser",
		"Maspero",
		"Safaa Hegazy",
		"Kit Kat",
		"Sudan Street",
		"Imbaba",
		"El-Bohy",
		"El-Kawmeya Al-Arabiya",
		"Ring Road",
		"Rod El-Farag Axis",
		"El-Tawfikeya",
		"Wadi El-Nil",
		"Gamaat El Dowal Al-Arabiya",
		"Bulaq El-Dakroor",
		"Cairo University",
		"Hadayek Al Ashgar",
		"Ahram Gardens",
		"ُEl Masr",
		"The Grand Egyptian Museum",
		"Remaya Square",
		"Pyramids",
		"Maryoteya",
		"Arish",
		"El Matbaa",
		"Talbeya",
		"Madkor",
		"El Mesaha",
		"Giza",
		"Interchange with Line 2",
		"Giza Square",
		"Manyal",
		"El-Malek El-Saleh",
		"Magra El-Oyoun",
	];

	cairoDistricts = [...new Set(cairoDistricts)]; // remove duplicates
	cairoDistricts.sort(); // sort the array

	const signUpForm = () => (
		<SignupFormComp
			values={values}
			setValues={setValues}
			clickSubmit={clickSubmit}
			handleChange={handleChange}
			countryList={countryList}
			cairoDistricts={cairoDistricts}
			alexandriaDistricts={alexandriaDistricts}
			name={name}
			email={email}
			phone={phone}
			storeName={storeName}
			EgyptGovernorate={EgyptGovernorate}
			storeGovernorate={storeGovernorate}
			storeAddress={storeAddress}
			password={password}
			password2={password2}
			nextClicked={nextClicked}
			setNextClicked={setNextClicked}
			language={language}
			allAgents={allAgents}
		/>
	);

	return (
		<WholeSignup>
			<ToastContainer />
			{signUpForm()}
			{redirectUser()}
		</WholeSignup>
	);
};

export default SignupForm;

const WholeSignup = styled.div`
	overflow: hidden;
`;
