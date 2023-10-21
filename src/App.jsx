import React from 'react'
import { useEffect } from "react";

import { Routes, Route ,Link} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authChecking } from './redux/actions/action';

import Login from "./pages/Auth/login/login";
import Register from "./pages/Auth/register/register";
import Forgot from './pages/Auth/forgot/forgot';

import Cart from "./pages/cart/cartpage/cart";
import ProductList from './pages/product/productlist/list';
import Productdetail from "./pages/product/productdata/productdetail";
import Payment from './pages/payment/payment_summary/payment';
import PaymentSuccess from './pages/payment/payment-response/succes';
import Cancelpayment from './pages/payment/payment-response/cancel';

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state=>state.isUserLoggedIn)
  
  useEffect(() => {
    const token = JSON.parse(
      sessionStorage.getItem(window.sessionStorage.key(0))
    );
    if (token) {
      dispatch(
        authChecking({
          email: token.email,
          flag: true,
        })
      );
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            isLogin === false ? (
              <h1>
                i think you are not logged in{" "}
                <Link to="/login">login here</Link>
              </h1>
            ) : (
              <Cart />
            )
          }
        />
        <Route path="/product/detail/:id" element={<Productdetail />} />
        <Route path="*" element={<h1>page is not found</h1>} />
        <Route path="/forgot/password" element={<Forgot />} />
        <Route path="/add-address/payment" element={<Payment/>}/>
        <Route path="/success" element={<PaymentSuccess/>}/>
        <Route path="/cancel" element={<Cancelpayment/>}/>
      </Routes>
    </>
  );
}

export default App;
