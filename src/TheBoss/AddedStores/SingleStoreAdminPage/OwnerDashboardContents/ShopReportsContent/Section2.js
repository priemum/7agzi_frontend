import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const Section2 = ({sortedArray}) => {
	var chartDataTotalAmount = {
		options: {
			chart: {
				id: "area",
				background: "",
			},

			plotOptions: {
				bar: {
					horizontal: false,
					borderRadius: 0,
					columnWidth: "90%",
					barHeight: "100%",
					distributed: false,
					rangeBarOverlap: true,
					rangeBarGroupRows: false,

					dataLabels: {
						position: "center",
						maxItems: 100,
						hideOverflowingLabels: true,
						orientation: "vertical",
					},
				},
			},

			dataLabels: {
				enabled: true,
				fontSize: "50px",

				enabledOnSeries: undefined,
				formatter: function (val, opts) {
					return Number(val).toLocaleString();
				},
				style: {
					fontSize: "10px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: "bold",
					// colors: undefined,
					colors: ["black", "#E91E63", "#9C27B0"],
				},
			},

			title: {
				text: "Day Over Day Not Cancelled Reservations ($)",
				align: "left",
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontWeight: "bold",
					// fontFamily: undefined,
					color: "black",
				},
			},
			xaxis: {
				name: "Schedule Date",
				categories:
					sortedArray &&
					sortedArray.map((i) =>
						new Date(i.scheduleStartsAtModified).toLocaleDateString()
					),
			},
			colors: ["#99dd99"],

			stroke: {
				width: [2, 2],
			},

			yaxis: {
				tickAmount: 5,
				labels: {
					formatter: function (val) {
						return val.toFixed(0);
					},
				},
			},
			fill: {
				type: "gradient",
				colors: ["#99dd99"],
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0.9,
					stops: [0, 100],
				},
			},
		},
		series: [
			{
				name: "Total Paid Amount",
				data: sortedArray && sortedArray.map((i) => i.amount.toFixed(2)),
			},
		],
	};

	return (
		<Section2Wrapper className='mx-auto text-center mt-4'>
			<Chart
				options={chartDataTotalAmount.options}
				series={chartDataTotalAmount.series}
				type='area'
				height={300}
			/>
		</Section2Wrapper>
	);
};

export default Section2;

const Section2Wrapper = styled.div``;
