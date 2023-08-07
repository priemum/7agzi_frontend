import React, { useState, useEffect, useRef } from "react";
import { Table } from "antd";
import CountUp from "react-countup";
import { GettingAllSalonOwnersDetails, GettingReportSummary } from "../apiBoss"; // adjust the path accordingly
import { isAuthenticated } from "../../auth";
import "./SalonsData.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SalonsData = () => {
	const [storeOwners, setStoreOwners] = useState([]);
	// eslint-disable-next-line
	const [report, setReport] = useState({});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 100, // Or whatever your default page size is
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	const tableRef = useRef(null); // To refer to the table for scrolling

	const scrollToTable = () => {
		if (tableRef.current) {
			tableRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const { user, token } = isAuthenticated();

	useEffect(() => {
		loadStoreOwners();
		loadReport();
		// eslint-disable-next-line
	}, [pagination, searchQuery]);

	const loadStoreOwners = async () => {
		const data = await GettingAllSalonOwnersDetails(
			token,
			user._id,
			pagination.pageSize,
			pagination.current,
			searchQuery // include search query
		);
		if (data) {
			setStoreOwners(data.users || []);
		}
	};

	const loadReport = async () => {
		const data = await GettingReportSummary(token, user._id);
		if (data) {
			setReport(data);
		}
	};

	const handleTableChange = (pagi) => {
		setCurrentPage(pagi); // Update the current page state when pagination changes
		scrollToTable();
		setPagination({
			...pagination,
			current: pagi,
			pageSize: pagi.pageSize,
		});
	};

	const columns = [
		{
			title: "#",
			key: "index",
			render: (text, record, index) => {
				return (currentPage - 1) * 100 + index + 1;
			},
		},
		{
			title: "Owner Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Governorate",
			dataIndex: "storeGovernorate",
			key: "storeGovernorate",
		},
		{
			title: "District",
			dataIndex: "storeDistrict",
			key: "storeDistrict",
		},
		{
			title: "Address",
			dataIndex: "storeAddress",
			key: "storeAddress",
		},

		{
			title: "Added Settings?",
			key: "settings",
			render: (storeOwner) => {
				return storeOwner.settings.length > 0
					? {
							children: "Yes",
							props: {
								style: { background: "darkgreen", color: "white" },
							},
					  }
					: {
							children: "No",
							props: {
								style: { background: "darkred", color: "white" },
							},
					  };
			},
		},
		{
			title: "Added Services?",
			key: "services",
			render: (storeOwner) => {
				return storeOwner.services.length > 0
					? {
							children: "Yes",
							props: {
								style: { background: "darkgreen", color: "white" },
							},
					  }
					: {
							children: "No",
							props: {
								style: { background: "darkred", color: "white" },
							},
					  };
			},
		},
		{
			title: "Added Employees?",
			key: "employees",
			render: (storeOwner) => {
				return storeOwner.employees.length > 0
					? {
							children: "Yes",
							props: {
								style: { background: "darkgreen", color: "white" },
							},
					  }
					: {
							children: "No",
							props: {
								style: { background: "darkred", color: "white" },
							},
					  };
			},
		},
		{
			title: "Added Gallery?",
			key: "galleries",
			render: (storeOwner) => {
				return storeOwner.galleries.length > 0
					? {
							children: "Yes",
							props: {
								style: { background: "darkgreen", color: "white" },
							},
					  }
					: {
							children: "No",
							props: {
								style: { background: "darkred", color: "white" },
							},
					  };
			},
		},
		{
			title: "Active Store?",
			key: "activeStore",
			render: (storeOwner) => {
				return storeOwner.settings.length > 0 &&
					storeOwner.settings[storeOwner.settings.length - 1].activeStore
					? {
							children: "Yes",
							props: {
								style: { background: "darkgreen", color: "white" },
							},
					  }
					: {
							children: "No",
							props: {
								style: { background: "darkred", color: "white" },
							},
					  };
			},
		},

		{
			title: "Update Account",
			dataIndex: "",
			key: "updateAccount",
			className: "update-account-cell",
			render: (text, storeOwner) => (
				<Link
					to='#'
					onClick={() => {
						window.location.href = `/boss/store/admin/dashboard/${storeOwner._id}`;
					}}
				>
					UPDATE ACCOUNT
				</Link>
			),
		},
	];

	let debounceTimer;
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value);

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			loadStoreOwners();
		}, 300); // 300ms delay
	};

	return (
		<SalonsDataWrapper>
			<div className='col-8 mx-auto my-2'>
				<div
					className='card'
					style={{
						background: "#50cd89",
						textAlign: "center",
					}}
				>
					<div className='card-body main-header'>
						<h5
							style={{
								fontWeight: "bolder",
								color: "white",
								fontSize: "2rem",
							}}
						>
							Registered Salons
						</h5>
						<CountUp
							style={{ color: "white" }}
							duration={2}
							delay={1}
							end={report.registeredStores}
							separator=','
						/>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-2 text-center mx-auto my-2'>
					<div className='card' style={{ background: "#f1416c" }}>
						<div className='card-body'>
							<h5 style={{ fontWeight: "bolder", color: "white" }}>
								Added Settings
							</h5>
							<CountUp
								style={{ color: "white" }}
								duration={2}
								delay={1}
								end={report.addedSettings}
								separator=','
							/>
						</div>
					</div>
				</div>

				<div className='col-2 text-center mx-auto my-2'>
					<div className='card' style={{ background: "#009ef7" }}>
						<div className='card-body'>
							<h5 style={{ fontWeight: "bolder", color: "white" }}>
								Added Services
							</h5>
							<CountUp
								style={{ color: "white" }}
								duration={2}
								delay={1}
								end={report.addedServices}
								separator=','
							/>
						</div>
					</div>
				</div>

				<div className='col-2 text-center mx-auto my-2'>
					<div className='card' style={{ background: "#00f7d5" }}>
						<div className='card-body'>
							<h5 style={{ fontWeight: "bolder", color: "white" }}>
								Added Employees
							</h5>
							<CountUp
								style={{ color: "white" }}
								duration={2}
								delay={1}
								end={report.addedEmployees}
								separator=','
							/>
						</div>
					</div>
				</div>

				<div className='col-2 text-center mx-auto my-2'>
					<div className='card' style={{ background: "#d500f7" }}>
						<div className='card-body'>
							<h5 style={{ fontWeight: "bolder", color: "white" }}>
								Added Gallary
							</h5>
							<CountUp
								style={{ color: "white" }}
								duration={2}
								delay={1}
								end={report.addedGallary}
								separator=','
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='row mt-3'>
				<div className='col-5 text-center mx-auto my-2'>
					<div
						className='card'
						style={{ background: "#17ab00", textAlign: "center" }}
					>
						<div className='card-body'>
							<h5 style={{ fontWeight: "bolder", color: "white" }}>
								Active Salons
							</h5>
							<CountUp
								style={{ color: "white" }}
								duration={2}
								delay={1}
								end={report.activeStores}
								separator=','
							/>
						</div>
					</div>
				</div>
				<div className='col-5 text-center mx-auto my-2'>
					<div
						className='card'
						style={{ background: "#f70022", textAlign: "center" }}
					>
						<div className='card-body'>
							<h5 style={{ fontWeight: "bolder", color: "white" }}>
								Inactive Salons
							</h5>
							<CountUp
								style={{ color: "white" }}
								duration={2}
								delay={1}
								end={report.notActiveStores}
								separator=','
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='mx-auto col-6 my-5'>
				<label>
					{" "}
					<strong>Search</strong>{" "}
				</label>
				<br />
				<input
					className='form-control'
					type='text'
					value={searchQuery}
					onChange={handleSearchChange}
					placeholder='Search by owner name or phone or governorate store name'
					style={{ marginBottom: "10px" }}
				/>
			</div>

			<div
				style={{ maxHeight: "1000px", overflow: "auto", marginBottom: "100px" }}
			>
				<div ref={tableRef}>
					<Table
						dataSource={storeOwners}
						columns={columns}
						rowKey='id'
						pagination={{
							position: ["topRight", "bottomRight"],
							current: pagination.current,
							pageSize: pagination.pageSize,
							onChange: handleTableChange,
						}}
						className='styledTable' // Added this class for styles
					/>
				</div>
			</div>
		</SalonsDataWrapper>
	);
};

export default SalonsData;

const SalonsDataWrapper = styled.div`
	.card-body span {
		font-size: 2rem;
	}

	.main-header > span {
		font-size: 2.5rem;
	}
`;
