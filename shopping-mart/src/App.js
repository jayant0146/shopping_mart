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
          <Route path="/productlist" element={<ProductList />} >
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
      </BrowserRouter>
    </div>
  )
}

export default App
