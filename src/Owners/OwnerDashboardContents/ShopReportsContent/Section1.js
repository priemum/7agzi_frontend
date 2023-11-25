import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";

const Section1 = ({ orders, user }) => {
	const ArrayOfRevenue =
		orders &&
		orders
			.filter((i) => i.status.toLowerCase() !== "cancelled")
			.map((ii) => ii.amount);

	const ArrayOfRevenueCancelled =
		orders &&
		orders
			.filter((i) => i.status.toLowerCase() === "cancelled")
			.map((ii) => ii.amount);

	const overAllRevenue =
		ArrayOfRevenue && ArrayOfRevenue.reduce((a, b) => a + b, 0);

	const overAllRevenueCancelled =
		ArrayOfRevenueCancelled &&
		ArrayOfRevenueCancelled.reduce((a, b) => a + b, 0);

	return (
		<Section1Wrapper className='row'>
			<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
				<div className='card' style={{ background: "#009ef7" }}>
					<div className='card-body'>
						<h5 style={{ fontWeight: "bolder", color: "white" }}>
							Overall Appointments
						</h5>
						<CountUp
							style={{ color: "white" }}
							duration={3}
							delay={1}
							end={orders.length}
							separator=','
						/>
					</div>
				</div>
			</div>

			<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
				<div className='card' style={{ background: "#50cd89" }}>
					<div className='card-body'>
						<h5 style={{ fontWeight: "bolder", color: "white" }}>
							Total Amount (Not Cancelled)
						</h5>
						<span style={{ color: "white" }}>
							{user.storeCountry === "Egypt" ? "EGP" : "$"}{" "}
						</span>
						<CountUp
							style={{ color: "white" }}
							duration={3}
							delay={2}
							end={overAllRevenue}
							separator=','
						/>
						<span
							style={{ color: "white", marginLeft: "5px", fontSize: "1.2rem" }}
						>
							(
							<CountUp
								style={{ color: "white", fontSize: "1.2rem" }}
								duration={3}
								delay={2}
								end={ArrayOfRevenue.length}
								separator=','
							/>{" "}
							Appointments)
						</span>
					</div>
				</div>
			</div>

			<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
				<div className='card' style={{ background: "#f1416c" }}>
					<div className='card-body'>
						<h5 style={{ fontWeight: "bolder", color: "white" }}>
							Total Amount (Cancelled)
						</h5>
						<span style={{ color: "white" }}>
							{user.storeCountry === "Egypt" ? "EGP" : "$"}
						</span>{" "}
						<CountUp
							style={{ color: "white" }}
							duration={3}
							delay={3}
							end={overAllRevenueCancelled}
							separator=','
						/>
						<span
							style={{ color: "white", marginLeft: "5px", fontSize: "1.2rem" }}
						>
							(
							<CountUp
								style={{ color: "white", fontSize: "1.2rem" }}
								duration={3}
								delay={3}
								end={ArrayOfRevenueCancelled.length}
								separator=','
							/>{" "}
							Appointments)
						</span>
					</div>
				</div>
			</div>
		</Section1Wrapper>
	);
};

export default Section1;

const Section1Wrapper = styled.div``;
