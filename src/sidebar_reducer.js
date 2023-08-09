import { SIDEBAR_OPEN, SIDEBAR_CLOSE, IS_ARABIC, IS_ENGLISH } from "./actions";

const cart_reducer = (state, action) => {
	if (action.type === SIDEBAR_OPEN) {
		return { ...state, isSidebarOpen: true };
	}
	if (action.type === SIDEBAR_CLOSE) {
		return { ...state, isSidebarOpen: false };
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

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
