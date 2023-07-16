import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import styled from "styled-components";
import { isAuthenticated } from "../../../../auth";
import { gettingAllUsers, updateUserByBoss } from "../../../apiBoss";
import { toast } from "react-toastify";
import { Select } from "antd";

const { Option } = Select;

const UpdateBusinessAgent = () => {
	let { ownerId } = useParams();
	let location = useLocation();

	useEffect(() => {
		// Log the path of the current URL
		console.log(location.pathname);
		// Log the ownerId
		console.log(ownerId);
	}, [location, ownerId]);

	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [allAgents, setAllAgents] = useState("");
	const [values, setValues] = useState("");

	const { user, token } = isAuthenticated();

	const gettingAllAgents = () => {
		gettingAllUsers(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAgents(data.filter((i) => i.role === 2000));

				setValues(
					data.filter((i) => i._id === ownerId) &&
						data.filter((i) => i._id === ownerId)[0]
				);
			}
		});
	};

	// eslint-disable-next-line
	const handleSubmit = () => {
		updateUserByBoss(user._id, token, {
			name: values.name,
			phone: values.phone,
			email: values.email,
			storeName: values.storeName,
			storeAddress: values.storeAddress,
			storeGovernorate: values.storeGovernorate,
			storeType: values.storeType,
			userId: values._id,
			password: values.password,
			agent: values.agent,
		}).then((data) => {
			if (data.error) {
				// console.log(data.error);
				alert(data.error);
			} else {
				toast.success("Business Partner Successfully Updated");

				setTimeout(() => {
					window.location.reload();
				}, 1500);
			}
		});
	};

	useEffect(() => {
		gettingAllAgents();

		// eslint-disable-next-line
	}, []);

	console.log(allAgents, "Those are all Agents");
	console.log(values, "This is the account that needs to change agent");

	return (
		<UpdateBusinessAgentWrapper>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='UpdateAgent'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				<div>
					<div className='container'>
						<h3>About the current account:</h3>
						<ul className='ulList'>
							<li>Name: {values && values.name}</li>
							<li>Email: {values && values.email}</li>
							<li>Phone: {values && values.phone}</li>
							<li>Store Address: {values && values.storeAddress}</li>
							<li>Store Governorate: {values && values.storeGovernorate}</li>
							<li>Store District: {values && values.storeDistrict}</li>
							<li>
								Account Agent:{" "}
								<strong
									style={{
										color:
											values &&
											values.agent &&
											values.agent.name &&
											values.agent.name.toLowerCase() === "no agent"
												? "red"
												: "green",
									}}
								>
									{" "}
									{values && values.agent && values.agent.name}
								</strong>{" "}
							</li>
						</ul>

						<div className='mt-5'>
							<h3>Update Agent:</h3>

							<div>
								<Select
									className='form-control'
									placeholder='Please choose an agent...'
									style={{
										textAlign: "left",
										textTransform: "capitalize",
									}}
									onChange={(value) => {
										const chosenAgent =
											value === "No Agent" || value === "Please Select"
												? { name: "No Agent" }
												: allAgents.find((agent) => agent._id === value);
										setValues({
											...values,
											agent: chosenAgent,
										});
									}}
									showSearch
									optionFilterProp='children'
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
									value={values.agent && values.agent.name}
								>
									<Option value='Please Select'>Please Select</Option>
									<Option value='No Agent'>No Agent</Option>
									{allAgents &&
										allAgents.map((agent) => (
											<Option key={agent._id} value={agent._id}>
												{agent.name}
											</Option>
										))}
								</Select>
							</div>

							<div className='mt-5 mx-auto text-center'>
								<button onClick={handleSubmit} className='btn btn-success w-25'>
									Update Business Partner's Agent
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UpdateBusinessAgentWrapper>
	);
};

export default UpdateBusinessAgent;

const UpdateBusinessAgentWrapper = styled.div`
	min-height: 1000px;
	margin-top: 50px;

	.grid-container {
		display: grid;
		grid-template-columns: 12% 84%;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
	}

	h3 {
		font-weight: bolder;
	}

	.ulList {
		margin-left: 30px;
		text-transform: capitalize;
		font-weight: bolder;
		font-size: 1.2rem;
	}

	@media (max-width: 1000px) {
		.ulList {
			margin-left: 15px;
		}
	}
`;
