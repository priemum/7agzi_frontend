import styled from "styled-components";
import { allLoyaltyPointsAndStoreStatus } from "../apiOwner";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../../../auth";

const GetBrandName = ({ ownerId }) => {
	const [lastAddedSettings, setLastAddedSettings] = useState("");
	// eslint-disable-next-line
	const { token, user } = isAuthenticated();

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var lastAddedSettings;

				if (data.length === 0) {
					lastAddedSettings = "";
				} else {
					lastAddedSettings = data && data[data.length - 1];
				}

				if (lastAddedSettings) {
					setLastAddedSettings(lastAddedSettings);
				}
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<br />
			<br />
			<GetBrandNameWrapper>
				<div
					style={{
						textAlign: "center",
						width: "100%",
						fontWeight: "bold",
						fontSize: "1.7rem",
						background: "#002143",
						color: "white",
						padding: "10px",
						marginLeft:
							lastAddedSettings && lastAddedSettings.addStoreName.length <= 10
								? "30%"
								: "0%",
						position: "relative",
					}}
				>
					{lastAddedSettings && lastAddedSettings.addStoreName
						? lastAddedSettings.addStoreName
						: ""}
				</div>
			</GetBrandNameWrapper>
		</>
	);
};

export default GetBrandName;

const GetBrandNameWrapper = styled.div``;
