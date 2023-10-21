import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup"

import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { authChecking } from "../../../redux/actions/action";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getDocs, collection, query } from "firebase/firestore";
import { Auth } from "../../../config/firebaseconfig";
import { db } from "../../../config/firebaseconfig";
import { storage } from "../../../config/firebaseconfig";
import { ref, getDownloadURL } from "firebase/storage";

import LoadingSpinner from "../../../Componets/loader/loader";

export const Signup = () => {
  const [loginModeError, setloginModeError] = useState({
    message: "",
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const Navigation = useNavigate();
  const dispatch = useDispatch();
  function handleregister() {
    Navigation("/register")
  }
  const { handleChange, handleBlur, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        file: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: yup.object().shape({

        email: yup.string().email("Invalid email address").required("Required"),
        password: yup.string()
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Minimum eight characters, at least one letter and one number"
          )
          .required("Required"),
      }),
      onSubmit: async (values, action) => {
        setIsLoading(true);
        try {
          const data = await setPersistence(Auth, browserSessionPersistence)
          const response = await signInWithEmailAndPassword(Auth, values.email, values.password);

          if (response) {
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

                  if (refernce) {
                    getDownloadURL(refernce).then((res) => {
                      localStorage.setItem(
                        `${values.email}`,
                        JSON.stringify({
                          url: res,
                          email: values.email,
                          name: query._document.data.value.mapValue.fields.userName
                            .stringValue,
                          cart: [],
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
                    setIsLoading(false);
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
                        cart: [],
                        name: query._document.data.value.mapValue.fields.userName
                          .stringValue,
                      })
                    );
                    Navigation("/");
                    setIsLoading(false);
                  }
                }
              });
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
          setIsLoading(false);
        } catch (err) {
          setloginModeError((prev) => {
            return { ...prev, message: err.message, isError: true };
          });
          setIsLoading(false);
        }
        action.resetForm();
      }
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <div><button className="loginbtn" type="submit"> {isLoading ? <LoadingSpinner /> : "Login"}</button></div>
        {loginModeError.isError && (
          <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
            {loginModeError.message}
          </p>
        )}
        <Link to="/forgot/password">Forgot password?</Link>
      </form>
      <div className="mb-2 mt-2">
        <h6 style={{ color: "gray" }}>By continuing, I agree to Flipkart’s Terms of Use & Privacy Policy</h6>
        <h6 style={{ color: "gray" }}>Don’t have an account?</h6>
        <button onClick={handleregister} className="registerbtn mb-1" type="submit">Register for New account</button>
      </div>
    </>)
};
export default Signup
