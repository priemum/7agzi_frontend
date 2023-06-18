import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Redirect, Link} from "react-router-dom";
import {
	BranchesOutlined,
	ContactsFilled,
	DollarCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	SettingOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import {Button, Menu} from "antd";
import {isAuthenticated} from "../../auth";
import {getAllUsers} from "../apiOwner";
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
		<Link to='/store/admin/dashboard'>Admin Dashboard</Link>,
		"sub1",
		<PieChartOutlined />
	),
	getItem(
		<Link to='/store/admin/settings'>Settings</Link>,
		"sub2",
		<SettingOutlined />
	),
	getItem(
		<Link to='/store/admin/services'>Services</Link>,
		"sub3",
		<ShopOutlined />
	),
	getItem(
		<Link to='/store/admin/employees'>Employee Management</Link>,
		"sub4",
		<TeamOutlined />
	),

	getItem(
		<Link to='/store/admin/edit-website'>Edit Website Page</Link>,
		"sub5",
		<ShopOutlined />
	),
	getItem(
		<Link to='/store/admin/branches'>Add New Branch</Link>,
		"sub6",
		<BranchesOutlined />
	),
	getItem(
		<Link to='/store/admin/ecommerce-integration'>Add eCommerce Products</Link>,
		"sub7",
		<ShoppingCartOutlined />
	),

	getItem(
		<Link to='/store/admin/billing-account'>Account Billing</Link>,
		"sub10",
		<>
			<DollarCircleOutlined />
		</>
	),
	getItem(
		<Link to='/store/book-appointment-from-store'>SHOP POS</Link>,
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
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		error: "",
		activeUser: true,
		success: false,
		misMatch: false,
		loading: false,
		employeeImage: "",
		role: 1,
		userRole: "",
	});

	const [clickedOn, setClickedOn] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
		setAdminMenuStatus(!collapsed);
	};

	const {user, token} = isAuthenticated();

	const gettingAllUsers = () => {
		getAllUsers(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error, "getting all users error");
			} else {
				setValues({
					...values,
					name:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].name,
					email:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].email,
					role:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].role,

					userRole:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].userRole,

					employeeImage:
						user._id &&
						user._id !== "undefined" &&
						data.filter((e) => e._id === user._id)[0].employeeImage,
				});
			}
		});
	};

	useEffect(() => {
		gettingAllUsers();
		// eslint-disable-next-line
	}, []);

	const currUser = JSON.parse(localStorage.getItem("jwt"));

	localStorage.setItem(
		"jwt",
		JSON.stringify({
			...currUser,
			user: {...currUser.user, userRole: values.userRole},
		})
	);

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
	background: ${(props) => (props.show ? "" : "#1e1e2d")};
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
		background: #1e1e2d !important;
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
