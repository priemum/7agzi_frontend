import React from "react";
import { Table } from "antd";
import styled from "styled-components";

const AppointmentsTable = ({ appointmentsHistory }) => {
	console.log(appointmentsHistory, "hist");
	const columns = [
		{
			title: "#",
			key: "index",
			render: (text, record, index) => index + 1,
		},
		{
			title: "Scheduled By",
			dataIndex: "scheduledByUserName",
			key: "scheduledByUserName",
		},

		{
			title: "User Phone",
			dataIndex: "user",
			key: "user",
			render: (user) => user?.phone,
		},

		{
			title: "Employee Name",
			dataIndex: "employeeName",
			key: "employeeName",
		},
		{
			title: "Scheduled Time",
			dataIndex: "scheduledTime",
			key: "scheduledTime",
		},

		{
			title: "Service Duration",
			dataIndex: "serviceDuration",
			key: "serviceDuration",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (createdAt) => new Date(createdAt).toDateString(),
		},
		{
			title: "Salon Name",
			dataIndex: "belongsTo",
			key: "belongsTo",
			render: (belongsTo) => belongsTo?.storeName,
		},
		{
			title: "Salon Phone",
			dataIndex: "belongsTo",
			key: "belongsTo",
			render: (belongsTo) => belongsTo?.phone,
		},
		{
			title: "Source",
			dataIndex: "BookedFrom",
			key: "BookedFrom",
		},
		{
			title: "Coupon Name",
			dataIndex: "appliedCouponData",
			key: "appliedCouponData",
			render: (appliedCouponData) => appliedCouponData?.name || "No Coupon",
		},
	];

	const getRowClassName = (record) => {
		return record.status === "Cancelled" ? "cancelled-row" : "";
	};

	return (
		<AppointmentsTableWrapper>
			<Table
				dataSource={appointmentsHistory}
				columns={columns}
				rowKey={(record) => record.employeeId}
				pagination={{
					current: 1,
					pageSize: 300,
				}}
				rowClassName={getRowClassName}
			/>
		</AppointmentsTableWrapper>
	);
};

export default AppointmentsTable;

const AppointmentsTableWrapper = styled.div`
	.cancelled-row {
		background-color: #ffc4c4;
	}
`;
