import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Helmet } from "react-helmet";
import { Spin } from "antd";
import { gettingAllXStores } from "../apiBoss";
import { isAuthenticated } from "../../auth";

const StoreAccountsMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [xStoreAccounts, setXStoreAccounts] = useState("");

	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);

	const { token, user } = isAuthenticated();

	useEffect(() => {
		if (window.location.pathname.includes("/store/admin/dashboard")) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, []);

	const getAllXStoreAccounts = () => {
		setLoading(true);
		gettingAllXStores(token, user._id).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setXStoreAccounts(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		getAllXStoreAccounts();
	}, []);

	console.log(xStoreAccounts, "xstoreAccounts");

	return (
		<StoreAccountsMainWrapper show={collapsed}>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK X Store Dashboard</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/boss/admin/xstore`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='XStores'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "50vh", // adjust as per your requirement
						}}
					>
						<Spin size='large' tip='Loading...' />
					</div>
				) : (
					<div
						className='mt-3 col-md-11 mx-auto'
						style={{ fontSize: "30px", textAlign: "center" }}
					>
						Still Working On It :)
					</div>
				)}
			</div>
		</StoreAccountsMainWrapper>
	);
};

export default StoreAccountsMain;

const StoreAccountsMainWrapper = styled.div`
	min-height: 1200px;

	.grid-container {
		display: grid;
		grid-template-columns: ${(props) => (props.show ? "2% 100%" : "11% 91%")};
	}

	.container-fluid {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.card-body {
		font-weight: bolder;
	}

	table {
		overflow: auto;
	}

	.tableWrapper {
		display: none;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}

		a {
			font-size: 13px !important;
			text-align: center;
		}

		.container-fluid > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container-fluid {
			margin-left: 0px !important;
			text-align: center;
		}

		.apexcharts-toolbar {
			display: none !important;
		}
	}
`;
