/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import styled from "styled-components";
import { useCartContext } from "../../sidebar_context";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white !important",
			background: "#0c0000",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "#ffffff", fontWeight: "bold" };
	}
};

const isActive2 = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white !important",
			background: "#0056b6",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "#ffffff", fontWeight: "bold" };
	}
};

const Navbar = ({ history, language }) => {
	const { chosenLanguage } = useCartContext();
	console.log(chosenLanguage, "chosenLan");

	return (
		<Nav
			className=' navbar  navbar-expand-sm'
			style={{ backgroundColor: "black" }}
		>
			<div
				className='collapse navbar-collapse '
				dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			>
				<ul
					className='navbar-nav mx-auto navbar-expand '
					style={{ backgroundColor: "black" }}
				>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/")}
							to='/'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
								"HOME"
							)}
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/schedule")}
							to='/schedule'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
								"SCHEDULE"
							)}
						</Link>
					</li>

					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/xlook/shop")}
							to='/xlook/shop'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							XLOOK SHOP
						</Link>
					</li>

					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/contact")}
							to='/contact'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/about")}
							to='/about'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
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
						</Link>
					</li>

					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li className='nav-item ml-5'>
							<Link
								className='nav-link'
								style={isActive2(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								My Dasboard/Account
							</Link>
						</li>
					)}

					{/* {isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({top: 0, behavior: "smooth"});
								}}
							>
								Owner Regular Account
							</Link>
						</li>
					)} */}
					{isAuthenticated() && isAuthenticated().user.role === 1000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/store/book-appointment-from-store")}
								to='/store/book-appointment-from-store'
								onClick={() => {
									window.scrollTo({ top: 90, behavior: "smooth" });
								}}
							>
								Business Partner Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 10000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/boss/admin/dashboard")}
								to='/boss/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								XLOOK Admin
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 5000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/ecommerce/admin/dashboard")}
								to='/ecommerce/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								Ecommerce Admin Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 2000 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/agent/dashboard")}
								to='/agent/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								XLOOK <strong>AGENT</strong>
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/admin/dashboard")}
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 90, behavior: "smooth" });
								}}
							>
								Admin Dashboard
							</Link>
						</li>
					)}

					{/* {isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({top: 0, behavior: "smooth"});
								}}
							>
								Stylist Regular Account
							</Link>
						</li>
					)} */}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/stylist/dashboard")}
								to='/stylist/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
							>
								Stylist Dashboard
							</Link>
						</li>
					)}
				</ul>
			</div>
		</Nav>
	);
};

export default withRouter(Navbar);

const Nav = styled.nav`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 100;
	padding: 1px;

	li a {
		font-size: 0.95rem;
	}
	.nav-link {
		color: white !important;
	}
	li {
		margin: 0px 12px 0px 0px;
	}

	li a:hover {
		background: #727272;
		color: var(--mainWhite) !important;
		outline-color: var(--darkGrey);
		transition: var(--mainTransition);
	}

	@media (max-width: 900px) {
		li a {
			color: black !important;
			font-size: 0.7rem;
			margin: 0px;
		}
		li {
			margin: 0px 0px 0px 0px;
		}
	}

	@media (max-width: 680px) {
		display: none;
	}
`;
