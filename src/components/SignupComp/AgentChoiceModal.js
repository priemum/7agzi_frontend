import { useState } from "react";
import { Modal, Select } from "antd";
import { getAllAgents } from "../../apiCore";

const { Option } = Select;

const AgentChoiceModal = ({
	allAgents,
	language,
	setModalVisible,
	modalVisible,
	setAllAgents,
	values,
	setValues,
}) => {
	const [selectedGovernorate, setSelectedGovernorate] = useState(null);
	const [selectedDistrict, setSelectedDistrict] = useState(null);

	const handleModalClose = () => {
		setModalVisible(false);
	};

	// Extracting unique agentDistrict values and sorting in ascending order
	const agentDistricts = [
		...new Set(
			allAgents && allAgents.map((agent) => agent.agentOtherData.agentDistrict)
		),
	].sort();

	// Extracting unique agentGovernorate values and sorting in ascending order
	const agentGovernorates = [
		...new Set(
			allAgents &&
				allAgents.map((agent) => agent.agentOtherData.agentGovernorate)
		),
	].sort();

	const handleGovernorateChange = (value) => {
		setSelectedGovernorate(value);
		// Filter agents based on selected governorate and district (if district is already selected)
		const filteredAgents =
			allAgents &&
			allAgents.filter((agent) => {
				if (selectedDistrict) {
					return (
						agent.agentOtherData.agentGovernorate === value &&
						agent.agentOtherData.agentDistrict === selectedDistrict
					);
				} else {
					return agent.agentOtherData.agentGovernorate === value;
				}
			});
		setAllAgents(filteredAgents);
	};

	const handleDistrictChange = (value) => {
		setSelectedDistrict(value);
		// Filter agents based on selected governorate and district (if governorate is already selected)
		const filteredAgents =
			allAgents &&
			allAgents.filter((agent) => {
				if (selectedGovernorate) {
					return (
						agent.agentOtherData.agentGovernorate === selectedGovernorate &&
						agent.agentOtherData.agentDistrict === value
					);
				} else {
					return agent.agentOtherData.agentDistrict === value;
				}
			});
		setAllAgents(filteredAgents);
	};

	return (
		<>
			<Modal
				open={modalVisible}
				title={
					language === "Arabic" ? (
						<div style={{ fontWeight: "bold" }}> اختر أقرب وكيل إليك</div>
					) : (
						<div style={{ fontWeight: "bold" }}>
							Choose the closest agent near you
						</div>
					)
				}
				onCancel={handleModalClose}
				width={window.innerWidth < 768 ? "95%" : "75%"}
			>
				{selectedDistrict || selectedGovernorate ? (
					<div
						className='my-1'
						style={{ fontWeight: "bolder", color: "red", cursor: "pointer" }}
						onClick={() => {
							setSelectedDistrict(null);
							setSelectedGovernorate(null);
							getAllAgents().then((data) => {
								if (data.error) {
									console.log("Error Getting Agents");
								} else {
									setAllAgents(data.filter((i) => i.activeAgent));
								}
							});
						}}
					>
						RESET FILTERS
					</div>
				) : null}

				<div className='my-2'>
					<Select
						value={selectedGovernorate}
						style={{ width: "100%" }}
						onChange={handleGovernorateChange}
						placeholder={
							language === "Arabic" ? "اختر المحافظة" : "Select Governorate"
						}
					>
						{agentGovernorates.map((governorate) => (
							<Option key={governorate} value={governorate}>
								{governorate}
							</Option>
						))}
					</Select>
				</div>
				<div className='my-2'>
					<Select
						value={selectedDistrict}
						style={{ width: "100%" }}
						onChange={handleDistrictChange}
						placeholder={
							language === "Arabic" ? "اختر المدينة" : "Select District"
						}
					>
						{agentDistricts.map((district) => (
							<Option key={district} value={district}>
								{district}
							</Option>
						))}
					</Select>
				</div>
				<div className='my-4'>
					{allAgents &&
						allAgents.map((a, i) => {
							return (
								<div key={i}>
									<div className='my-1'>
										<img
											style={{
												width: "250px",
												height: "150px",
												objectFit: "cover",
											}}
											src={a.agentOtherData.personalImage}
											alt={a.name}
										/>
									</div>
									<div
										className='my-1'
										style={{
											fontWeight: "bold",
											color: "#163656",
											textDecoration: "underline",
										}}
										onClick={() => {
											setValues({ ...values, agent: a });
											setModalVisible(false);
										}}
									>
										<strong
											style={{ textTransform: "uppercase", color: "darkred" }}
										>
											<strong
												style={{ textTransform: "uppercase", color: "#163656" }}
											>
												CLICK TO CHOOSE AGENT
											</strong>{" "}
											{a.name}
										</strong>
									</div>

									<div className='my-2'></div>
								</div>
							);
						})}
				</div>
			</Modal>
		</>
	);
};

export default AgentChoiceModal;
