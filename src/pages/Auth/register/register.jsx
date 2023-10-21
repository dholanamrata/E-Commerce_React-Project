import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../../../Componets/Header/header";
import Footer from "../../../Componets/Footer/footer";

import LoadingSpinner from "../../../Componets/loader/loader";
import { authChecking } from "../../../redux/actions/action";
import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";

import { createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { Auth } from "../../../config/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebaseconfig";
import { v4 } from "uuid";

import './register.css'


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loginModeError, setloginModeError] = useState({
    message: "",
    isError: false,
  });

  async function createDb(data, fileName) {
    const userDataRef = collection(db, "usersData");
    try {
      const docRef = await addDoc(userDataRef, {
        userName: data.name,
        userEmail: data.email,
        userProfile: data.file.name ? fileName : "",
      });
    } catch (err) {
      setIsLoading(false);
      setloginModeError((prev) => {
        return { ...prev, message: err.message, isError: true };
      });
    }
  }

  function createStorageWithUserProfile(data, fileName) {
    const storageRef = ref(storage, `/users/${fileName}`);
    uploadBytes(storageRef, data.file)
      .then((res) => {
        const refernce = ref(storage, res.ref._location.path_);
        return getDownloadURL(refernce);
      })
      .then((res) => {
        localStorage.setItem(
          `${data.email}`,
          JSON.stringify({
            url: res,
            email: data.email,
            cart: [],
            name: data.name,
          })
        );

        dispatch(
          authChecking({
            email: data.email,
            flag: true,
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setloginModeError((prev) => {
          return { ...prev, message: err.message, isError: true };
        });
      });
  }

  function createUserWithoutProfile(data) {
    try {
      localStorage.setItem(
        `${data.email}`,
        JSON.stringify({
          url: "",
          email: data.email,
          cart: [],
          name: data.name,
        })
      );

      dispatch(
        authChecking({
          email: data.email,
          flag: true,
        })
      );
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      setloginModeError((prev) => {
        return { ...prev, message: err.message, isError: true };
      });
    }
  }

  const { handleChange, handleBlur, handleSubmit, setFieldValue, errors, values, touched } =
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
        setIsLoading((prev) => {
          return !prev;
        });
        try {
          const responseRegistration = await setPersistence(
            Auth,
            browserSessionPersistence
          );
          const authResponse = await createUserWithEmailAndPassword(
            Auth,
            values.email,
            values.password
          );

          const fileName = values.file.name + v4();
          createDb(values, fileName);
          if (authResponse) {
            values.file.name
              ? createStorageWithUserProfile(values, fileName)
              : createUserWithoutProfile(values);
          }
          action.confirmPassword = "";
          action.resetForm();
          navigation("/")
        } catch (err) {
          setIsLoading(false);
          setloginModeError((prev) => {
            return { ...prev, message: err.message, isError: true };
          });
        }
      },
    });
  return <>
    <Header />
    <div className=" mt-5 register-divison  ">
      <div className="container" style={{ maxWidth: "500px" }} >
        <div className="row">
          <form className="col  align-items-center w-50 border p-3 " onSubmit={handleSubmit}>
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

            <div><button className="loginbtn" type="submit"> {isLoading ? <LoadingSpinner /> : "signUp"}</button></div>
            {loginModeError.isError && (
              <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                {loginModeError.message}
              </p>
            )}
            <div className="mt-2">
              <p>Already have an account? <a className="link-opacity-100" href="./login">Log in</a></p>
              <p>Buying for work? <a className="link-opacity-100" href="./login">Create a free business account</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </>
}

export default Register



