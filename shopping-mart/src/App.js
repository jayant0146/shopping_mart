import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDescription from "./pages/ProductDescription";
import ProductList from "./pages/ProductList";
import ForgotPassword from "./pages/ForgotPassword";
import Page404 from "./pages/Page404";

import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCreateCategory from "./pages/Admin/AdminCreateCategory";
import AdminCreateProduct from "./pages/Admin/AdminCreateProduct";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminUpdateProduct from "./pages/Admin/AdminUpdateProduct";

import Product_shirts from "./components/Product_shirts";
import Search_keyword_results from "./components/Search_keyword_results";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/product-description" element={<ProductDescription />} />
					<Route path="/productlist" element={<ProductList />} />
					<Route path="/forgotpassword" element={<ForgotPassword />} />

					<Route path="/dashboard" element={<PrivateRoute />}>
						<Route path="user" element={<UserDashboard />} />
					</Route>

					<Route path="/dashboard" element={<AdminRoute />}>
						<Route path="admin" element={<AdminDashboard />} />
						<Route path="admin/create-category" element={<AdminCreateCategory />} />
						<Route path="admin/create-product" element={<AdminCreateProduct />} />
						<Route path="admin/product/:slug" element={<AdminUpdateProduct />} />
						<Route path="admin/products" element={<AdminProducts />} />
					</Route>

					<Route path="*" element={<Page404 />} />
				</Routes>

				<Routes>
					{/* eslint-disable-next-line */}
					<Route path="/search-keywords" element={<Search_keyword_results />} />
				</Routes>

				<Routes>
					{/* eslint-disable-next-line */}
					<Route path="/shirt-product" element={<Product_shirts />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
