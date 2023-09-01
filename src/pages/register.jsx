
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
// import Form from 'react-bootstrap/Form';
import './register.css'



const Register = () => {
    return <>
        <Header />
        <Layout>
            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h1>Create Account</h1>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username">Your name</label>
                                        <input type="text" className="form-control" placeholder="Firstname and Last name" id="username" name="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" placeholder="abc@gmail.com" id="email" name="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" placeholder="**********" id="password" name="password" required />
                                    </div>
                                    <div>
                                        <p>To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.</p>
                                    </div>
                                    <button type="submit" className="continuebtn">Continue</button>
                                    <div className="mt-2">
                                        <p>Already have an account? Sign in</p>
                                    </div>
                                    <p>By creating an account or logging in, you agree to  Conditions of Use and Privacy Policy.</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Layout>
        <Footer />
    </>
}

export default Register



