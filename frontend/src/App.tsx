import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";

const querryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<QueryClientProvider client={querryClient}>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</QueryClientProvider>
	);
};

export default App;