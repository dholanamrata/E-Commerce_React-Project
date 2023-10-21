
import Layout from "../../../Componets/Layout/layout"
import Header from "../../../Componets/Header/header";
import Footer from "../../../Componets/Footer/footer";
import Signup from "./signup";
import loginImg from "../../../assets/imges/login_logo.png"
import "./signup.css";

const Login = () => {
    return <>
        <Header />
        <Layout>
            <div className="container text-center mt-5" style={{ maxWidth: "700px" }} >
                <div className="row row-cols-md-2 row-cols-1 g-3 align-items-center">
                    <div className="loginsection col p-4 ">
                        <span className='loginspan'>Login</span>
                        <p>
                            <span className='pspan'>Get access to your Orders, Wishlist and Recommendations</span>
                        </p>
                        <div className="blank  mb-3">
                            <span>
                                <img src={loginImg} class="img-fluid shoppingimg" alt="..." />
                            </span>
                        </div>
                    </div>
                    <div className="col  ">
                        <Signup />
                    </div>
                </div>
            </div>
        </Layout>
        <Footer />
    </>
}
export default Login
