/** @format */

import React, { useContext, useReducer } from "react";
import reducer from "./sidebar_reducer";
import { SIDEBAR_OPEN, SIDEBAR_CLOSE, IS_ARABIC, IS_ENGLISH } from "./actions";

const initialState = {
	isSidebarOpen: false,
	chosenLanguage: "Arabic",
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const openSidebar = () => {
		dispatch({ type: SIDEBAR_OPEN });
	};
	const closeSidebar = () => {
		dispatch({ type: SIDEBAR_CLOSE });
	};

	const chosenLanguageArabic = () => {
		dispatch({ type: IS_ARABIC });
	};
	const chosenLanguageEngish = () => {
		dispatch({ type: IS_ENGLISH });
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				openSidebar,
				closeSidebar,
				chosenLanguageArabic,
				chosenLanguageEngish,
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
