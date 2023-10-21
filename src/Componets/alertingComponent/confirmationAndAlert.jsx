import React from "react";
import Header from "../../Componets/Header/header";
import Footer from "../../Componets/Footer/footer";
import Targetbtn from "../target-buttons/targetBtn";
import "./confirmationAndAlert.css"

const ConfimationAndAlert = ({ImageInfo,message,btnText,route}) => {
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center flex-column containerSize  align-items-center">
        <img
          src={ImageInfo.url}
          alt={ImageInfo.alt}
          width="200px"
          height={"200px"}
          className="object-fit-fill"
        />
        <p className="display-3 text-center text-capitalize">
          {message}
        </p>
        <Targetbtn route={route} btnText={btnText} />
      </div>
      <Footer />
    </>
  );
};

export default ConfimationAndAlert