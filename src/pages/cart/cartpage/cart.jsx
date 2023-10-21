import Header from "../../../Componets/Header/header";
import Footer from "../../../Componets/Footer/footer";
import ConfimationAndAlert from "../../../Componets/alertingComponent/confirmationAndAlert";

import { useSelector } from "react-redux";

import ProductBill from "../bill/bill";
import AddedProduct from "../cartproduct/Addedproduct";

import './cart.css'

const Cart = () => {

  const cartData = useSelector((state) => state.cartProduct);
  const storeData = useSelector((state) => state);
  if (cartData.length === 0) {
    return (
      <>
        <ConfimationAndAlert
          ImageInfo={{
            url: "https://cdn-icons-png.flaticon.com/512/2762/2762885.png",
            alt: "empty cart",
          }}
          route={"/"}
          message={"cart is empty"}
          btnText={"return to shopping"}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh" }}>
        <div className="container text-center ">
          <div className="row row-cols-md-2  row-cols-1 ">
            <div className="col mb-3 d-flex gap-2 flex-column  p-5"> <AddedProduct list={storeData.cartProduct} /></div>
            <div className="col"><ProductBill list={storeData.cartProduct} routeForPay={"/add-address/payment"} text={"proceed to buy"} /></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
