import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	IS_ARABIC,
	IS_ENGLISH,
	USER_LOCATION,
} from "./actions";

const cart_reducer = (state, action) => {
	if (action.type === SIDEBAR_OPEN) {
		return { ...state, isSidebarOpen2: true };
	}
	if (action.type === SIDEBAR_CLOSE) {
		return { ...state, isSidebarOpen2: false };
	}

	if (action.type === IS_ARABIC) {
		return {
			...state,
			chosenLanguageArabic: "Arabic",
			chosenLanguage: "Arabic",
		};
	}
	if (action.type === IS_ENGLISH) {
		return {
			...state,
			chosenLanguageEngish: "English",
			chosenLanguage: "English",
		};
	}

	if (action.type === USER_LOCATION) {
		const { country, countryState, longitude, latitude } = action.payload;

		return {
			...state,
			userLocation: {
				country: country,
				state: countryState,
				longitude: longitude,
				latitude: latitude,
			},
		};
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
