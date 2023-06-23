import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { isAuthenticated, signup } from "../../auth";
import SignupFormBoss from "./SignupFormBoss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UpdateAgent from "./UpdateAgent";
import AgentsReport from "./AgentsReport";

//DreamProject2023!

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.2rem",
			textAlign: "center",
			padding: "10px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "white",
			padding: "10px",
			borderRadius: "5px",
			fontSize: "1.2rem",
			fontWeight: "bold",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
			color: "black",
		};
	}
};

const AgentsManagementMain = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [clickedMenu, setClickedMenu] = useState("AddAgent");

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		error: "",
		storeType: "",
		storeName: "",
		storeAddress: "",
		storeGovernorate: "",
		storeCountry: "",
		storeDistrict: "",
		roleDescription: "Owner",
		success: false,
		redirectToReferrer: "",
		loading: false,
	});

	const {
		name,
		password,
		// eslint-disable-next-line
		success,
		phone,
	} = values;

	// eslint-disable-next-line
	const { token, user } = isAuthenticated();

	const handleSubmit = (e) => {
		console.log(name, "name");
		e.preventDefault();

		if (!name) {
			return toast.info("Name is required");
		}

		if (!phone) {
			return toast.info("Phone is required");
		}

		if (!password) {
			return toast.info("password is required");
		}

		setValues({ ...values, error: false, misMatch: false });
		signup({
			name: name,
			email: phone,
			phone: phone,
			storeType: "Agent",
			storeName: "Agent",
			storeAddress: "Agent",
			storeGovernorate: "Alexandria",
			storeCountry: "Egypt",
			belongsTo: user._id,
			role: 2000,
			roleDescription: "Agent",
			password: password,
		}).then((data) => {
			if (data.error) {
				return toast.error("Stylist Already has an account");
			} else {
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	useEffect(() => {
		if (window.location.search.includes("update-agent")) {
			setClickedMenu("UpdateAgent");
		} else if (window.location.search.includes("agents-report")) {
			setClickedMenu("AgentsReport");
		} else {
			setClickedMenu("AddAgent");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<AgentsManagementMainWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='AgentManagement'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>

				<div className='mt-5'>
					<div className='container' style={{ marginLeft: "200px" }}>
						<div className='row mx-auto'>
							<div
								style={isActive(clickedMenu, "AddAgent")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("AddAgent")}
							>
								<Link
									style={isActive(clickedMenu, "AddAgent")}
									onClick={() => setClickedMenu("AddAgent")}
									to='/boss/admin/agent-management?add-agent'
								>
									<i className='fa-solid fa-person-dress-burst mr-1'></i>
									Add New Agent
								</Link>
							</div>
							<div
								style={isActive(clickedMenu, "UpdateAgent")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("UpdateAgent")}
							>
								<Link
									style={isActive(clickedMenu, "UpdateAgent")}
									onClick={() => setClickedMenu("UpdateAgent")}
									to='/boss/admin/agent-management?update-agent'
								>
									<i className='fa-solid fa-pen mr-1'></i> AGENTS' LIST
								</Link>
							</div>

							<div
								style={isActive(clickedMenu, "AgentsReport")}
								className='col-md-3 menuItems'
								onClick={() => setClickedMenu("AgentsReport")}
							>
								<Link
									style={isActive(clickedMenu, "AgentsReport")}
									onClick={() => setClickedMenu("AgentsReport")}
									to='/boss/admin/agent-management?agents-report'
								>
									<i className='fa-solid fa-chart-simple mr-1'></i> Agents
									Report
								</Link>
							</div>
						</div>
					</div>
					{clickedMenu === "AddAgent" ? (
						<SignupFormBoss
							values2={values}
							setValues2={setValues}
							handleSubmit={handleSubmit}
						/>
					) : null}
					{clickedMenu === "UpdateAgent" ? <UpdateAgent /> : null}
					{clickedMenu === "AgentsReport" ? <AgentsReport /> : null}
				</div>
			</div>
		</AgentsManagementMainWrapper>
	);
};

export default AgentsManagementMain;

const AgentsManagementMainWrapper = styled.div`
	min-height: 1200px;
	overflow: auto;

	.grid-container {
		display: grid;
		grid-template-columns: 16% 84%;
	}

	min-height: 800px;

	.container {
		margin-top: 5px;
		margin-bottom: 20px;
		margin-left: 50px;
	}

	@media (max-width: 1000px) {
		.container {
			margin-top: 5px;
			margin-bottom: 20px;
			margin-left: -10px;
		}
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}
	}
`;
