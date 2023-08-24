
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
import {Signup} from '../pages/signup'
import "./signup.css";


const Login = ()=>{
    return <>
    <Header/>
    <Layout>
    <div className="container text-center   mt-5 mb-5">
                <div className="container row align-items-center mt-0 w-75">
                    <div className="loginsection col-5 ">
                        <span className='loginspan'>Login</span>
                        <p>
                        <span className='pspan'>Get access to your Orders, Wishlist and Recommendations</span>
                        <span>
                        <img src="https://www.pngmart.com/files/16/Store-Shopping-Mall-Transparent-PNG.png" class="img-fluid shoppingimg" alt="..."/>                        
                        </span>                       
                        </p>
                    </div>
                    <div className="col-7 ">
                        <Signup/>
                    </div>
                    
                </div>
            </div>

    </Layout>
    <Footer/>
    </>
}

export default Login
