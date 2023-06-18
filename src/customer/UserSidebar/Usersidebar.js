/** @format */
import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components";
// import Zoom from "react-reveal/Zoom";
import {isAuthenticated} from "../../auth/index";
import {getPurchaseHistory, read} from "../apiUser";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			// color: "white !important",
			background: "#ead6d6",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return {color: "black", fontWeight: "bold"};
	}
};

const Usersidebar = ({
	click2,
	clickMenu2,
	setClick2,
	setClickMenu2,
	history,
	match,
}) => {
	const [click, setClick] = useState(true);
	const [clickMenu, setClickMenu] = useState(true);
	// eslint-disable-next-line
	const [History, setHistory] = useState([]);
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

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(data);
			}
		});
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
		init(_id, token);
		currentUserData(_id, token);
		// eslint-disable-next-line
	}, []);

	return (
		<OverallSidebarWrapper>
			<div
				className=''
				onClick={() => {
					setClick2(!click2);
					setClickMenu2(!clickMenu2);
				}}
				style={{
					// minHeight: click && clickMenu ? "1200px" : "0px",
					// backgroundColor: click && clickMenu ? "#e8e6e9" : "#f7f7f6",
					padding: "5px",
					fontWeight: "bold",
					fontSize: "22px",
				}}
			>
				{click2 ? (
					<i
						className='far fa-window-close'
						onClick={handleSidebar}
						style={{
							color: "black",
							marginLeft: "30px",
							marginTop: "20px",
							fontSize: "22px",
							fontWeight: "bold",
						}}
					></i>
				) : (
					<i
						className='fa fa-bars'
						onClick={handleSidebar}
						style={{
							color: "black",
							marginLeft: "30px",
							marginTop: "20px",
						}}
					>
						<span className='my-auto ml-1' style={{fontSize: "19px"}}>
							Menu
						</span>
					</i>
				)}
				<SideWrapper show={clickMenu2}>
					<ul>
						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({top: 0, behavior: "smooth"});
							}}
						>
							<Link
								to='/dashboard'
								className='sidebar-link'
								style={isActive(history, "/dashboard")}
							>
								{/* <Zoom delay={250} duration={700}> */}
								Your Dashboard
								{/* </Zoom> */}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({top: 0, behavior: "smooth"});
							}}
						>
							<Link
								to={`/profile-update/${_id}`}
								className='sidebar-link'
								style={isActive(history, `/profile-update/${_id}`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}
							>
								{click2 && clickMenu2 ? (
									<React.Fragment>Update Your Profile</React.Fragment>
								) : null}
							</Link>
						</li>
					</ul>
				</SideWrapper>
			</div>
		</OverallSidebarWrapper>
	);
};

export default withRouter(Usersidebar);

const SideWrapper = styled.nav`
	position: fixed;
	top: 0px;
	left: 0;
	width: 70%;
	height: 100%;
	background: #f7f7f6;
	z-index: 10000;
	border-right: 3px solid darkgrey;
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
		margin-top: 50px;
	}
	.sidebar-link {
		display: block;
		font-size: 0.9rem;
		text-transform: capitalize;
		color: black;
		padding: 0.5rem 0.5rem;
		margin-left: 10px;
		background: transparent;
		transition: 0.3s;
	}
	.sidebar-link:hover {
		background: #727272;
		color: whitesmoke !important;
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}

	@media (min-width: 600px) {
		width: 20rem;
	}
	@media (max-width: 600px) {
		font-size: 0.8rem !important;
		.sidebar-link {
			font-size: 0.75rem !important;
			margin-left: 5px;
		}
	}
`;

const OverallSidebarWrapper = styled.div`
	height: 100%;
	z-index: 200;

	a {
		text-decoration: none;
	}
`;
