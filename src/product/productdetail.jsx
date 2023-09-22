
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { selectProduct } from "../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GiShoppingCart } from "react-icons/gi";
import './productdetail.css'
import { addtoCart } from "../redux/actions/action";
import { array } from "yup";

const Productdetail = () => {
    const { id } = useParams();
    const storeData = useSelector((state) => state);
    
    const dispatch = useDispatch();
    const Navigat=useNavigate();
    const fetchsingleProductData = async () => {
        const response = await Axios.get(`https://fakestoreapi.com/products/${id}`);
        dispatch(selectProduct(response.data));
    };

    useEffect(() => {
        fetchsingleProductData();
    }, [id]);

    function addTocart() {
        if (storeData.isUserLoggedIn) {
            // localStorage.setItem("cartData",JSON.stringify([]));
            let flag = false
            const Arry = JSON.parse(localStorage.getItem("cartData") || "[]");
            console.log(Arry)
            let data  = Arry.map((x)=>{
              if(x.id == storeData.selectedProduct.id){
                x.Quantity += 1 
                flag = true
                return x
              }
              return x;
      
            })
            if(!flag){
              data.push({ ...storeData.selectedProduct, Quantity: 1 });
            }
            localStorage.setItem("cartData", JSON.stringify(data));
            dispatch(addtoCart(data));
            Navigat("/cart");
          } else {
            alert("please login");
          }
        }
    return (
        <>
            <Header />
            <Layout>
                <div className="container mt-5 mb-5  ">
                    <div className="card mb-3" style={{ Width: "1000px", border: "none ! important" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={storeData.selectedProduct.image} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h6 className="card-title">{storeData.selectedProduct.title}</h6>
                                    <h3 class="card-subtitle mb-2 text-body-secondary">Price: <span className="">&#x20B9;{storeData.selectedProduct.price} </span></h3>
                                    <p className="card-text">
                                        {storeData.selectedProduct.description}
                                    </p>
                                    <p className="card-text">
                                        <button onClick={addTocart} className="btn btn-warning text-light fw-bold "><GiShoppingCart style={{ fontSize: "1.5rem" }} /> Add to cart</button>
                                    </p>
                                    <div>
                                       
                                            <ul>
                                                <li className="">
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"/>
                                                   <span> Special PriceGet extra 10% off (price inclusive of cashback/coupon)T&C</span>
                                                </li>
                                                <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"/>
                                                Bank OfferFlat ₹50 Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per Paytm accountT&C
                                                </li>
                                                <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"/>
                                                Bank Offer5% Cashback on Flipkart Axis Bank CardT&C
                                                </li>
                                                <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"/>
                                                Extra ₹500 Off on Bikes & Scooters on purchase of ₹30,000 or moreT&C
                                                </li>
                                                <li>
                                                <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"/>
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