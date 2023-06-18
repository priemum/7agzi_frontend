import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const Section4 = ({orders, NotCancelledOrders}) => {
	const aggregatedArrayStatus =
		orders &&
		orders.reduce((result, current) => {
			const existingItem = result.find(
				(item) => item.status === current.status
			);

			if (existingItem) {
				existingItem.amount += current.amount;
				existingItem.servicePrice += current.servicePrice;
				existingItem.paidTip += current.paidTip;
				existingItem.onlineServicesFees += current.onlineServicesFees;
				existingItem.reservationsCount += 1;
			} else {
				result.push({
					status: current.status,
					amount: current.amount,
					servicePrice: current.servicePrice,
					paidTip: current.paidTip,
					onlineServicesFees: current.onlineServicesFees,
					reservationsCount: 1,
				});
			}

			return result;
		}, []);

	var donutChart1 = {
		series:
			aggregatedArrayStatus &&
			aggregatedArrayStatus.map((i) => {
				return i.amount;
			}),
		labels: aggregatedArrayStatus && aggregatedArrayStatus.map((i) => i.status),
		title: {
			text: "Overall Appointments By Status",
			align: "center",
		},

		tooltip: {
			enabled: true,
			y: {
				formatter: function (val, {seriesIndex}) {
					let percentage =
						(
							(val / aggregatedArrayStatus.reduce((a, b) => a + b.amount, 0)) *
							100
						).toFixed(2) + "%";
					return `${val} (${percentage})`;
				},
			},
		},

		dataLabels: {
			enabled: true,
			formatter: function (val, opts) {
				return `$ ${aggregatedArrayStatus[opts.seriesIndex].amount} `;
			},
		},

		colors: [
			"#004589",
			"#7F94B0",
			"#ffb1d8",
			"#897680",
			"#EF6537",
			"#C0ADDB",
			"#00b1b1",
			"#c4ffff",
			"#CDD7B6",
			"#C1F666",
			"#D43F97",
			"#1E5D8C",
			"#421243",
			"#EC3C65",
			"#ADD8C7",
		],

		legend: {
			show: true,
			position: "top",
		},
	};

	const NotCancelledOrdersModified =
		NotCancelledOrders &&
		NotCancelledOrders.map((i) => {
			return {
				...i,
				employeeName: i.employees[0].employeeName,
			};
		});

	const aggregatedArrayEmployees =
		NotCancelledOrdersModified &&
		NotCancelledOrdersModified.reduce((result, current) => {
			const existingItem = result.find(
				(item) => item.employeeName === current.employeeName
			);

			if (existingItem) {
				existingItem.amount += current.amount;
				existingItem.servicePrice += current.servicePrice;
				existingItem.paidTip += current.paidTip;
				existingItem.onlineServicesFees += current.onlineServicesFees;
				existingItem.reservationsCount += 1;
			} else {
				result.push({
					employeeName: current.employeeName,
					amount: current.amount,
					servicePrice: current.servicePrice,
					paidTip: current.paidTip,
					onlineServicesFees: current.onlineServicesFees,
					reservationsCount: 1,
				});
			}

			return result;
		}, []);

	function getMinMax(arr) {
		if (!arr) {
			return null;
		}
		var minV = arr[0];
		var maxV = arr[0];
		var a;
		for (a of arr) {
			if (a < minV) minV = a;
			if (a > maxV) maxV = a;
		}
		return [minV, maxV];
	}

	const xAxisValues =
		aggregatedArrayEmployees && aggregatedArrayEmployees.map((i) => i.amount);

	var barchartHorizontal = {
		chart: {
			type: "bar",
		},
		plotOptions: {
			bar: {
				horizontal: true,
				borderRadius: 15,
				borderRadiusOnAllStackedSeries: true,
				dataLabels: {
					position: "bottom",
					hideOverflowingLabels: true,
				},
			},
		},

		title: {
			text: "Overall Appointments By Stylist",
			align: "center",
		},

		colors: [
			function ({value, seriesIndex, dataPointIndex, w}) {
				if (dataPointIndex === 0) {
					return "#00b3b3";
				} else if (dataPointIndex === 1) {
					return "#005ab3";
				} else if (dataPointIndex === 2) {
					return "#a9f5da";
				} else if (dataPointIndex === 3) {
					return "#6d4a0d";
				} else if (dataPointIndex === 4) {
					return "#ff0000";
				} else if (dataPointIndex === 5) {
					return "#f1cb87";
				} else if (dataPointIndex === 6) {
					return "#005ab3";
				} else {
					return "#005ab3";
				}
			},
		],
		dataLabels: {
			enabled: true,
			style: {
				colors: ["#333"],
				fontSize: 10,
			},

			offsetX: 320,

			formatter: function (value) {
				const index =
					aggregatedArrayEmployees &&
					aggregatedArrayEmployees
						.map((i) => Number(i.amount).toFixed(2))
						.indexOf(Number(value).toFixed(2));

				return (
					"$ " +
					Number(value).toLocaleString() +
					` (${
						aggregatedArrayEmployees &&
						aggregatedArrayEmployees[index].reservationsCount
					} Appointments)`
				);
			},
		},

		xaxis: {
			labels: {
				show: false,
			},
			min: 0,
			max: getMinMax(xAxisValues)[1] + getMinMax(xAxisValues)[1] * 0.25,
		},

		series: [
			{
				data:
					aggregatedArrayEmployees &&
					aggregatedArrayEmployees.map((i) => {
						return {
							x: i.employeeName,
							y: Number(i.amount).toFixed(2),
						};
					}),
			},
		],
	};

	const aggregatedArrayBookingSource =
		orders &&
		orders.reduce((result, current) => {
			const existingItem = result.find(
				(item) => item.BookedFrom === current.BookedFrom
			);

			if (existingItem) {
				existingItem.amount += current.amount;
				existingItem.servicePrice += current.servicePrice;
				existingItem.paidTip += current.paidTip;
				existingItem.onlineServicesFees += current.onlineServicesFees;
				existingItem.reservationsCount += 1;
			} else {
				result.push({
					BookedFrom: current.BookedFrom,
					amount: current.amount,
					servicePrice: current.servicePrice,
					paidTip: current.paidTip,
					onlineServicesFees: current.onlineServicesFees,
					reservationsCount: 1,
				});
			}

			return result;
		}, []);

	console.log(aggregatedArrayBookingSource, "aggregatedArrayBookingSource");

	var donutChart2 = {
		series:
			aggregatedArrayBookingSource &&
			aggregatedArrayBookingSource.map((i) => {
				return i.amount;
			}),
		labels:
			aggregatedArrayBookingSource &&
			aggregatedArrayBookingSource.map((i) => i.BookedFrom),
		title: {
			text: "Overall Appointments By Booking Source",
			align: "center",
		},

		tooltip: {
			enabled: true,
			y: {
				formatter: function (val, {seriesIndex}) {
					let percentage =
						(
							(val /
								aggregatedArrayBookingSource.reduce(
									(a, b) => a + b.amount,
									0
								)) *
							100
						).toFixed(2) + "%";
					return `$${val} (${percentage}) (${aggregatedArrayBookingSource[seriesIndex].reservationsCount} Appointments)`;
				},
			},
		},

		dataLabels: {
			enabled: true,
			formatter: function (val, opts) {
				return `$ ${aggregatedArrayBookingSource[opts.seriesIndex].amount} `;
			},
		},

		colors: [
			"#004589",
			"#7F94B0",
			"#ffb1d8",
			"#897680",
			"#EF6537",
			"#C0ADDB",
			"#00b1b1",
			"#c4ffff",
			"#CDD7B6",
			"#C1F666",
			"#D43F97",
			"#1E5D8C",
			"#421243",
			"#EC3C65",
			"#ADD8C7",
		],

		legend: {
			show: true,
			position: "top",
		},
	};

	return (
		<Section4Wrapper className='row my-5'>
			<div className='col-lg-5 mx-auto'>
				<Chart
					title={donutChart1.title}
					options={donutChart1}
					series={donutChart1.series}
					type='donut'
					height={500}
				/>
			</div>
			<div className='col-lg-5 mx-auto'>
				<Chart
					title={donutChart2.title}
					options={donutChart2}
					series={donutChart2.series}
					type='donut'
					height={500}
				/>
			</div>
			<div className='col-lg-10 mx-auto'>
				<Chart
					title={barchartHorizontal.title}
					options={barchartHorizontal}
					series={barchartHorizontal.series}
					type='bar'
					height={500}
				/>
			</div>
		</Section4Wrapper>
	);
};

export default Section4;

const Section4Wrapper = styled.div``;
