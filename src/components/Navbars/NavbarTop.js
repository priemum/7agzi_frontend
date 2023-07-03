/** @format */

import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import styled from "styled-components";
import myLogo from "../../Images/InfiniteAppsLogo.png";
import EgyptianFlag from "../../Images/Egypt.png";
import AmericanFlag from "../../Images/UnitedStates.png";
// import logo from "../pagesImgs/Sinai-I-Logo.jpg";

const Navbar1 = ({
	history,
	click,
	setClick,
	clickMenu,
	setClickMenu,
	language,
	setLanguage,
}) => {
	const handleSidebar = () => {
		setClick(!click);
	};

	const sideBar = () => {
		return (
			<React.Fragment>
				<SideWrapper show={clickMenu}>
					<ul className=''>
						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/'
								className={
									language === "Arabic" ? "sidebar-linkArabic" : "sidebar-link"
								}
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}
							>
								{click && clickMenu ? (
									<React.Fragment>
										{language === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												الصفحة الرئيسية
											</span>
										) : (
											"Home"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>
						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/schedule'
								className={
									language === "Arabic" ? " sidebar-linkArabic" : "sidebar-link"
								}
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}
							>
								{click && clickMenu ? (
									<React.Fragment>
										{language === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												احجز
											</span>
										) : (
											"Schedule"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>
						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/about'
								className={
									language === "Arabic" ? "sidebar-linkArabic" : "sidebar-link"
								}
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}
							>
								{click && clickMenu ? (
									<React.Fragment>
										{language === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												من نحن
											</span>
										) : (
											"About Us"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>
						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Link
								to='/contact'
								className={
									language === "Arabic" ? "sidebar-linkArabic" : "sidebar-link"
								}
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}
							>
								{click && clickMenu ? (
									<React.Fragment>
										{language === "Arabic" ? (
											<span
												style={{
													fontFamily: "Droid Arabic Kufi",
													letterSpacing: "0px",
												}}
											>
												اتصل بنا
											</span>
										) : (
											"Contact Us"
										)}
									</React.Fragment>
								) : null}
							</Link>
						</li>

						{isAuthenticated() && isAuthenticated().user.role === 0 && (
							<li
								className='nav-item ml-5 mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<Link
									className='nav-link '
									to='/dashboard'
									onClick={() => {
										setClickMenu(false);
										setClick(false);
									}}
								>
									My Account/Dashboard
								</Link>
							</li>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 1000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link '
										to='/store/admin/dashboard'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Business Partner Dashboard
									</Link>
								</li>
								{/* <li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({top: 0, behavior: "smooth"});
									}}
								>
									<Link
										className='nav-link'
										to='/dashboard'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Owner Regular Account
									</Link>
								</li> */}
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 3 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/book-appointment-from-store'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Store Scheduler
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 2000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/agent/dashboard'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										XLOOK <strong>AGENT</strong>
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 2 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/stylist/dashboard'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Stylist Dashboard
									</Link>
								</li>
								{/* <li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({top: 0, behavior: "smooth"});
									}}
								>
									<Link
										className='nav-link'
										to='/dashboard'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Stylist Regular Account
									</Link>
								</li> */}
							</React.Fragment>
						)}

						{!isAuthenticated() && (
							<Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link '
										to='/signin'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Login
									</Link>
								</li>

								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/signup'
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}
									>
										Business Register
									</Link>
								</li>
							</Fragment>
						)}

						{isAuthenticated() && (
							<li
								className='nav-item ml-5'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								<span>
									<span
										className='signoutbutton nav-link'
										style={{
											cursor: "pointer",
											margin: 10,
											fontWeight: "bold",
											textDecoration: "underline",
											color: "red",
											fontStyle: "italic",
										}}
										onClick={() =>
											signout(() => {
												history.push("/");
												localStorage.removeItem("userHistoryPurchases");
												localStorage.removeItem("order");
											})
										}
									>
										Signout
									</span>
								</span>
							</li>
						)}
					</ul>
				</SideWrapper>
			</React.Fragment>
		);
	};
	return (
		<Nav
			className=' navbar  navbar-expand-sm nav-center py-1'
			style={{ backgroundColor: "#363636" }}
		>
			{click ? (
				<i
					className='far fa-window-close nav-icon faaa-bars'
					onClick={handleSidebar}
					style={{ color: "white", marginLeft: "10px" }}
				></i>
			) : (
				<i
					className='fa fa-bars nav-icon faaa-bars'
					onClick={handleSidebar}
					style={{ color: "white", marginLeft: "10px" }}
				></i>
			)}
			{sideBar()}
			<div className='logo-type'>
				<Link
					to='#'
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					<img src={myLogo} alt='infinite-apps.com' className='sinaiLogo' />

					<span
						className='languageFlagsPhone'
						style={{ padding: "0px", marginLeft: "120px" }}
					>
						{language === "English" ? (
							<span
								className=''
								onClick={() => {
									setLanguage("Arabic");
								}}
							>
								{" "}
								<img
									className='flags'
									src={EgyptianFlag}
									style={{ marginRight: "5px" }}
									alt='Arabic'
								/>
							</span>
						) : (
							<span
								className=' '
								style={{ color: "white" }}
								onClick={() => {
									setLanguage("English");
								}}
							>
								<img className='flags' src={AmericanFlag} alt='English' />{" "}
							</span>
						)}
					</span>
					{/* <div className='logo-type' style={{color: "white"}}>
						{onlineStoreName && onlineStoreName.addStoreName} <br />
					</div> */}
				</Link>
			</div>
			<div className='collapse navbar-collapse menu'>
				<ul className='navbar-nav actual-list'>
					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1000 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/store/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								style={{
									color: "white",
									textDecoration: "underline",
									fontWeight: "bold",
									marginRight: "20px",
									fontStyle: "italic",
								}}
							>
								Hello {isAuthenticated().user.name}
							</Link>
						</li>
					)}
					{!isAuthenticated() && (
						<Fragment>
							<li className='nav-item'>
								<Link
									className='nav-link '
									to='/signin'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									style={{
										color: "white",
										textDecoration: "underline",
										fontWeight: "bold",
										marginRight: "10px",
										fontStyle: "italic",
									}}
								>
									{language === "Arabic" ? (
										<span
											style={{
												fontFamily: "Droid Arabic Kufi",
												letterSpacing: "0px",
											}}
										>
											تسجيل الدخول
										</span>
									) : (
										"Login"
									)}
								</Link>
							</li>

							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/signup'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									style={{
										color: "white",
										textDecoration: "underline",
										fontWeight: "bold",
										marginRight: "50px",
										fontStyle: "italic",
									}}
								>
									{language === "Arabic" ? (
										<span
											style={{
												fontFamily: "Droid Arabic Kufi",
												letterSpacing: "0px",
											}}
										>
											إشترك الآن
										</span>
									) : (
										"Business Register"
									)}
								</Link>
							</li>
						</Fragment>
					)}
					{isAuthenticated() && (
						<li className='nav-item'>
							<span
								className='nav-link'
								style={{
									cursor: "pointer",
									fontWeight: "bold",
									textDecoration: "underline",
									color: "#ffc1c1",
									fontStyle: "italic",
									marginRight: "100px",
								}}
								onClick={() =>
									signout(() => {
										history.push("/");
										localStorage.removeItem("userHistoryPurchases");
										localStorage.removeItem("order");
										window.scrollTo({ top: 0, behavior: "smooth" });
									})
								}
							>
								Signout
							</span>
						</li>
					)}

					<li
						className='nav-item mt-2 languageList'
						style={{
							// border: "1px solid black",
							width: "90px",
							height: "30px",
						}}
					>
						<span className='' style={{ padding: "0px" }}>
							{language === "English" ? (
								<span
									className=''
									onClick={() => {
										setLanguage("Arabic");
									}}
								>
									{" "}
									<img className='flags' src={EgyptianFlag} alt='Arabic' />
									<span style={{ color: "white" }}>Arabic</span>
								</span>
							) : (
								<span
									style={{ color: "white" }}
									className=' '
									onClick={() => {
										setLanguage("English");
									}}
								>
									<img className='flags' src={AmericanFlag} alt='English' />{" "}
									English
								</span>
							)}
						</span>
					</li>
				</ul>
			</div>
		</Nav>
	);
};

export default withRouter(Navbar1);

const Nav = styled.nav`
	.sinaiLogo {
		width: 120px;
		height: 58px;
		object-fit: cover !important;
	}

	.menu {
		justify-content: flex-end;
	}
	.logo-type {
		font-size: 1rem;
		font-family: "Snell Roundhand, cursive";
		font-weight: bold;
		text-align: center;
		font-style: italic;
		display: inline-block;
		/* box-shadow: 7px 7px 5px 0px rgba(0, 0, 0, 0.1); */
		vertical-align: middle;
		margin-left: 4px;
	}

	.languageList:hover {
		cursor: pointer;
	}

	@media (max-width: 680px) {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		width: 100%;
		padding: 0.5rem 1.5rem;
		background: var(--mainGrey);
		border-bottom: 3px solid var(--darkGrey);
		z-index: 300;

		.sinaiLogo {
			width: 120px;
			height: 58px;
			object-fit: cover !important;
		}
		.logo-type {
			font-size: 1rem;
			font-family: "Snell Roundhand, cursive";
			font-weight: bold;
			text-align: center;
			font-style: italic;
			display: inline-block;
			vertical-align: middle;
			margin-bottom: 0;
		}

		.nav-center {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 1170px;
			margin: 0 auto;
		}
		.nav-icon {
			font-size: 1.35rem;
			cursor: pointer;
			margin-left: 4px;
		}

		.nav-cart {
			position: relative;
		}
		.cart-items {
			background: var(--mainGrey);
			color: white;
			font-weight: bold;
			font-size: 0.7rem;
			position: absolute;
			padding: 0 5px;
		}
		.sinaiLogo {
		}
		.logo-type {
		}
	}
	font-size: 1rem;

	li a:hover {
		background: #727272;
		text-decoration: none;
		color: var(--mainWhite) !important;
		outline-color: var(--darkGrey);
		transition: var(--mainTransition);
	}
	@media (min-width: 580px) {
		.languageFlagsPhone {
			display: none;
		}
	}

	@media (min-width: 680px) {
		.faaa-bars {
			display: none;
		}
	}
	@media (max-width: 900px) {
		.actual-list {
			font-size: 0.7rem;
		}
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 200;
		padding: 1px;
	}
`;

const SideWrapper = styled.nav`
	position: fixed;
	top: 66px;
	left: 0;
	width: 60%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 300;
	border-right: 3px solid var(--darkGrey);
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(220%)")};
	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: var(--mainBlack);
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: var(--mainTransition);
	}

	.sidebar-linkArabic {
		display: block;
		font-size: 1rem;
		color: var(--mainBlack);
		padding: 1.1rem 1.1rem;
		text-align: right;
		background: transparent;
		transition: var(--mainTransition);
	}

	.sidebar-link:hover {
		background: #727272;
		color: var(--mainWhite);
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}
	@media (min-width: 600px) {
		width: 20rem;
	}
	@media (min-width: 680px) {
		display: none;
	}
`;
