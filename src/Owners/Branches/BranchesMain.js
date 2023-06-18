import React, {useState} from "react";
import styled from "styled-components";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";

const BranchesMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	return (
		<BranchesMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='Branches'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div className='messageWrapper mx-auto col-md-6 mt-5'>
					<h2 style={{fontWeight: "bolder"}}>
						Unfortunately, We are not supporting multi branch stores at the
						moment.
						<br />
						<br />
						This functionality still in progress for the current platform setup.
					</h2>
				</div>
			</div>
		</BranchesMainWrapper>
	);
};

export default BranchesMain;

const BranchesMainWrapper = styled.div`
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
