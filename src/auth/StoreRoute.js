/** @format */

import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./index";

const StoreRoute = ({component: Component, ...rest}) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated() &&
			(isAuthenticated().user.role === 1000 ||
				isAuthenticated().user.role === 3) ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/signin",
						state: {from: props.location},
					}}
				/>
			)
		}
	/>
);

export default StoreRoute;
