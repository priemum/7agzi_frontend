/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { contactUs } from "../auth/index";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import styled from "styled-components";
// import ReactGA from "react-ga";

const Contact = ({ language }) => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});
	const [values, setValues] = useState({
		name: "",
		email: "",
		subject: "",
		text: "",
		success: false,
		loading: false,
	});

	const { name, email, subject, text, loading } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value,
		});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		console.log("Form was submitted");
		window.scrollTo({ top: 0, behavior: "smooth" });

		contactUs({ name, email, subject, text, loading: true }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
				toast.error(data.error);
			} else {
				toast.success(SuccessfullySubmitted);

				setValues({
					subject: "",
					text: "",
					success: false,
					loading: false,
				});
			}
		});
	};

	const SuccessfullySubmitted =
		"Your form was successfully submitted. Our support team will contact you!";

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<ContactUsWrapper dir='ltr'>
			<Helmet dir={language === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{language === "Arabic" ? (
					<title dir='rtl'>إكس لوك | اتصل بنا</title>
				) : (
					<title>XLOOK | CONTACT US</title>
				)}
				<meta
					name='description'
					content={
						language === "Arabic"
							? ` XLOOK بدإخل مرص.
					ىه منصة تضم جميع صالونات إلحالقة ومحالت إلكوإفريإلحريىم و إلبيوت ى
					إلمنصة تقدم إلخدمات لكل أفرإد إالرسة سوإء سيدإت, آنسات, رجال أو أوالد فللجميع مكان وخدمات مقدمة.
					سني ى تستخدم منصة XLOOK مع
					ى
					الختيار وحجز موعد صالون حالقة إو بيوت عرض إالقرب لالبعد حسب مكانك.
					ىت ىت يقوم إلزإئرين بحجز إلخدمات إل
					أوطال
					تقدمها إلمنصة من خالل أبليكيشن خاص لتسجيل وحجز إلمستخدمرين
					إلخدمات إلتجميلية. Powered By https://infinite-apps.com`
							: `XLOOK is a platform that includes all barbershops, ladies' beauty salons, and beauty centers
					
					The platform offers services for all family members, including women, girls, men, and
					children, with a variety of services provided.
					The XLOOK platform is used to choose and book a barbershop or beauty center appointment
					with the closest to the farthest offer according to your location. Visitors can book the services
					offered by the platform through a special application designed for user registration and booking
					beauty services. Powered By https://infinite-apps.com`
					}
				/>
				<link rel='canonical' href='https://www.xlookpro.com/about' />
			</Helmet>
			{/* <div className='ad-class my-3 text-center mx-auto'> */}
			{/* add your slot id  */}
			{/* <GoogleAds slot='8388147324' /> */}
			{/* </div> */}
			<div>
				<div className='row mt-5 ml-3'>
					<div className='col-md-4 my-3'>
						<h3
							style={{ color: "var(--orangePrimary)" }}
							className='text-center'
						>
							Do you have any inquiries...?
						</h3>
						<p className='Contact-us-paragraph mt-5'>
							Please allow up to 24 hours for our Resort Support Team to answer
							your inquiry by filling out the form.
						</p>

						<p className='Contact-us-paragraph'>
							<div className='mt-3'>
								<strong style={{ color: "var(--orangePrimary)" }}>
									Business Hour:
								</strong>{" "}
								8:00 am to 7:00 PM.
							</div>
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Address:
							</strong>{" "}
							PO Box 322, Crestline, CA, USA 92325
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Phone #:
							</strong>{" "}
							+19099914368.
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Email:
							</strong>{" "}
							helpdesk@infinite-apps.com.
							<br />
						</p>

						<div className='mt-5'>
							<h3
								style={{ color: "var(--orangePrimary)" }}
								className='text-center'
							>
								We Are Happy To Help
							</h3>

							<p>
								XLOOK is a platform that includes all barbershops, ladies'
								beauty salons, and beauty centers located in Egypt. The platform
								offers services for all family members, including women, girls,
								men, and children, with a variety of services provided. The
								XLOOK platform is used to choose and book a barbershop or beauty
								center appointment with the closest to the farthest offer
								according to your location. Visitors can book the services
								offered by the platform through a special application designed
								for user registration and booking beauty services.
							</p>
						</div>
					</div>
					<Fragment>
						<div
							className='col-md-7 my-3 mx-auto'
							style={
								{
									// boxShadow: "3px 0px 3px 3px rgba(0,0,0,0.5)",
								}
							}
						>
							<Fragment>
								<h2
									style={{ color: "var(--mainBlue)" }}
									className='text-center'
								>
									Contact Us
								</h2>
							</Fragment>
							{loading ? (
								<h2>Loading...</h2>
							) : (
								<form className='mt-5 mr-3 ' onSubmit={clickSubmit}>
									<ToastContainer />
									{/*first:  adding your name*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{
												fontWeight: "bold",
												fontSize: "1.1rem",
											}}
										>
											Name:
										</label>
										<input
											type='text'
											name='name'
											onChange={handleChange("name")}
											value={name}
											className='form-control'
											placeholder='Fullname e.g.: John Don'
											required
										/>
									</div>
									{/*email:  adding your emailaddress*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}
										>
											Email Address:
										</label>

										<input
											type='email'
											name='email'
											onChange={handleChange("email")}
											value={email}
											className='form-control'
											placeholder='Email e.g.: Name@email.com'
											required
										/>
									</div>
									{/*Subject:  Adding your subject line*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}
										>
											Subject:
										</label>

										<input
											type='text'
											name='subject'
											onChange={handleChange("subject")}
											value={subject}
											className='form-control'
											placeholder='Subject'
										/>
									</div>
									{/*message */}
									<div className='form'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}
										>
											Your Inquiry / Complaint:
										</label>

										<textarea
											name='text'
											className='form-control'
											onChange={handleChange("text")}
											value={text}
											rows='10'
											placeholder='Please place your message/comments here'
											required
										></textarea>
									</div>
									{/*message */}
									<input
										type='submit'
										value='Submit'
										className='form-control bg-primary text-white'
									/>
								</form>
							)}
						</div>
					</Fragment>

					<hr />
				</div>
			</div>

			<hr />
		</ContactUsWrapper>
	);
};

export default Contact;

const ContactUsWrapper = styled.div`
	overflow: hidden;
	min-height: 1000px;

	.labelStyle {
		text-align: center !important;
	}
`;
