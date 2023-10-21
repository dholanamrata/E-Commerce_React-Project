import React, { useState } from "react";
import ProductBill from "../../cart/bill/cart_bill";
import "./payment.css"
import { useSelector } from "react-redux";
import useWindowSize from "../../../Componets/media-query/size";
import LoadingSpinner from "../../../Componets/loader/loader";

const PaymentForm = ({ cities }) => {

  const [loginModeError, setloginModeError] = useState({
    message: "",
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const [IsAddressAdded, setAddress] = useState({
    Address: "",
    city: "",
    state: "",
    pincode: "",
    flag: false
  });
  function handleSubmision(e) {
    e.preventDefault();
    setAddress((prev) => {
      return {
        ...prev,
        Address: e.target[0].value + " " + e.target[1].value,
        city: e.target[2].value,
        state: e.target[3].value,
        pincode: e.target[4].value,
        flag: true
      };
    });
  }

  const list = useSelector(state => state.cartProduct);
  return (
    <>
      <div style={{ fontSize: "1.5rem", maxWidth: "700px" }} className="container d-flex justify-content-center align-items-center  my-5  address-main ">
        {
          !IsAddressAdded.flag ? (
            <form
              className="row shadow border rounded-3 p-3  "
              onSubmit={handleSubmision}
            >
              <p className="text-center text-capitalize h2 text-secondary">
                shipping Address
              </p>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="col-12">
                <div className="row g-0 gx-md-3">
                  <div className="col-md-4 col-12">
                    <label htmlFor="inputCity" className="form-label">
                      City
                    </label>
                    <input type="text" className="form-control" id="inputCity" />
                  </div>
                  <div className="col-md-4 col-12">
                    <label htmlFor="inputState" className="form-label">
                      State
                    </label>
                    <select id="inputState" className="form-select">
                      <option>Choose...</option>
                      {cities.map((data, idx) => {
                        return <option key={idx}>{data.split(",")[1]}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-md-4 col-12">
                    <label htmlFor="inputZip" className="form-label">
                      Pincode
                    </label>
                    <input type="text" className="form-control" id="inputZip" />
                  </div>
                </div>

              </div>
              <div className="col-12"><button className="loginbtn" type="submit"> {isLoading ? <LoadingSpinner /> : "Submit"}</button></div>
              {loginModeError.isError && (
                <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                  {loginModeError.message}
                </p>
              )}
            </form>
          ) : <ProductBill list={list} routeForPay={"/add-address/payment"} text="checkout" myAddress={IsAddressAdded} />}
      </div>
    </>
  );
};

export default PaymentForm;