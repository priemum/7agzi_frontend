/** @format */

import React, {Fragment, useEffect, useState} from "react";
import {contactUs} from "../auth/index";
import {ToastContainer, toast} from "react-toastify";
import {Helmet} from "react-helmet";
import styled from "styled-components";
// import ReactGA from "react-ga";

const Contact = () => {
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

	const {name, email, subject, text, loading} = values;

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
		window.scrollTo({top: 0, behavior: "smooth"});

		contactUs({name, email, subject, text, loading: true}).then((data) => {
			if (data.error) {
				setValues({...values, error: data.error, success: false});
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
			<Helmet>
				<meta charSet='utf-8' />
				<title>Infinite Apps| Contact Us</title>
				<meta
					name='description'
					content={`Hair Brush Booking Software Developed By Infinite-Apps.com`}
				/>
				<link rel='canonical' href='https://infinite-apps.com' />
			</Helmet>
			{/* <div className='ad-class my-3 text-center mx-auto'> */}
			{/* add your slot id  */}
			{/* <GoogleAds slot='8388147324' /> */}
			{/* </div> */}
			<div>
				<div className='row mt-5 ml-3'>
					<div className='col-md-4 my-3'>
						<h3 style={{color: "var(--orangePrimary)"}} className='text-center'>
							Do you have any inquiries...?
						</h3>
						<p className='Contact-us-paragraph mt-5'>
							Please allow up to 24 hours for our Resort Support Team to answer
							your inquiry by filling out the form.
						</p>

						<p className='Contact-us-paragraph'>
							<div className='mt-3'>
								<strong style={{color: "var(--orangePrimary)"}}>
									Business Hour:
								</strong>{" "}
								8:00 am to 7:00 PM.
							</div>
							<br />
							<strong style={{color: "var(--orangePrimary)"}}>
								Address:
							</strong>{" "}
							PO Box 322, Crestline, CA, USA 92325
							<br />
							<strong style={{color: "var(--orangePrimary)"}}>
								Phone #:
							</strong>{" "}
							+19099914368.
							<br />
							<strong style={{color: "var(--orangePrimary)"}}>
								Email:
							</strong>{" "}
							helpdesk@infinite-apps.com.
							<br />
						</p>

						<div className='mt-5'>
							<h3
								style={{color: "var(--orangePrimary)"}}
								className='text-center'
							>
								We Are Happy To Help
							</h3>

							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Impedit error culpa consequuntur modi odio aspernatur dolores
								fugiat praesentium nisi perferendis fugit quasi perspiciatis
								magnam, ex exercitationem cumque sequi sint deserunt enim. Id,
								tempore. Dolorem deleniti saepe soluta nulla minus culpa labore
								quaerat eius rerum dolor natus, illo assumenda libero tempore
								consequuntur est repudiandae pariatur praesentium! Magnam odit
								voluptatem debitis fugit, qui dolore! Possimus ipsa sit pariatur
								similique ut sint, exercitationem voluptas velit nostrum
								quisquam doloribus ipsum laborum. Facere vero id odit incidunt
								architecto? Explicabo nesciunt dolor quod impedit iste provident
								recusandae quam voluptatem. Fuga quo corporis praesentium,
								incidunt possimus optio est nostrum beatae quam deleniti iusto.
								Exercitationem possimus animi illum, nihil, asperiores quaerat
								sunt maiores iure cumque quo amet magnam accusantium, sit ea
								dolorum. Iusto qui nostrum animi sapiente velit veritatis atque
								architecto suscipit hic nisi aliquid, quaerat sint magnam nam
								molestiae accusamus temporibus magni vitae delectus adipisci
								repellat porro saepe aut reprehenderit! Ipsam vitae cumque
								perspiciatis iusto, commodi debitis officiis asperiores. Nam
								alias, impedit molestiae libero dolor rerum expedita! Temporibus
								officiis consequuntur placeat porro, deleniti maiores
								voluptatum, ad molestias numquam ab rem? Voluptates, minima id,
								similique voluptatibus vitae maiores, illum voluptate nulla
								explicabo veritatis dolorem consequatur minus sint tempora.
							</p>
						</div>
					</div>
					<Fragment left>
						<div
							className='col-md-7 my-3 mx-auto'
							style={
								{
									// boxShadow: "3px 0px 3px 3px rgba(0,0,0,0.5)",
								}
							}
						>
							<Fragment duration={5000}>
								<h2 style={{color: "var(--mainBlue)"}} className='text-center'>
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
											style={{fontWeight: "bold", fontSize: "1.1rem"}}
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
											style={{fontWeight: "bold", fontSize: "1.1rem"}}
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
											style={{fontWeight: "bold", fontSize: "1.1rem"}}
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
