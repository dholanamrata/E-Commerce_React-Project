import React from "react";
import { useDispatch } from "react-redux";
import { increaseItem, decreaseItem, removeCartItem } from "../../redux/actions/action";
const AddedProduct = ({ list }) => {
  const dispatch = useDispatch();

  function incrementItem(productId) {
    const arryOfIncrement = JSON.parse(
      localStorage.getItem("cartData") || "[]"
    );
    const updatedData = arryOfIncrement.map((element) => {
      if (element.id === parseFloat(productId)) {
        return { ...element, Quantity: element.Quantity + 1 };
      }
      return element;
    });
    localStorage.setItem("cartData", JSON.stringify(updatedData));
    dispatch(increaseItem(updatedData));
  }

  function decreamentItem(id) {
    const arryOfDecrement = JSON.parse(
      localStorage.getItem("cartData") || "[]"
    );
    const updatedData = arryOfDecrement.map((element) => {
      if (element.id === parseFloat(id)) {
        return { ...element, Quantity: element.Quantity - 1 };
      }
      return element;
    });
    localStorage.setItem("cartData", JSON.stringify(updatedData));
    dispatch(decreaseItem(updatedData));
  }

  function removeItemFromCart(id) {
    const arryOfRemove = JSON.parse(localStorage.getItem("cartData") || "[]");
    const updatedData = arryOfRemove.filter(
      (element) => element.id !== parseFloat(id)
    );
    localStorage.setItem("cartData", JSON.stringify(updatedData));
    dispatch(removeCartItem(updatedData));
  }
  return (
    <div className="container mt-5 mb-2  ">
      {list.map((element) => (
        <div className="card " style={{ maxWidth: 540 }} key={element.id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={element.image}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <h3 className="card-subtitle mb-2 text-body-secondary">
                  Price: <span className="">&#x20B9;{element.price} </span>
                </h3>
                <p className="cart-text btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    id={element.id}
                    onClick={(e) => {
                      decreamentItem(e.target.id);
                    }}
                  >
                    -
                  </button>
                  <button type="button" className="btn btn-outline-dark">
                    {element.Quantity}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    id={element.id}
                    onClick={(e) => {
                      incrementItem(e.target.id);
                    }}
                  >
                    +
                  </button>
                  {/* </div> */}
                </p>
                <p className="card-text">
                  <button
                    type="button"
                    id={element.id}
                    className="btn btn-danger"
                    onClick={(e) => {
                      removeItemFromCart(e.target.id);
                    }}
                  >
                    Remove Item
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddedProduct;