/** @format */

/** @format */

export const getAllEmployees = (ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/employees/${ownerId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getFilteredEmployees = (skip, limit, filters = {}) => {
	const data = {
		limit,
		skip,
		filters,
	};
	return fetch(`${process.env.REACT_APP_API_URL}/employees/by/search`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getEmployees = (ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/employees/${ownerId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const read = (employeeId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/employee/${employeeId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const readByPhone = (phoneNumber) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/employee/byphone/${phoneNumber}`,
		{
			method: "GET",
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const views = (employeeId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/views`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ employeeId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const viewsCounter = (employeeId, counter) => {
	return fetch(`${process.env.REACT_APP_API_URL}/viewscounter`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ employeeId, counter }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const comment = (userId, token, employeeId, comment, commentsPhotos) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, employeeId, comment, commentsPhotos }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const uncomment = (userId, token, employeeId, comment) => {
	return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ userId, employeeId, comment }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const employeeStar = (employeeId, star, token, email, userId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/employee/star/${employeeId}/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ employeeId, star, email, userId }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const cloudinaryCommentUpload = (userId, token, image) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/admin/uploadimagesimagecomment/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(image),
			// body: image,
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getServices = (token, ownerId) => {
	if (ownerId) {
		return fetch(`${process.env.REACT_APP_API_URL}/services/${ownerId}`, {
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
};

export const getServicesCombined = () => {
	return fetch(`${process.env.REACT_APP_API_URL}/services/list/combined`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getScheduledHours = (ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/alladdedhours/${ownerId}`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const createScheduledAppointment = (userId, token, createOrderData) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/scheduled-order/create/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: createOrderData }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listScheduledOrders = (userId, token, ownerId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order/list/${ownerId}/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const GenerallistScheduledOrders = (ownerId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order/list/${ownerId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getAllAds = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/all-adds`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const allLoyaltyPointsAndStoreStatus = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/store-management-frontend`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getAllHeros = (token, ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/heroes/store/${ownerId}`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getAbouts = (token, ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/about/list/${ownerId}`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getContacts = (token, ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/contact/list/${ownerId}`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateProfile = (userId, token, user) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateUser = (user, next) => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("jwt")) {
			let auth = JSON.parse(localStorage.getItem("jwt"));
			auth.user = user;
			localStorage.setItem("jwt", JSON.stringify(auth));
			next();
		}
	}
};

//For Payment
export const getBraintreeClientToken = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/getToken/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const processPayment_Subscription = (userId, token, paymentData) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/subscription/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(paymentData),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const processPaymentAndThenStore = (userId, token, paymentData) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/payment-store/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(paymentData),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
	return fetch(`${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(paymentData),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const retriggerPayment = (userId, token, paymentData) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/retrigger-payment/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ amount: paymentData.amount }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateUserCardFn = (userId, token, paymentData) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/update-card/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				paymentMethodToken: paymentData.paymentMethodToken,
				paymentMethodNonce: paymentData.paymentMethodNonce,
			}),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateSubscriptionCardFn = (userId, token, paymentData) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/update-subscription-card/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(paymentData),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getStoredPaymentData = (userId, token, paymentMethodToken) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/payment-data/${userId}/${paymentMethodToken}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getSubscriptionData = (userId, token, subscriptionId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/subscription-data/${userId}/${subscriptionId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getAllAgents = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/allUsers/agents/general`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getCountriesDistrictsGov = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/distinct-values`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const EgyptGovernorate = () => {
	var egyptsMainGovernorates = [
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

	egyptsMainGovernorates = [...new Set(egyptsMainGovernorates)]; // remove duplicates
	return egyptsMainGovernorates.sort(); // sort the array
};

export const alexandriaDistricts = () => {
	var alexandriaMainDistricts = [
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

	alexandriaMainDistricts = [...new Set(alexandriaMainDistricts)]; // remove duplicates
	return alexandriaMainDistricts.sort(); // sort the array
};

export const cairoDistricts = () => {
	var cairoMainDistricts = [
		"Helwan",
		"Helwan",
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

	cairoMainDistricts = [...new Set(cairoMainDistricts)]; // remove duplicates
	return cairoMainDistricts.sort(); // sort the array
};

export const cloudinaryAgentUpload = (image) => {
	return fetch(`${process.env.REACT_APP_API_URL}/add/agent/idupload`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(image),
		// body: image,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};
