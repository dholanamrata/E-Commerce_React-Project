import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "../config/firebaseconfig";


export const Forgotform = () => {
    const [resetPasswordError, setresetPasswordError] = useState({
        message: "",
        isError: false,
      });
    
    async function ForgotpasswordHandler(e) {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(Auth, e.target[0].value);
        } catch (err) {
            setresetPasswordError((prev) => {
                return {
                    ...prev,
                    message: err.message,
                    isError: true,
                };
            });
        }
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


        });
    return (
        <>
            <section className="contact-info-area">
                <div className="main ">
                    <div style={{ display: "block" }}>
                        {resetPasswordError.isError && (
                            <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                                {resetPasswordError.message.substring(
                                    22,
                                    resetPasswordError.message.length - 2
                                )}
                            </p>
                        )}
                        <form className="formcontainer" onSubmit={ForgotpasswordHandler}>
                            <h3>Forgot Form</h3>
                            <p>Please enter your email address and we'll send your passsword on your email account</p>
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
                            <div><button className="loginbtn" type="submit">submit</button></div>                          

                        </form>
                    </div>

                </div>



            </section >

        </>)
};