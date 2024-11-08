import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import NavbarComponent from "./components/Navbar";
import RegisterPage from "./pages/Register";

const querryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<QueryClientProvider client={querryClient}>
			<NavbarComponent />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</QueryClientProvider>
	);
};

export default App;
