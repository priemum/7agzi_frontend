import React from "react";
import styled from "styled-components";
import { useCartContext } from "../../sidebar_context";
import SingleAppointmentPageStoreArabic from "./SingleAppointmentPageStoreArabic";
import SingleAppointmentPageStore from "./SingleAppointmentPageStore";

const SingleAppointmentMain = (props) => {
	const { chosenLanguage } = useCartContext();

	return (
		<SingleAppointmentMainWrapper>
			{chosenLanguage === "Arabic" ? (
				<SingleAppointmentPageStoreArabic props={props} />
			) : (
				<SingleAppointmentPageStore props={props} />
			)}
		</SingleAppointmentMainWrapper>
	);
};

export default SingleAppointmentMain;

const SingleAppointmentMainWrapper = styled.div``;
