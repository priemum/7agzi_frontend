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

export const storesListForAgents = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/agent/stores/${userId}`, {
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

export const GettingAllSalonOwnersDetails = (
	token,
	userId,
	pagination,
	page,
	searchQuery
) => {
	return fetch(
		`${
			process.env.REACT_APP_API_URL
		}/list-of-stores-xlook-agent/${pagination}/${page}/${
			searchQuery ? searchQuery : "none"
		}/${userId}`,
		{
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
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

export const GettingReportSummary = (token, userId) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/stores-report-summary-agent/${userId}`,
		{
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
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
