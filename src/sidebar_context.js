/** @format */

import React, { useContext, useReducer } from "react";
import reducer from "./sidebar_reducer";
import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	IS_ARABIC,
	IS_ENGLISH,
	USER_LOCATION,
} from "./actions";

const getLanguageLocalStorage = () => {
	let language = localStorage.getItem("lang");
	if (language) {
		return JSON.parse(localStorage.getItem("lang"));
	} else {
		return "English";
	}
};

const initialState = {
	isSidebarOpen2: false,
	chosenLanguage: getLanguageLocalStorage(),
	userLocation: {
		country: "",
		state: "",
		latitude: "",
		longitude: "",
	},
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const openSidebar2 = () => {
		dispatch({ type: SIDEBAR_OPEN });
	};
	const closeSidebar2 = () => {
		dispatch({ type: SIDEBAR_CLOSE });
	};

	const chosenLanguageArabic = () => {
		dispatch({ type: IS_ARABIC });
	};
	const chosenLanguageEngish = () => {
		dispatch({ type: IS_ENGLISH });
	};

	const capturingUserLocation = (
		country,
		countryState,
		longitude,
		latitude
	) => {
		dispatch({
			type: USER_LOCATION,
			payload: { country, countryState, longitude, latitude },
		});
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				openSidebar2,
				closeSidebar2,
				chosenLanguageArabic,
				chosenLanguageEngish,
				capturingUserLocation,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// make sure use
export const useCartContext = () => {
	return useContext(CartContext);
};
