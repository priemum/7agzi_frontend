import React from "react";
import styled from "styled-components";
// import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import OwnerNavmenu from "../NewOwnerNavMenu/OwnerNavmenu";
import { useCartContext } from "../../sidebar_context";

const BranchesMain = ({ language }) => {
	// const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	// const [collapsed, setCollapsed] = useState(false);
	const { chosenLanguage } = useCartContext();

	return (
		<BranchesMainWrapper dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
			<div className='grid-container'>
				{/* <div>
					<AdminNavbar
						fromPage='Branches'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
						language={language}
					/>
				</div> */}

				<div className='menuWrapper'>
					<OwnerNavmenu language={chosenLanguage} fromPage='Branches' />
				</div>
				{chosenLanguage === "Arabic" ? (
					<div className='messageWrapper mx-auto col-md-6 mt-5 float-right'>
						<h2 style={{ fontWeight: "bolder" }}>
							للأسف، لا ندعم حاليًا المتاجر ذات الفروع المتعددة.
							<br />
							<br />
							هذه الوظيفة قيد التطوير لتكون جاهزة على المنصة الحالية.
						</h2>
					</div>
				) : (
					<div className='messageWrapper mx-auto col-md-6 mt-5'>
						<h2 style={{ fontWeight: "bolder" }}>
							Unfortunately, We are not supporting multi branch stores at the
							moment.
							<br />
							<br />
							This functionality still in progress for the current platform
							setup.
						</h2>
					</div>
				)}
			</div>
		</BranchesMainWrapper>
	);
};

export default BranchesMain;

const BranchesMainWrapper = styled.div`
	min-height: 1000px;

	.grid-container {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.menuWrapper {
		background-color: black;
		overflow: auto;
		min-height: 1000px;
	}

	@media (max-width: 1200px) {
		.grid-container {
			display: grid;
			grid-template-columns: 18% 82%;
		}

		.menuItems {
			font-size: 12px !important;
			margin: auto !important;
		}

		.messageWrapper {
			margin-right: 2px !important;
			margin-left: 5px !important;
		}
	}
`;
