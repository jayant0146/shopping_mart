import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Page404 from './pages/Page404';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import Dashboard1 from './pages/Admin/Dashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Product_shirts from './components/Product_shirts';
import Search_keyword_results from './components/Search_keyword_results';

const App = () => {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} >
          </Route>
        </Routes>

        <Routes>
          <Route path="/product" element={<Product />} >
          </Route>
        </Routes>

        <Routes>
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/search-keywords" element={<Search_keyword_results />} />
        </Routes>

        <Routes>
          <Route path="/dashboard" element={<PrivateRoute />} >
            <Route path="user" element={<Dashboard />} >
            </Route>
          </Route>
        </Routes>

        <Routes>
          <Route path="/dashboard" element={<AdminRoute />} >
            <Route path="admin" element={<Dashboard1 />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
          </Route>
        </Routes>

        <Routes>
          <Route path="/shirt-product" element={<Product_shirts />} >
          </Route>
        </Routes>

        <Routes>
          <Route path="/register" element={<Register />} >
          </Route>
        </Routes>

        <Routes>
          <Route path="/login" element={<Login />} >
          </Route>
        </Routes>

        <Routes>
          <Route path="/cart" element={<Cart />} >
          </Route>
        </Routes>

        <Routes>
          <Route path="/forgotpassword" element={<ForgotPassword />} >
          </Route>
        </Routes>

        <Routes>
          <Route path="*" element={<Page404 />} >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
