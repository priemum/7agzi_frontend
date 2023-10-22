import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./sidebar_context";
import { CartProvider2 } from "./pages/TheShop/checkout/cart_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CartProvider>
		<CartProvider2>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</CartProvider2>
	</CartProvider>
);
