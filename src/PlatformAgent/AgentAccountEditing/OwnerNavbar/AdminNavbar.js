import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import {
	// eslint-disable-next-line
	BranchesOutlined,
	ContactsFilled,
	DollarCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	SettingOutlined,
	ShopOutlined,
	// eslint-disable-next-line
	ShoppingCartOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import LastAddedLogoImage from "./LastAddedLogoImage";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

// Split the pathname into segments
const pathnameSegments = window.location.pathname.split("/");
// Get the last segment (ownerId)
const ownerId = pathnameSegments[pathnameSegments.length - 1];

const items = [
	getItem(
		<div className='logoClass'></div>,
		"StoreLogo",
		<LastAddedLogoImage />
	),
	getItem(
		<div className='logoClass '></div>,
		"StoreLogo",
		<div
			className='logoClass no-background'
			style={{
				width: "100%",
			}}
		>
			<hr />
		</div>
	),
	getItem(
		<Link to={`/store/admin/dashboard`}>Admin Dashboard</Link>,
		"sub1",
		<PieChartOutlined />
	),
	getItem(
		<Link to={`/store/admin/settings/agent/help/${ownerId}`}>Settings</Link>,
		"sub2",
		<SettingOutlined />
	),
	getItem(
		<Link to={`/store/admin/services/agent/help/${ownerId}`}>Services</Link>,
		"sub3",
		<ShopOutlined />
	),
	getItem(
		<Link to={`/store/admin/employees/agent/help/${ownerId}`}>
			Employee Management
		</Link>,
		"sub4",
		<TeamOutlined />
	),

	getItem(
		<Link to={`/store/admin/edit-website/agent/help/${ownerId}`}>
			Edit Website Page
		</Link>,
		"sub5",
		<ShopOutlined />
	),
	// getItem(
	// 	<Link to='/boss/store/admin/branches'>Add New Branch</Link>,
	// 	"sub6",
	// 	<BranchesOutlined />
	// ),
	// getItem(
	// 	<Link to='/boss/store/admin/ecommerce-integration'>Add eCommerce Products</Link>,
	// 	"sub7",
	// 	<ShoppingCartOutlined />
	// ),

	getItem(
		<Link to={`/store/admin/billing-account`}>Account Billing</Link>,
		"sub10",
		<>
			<DollarCircleOutlined />
		</>
	),
	getItem(
		<Link to={`/store/book-appointment-from-store`}>SHOP POS</Link>,
		"sub11",
		<ContactsFilled />
	),
	// getItem("Option 3", "4", <ContainerOutlined />),
];

const AdminNavbar = ({
	fromPage,
	setAdminMenuStatus,
	collapsed,
	setCollapsed,
}) => {
	const [clickedOn, setClickedOn] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
		setAdminMenuStatus(!collapsed);
	};

	return (
		<AdminNavbarWrapper
			show={collapsed}
			show2={clickedOn}
			style={{
				width: 285,
			}}
		>
			<Button
				type='primary'
				onClick={toggleCollapsed}
				style={{
					marginBottom: 8,
					textAlign: "center",
					marginLeft: 10,
					marginTop: 3,
				}}
			>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<Menu
				defaultSelectedKeys={
					fromPage === "AdminDasboard"
						? "sub1"
						: fromPage === "Settings"
						? "sub2"
						: fromPage === "Services"
						? "sub3"
						: fromPage === "Employees"
						? "sub4"
						: fromPage === "Branches"
						? "sub6"
						: fromPage === "Ecommerce"
						? "sub7"
						: fromPage === "GA"
						? "sub8"
						: fromPage === "FacebookPixel"
						? "sub9"
						: fromPage === "BillingMain"
						? "sub10"
						: fromPage === "POS"
						? "sub11"
						: fromPage === "EditWebsite"
						? "sub5"
						: "sub1"
				}
				defaultOpenKeys={[
					"sub1",

					// fromPage === "AddGender" ||
					// fromPage === "UpdateGender" ||
					// fromPage === "DeleteGender"
					// 	? "sub2"
					// 	: null,

					// "sub4",

					// "sub6",
				]}
				mode='inline'
				theme='dark'
				inlineCollapsed={collapsed}
				items={items}
				onClick={(e) => {
					if (e.key === "StoreLogo") {
						setClickedOn(true);
					} else {
						setClickedOn(false);
					}
					return <Redirect to={e.key} />;
				}}
			/>
		</AdminNavbarWrapper>
	);
};

export default AdminNavbar;

const AdminNavbarWrapper = styled.div`
	margin-bottom: 15px;
	background: ${(props) => (props.show ? "" : "black")};
	top: 0px !important;
	position: fixed;
	z-index: 20000;
	overflow: auto;
	height: ${(props) => (props.show ? "" : "100%")} !important;

	.logoClass {
		display: ${(props) => (props.show ? "none " : "block")} !important;
	}

	li {
		/* margin: 20px auto; */
		font-size: 0.9rem;
		margin-bottom: ${(props) => (props.show ? "20px " : "15px")};
	}

	hr {
		color: white !important;
		background: white !important;
	}

	.ant-menu.ant-menu-inline-collapsed {
		min-height: 850px;
		/* position: fixed; */
	}

	.ant-menu.ant-menu-dark,
	.ant-menu-dark .ant-menu-sub,
	.ant-menu.ant-menu-dark .ant-menu-sub {
		color: rgba(255, 255, 255, 0.65);
		background: black !important;
	}

	.ant-menu.ant-menu-dark,
	.ant-menu-dark {
		position: ${(props) => (props.show ? "fixed" : "")};
	}

	.ant-menu-item-selected {
		background: ${(props) => (props.show2 ? "none !important" : "")};
	}

	@media (max-width: 1650px) {
		background: ${(props) => (props.show ? "" : "transparent")};

		ul {
			width: 250px;
			padding: 0px !important;
			margin: 0px !important;
		}

		ul > li {
			font-size: 0.8rem !important;
		}
	}

	@media (max-width: 1200px) {
		ul {
			display: ${(props) => (props.show ? "none" : "")};
			margin-top: 0px !important;
			top: 0px !important;
		}

		.ant-menu.ant-menu-dark {
			/* position: fixed; */
		}

		button {
			margin-top: 5px !important;
		}
	}
`;
