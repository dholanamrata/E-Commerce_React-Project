import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import "./signup.css";
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Auth } from "../config/firebaseconfig";
import { useDispatch } from "react-redux";
import { authChecking } from "../redux/actions/action";
import { useState } from "react";

export const Signup = () => {
    const [loginModeError, setloginModeError] = useState({
        message: "",
        isError: false,
      });
    const Navigation = useNavigate();
    const dispatch = useDispatch();
    function handleregister() {
        Navigation("/register")
    }
    const { handleChange, handleBlur, handleSubmit, errors, values, touched } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
                confirmPassword: "",
            },
            validationSchema: Yup.object().shape({

                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string()
                    .matches(
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        "Minimum eight characters, at least one letter and one number"
                    )
                    .required("Required"),
            }),
            onSubmit: async (values, action) => {
                // console.log(values)
                // try {
                //     const response = await axios.post("http://localhost:3000/data", values);
                //     console.log(response.data)
                // } catch (err) {
                //     alert(err.message)
                // }

                // action.resetForm();
                try {
                    const data = await signInWithEmailAndPassword(
                        Auth,
                        values.email,
                        values.password
                    );
                    if (data) {
                        localStorage.setItem("user", data.user.accessToken);
                        const token = localStorage.getItem("user");
                        if (token) {
                            dispatch(authChecking(true));
                        }
                        Navigation("/");
                    }
                } catch (err) {
                    console.log(err);
                    setloginModeError((prev) => {
                        return { ...prev, message: err.message, isError: true };
                      });
                }
                action.resetForm();

            },
        });
    return (
        <>
            <section className="contact-info-area">


                <div className="main ">
                    <form className="formcontainer" onSubmit={handleSubmit}>

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
                        <div><button className="loginbtn" type="submit">submit</button></div>
                        {loginModeError.isError && (
                      <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                        {loginModeError.message.substring(
                          22,
                          loginModeError.message.length - 2
                        )}
                      </p>
                    )}
                    </form>
                    <div className="mt-3">
                        <h6 style={{ color: "gray" }}>By continuing, I agree to Flipkart’s Terms of Use & Privacy Policy</h6>
                        <h6 style={{ color: "gray" }}>Don’t have an account?</h6>
                        <button onClick={handleregister} className="registerbtn mb-1" type="submit">Register for New account</button>
                    </div>
                </div>



            </section >

        </>)
};