/** @format */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import styled from "styled-components";

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

const Navbar = ({ history }) => {
	return (
		<Nav
			className=' navbar  navbar-expand-sm'
			style={{ backgroundColor: "	#262626" }}>
			<div className='collapse navbar-collapse '>
				<ul
					className='navbar-nav mx-auto navbar-expand '
					style={{ backgroundColor: "	#262626" }}>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/")}
							to='/'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Home
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/choose-barber")}
							to='/schedule'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Schedule
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/contact")}
							to='/contact'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Contact Us
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							style={isActive(history, "/about")}
							to='/about'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							About Us
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
								}}>
								My Dasboard/Account
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Owner's Regular Account
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
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Owner's Dashboard
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								style={isActive(history, "/dashboard")}
								to='/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Stylist Regular Account
							</Link>
						</li>
					)}
					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<li className='nav-item ml-4'>
							<Link
								className='nav-link'
								style={isActive2(history, "/stylist/dashboard")}
								to='/stylist/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								Stylist Dashboard
							</Link>
						</li>
					)}
					{(isAuthenticated() && isAuthenticated().user.role === 3) ||
						(isAuthenticated() && isAuthenticated().user.role === 1 && (
							<li className='nav-item ml-4'>
								<Link
									className='nav-link'
									style={isActive2(history, "/book-appointment-from-store")}
									to='/book-appointment-from-store'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}>
									Store Scheduler
								</Link>
							</li>
						))}
					<li className='nav-item tobefloated'>
						<Link
							className='nav-link'
							style={isActive(history, "/about")}
							to='/about'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Login
						</Link>
					</li>
					<li className='nav-item tobefloated2'>
						<Link
							className='nav-link'
							style={isActive(history, "/about")}
							to='/about'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							Register
						</Link>
					</li>
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
	padding: 3px;
	.tobefloated {
		position: absolute;
		right: 11%;
		font-style: italic;
		background-color: darkblue;
		text-decoration: underline;
		box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.5);
		border-radius: 20px;
	}

	.tobefloated2 {
		position: absolute;
		right: 4.4%;
		font-style: italic;
		background-color: darkblue;
		text-decoration: underline;
		box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.5);
		border-radius: 20px;
	}
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
		border-radius: 10px;
	}

	@media (max-width: 1200px) {
		.tobefloated {
			position: absolute;
			right: 12%;
		}

		.tobefloated2 {
			position: absolute;
			right: 2.5%;
		}
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
