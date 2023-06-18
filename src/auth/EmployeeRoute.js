/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const EmployeeRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated() &&
			(isAuthenticated().user.role === 1 ||
				isAuthenticated().user.role === 2) ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/signin",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

export default EmployeeRoute;
