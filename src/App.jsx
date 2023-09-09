import React from 'react'
// import ReactDOM from 'react-dom/client'
import Login from "./Auth/login";
import { Routes, Route } from "react-router-dom";

import Register from "./Auth/register";
import Cart from "./product/cart";
import ProductList from './product/productlist';
import Productdetail from "./product/productdetail";
import "./App.css";
import { authChecking } from './redux/actions/action';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("user");
  useEffect(() => {
    if (token) {
      dispatch(authChecking(true));
    }
  }, [token]);
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/detail/:id" element={<Productdetail />} />
        <Route path="*" element={<h1>page is not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
