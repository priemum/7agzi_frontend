import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import { gettingAllUsers, updateUserByBoss } from "../apiBoss";
import SignupFormBoss from "./SignupFormBoss";
import { toast } from "react-toastify";
import AgentMoreDetails from "./AgentMoreDetails";

const UpdateAgent = () => {
	const [allAgents, setAllAgents] = useState("");
	const [selectedAgent, setSelectedAgent] = useState("");
	const [showMoreDetails, setShowMoreDetails] = useState(false);
	const [values, setValues] = useState("");

	const { user, token } = isAuthenticated();

	const gettingAllAgents = () => {
		gettingAllUsers(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAgents(data.filter((i) => i.role === 2000));
			}
		});
	};

	useEffect(() => {
		gettingAllAgents();
		// eslint-disable-next-line
	}, []);

	console.log(allAgents, "allagents");
	console.log(values, "values");

	const handleSubmit = (e) => {
		e.preventDefault();
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
		}).then((data) => {
			if (data.error) {
				// console.log(data.error);
				alert(data.error);
			} else {
				toast.success("Agent Successfully Updated");
				setSelectedAgent("");
				setValues("");
			}
		});
	};
	return (
		<UpdateAgentWrapper>
			<div>
				{!selectedAgent ? (
					<div className='row'>
						{allAgents &&
							allAgents.map((agent, i) => {
								console.log(agent.activeAgent, "agent");
								return (
									<div
										className='col-md-4 mx-auto agentName'
										key={i}
										onClick={() => {
											setSelectedAgent(agent);
											setValues(agent);
										}}
									>
										{i + 1}-{"  "} {agent.name}{" "}
										<span>
											{agent.activeAgent ? (
												<span style={{ color: "green", fontWeight: "bolder" }}>
													(Active Agent)
												</span>
											) : (
												<span style={{ color: "red", fontWeight: "bolder" }}>
													(Inactive)
												</span>
											)}
										</span>
									</div>
								);
							})}
					</div>
				) : null}

				{selectedAgent && selectedAgent.name ? (
					<div>
						<div
							className='backtoAgent'
							onClick={() => {
								setSelectedAgent("");
								setShowMoreDetails(false);
							}}
						>
							Back To Agent List
						</div>
						<AgentMoreDetails
							values={values}
							setValues={setValues}
							setSelectedAgent={setSelectedAgent}
							showMoreDetails={showMoreDetails}
							setShowMoreDetails={setShowMoreDetails}
							user={user}
							token={token}
						/>
						{!showMoreDetails ? (
							<div>
								<SignupFormBoss
									values2={values}
									setValues2={setValues}
									handleSubmit={handleSubmit}
									fromPage='Update'
								/>
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</UpdateAgentWrapper>
	);
};

export default UpdateAgent;

const UpdateAgentWrapper = styled.div`
	margin: 0px 200px;
	background-color: white;
	padding: 10px;

	input[type="text"],
	input[type="email"],
	input[type="password"],
	input[type="date"],
	select,
	textarea {
		display: block;
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
	}
	input[type="text"]:focus,
	input[type="email"]:focus,
	input[type="password"]:focus,
	input[type="date"]:focus,
	select:focus,
	textarea:focus,
	label:focus {
		outline: none;
		border: 1px solid var(--primaryColor);
		box-shadow: 5px 8px 3px 0px rgba(0, 0, 0, 0.3);
		transition: var(--mainTransition);
		font-weight: bold;
	}

	.form-container {
		margin-left: 50px;
		margin-right: 50px;
	}

	.agentName {
		text-align: center;
		font-weight: bolder;
		font-size: 1.1rem;
		text-decoration: underline;
		cursor: pointer;
		color: darkgoldenrod;
	}

	.backtoAgent {
		font-weight: bold;
		font-size: 1.4rem;
		text-decoration: underline;
		margin: 10px 0px;
		cursor: pointer;
	}

	@media (max-width: 1000px) {
		margin: 0px 10px;
	}
`;
