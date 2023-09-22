
import Layout from "../Componets/Layout/layout"
import Header from "../Componets/Header/header";
import Footer from "../Componets/Footer/footer";
// import Form from 'react-bootstrap/Form';
import './register.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
// import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../config/firebaseconfig";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { authChecking } from "../redux/actions/action";
import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseconfig";
import { useDispatch } from "react-redux";

import { v4 } from "uuid";
1;

const Register = () => {
    const [loginModeError, setloginModeError] = useState({
        message: "",
        isError: false,
    });
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { handleChange, handleBlur, handleSubmit, setFieldValue,errors, values, touched } =
        useFormik({
            initialValues: {
                name: "",
                email: "",
                file: "",
                password: "",
                confirmPassword: "",
            },
            validationSchema: Yup.object().shape({
                name: Yup
                    .string()
                    .min(4, "minimum 4 chreacter")
                    .max(20)
                    .required("please enter your name"),
                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string()
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        "Minimum eight characters, at least one letter and one number"
                    )
                    .required("Required"),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "password is not match")
                    .required("Required"),
            }),
            onSubmit: async (values, action) => {
                console.log(values)
                // try {
                //     const response = await axios.post("http://localhost:3000/data", values);
                //     console.log(response.data)
                // } catch (err) {
                //     alert(err.message)
                // }

                // action.resetForm();
                try {
                    const responseRegistration = await createUserWithEmailAndPassword(
                      Auth,
                      values.email,
                      values.password
                    );
                    const userDataRef = collection(db, "usersData")
                    const fileName = values.file.name + v4()
                    console.log(responseRegistration)
                    const docRef = await addDoc((userDataRef), {
                      userName: values.name,
                      userEmail: values.email,
                      userProfile: values.file.name ? fileName : "",
                    });
            
                    const { user } = responseRegistration;
                    
                    if (responseRegistration) {
                        console.log("hello")
                      localStorage.setItem("token", user.accessToken);
                      if (values.file.name) {
                        const storageRef = ref(
                          storage,
                          `/users/${fileName}`
                        );
                        uploadBytes(storageRef, values.file)
                          .then((res) => {
                            const refernce = ref(storage, res.ref._location.path_);
                            return getDownloadURL(refernce);
                          })
                          .then((res) => {
                            localStorage.setItem(
                              `${values.email}`,
                              JSON.stringify({
                                url: res,
                                email: values.email,
                              })
                            );
                            dispatch(
                              authChecking({
                                email: values.email,
                                flag: true,
                              })
                            );
                            navigation("/");
                          })
                          .catch((err) => console.log(err));
                      } else {
                        localStorage.setItem(
                          `${values.email}`,
                          JSON.stringify({
                            url: "",
                            email: values.email,
                          })
                        );
                        dispatch(
                          authChecking({
                            email: values.email,
                            flag: true,
                          })
                        );
                      }
                    }
                  } catch (err) {
                    console.log(err)
                    setloginModeError((prev) => {
                      return { ...prev, message: err.message, isError: true };
                    });
                  }
                  action.confirmPassword = "";
                  action.resetForm();
            },
        });

    return <>
        <Header />
        <Layout>
            <div className="container   mt-5 mb-5" >
                <form className="container  align-items-center w-50 border p-3 " onSubmit={handleSubmit}>

                    <div className="input-div">
                        <h4>Create Account</h4>
                        <input
                            placeholder="Enter your name..."
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className={errors.name && touched.name ? "input-error" : ""}
                        />
                        {touched.email && errors.email ? <div className="error-div">{errors.name}</div> : null}
                    </div>
                    <div className="input-div">
                        <input
                            placeholder="Email"
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={errors.email && touched.email ? "input-error" : ""}
                        />
                        {touched.email && errors.email ? <div className="error-div">{errors.email}</div> : null}
                    </div>

                    <div className="input-div">
                        <input
                            className="form-control"
                            type="file"
                            name="file"
                            id="file"
                           
                            onBlur={handleBlur}
                            onChange={(event) => {
                                console.log()
                              setFieldValue("file", event.currentTarget.files[0])
                            }
                        }
                        />
                        {touched.file && errors.file ? <div className="error-div">{errors.file}</div> : null}
                    </div>



                    <div className="input-div">
                        <input
                            placeholder="Password"

                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className={errors.password && touched.password ? "input-error" : ""}
                        />
                        {touched.password && errors.password ? (
                            <div className="error-div">{errors.password}</div>
                        ) : null}
                    </div>


                    <div className="input-div">
                        <input
                            placeholder="ConfirmPassword"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            className={
                                errors.confirmPassword && touched.confirmPassword
                                    ? "input-error"
                                    : ""
                            }
                        />
                        {touched.confirmPassword && errors.confirmPassword ? (
                            <div className="error-div">{errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    <div><button className="loginbtn" type="submit">Continue</button></div>
                    {loginModeError.isError && (
                        <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                            {loginModeError.message.substring(
                                22,
                                loginModeError.message.length - 2
                            )}
                        </p>
                    )}
                    <div className="mt-2">
                        <p>Already have an account? <a className="link-opacity-100" href="./login">Log in</a></p>
                        <p>Buying for work? <a className="link-opacity-100" href="./login">Create a free business account</a></p>
                    </div>
                </form>
            </div>
        </Layout>
        <Footer />
    </>
}

export default Register



