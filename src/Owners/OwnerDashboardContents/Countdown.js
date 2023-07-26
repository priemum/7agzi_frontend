import React from "react";
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const Countdown = ({ theDate, hasAgent }) => {
	const now = new Date();
	const endDate = new Date(theDate);
	const diffTime = Math.abs(endDate - now);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	const remainingDays = hasAgent ? 90 - diffDays : 30 - diffDays;
	const percentage = (remainingDays / 90) * 100;

	return (
		<CountdownWrapper>
			{remainingDays < 0 ? null : (
				<div className='my-5 wrapper'>
					<div className='progress-bar'>
						<CircularProgressbarWithChildren
							value={percentage}
							strokeWidth={5}
							styles={buildStyles({
								pathColor: remainingDays > 0 ? "darkgreen" : "darkred",
								trailColor: "lightgrey",
								textColor: "black",
							})}
						>
							<CircleLabel>
								Remaining:
								<br />
								{remainingDays} Days
								<br />
								Trial
							</CircleLabel>
						</CircularProgressbarWithChildren>
					</div>
				</div>
			)}
		</CountdownWrapper>
	);
};

export default Countdown;

const CountdownWrapper = styled.div`
	.progress-bar {
		width: 105px; /* Adjust the width as desired */
		height: 105px; /* Adjust the height as desired */
		background-color: #f5f8fa;
	}

	@media (max-width: 1100px) {
		display: none;
		.wrapper {
			margin: 10px !important;
		}
	}
`;

const CircleLabel = styled.div`
	text-align: center;
	font-weight: bold;
	font-size: 13px;
	color: black;
	white-space: nowrap;
`;
