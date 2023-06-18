/** @format */

export const listScheduledOrders3 = (userId, token, ownerId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/schedule-order3/list/${ownerId}/${userId}`,
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
		`${process.env.REACT_APP_API_URL}/schedule-order-employee/${orderId}/${userId}`,
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
		`${process.env.REACT_APP_API_URL}/schedule-order-employee/status-values/${userId}`,
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
		`${process.env.REACT_APP_API_URL}/schedule-order-employee-order-status/${scheduleorderId}/status-update/${userId}`,
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

export const UpdateScheduledAppointment = (
	scheduleorderId,
	userId,
	token,
	appointment
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/appointment-employee/${scheduleorderId}/${userId}`,
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

export const getPreviousScheduledHoursStylist = (token, ownerId) => {
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

export const getEmployeesStylist = () => {
	return fetch(`${process.env.REACT_APP_API_URL}/employees-employee`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateEmployeeStylist = (employeeId, userId, token, employee) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/employee/stylist/${employeeId}/${userId}`,
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

export const cloudinaryUploadStylist = (userId, token, image) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/stylist/uploadimages/${userId}`,
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

export const getServicesStylist = (token, ownerId) => {
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
