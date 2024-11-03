import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./payment.css";

function Payment() {
  const navigate=useNavigate();
  const KEY =
    "pk_test_51K7MZCSIHJPl4DZoua3CngVrJcJE1MUp0d3h6E4MX7NROlJYss0FkBsv0zcndxhrR7aiPc4mGMKBl0fHhOlECtp300rywyA06V";
  const [stripeToken, setstripeToken] = useState(null);
  const onToken = (token) => {
    setstripeToken(token);
    console.log(token);
  };

  useEffect(() => {
    const makepayment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/payments/new",
          {
            tokenId: stripeToken.id,
            amount: 200,
          }
        );
        console.log(response);
          navigate("/paymentsuccess")
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makepayment();
  }, [stripeToken]);

  return (
    <div className="paymentWrapper">
      <div className="paymentBox">
        <div className="logoImage">
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/profile.jpg"}
            alt=""
          />
        </div>
        <div className="Paymenttext">
          <p>
            Welcome to Womzone Banking,Complete the payment and continue
            shopping
          </p>
        </div>
        <div className="paymentButton">
          <StripeCheckout
            name="WOMZONE"
            image="https://firebasestorage.googleapis.com/v0/b/freshbook-f6590.appspot.com/o/profile.jpg?alt=media&token=9df59e14-df63-4331-a130-f1b87a24425e"
            billingAddress
            shippingAddress
            description="Your total is 4000 Rs"
            amount={2000}
            token={onToken}
            currency="INR"
            stripeKey={KEY}
          >
            <button>Pay Now</button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}

export default Payment;
