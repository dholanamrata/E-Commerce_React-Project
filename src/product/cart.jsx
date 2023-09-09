
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem, removeCartItem } from "../redux/actions/action";
import './cart.css'
const Cart = () => {
    const product = useSelector((state) => (state))
    console.log(product)
    const dispatch = useDispatch();

    function incrementItem(id) {
        dispatch(increaseItem(id));
    }

    function decreamentItem(id) {
        dispatch(decreaseItem(id));
    }

    function removeItemFromCart(id) {
        dispatch(removeCartItem(id));
    }

    let sum = 0;
    
    product.cartProduct.map((element) => {
        const productTotal = element.Quantity * element.price;
        sum += productTotal;
        console.log(productTotal);
        
    });


    console.log("Total Sum:", sum);

    return <>
        <Header />
        <Layout>
            <div class="container text-center">
                <div class="row row-cols-2 ">
                    <div class="col">
                        {product.cartProduct.map((element) => (
                            <div className="card mb-5 mt-5" style={{ maxWidth: 540 }} key={element.id}>
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
                                            <h3 class="card-subtitle mb-2 text-body-secondary">
                                                Price: <span className="">&#x20B9;{element.price} </span>
                                            </h3>
                                            <p className="cart-text">
                                                <div
                                                    className="btn-group btn-group-sm"
                                                    role="group"
                                                    aria-label="Small button group"
                                                >
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
                                                </div>
                                            </p>
                                            <p className="card-text">
                                                <button
                                                    type="button"
                                                    id={element.id}
                                                    class="btn btn-danger"
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
                    <div class="col">
                        {product.cartProduct.length !== 0 && (
                            <div className="card mb-5 mt-5">
                                <div className="p-2">
                                    <p>Your order is eligible for FREE Delivery. </p>
                                    
                                <div className=" border-top mt-2">
                                        <h2>Total Amount : {sum}</h2>
                                        <button type="button" className="btn btn-warning">Proceed to Buy</button>
                                    </div>
                                    <p className="border-top mt-2 p-1">
                                    Safe and Secure Payments.Easy returns.100% Authentic products.
                                    </p>
            
                                </div>
                            </div>

                        )}

                    </div>

                </div>
            </div>



        </Layout >
        <Footer />
    </>
}

export default Cart