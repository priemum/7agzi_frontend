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

export const allStoresSorted = (
	lat,
	lon,
	country,
	governorate,
	district,
	storeType,
	service,
	pagination,
	page
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/store-management/pagination/${lat}/${lon}/${country}/${governorate}/${district}/${storeType}/${service}/${pagination}/${page}`,
		{
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const allStoresSorted2 = (
	lat,
	lon,
	country,
	governorate,
	district,
	storeType,
	service,
	pagination,
	page
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/store-management2/pagination2/${lat}/${lon}/${country}/${governorate}/${district}/${storeType}/${service}/${pagination}/${page}`,
		{
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const activeStoresCount = (
	country,
	governorate,
	district,
	storeType,
	service
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/active-stores-count/${country}/${governorate}/${district}/${storeType}/${service}`,
		{
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}
	)
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
export const getBraintreeClientToken = (userId, token, country) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/getToken/${country}/${userId}`,
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

export const processPaymentAndThenStore = (
	userId,
	token,
	paymentData,
	country
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/braintree/payment-store/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(paymentData, country),
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
			body: JSON.stringify(paymentData),
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

export const allLoyaltyPointsAndStoreStatusWithServices = (token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/store-management-frontend-updated`,
		{
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
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

export const getFirstAvailableAppointmentEmployee = (ownerId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/first-available-appointment-time/${ownerId}`,
		{
			method: "GET",
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getUniqueServicesPerStore = (ownerId) => {
	if (ownerId) {
		return fetch(
			`${process.env.REACT_APP_API_URL}/findUniqueActiveServices/${ownerId}`,
			{
				method: "GET",
				headers: {
					// content type?
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		)
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
};

export const getUniqueCustomerTypesStore = (ownerId) => {
	if (ownerId) {
		return fetch(
			`${process.env.REACT_APP_API_URL}/findUniqueCustomerTypes/${ownerId}`,
			{
				method: "GET",
				headers: {
					// content type?
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		)
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
};

export const gettingFirstAppointmentFromBackend = (
	serviceName,
	customerType,
	date,
	country,
	ownerId
) => {
	console.log(serviceName, "serviceNames");
	if (ownerId) {
		return fetch(
			`${process.env.REACT_APP_API_URL}/findFirstAvailableAppointment/${serviceName}/${customerType}/${date}/${country}/${ownerId}`,
			{
				method: "GET",
				headers: {
					// content type?
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		)
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
};

export const gettingEmployeeFreeSlots = (
	employeeId,
	customerType,
	services,
	date,
	ownerId
) => {
	if (ownerId) {
		return fetch(
			`${process.env.REACT_APP_API_URL}/employee-schedule/${employeeId}/${customerType}/${services}/${date}/${ownerId}`,
			{
				method: "GET",
				headers: {
					// content type?
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		)
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	}
};
