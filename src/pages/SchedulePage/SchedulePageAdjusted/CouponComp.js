/** @format */

import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { readSingleCoupon } from "../../../apiCore";

const CouponComp = ({
	setAppliedCoupon,
	appliedCoupon,
	handleAppliedCoupon,
	appliedCouponName,
	couponApplied,
	setCouponApplied,
}) => {
	return (
		<CouponCompWrapper>
			<div className='col-md-5'>
				<div className='row'>
					<label
						className='mt-2'
						style={{
							fontWeight: "bold",
							color: "white",
							textAlign: "center",
							fontSize: "1.1rem",
						}}
					>
						COUPON:
					</label>
					<div className='col-md-7 col-10'>
						<input
							className='form-control '
							placeholder='Please paste your coupon here!'
							onChange={handleAppliedCoupon}
							value={appliedCouponName}
						/>
					</div>

					<div className='col-1'>
						<div>
							<span
								className='spanIcon'
								style={{
									fontSize: "1.7rem",
									fontWeight: "bolder",
									// border: "2px grey solid",
									borderRadius: "10px",
									padding: "0px 10px",
									background: "#e8eaf3",
								}}
								disabled={appliedCouponName.length === 0 ? true : false}
								onClick={() => {
									readSingleCoupon(appliedCouponName).then((data) => {
										if (data.error) {
											console.log(data.error);
										} else {
											setCouponApplied(true);
											setAppliedCoupon(data[0]);
										}
									});
								}}
							>
								<ArrowRightOutlined />
							</span>
						</div>
					</div>
				</div>

				{couponApplied ? (
					<>
						{appliedCoupon && appliedCoupon.name && appliedCoupon.expiry ? (
							<div className='mt-2'>
								{new Date(appliedCoupon.expiry).setHours(0, 0, 0, 0) >=
								new Date().setHours(0, 0, 0, 0) ? (
									<div
										style={{
											fontWeight: "bold",
											fontSize: "12px",
											color: "white",
										}}
									>
										Your Coupon Was Successfully Applied{" "}
										<span style={{ fontWeight: "bold", color: "green" }}>
											{" "}
											({appliedCoupon.discount}% OFF)
										</span>
									</div>
								) : (
									<div
										className='mt-2'
										style={{
											fontWeight: "bold",
											fontSize: "12px",
											color: "red",
										}}
									>
										Unfortunately, This Coupon is unavailable or might be
										expired
									</div>
								)}
							</div>
						) : (
							<div
								className='mt-2'
								style={{ fontWeight: "bold", fontSize: "12px", color: "red" }}
							>
								Unfortunately, This Coupon is unavailable or might be expired
							</div>
						)}
					</>
				) : null}
			</div>
			<hr />
		</CouponCompWrapper>
	);
};

export default CouponComp;

const CouponCompWrapper = styled.div`
	margin-bottom: 10px;

	svg {
		top: 0px !important;
	}

	@media (max-width: 1000px) {
		svg,
		.spanIcon {
			font-size: 1.3rem !important;
		}
	}
`;
