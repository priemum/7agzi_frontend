/** @format */

/**
 * Category
 * */

export const createCategory = (userId, token, category) => {
	return fetch(`${process.env.REACT_APP_API_URL}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateCategory = (categoryId, userId, token, category) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/category/${categoryId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(category),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const removeCategory = (categoryId, userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/category/${categoryId}/${userId}`,
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

export const getCategories = (token, userId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
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

/**End Category */

/**Start Subcategories */
export const getSubCategories = (token, userId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/subcategories/${userId}`, {
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

export const createSubcategory = (userId, token, subcategory) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/subcategory/create/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(subcategory),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateSubcategory = (
	subcategoryId,
	userId,
	token,
	subcategory
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/subcategory/${subcategoryId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(subcategory),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const removeSubcategory = (subcategoryId, userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/subcategory/${subcategoryId}/${userId}`,
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

export const getListOfSubs = (_id) => {
	return fetch(`${process.env.REACT_APP_API_URL}/category/subs/${_id}`, {
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

/**End Subcategory */

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

/**Start Product */

export const createProduct = (userId, token, product) => {
	return fetch(`${process.env.REACT_APP_API_URL}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(product),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getProducts = (userId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/products/${userId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(product),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const removeProduct = (productId, userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
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

/**End Of Product */

/**Orders Management */

export const createOrder = (userId, token, createOrderData) => {
	return fetch(`${process.env.REACT_APP_API_URL}/order/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ order: createOrderData }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listOrders = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/order/list/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const ordersLength = (userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/order/length/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listOrdersDates = (userId, token, day1, day2) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/list/dates/${day1}/${day2}/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			// body: JSON.stringify(today),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listOrdersWeekly = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/orders/orderslist/weekly/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			// body: JSON.stringify(today),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listOrders30Days = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/orders/orderslist/30days/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			// body: JSON.stringify(today),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const aggregateAllOrders = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/orders/orderslist/aggregateall/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			// body: JSON.stringify(today),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const aggregateOrdersByDatesAndStatus = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/orders/orderslist/aggregate-by-month/${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			// body: JSON.stringify(today),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listOrdersProcessing = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/list/order-processing/${userId}`,
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

export const listOrdersReturn = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/list/order-return/${userId}`,
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

export const listOrdersExchange = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/list/order-exchange/${userId}`,
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

export const listOrdersProcessingDetermined = (userId, token, day1, day2) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/list/order-processing/${day1}/${day2}/${userId}`,
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

export const listOrdersProcessed = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/list/order-processed/${userId}`,
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

export const readSingleOrder = (userId, token, orderId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/order/${orderId}/${userId}`, {
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

export const readSingleOrderByInvoice = (userId, token, invoice) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/byinvoice/${invoice}/${userId}`,
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

export const readSingleOrderByPhoneNumber = (userId, token, phoneNumber) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/byphone/${phoneNumber}/${userId}`,
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

export const updateOrder = (orderId, userId, token, order) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/update/order/${orderId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: order }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderEditing = (orderId, userId, token, order) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/update-edit/order-edit/${orderId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: order }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderNoDecrease = (orderId, userId, token, order) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/update/order/nodecrease/${orderId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: order }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderExchange = (orderId, userId, token, order) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/update/order-exchange/${orderId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: order }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderExchangeAndReturn = (orderId, userId, token, order) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/update/order-exchange-return/${orderId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: order }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderExchangeRevert = (orderId, userId, token, order) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/revert/order-exchange-revert/${orderId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ order: order }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listOfOrdersFiltered = (userId, token, limit) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/get-limited/orders/${userId}`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ limit: limit }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

/**End Of Orders Management*/

export const createShippingOptions = (userId, token, shippingOptions) => {
	return fetch(`${process.env.REACT_APP_API_URL}/shipping/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(shippingOptions),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateShippingOptions = (
	shippingId,
	userId,
	token,
	shippingOptions
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/shipping/${shippingId}/${userId}`,
		{
			method: "PUT",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(shippingOptions),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getShippingOptions = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/shipping-options`, {
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

export const removeShippingOption = (shippingId, userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/shipping-carrier/${shippingId}/${userId}`,
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
			body: JSON.stringify({ updatedUserByAdmin: user }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const removeOrder = (orderId, userId, token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/order/${orderId}/${userId}`, {
		method: "DELETE",
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

export const updateOrderInvoice = (userId, token, orderId, invoiceNumber) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/${orderId}/invoice/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ invoiceNumber, orderId }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderInvoiceStock = (
	userId,
	token,
	orderId,
	order,
	invoiceNumber,
	onholdStatus
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/order/${orderId}/invoice/stock/${userId}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ invoiceNumber, orderId, order, onholdStatus }),
		}
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

/**
 * Attributes Management
 * */

export const createColor = (userId, token, color) => {
	return fetch(`${process.env.REACT_APP_API_URL}/color/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(color),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const createSize = (userId, token, size) => {
	return fetch(`${process.env.REACT_APP_API_URL}/size/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(size),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getColors = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/colors`, {
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

export const getSizes = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/sizes`, {
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

/**End Attributes Management */

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

export const getAllHeros = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/heroes`, {
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

// End of Ads Management

export const allLoyaltyPointsAndStoreStatus2 = (token, userId) => {
	return fetch(`${process.env.REACT_APP_API_URL}/store-settings/${userId}`, {
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

export const LoyaltyPointsAndStoreStatus2 = (
	userId,
	token,
	StoreManagement
) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/store-settings/create/${userId}`,
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
