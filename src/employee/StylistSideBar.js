/** @format */
import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components";
// import Zoom from "react-reveal/Zoom";
import {read} from "../customer/apiUser";
import {isAuthenticated} from "../auth";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white !important",
			background: "#ead6d6",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return {color: "#ffffff", fontWeight: "bold"};
	}
};

const UsersSidebar = ({history, match}) => {
	const [click, setClick] = useState(true);
	const [clickMenu, setClickMenu] = useState(true);
	// eslint-disable-next-line
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState({});

	const {
		// eslint-disable-next-line
		user: {_id},
	} = isAuthenticated();
	const token = isAuthenticated().token;

	const handleSidebar = () => {
		setClick(!click);
		setClickMenu(!clickMenu);
	};

	const currentUserData = (userId, token) => {
		read(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setCurrentUser(data);
			}
		});
	};

	useEffect(() => {
		currentUserData(_id, token);
		// eslint-disable-next-line
	}, []);

	return (
		<React.Fragment>
			<IconHandling show={clickMenu} onClick={handleSidebar}>
				<i className='fas fa-angle-double-left ml-2 faaaaa-bars'></i>
			</IconHandling>

			<SideWrapper show={clickMenu}>
				<ul>
					<li
						className='mt-4'
						onClick={() => {
							window.scrollTo({top: 0, behavior: "smooth"});
						}}
					>
						<Link
							to='/stylist/dashboard'
							className='sidebar-link2'
							style={isActive(history, "/stylist/dashboard")}
						>
							{/* <Zoom delay={250} duration={700}> */}
							Manage Appointments
							{/* </Zoom> */}
						</Link>
					</li>

					<li
						onClick={() => {
							window.scrollTo({top: 0, behavior: "smooth"});
						}}
					>
						<Link
							to={`/update-profile/${_id}`}
							className='sidebar-link2'
							style={isActive(history, `/update-profile/${_id}`)}
							onClick={() => {}}
						>
							{/* <Zoom delay={250} duration={700}> */}
							Update Your Profile
							{/* </Zoom> */}
						</Link>
					</li>

					<li
						onClick={() => {
							window.scrollTo({top: 0, behavior: "smooth"});
						}}
					>
						<Link
							to={`/general-stats/${_id}`}
							className='sidebar-link2'
							style={isActive(history, `/general-stats/${_id}`)}
							onClick={() => {}}
						>
							{/* <Zoom delay={250} duration={700}> */}
							General Stats
							{/* </Zoom> */}
						</Link>
					</li>
				</ul>
			</SideWrapper>
		</React.Fragment>
	);
};

// export default UsersSidebar;
export default withRouter(UsersSidebar);

const SideWrapper = styled.nav`
	position: fixed;
	top: 55px;
	left: 0;
	width: 50%;
	height: 100%;
	background: var(--mainGrey);
	z-index: 100;
	border-right: 3px solid var(--darkGrey);
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link2 {
		display: block;
		font-size: 0.9rem;
		text-transform: capitalize;
		color: var(--mainBlack) !important;
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: var(--mainTransition);
	}
	.sidebar-link2:hover {
		background: #727272;
		color: var(--mainWhite) !important;
		padding: 1rem 1rem 1rem 1rem;
		text-decoration: none;
	}

	@media (min-width: 620px) {
		width: 17rem;
	}
	@media (max-width: 570px) {
		width: 55%;
		.sidebar-link2 {
			font-size: 13px !important;
			padding: 0.9rem 0.9rem;
		}
	}

	/* @media (min-width: 680px) {
		display: none;
	} */
`;

const IconHandling = styled.div`
	.faaaaa-bars {
		transition: 0.5s;
		transform: ${(props) =>
			!props.show ? "translateX(0)" : "translateX(858%)"};
		font-weight: bold;
		color: darkslategray;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 5px;
	}
	.faaaaa-bars:hover {
		color: white;
		background-color: darkslategray;
		transition: 0.3;
		border-radius: 15px;
		cursor: pointer;
	}

	@media (max-width: 600px) {
		.faaaaa-bars {
			font-size: 1.2rem;
			transform: ${(props) =>
				!props.show ? "translateX(0)" : "translateX(1250%)"};
			padding: 2px;
		}
	}
`;
