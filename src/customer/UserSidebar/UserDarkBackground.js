/** @format */

import React from "react";

const UserDarkBackground = ({ setClick2, setClickMenu2 }) => {
	return (
		<div
			className='DarkbackgroundForSidebar2'
			onClick={() => {
				setClick2(false);
				setClickMenu2(false);
			}}></div>
	);
};

export default UserDarkBackground;
