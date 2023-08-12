import React from "react";
import styled, { keyframes } from "styled-components";

const drawCircle = keyframes`
  from {
    stroke-dashoffset: 157;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const AnimationComponentWrapper = styled.div`
	background-color: white;
	.container .row .col-4:nth-child(3n) {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	svg {
		position: absolute;
		top: -20%;
		left: 35%;
	}

	circle {
		fill: none;
		stroke: black;
		stroke-width: 2;
		stroke-dasharray: 157; /* Approximate value for circle with 25 radius */
		stroke-dashoffset: 157;
		animation: ${drawCircle} 3s forwards; /* 2s is the duration, change as needed */
	}
`;

const AnimationComponent = () => {
	return (
		<AnimationComponentWrapper>
			<div className='container'>
				<div className='row'>
					<div className='col-4 mb-4'>Haircut</div>
					<div className='col-4 mb-4'>120 EGP</div>
					<div className='col-4 mb-4'>
						Edit
						<svg width='50' height='50'>
							<circle cx='20' cy='20' r='20' />
						</svg>
					</div>

					<div className='col-4'>beardcut</div>
					<div className='col-4'>50 EGP</div>
					<div className='col-4'>
						Edit
						<svg width='50' height='50'>
							<circle cx='20' cy='20' r='20' />
						</svg>
					</div>

					<div className='col-4'>shaving</div>
					<div className='col-4'>100 EGP</div>
					<div className='col-4'>
						Edit
						<svg width='50' height='50'>
							<circle cx='20' cy='20' r='20' />
						</svg>
					</div>
				</div>
			</div>
		</AnimationComponentWrapper>
	);
};

export default AnimationComponent;
