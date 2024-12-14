import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./components/context/auth";
import "antd/dist/reset.css";
import { SearchProvider } from "./components/context/Search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthProvider>
		<SearchProvider>
			<App />
		</SearchProvider>
	</AuthProvider>
);
