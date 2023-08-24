import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/register";
import Cart from "./pages/cart";
import ProductList from "./pages/productlist";
import Productdetail from "./pages/product-detail";
// import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/product/detail" element={<Productdetail/>}/>
        <Route path="*" element={<h1>page is not found</h1>}/>
      </Routes>
    </>
  );
}

export default App;
