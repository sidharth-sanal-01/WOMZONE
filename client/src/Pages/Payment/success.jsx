import React from "react";
import { Link } from "react-router-dom";
import "./success.css";

function Success() {
  return (
    <div className="sucessWrapper">
      <div className="sucessMain">
        <div className="logoImage">
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/profile.jpg"}
            alt=""
          />
        </div>
        <h3>Payment Sucess ! Your order has been placed</h3>
        <Link to="/">
          <button>CONTINUE SHOPPING</button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
