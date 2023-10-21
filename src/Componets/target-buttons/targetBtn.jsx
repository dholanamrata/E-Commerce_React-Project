import React from "react";
import { Link } from "react-router-dom";
const Targetbtn = ({ route, btnText }) => {
  return (
    <>
      <div className="d-flex justify-content-center ">
        <Link to={route} className="btn btn-warning w-100">
         { btnText}
        </Link>
      </div>
    </>
  );
};

export default Targetbtn