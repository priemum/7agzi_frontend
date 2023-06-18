import React, {useState} from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";

const EcommerceMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	return (
		<EcommerceMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='Ecommerce'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='messageWrapper mx-auto col-md-6 mt-5'>
					<h2 style={{fontWeight: "bolder"}}>
						Unfortunately, Your current plan doesn't support adding an eCommerce
						store into your system.
						<br />
						<br />
						You can Whats App +19099914386 and one of our representatives will
						advise.
						<br />
						<br />
						Please be noted that adding an eCommerce platform to your plan will
						increase it by at least $25/Mo.
					</h2>
				</div>
			</div>
		</EcommerceMainWrapper>
	);
};

export default EcommerceMain;

const EcommerceMainWrapper = styled.div`
	min-height: 1000px;
	.grid-container {
		display: grid;
		grid-template-columns: 16% 84%;
	}

	@media (max-width: 1200px) {
		.messageWrapper {
			margin-right: 2px !important;
			margin-left: 5px !important;
		}
	}
`;
