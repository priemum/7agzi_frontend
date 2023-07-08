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

export const gettingAllUsers = (token, userId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/allUsers/boss/${userId}`, {
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

export const readUser = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
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

export const allLoyaltyPointsAndStoreStatusByPhoneAndStore = (
	token,
	storeName,
	phone
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/store-management/boss/${storeName}/${phone}`,
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

export const updateStoreStatus = (userId, token, storeId, status) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/store-status/activation/${storeId}/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ status, storeId }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listScheduledOrdersForTheBoss = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/all-appointments-for-the-boss/list/${userId}`,
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

export const updateUserByBoss = (userId, token, user) => {
	console.log(user, "userfrom api boss");
	return fetch(
		`${process.env.REACT_APP_API_URL}/user/update/byboss/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
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

export const gettingOverallSalonOwners = (userId, token) => {
	console.log(userId, "userId from api boss");
	return fetch(`${process.env.REACT_APP_API_URL}/boss/salon-owners/${userId}`, {
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

export const listScheduledOrdersForTheBossNotPaid = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/not-paid-appointments-for-the-boss/list/${userId}`,
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

export const schedulesNotPaid = (userId, token, ownerId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/appointments-not-paid/list/${userId}/${ownerId}`,
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

export const updateSharePaidStatus = (userId, token, idsToUpdate) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/appointments-update-share-paid/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ idsToUpdate }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateAgentByBoss = (userId, agentId, token, user) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/agent/update/${agentId}/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
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

export const gettingOverallInactiveAgents = (userId, token) => {
	console.log(userId, "userId from api boss");
	return fetch(
		`${process.env.REACT_APP_API_URL}/boss/inactive-agents/${userId}`,
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
