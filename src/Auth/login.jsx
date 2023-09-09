
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
import { Signup } from './signup'
// import loginImg from "../img/login.png"
import loginImg from "../img/login_logo.png"
import "./signup.css";


const Login = () => {
    return <>
        <Header />
        <Layout>
            <div className="container text-center   mt-5 mb-5" >
                <div className="container row align-items-center mt-0 w-75  ">
                    <div className="loginsection col-md-5 col-12 mb-3  ">
                        <span className='loginspan'>Login</span>
                        <p>
                            <span className='pspan'>Get access to your Orders, Wishlist and Recommendations</span>
                        </p>
                        <div style={{height:"60px"}}></div>
                        <div className="blank  mb-3">
                            <span>
                            {/* <img src="https://www.pngmart.com/files/16/Store-Shopping-Mall-Transparent-PNG.png" class="img-fluid shoppingimg" alt="..." /> */}
                                <img src={loginImg} class="img-fluid shoppingimg" alt="..." />
                            </span>
                        </div>
                    </div>
                    <div className="col-md-7 col-12 ">
                        <Signup />
                    </div>

                </div>
            </div>

        </Layout>
        <Footer />
    </>
}

export default Login
