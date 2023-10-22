/** @format */

import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import styled from "styled-components";
import myLogo from "../../Images/XLookLogo.png";
import EgyptianFlag from "../../Images/Egypt.png";
import AmericanFlag from "../../Images/UnitedStates.png";
import { useCartContext } from "../../sidebar_context";

// import logo from "../pagesImgs/Sinai-I-Logo.jpg";

const Navbar1 = ({ history }) => {
	const {
		openSidebar,
		closeSidebar,
		isSidebarOpen,
		chosenLanguageEngish,
		chosenLanguage,
		chosenLanguageArabic,
	} = useCartContext();

	const sideBar = () => {
		return (
			<React.Fragment>
				<SideWrapper show={isSidebarOpen} show2={chosenLanguage === "Arabic"}>
					<ul className=''>
						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
								window.location.href = "/";
							}}
						>
							<Link
								to='#'
								className={
									chosenLanguage === "Arabic"
										? "sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar}
							>
								{isSidebarOpen && isSidebarOpen ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
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
									chosenLanguage === "Arabic"
										? " sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar}
							>
								{isSidebarOpen && isSidebarOpen ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
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
								to='/xlook/shop'
								className={
									chosenLanguage === "Arabic"
										? " sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar}
							>
								{isSidebarOpen && isSidebarOpen ? (
									<React.Fragment>XLOOK SHOP</React.Fragment>
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
									chosenLanguage === "Arabic"
										? "sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar}
							>
								{isSidebarOpen && isSidebarOpen ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
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
									chosenLanguage === "Arabic"
										? "sidebar-linkArabic"
										: "sidebar-link"
								}
								onClick={closeSidebar}
							>
								{isSidebarOpen && isSidebarOpen ? (
									<React.Fragment>
										{chosenLanguage === "Arabic" ? (
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
									onClick={closeSidebar}
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
										to='/store/book-appointment-from-store'
										onClick={closeSidebar}
									>
										Your Salon Account
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
										onClick={closeSidebar}
									>
										Store Scheduler
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 10000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/boss/admin/dashboard'
										onClick={closeSidebar}
									>
										XLOOK ADMIN
									</Link>
								</li>
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 5000 && (
							<React.Fragment>
								<li
									className='nav-item ml-5 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										to='/ecommerce/admin/dashboard'
										onClick={closeSidebar}
									>
										Ecommerce Admin Dashboard
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
										onClick={closeSidebar}
									>
										XLOOK <strong>Account Manager</strong>
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
										onClick={closeSidebar}
									>
										Stylist Dashboard
									</Link>
								</li>
							</React.Fragment>
						)}

						{!isAuthenticated() && (
							<Fragment>
								<li
									className='nav-item ml-4 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link '
										to='/signin'
										onClick={closeSidebar}
									>
										Login
									</Link>
								</li>

								<li
									className='nav-item ml-4 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										style={{ color: "#b2d3f4" }}
										to='/about'
										onClick={closeSidebar}
									>
										{chosenLanguage === "Arabic" ? (
											<span style={{ fontSize: "1.2rem" }}>كن شريكنا</span>
										) : (
											"Be Our Partner"
										)}
									</Link>
								</li>

								<li
									className='nav-item ml-4 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<Link
										className='nav-link'
										style={{ color: "#b2d3f4" }}
										to='/agent-guide?ar'
										onClick={closeSidebar}
									>
										{chosenLanguage === "Arabic" ? (
											<span style={{ fontSize: "1.2rem" }}>
												قدّم للعمل معنا
											</span>
										) : (
											"Apply To Work With Us!"
										)}
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
										onClick={() => {
											closeSidebar();
											signout(() => {
												history.push("/");
												localStorage.removeItem("userHistoryPurchases");
												localStorage.removeItem("order");
											});
										}}
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
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			className=' navbar  navbar-expand-sm nav-center py-1'
			style={{ backgroundColor: "#363636" }}
		>
			{isSidebarOpen ? (
				<i
					className='far fa-window-close nav-icon faaa-bars'
					onClick={closeSidebar}
					style={{ color: "white", marginLeft: "10px" }}
				></i>
			) : (
				<i
					className='fa fa-bars nav-icon faaa-bars'
					onClick={openSidebar}
					style={{ color: "white", marginLeft: "10px" }}
				></i>
			)}
			{sideBar()}
			<div className='logo-type'>
				<Link
					to='/'
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					<img src={myLogo} alt='infinite-apps.com' className='sinaiLogo' />

					{/* <div className='logo-type' style={{color: "white"}}>
						{onlineStoreName && onlineStoreName.addStoreName} <br />
					</div> */}
				</Link>
			</div>
			<span
				className='languageFlagsPhone'
				style={{ padding: "0px", marginLeft: "" }}
			>
				{chosenLanguage === "English" ? (
					<span className='' onClick={chosenLanguageArabic}>
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
						onClick={chosenLanguageEngish}
					>
						<img className='flags' src={AmericanFlag} alt='English' />{" "}
					</span>
				)}
			</span>
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
								to='/store/book-appointment-from-store'
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
									{chosenLanguage === "Arabic" ? (
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
									{chosenLanguage === "Arabic" ? (
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
							{chosenLanguage === "English" ? (
								<span className='' onClick={chosenLanguageArabic}>
									{" "}
									<img className='flags' src={EgyptianFlag} alt='Arabic' />
									<span style={{ color: "white" }}>Arabic</span>
								</span>
							) : (
								<span
									style={{ color: "white" }}
									className=' '
									onClick={chosenLanguageEngish}
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
		width: 100%;
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
		align-content: space-between;
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
			width: 100%;
			object-fit: cover !important;
		}
		.logo-type {
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
	/* background: var(--mainGrey); */
	z-index: 300;
	border-right: 3px solid var(--darkGrey);
	transition: 0.5s;
	/* transform: ${(props) =>
		props.show ? "translateX(0)" : "translateX(220%)"}; */
	background-color: black;
	transform: ${(props) =>
		props.show && props.show2
			? "translateX(68%)"
			: props.show && !props.show2
			? "translateX(0)"
			: "translateX(220%)"};

	/*transform: translateX(-100%);*/ /**this will hide the side bar */

	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: lightgrey;
		padding: 1.1rem 1.1rem;
		background-color: #2c2c2c;
		transition: var(--mainTransition);
		border-bottom: 1px black solid;
	}

	.sidebar-linkArabic {
		display: block;
		font-size: 1rem;
		/* color: var(--mainBlack); */
		color: lightgrey;
		padding: 1.1rem 1.1rem;
		background-color: #2c2c2c;
		text-align: right;
		transition: var(--mainTransition);
		border-bottom: 1px black solid;
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
