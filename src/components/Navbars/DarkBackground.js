/** @format */

import React from "react";
import { useCartContext } from "../../sidebar_context";

const DarkBackground = ({ setClick, setClickMenu }) => {
	const { closeSidebar } = useCartContext();

	return (
		<div className='DarkbackgroundForSidebar' onClick={closeSidebar}></div>
	);
};

export default DarkBackground;
