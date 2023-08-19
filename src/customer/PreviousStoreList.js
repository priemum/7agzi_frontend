import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PreviousStoreList = ({ language, salon }) => {
	const storeNameModified =
		salon &&
		salon.settings &&
		salon.settings.addStoreName &&
		salon.settings.addStoreName.split(" ").join("-");

	return (
		<PreviousStoreListWrapper>
			{/* <div className='btn-info p-1 mb-1' style={{ textTransform: "uppercase" }}>
				{servicesForStore[0]}
			</div> */}
			<Link
				to={`/schedule/`}
				onClick={() => {
					window.scrollTo({ top: 1, behavior: "smooth" });
				}}
			>
				<div className='grid'>
					<div className='left'>
						<div className='card-img-top  img'>
							<Link
								to={`/schedule/${storeNameModified}/${salon.belongsTo.phone}`}
							>
								<img
									width={150}
									src={salon.settings.storeThumbnail[0].url}
									alt='https://infinite-apps.com'
								/>
							</Link>
						</div>

						<div
							className='store-info'
							style={{
								color: "black",
								fontWeight: "bolder",
								textTransform: "uppercase",
								letterSpacing: "0px",
								fontSize: "12px",
							}}
						>
							<strong>
								{salon && salon.settings && salon.settings.addStoreName}
							</strong>

							<div>
								{" "}
								{salon && salon.belongsTo && salon.belongsTo.storeGovernorate}
							</div>
							<div>
								{" "}
								{salon && salon.belongsTo && salon.belongsTo.storeDistrict}
							</div>

							<div className='mt-3'>
								<Link
									to={`/schedule/${storeNameModified}/${salon.belongsTo.phone}`}
								>
									{language === "Arabic" ? "احجز مرة أخرى!" : "BOOK AGAIN!"}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</PreviousStoreListWrapper>
	);
};

export default PreviousStoreList;

const PreviousStoreListWrapper = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
	width: 100%;
	border-radius: 5px;

	.row {
		background-color: white;
		margin: 0px 0px;
		padding: 5px;
		border-radius: 10px;
		border: 3px solid #17a2b8;
	}

	.grid {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px;
		background-color: white;
		margin: 0px 0px;
		padding: 5px;
		border-radius: 10px;
		border: 3px solid #17a2b8;
		min-height: 170px;
		max-height: 200px;
		align-items: center; /* Center items vertically */
	}

	.left {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		align-items: center; /* Center items vertically */
	}

	.right {
		justify-self: end;
	}

	@media (max-width: 1000px) {
		margin-top: 7px;
		margin-bottom: 7px;
	}
`;
