/** @format */

export const createService = (userId, token, service) => {
	return fetch(`${process.env.REACT_APP_API_URL}/service/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(service),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateService = (serviceId, userId, token, service) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/service/${serviceId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(service),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getServices = (token, ownerId) => {
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
};

export const AddingAppointmentWorkingHours = (
	userId,
	token,
	hoursCanBeScheduled
) => {
	return fetch(`${process.env.REACT_APP_API_URL}/add-hours/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(hoursCanBeScheduled),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getPreviousScheduledHours = (ownerId) => {
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

export const createEmployee = (userId, token, employee) => {
	return fetch(`${process.env.REACT_APP_API_URL}/employee/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(employee),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const cloudinaryUpload1 = (userId, token, image) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/admin/uploadimages/${userId}`,
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

export const getEmployees = (ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/employees/${ownerId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateEmployee = (employeeId, userId, token, employee) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/employee/${employeeId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(employee),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const deleteEmployee = (employeeId, userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/employee/${employeeId}/remove/${userId}`,
		{
			method: "DELETE",
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

export const getAllUsers = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/allusers/${userId}`, {
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

export const updateUserByAdmin = (updatedUserId, userId, token, user) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/user/${updatedUserId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(user),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const LoyaltyPointsAndStoreStatus = (userId, token, StoreManagement) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/store-management/create/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(StoreManagement),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const allLoyaltyPointsAndStoreStatus = (token, ownerId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/store-management/${ownerId}`, {
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

export const listScheduledOrders2 = (userId, token, ownerId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order2/list/${ownerId}/${userId}`,
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

export const listScheduledOrdersStore = (userId, token, ownerId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order-store/list/${ownerId}/${userId}`,
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

export const readSingleAppointment = (userId, token, orderId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order/${orderId}/${userId}`,
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

export const getStatusValues = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order/status-values/${userId}`,
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

export const getStatusValuesStore = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order-store/status-values-store/${userId}`,
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

export const updateOrderStatus = (
	userId,
	token,
	scheduleorderId,
	status,
	updatedByUser
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order/${scheduleorderId}/status/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({status, scheduleorderId, updatedByUser}),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderStatusStore = (
	userId,
	token,
	scheduleorderId,
	status
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order-store/${scheduleorderId}/status-store/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({status, scheduleorderId}),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const UpdateScheduledAppointment = (
	scheduleorderId,
	userId,
	token,
	appointment
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/appointment/${scheduleorderId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(appointment),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const createAds = (userId, token, ads) => {
	return fetch(`${process.env.REACT_APP_API_URL}/ads/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(ads),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateAds = (addsId, userId, token, ads) => {
	return fetch(`${process.env.REACT_APP_API_URL}/ads/${addsId}/${userId}`, {
		method: "PUT",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(ads),
	})
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

export const updateClientActivity = (
	userId,
	token,
	clientUserId,
	activeUser
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/client-update/${clientUserId}/activation/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({activeUser, clientUserId}),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderStylistComment = (
	userId,
	token,
	scheduleorderId,
	commentsByStylist
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order/${scheduleorderId}/appoint-comment/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({commentsByStylist, scheduleorderId}),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const SendingEmailsToClients = (userId, token, allEmails) => {
	return fetch(`${process.env.REACT_APP_API_URL}/sending-emails/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(allEmails),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const readByAdmin = (phoneNumber, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/phone/${phoneNumber}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Hero Comp Management
export const createHero = (userId, token, hero) => {
	return fetch(`${process.env.REACT_APP_API_URL}/hero/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(hero),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateHero = (addsId, userId, token, hero) => {
	return fetch(`${process.env.REACT_APP_API_URL}/hero/${addsId}/${userId}`, {
		method: "PUT",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(hero),
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

export const createContact = (userId, token, contact) => {
	return fetch(`${process.env.REACT_APP_API_URL}/contact/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(contact),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateContact = (contactId, userId, token, contact) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/contact/${contactId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(contact),
		}
	)
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

export const createAbout = (userId, token, about) => {
	return fetch(`${process.env.REACT_APP_API_URL}/about/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(about),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateAbout = (aboutId, userId, token, about) => {
	return fetch(`${process.env.REACT_APP_API_URL}/about/${aboutId}/${userId}`, {
		method: "PUT",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(about),
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

export const updateOwnerProfile = (userId, token, user) => {
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
