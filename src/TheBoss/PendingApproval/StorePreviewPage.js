import React, {useState} from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import StorePreviewPageMain from "./StorePreviewPageMain";

//DreamProject2023!

const StorePreviewPage = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	return (
		<StorePreviewPageWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='PendingApproval'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>

				<div className=''>
					<StorePreviewPageMain />
				</div>
			</div>
		</StorePreviewPageWrapper>
	);
};

export default StorePreviewPage;

const StorePreviewPageWrapper = styled.div`
	min-height: 1200px;
	overflow: auto;

	.grid-container {
		display: grid;
		grid-template-columns: 2% 98%;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}
	}
`;
