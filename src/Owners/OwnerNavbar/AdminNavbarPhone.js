import React from "react";
import styled from "styled-components";

const AdminNavbarPhone = ({ language }) => {
	return (
		<AdminNavbarPhoneWrapper>
			<div>Hello from AdminNavbarPhone</div>
		</AdminNavbarPhoneWrapper>
	);
};

export default AdminNavbarPhone;

const AdminNavbarPhoneWrapper = styled.div`
	display: none;

	@media (max-width: 1100px) {
		display: block;
		border: 1px red solid;
	}
`;
