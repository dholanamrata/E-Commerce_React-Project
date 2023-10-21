import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "../../../config/firebaseconfig";

import LoadingSpinner from "../../../Componets/loader/loader"
import "../login/signup.css";

export const Forgotform = () => {
    const [resetPasswordError, setresetPasswordError] = useState({
        message: "",
        isError: false,
    });
    const [isLoading, setloading] = useState(false)

    async function ForgotpasswordHandler(e) {
        e.preventDefault();
        setloading(true)
        try {
            await sendPasswordResetEmail(Auth, e.target[0].value);
            setloading(false);
            setresetPasswordError((prev) => {
                return {
                    ...prev,
                    message: "reset link is sent to your Email",
                    isError: true,
                };
            });
            e.target.reset()
        } catch (err) {
            setloading(false)
            setresetPasswordError((prev) => {
                return {
                    ...prev,
                    message: err.message,
                    isError: true,
                };
            });
        }
    }
    const { handleChange, handleBlur, errors, values, touched } =
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
            <div >
                <form onSubmit={ForgotpasswordHandler}>
                    <h3>Forgot Form</h3>
                    <p>Please enter your email address and we'll send your passsword on your email account</p>
                    {resetPasswordError.isError && <span className="text-danger">{resetPasswordError.message}</span>}
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
                    <div><button className="loginbtn" type="submit">{isLoading ? <LoadingSpinner /> : "send Email"} </button></div>
                </form>
            </div>
        </>)
};