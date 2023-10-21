import { useEffect } from "react";

import Layout from "../../../Componets/Layout/layout"
import Header from "../../../Componets/Header/header";
import Footer from "../../../Componets/Footer/footer";

import Axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { selectProduct } from "../../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { addtoCart } from "../../../redux/actions/action";

import { GiShoppingCart } from "react-icons/gi";

import './productdetail.css'

const Productdetail = () => {
    const { id } = useParams();
    const storeData = useSelector((state) => state);
    const dispatch = useDispatch();
    const Navigat = useNavigate();
    const fetchsingleProductData = async () => {
        const response = await Axios.get(import.meta.env.VITE_PRODUCT_LIST_API + `/${id}`);
        dispatch(selectProduct(response.data));
    };

    useEffect(() => {
        fetchsingleProductData();
    }, [id]);

    function addTocart() {
        if (storeData.isUserLoggedIn.islogin) {
            let flag = false;
            const findEmail = JSON.parse(
                sessionStorage.getItem(window.sessionStorage.key(0))
            )?.email;

            let Arry = JSON.parse(localStorage.getItem(findEmail));

            let data = Arry.cart.map((x) => {
                if (x.id == storeData.selectedProduct.id) {
                    x.Quantity += 1;
                    flag = true;
                    return x;
                }
                return x;
            });

            if (!flag) {
                data.push({ ...storeData.selectedProduct, Quantity: 1 });
            }

            Arry = { ...Arry, cart: [...data] };
            localStorage.setItem(`${findEmail}`, JSON.stringify(Arry));
            dispatch(addtoCart(data));
            Navigat("/cart");
        } else {
            Navigat("/login");
        }
    }
    return (
        <>
            <Header />
            <Layout>
                <div className="container mt-5 mb-5  " style={{ maxWidth: "700px", border: "none ! important" }}>
                    <div className="card mb-3" >
                        <div className="row g-4">
                            <div className="col-md-5 col-12 d-flex justify-content-center ">
                                <img src={storeData.selectedProduct.image} className="rounded-start" width={"200px"} height={"300px"} alt="..." />
                            </div>
                            <div className="col-md-7 ">
                                <div className="card-body">
                                    <h6 className="card-title">{storeData.selectedProduct.title}</h6>
                                    <h3 className="card-subtitle mb-2 text-body-secondary">Price: <span className="">&#x20B9;{storeData.selectedProduct.price} </span></h3>
                                    <p className="card-text">
                                        {storeData.selectedProduct.description}
                                    </p>
                                    <p className="card-text">
                                        <button onClick={addTocart} className="btn btn-warning text-light fw-bold "><GiShoppingCart style={{ fontSize: "1.5rem" }} /> Add to cart</button>
                                    </p>
                                    <div>
                                        <ul style={{ padding: "0" }}>
                                            <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" className="_3HLfAg" />
                                                <span> Special PriceGet extra 10% off (price inclusive of cashback/coupon)T&C</span>
                                            </li>
                                            <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" className="_3HLfAg" />
                                                Bank OfferFlat ₹50 Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per Paytm accountT&C
                                            </li>
                                            <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" className="_3HLfAg" />
                                                Bank Offer5% Cashback on Flipkart Axis Bank CardT&C
                                            </li>
                                            <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" className="_3HLfAg" />
                                                Extra ₹500 Off on Bikes & Scooters on purchase of ₹30,000 or moreT&C
                                            </li>
                                            <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" className="_3HLfAg" />
                                                Partner OfferPurchase now & get 1 surprise cashback coupon in FutureKnow More
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <Footer />
        </>
    );
}

export default Productdetail