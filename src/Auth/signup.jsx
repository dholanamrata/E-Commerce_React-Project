import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import "./signup.css";
import { useNavigate } from 'react-router-dom'

import { Auth } from "../config/firebaseconfig";
import { useDispatch } from "react-redux";
import { authChecking } from "../redux/actions/action";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { storage } from "../config/firebaseconfig";
import { ref, getDownloadURL } from "firebase/storage";

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
                try {
                    const data = setPersistence(Auth, browserSessionPersistence).then(() => {
                      signInWithEmailAndPassword(Auth, values.email, values.password);
                    });
              
                    if (data) {
                      // localStorage.setItem("user", data.user.accessToken);
                      // const token = localStorage.getItem("user");
                      // if (token) {
                      //   dispatch(authChecking(true));
                      // }
                      // Navigation("/");
                      console.log("hello");
                      const isUserstoreSomething = localStorage.getItem(`${values.email}`);
                      if (!isUserstoreSomething) {
                        const mydatabase = await getDocs(collection(db, "usersData"));
                        mydatabase.forEach((query) => {
                          if (
                            query._document.data.value.mapValue.fields.userEmail
                              .stringValue === values.email
                          ) {
                            const refernce = ref(
                              storage,
                              `users/${query._document.data.value.mapValue.fields.userProfile.stringValue}`
                            );
                            console.log(refernce);
                            if (refernce) {
                              getDownloadURL(refernce).then((res) => {
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
                              });
                              Navigation("/");
                            } else {
                              dispatch(
                                authChecking({
                                  email: values.email,
                                  flag: true,
                                })
                              );
                              localStorage.setItem(
                                `${values.email}`,
                                JSON.stringify({
                                  url: "",
                                  email: values.email,
                                })
                              );
                              Navigation("/");
                            }
                          }
                        });
                        // localStorage.setItem(`${values.email}`,)
                      } else {
                        dispatch(
                          authChecking({
                            email: values.email,
                            flag: true,
                          })
                        );
                        Navigation("/");
                      }
                    }
                  } catch (err) {
                    console.log(err.message);
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
                    <Link to="/forgot/password">Forgot password?</Link>
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