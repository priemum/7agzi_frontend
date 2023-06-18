/** @format */

import React from "react";

const StylistBackground = ({ setClick2, setClickMenu2 }) => {
	return (
		<div
			className='DarkbackgroundForSidebar2'
			onClick={() => {
				setClick2(false);
				setClickMenu2(false);
			}}></div>
	);
};

export default StylistBackground;
