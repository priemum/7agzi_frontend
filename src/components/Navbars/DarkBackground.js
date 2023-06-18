/** @format */

import React from "react";

const DarkBackground = ({ setClick, setClickMenu }) => {
	return (
		<div
			className='DarkbackgroundForSidebar'
			onClick={() => {
				setClick(false);
				setClickMenu(false);
			}}></div>
	);
};

export default DarkBackground;
