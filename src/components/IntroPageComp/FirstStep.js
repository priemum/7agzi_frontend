import React from "react";
import styled from "styled-components";
// import LetterX from "../../Images/LetterX.png";

const FirstStep = ({
	chosenLanguage,
	setSteps,
	steps,
	setChosenGender,
	handleNext,
	handlePrev,
}) => {
	return (
		<FirstStepWrapper
			show={chosenLanguage === "Arabic"}
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
		>
			<div className='textWrapper'>
				{chosenLanguage === "Arabic" ? (
					<p>من فضلك اختر الجِندر حتى نتمكن من توجيهك إلى ما ستحتاجه...</p>
				) : (
					<p>
						Please choose your gender so we can redirect you to what you will
						need...
					</p>
				)}
			</div>

			<div className='textTitle'>
				{chosenLanguage === "Arabic" ? (
					<p>
						<strong>اختار الجِندر</strong>
					</p>
				) : (
					<p>
						{" "}
						<strong>Choose a gender</strong>{" "}
					</p>
				)}
				<div className='col-md-2 col-5 mx-auto'>
					<hr style={{ borderBottom: "solid 1px white" }} />
				</div>
			</div>

			{chosenLanguage === "Arabic" ? (
				<div
					className='choices mt-5'
					style={{ textAlign: chosenLanguage === "Arabic" ? "right" : "left" }}
				>
					<div
						className='item col-md-6 mx-auto'
						onClick={() => {
							setChosenGender("hair salon");
							handleNext();
						}}
					>
						{/* <img
							className='letterX'
							src={LetterX}
							style={{ width: "8%" }}
							alt='Xlook للنساء'
						/>{" "} */}
						للنساء
					</div>
					<div
						className=' menDiv my-3'
						onClick={() => {
							setChosenGender("barber shop");
							handleNext();
						}}
					>
						{/* <img
							className='letterX'
							src={LetterX}
							style={{ width: "9%" }}
							alt='Xlook للرجال'
						/>{" "} */}
						للرجال
					</div>
				</div>
			) : (
				<div className='choices mt-5'>
					<div
						className='item col-md-6 mx-auto'
						onClick={() => {
							console.log("Women");
							setChosenGender("hair salon");
							handleNext();
						}}
					>
						{/* <img
							className='letterX'
							src={LetterX}
							style={{ width: "8%" }}
							alt='Xlook for women'
						/>{" "} */}
						Women
					</div>
					<div
						className=' menDiv my-3'
						onClick={() => {
							console.log("Men");
							setChosenGender("barber shop");
							handleNext();
						}}
					>
						{/* <img
							className='letterX'
							src={LetterX}
							style={{ width: "9%" }}
							alt='Xlook للرجال'
						/>{" "} */}
						Men
					</div>
				</div>
			)}

			{chosenLanguage === "Arabic" ? (
				<div
					style={{
						color: "white",
						textAlign: "center",
						fontWeight: "bolder",
						cursor: "pointer",
						textDecoration: "underline",
						fontSize: "1.1rem",
					}}
					className='mt-4'
					onClick={() => {
						window.location.href = "/about";
					}}
				>
					<strong>لأصحاب الصالونات، قم بتسجيل صالونك بالضغط هنا...</strong>
				</div>
			) : (
				<div
					style={{
						color: "white",
						textAlign: "center",
						fontWeight: "bolder",
						cursor: "pointer",
						textDecoration: "underline",
					}}
					className='mt-4'
					onClick={() => {
						window.location.href = "/about";
					}}
				>
					For Salon Owners, Register Your Salon By Clicking Here...
				</div>
			)}
		</FirstStepWrapper>
	);
};

export default FirstStep;

const FirstStepWrapper = styled.div``;
